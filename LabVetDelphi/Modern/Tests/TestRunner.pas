unit TestRunner;

interface

uses
  System.SysUtils, System.Classes, Vcl.Forms, Vcl.Controls, Vcl.StdCtrls,
  Vcl.ComCtrls, Vcl.ExtCtrls, TestFramework, EmpresaTests;

type
  TfrmTestRunner = class(TForm)
    pnlTop: TPanel;
    pnlBottom: TPanel;
    pnlCenter: TPanel;
    btnRunAll: TButton;
    btnRunMigration: TButton;
    btnRunUnit: TButton;
    btnRunIntegration: TButton;
    btnRunPerformance: TButton;
    lvResults: TListView;
    memoLog: TMemo;
    splitter: TSplitter;
    lblStatus: TLabel;
    progressBar: TProgressBar;
    btnGenerateReport: TButton;
    btnClearResults: TButton;
    
    procedure FormCreate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
    procedure btnRunAllClick(Sender: TObject);
    procedure btnRunMigrationClick(Sender: TObject);
    procedure btnRunUnitClick(Sender: TObject);
    procedure btnRunIntegrationClick(Sender: TObject);
    procedure btnRunPerformanceClick(Sender: TObject);
    procedure btnGenerateReportClick(Sender: TObject);
    procedure btnClearResultsClick(Sender: TObject);
    procedure lvResultsDblClick(Sender: TObject);
    
  private
    FTestManager: TTestManager;
    FRunning: Boolean;
    
    procedure SetupTestSuites;
    procedure UpdateProgress(const AMessage: string; AProgress: Integer = -1);
    procedure AddResultToList(const ASuiteName, ATestName, AStatus: string; 
      AExecutionTime: Cardinal; const AError: string = '');
    procedure LogMessage(const AMessage: string);
    procedure RunTestsByType(ATestType: TTestType);
    procedure EnableControls(AEnabled: Boolean);
    
  public
    class procedure RunTests;
  end;

implementation

{$R *.dfm}

uses
  System.Threading, System.DateUtils, Vcl.Dialogs;

{ TfrmTestRunner }

class procedure TfrmTestRunner.RunTests;
var
  Form: TfrmTestRunner;
begin
  Form := TfrmTestRunner.Create(nil);
  try
    Form.ShowModal;
  finally
    Form.Free;
  end;
end;

procedure TfrmTestRunner.FormCreate(Sender: TObject);
begin
  FTestManager := TTestManager.Create;
  FRunning := False;
  
  // Configurar ListView
  lvResults.ViewStyle := vsReport;
  lvResults.Columns.Add.Caption := 'Suite';
  lvResults.Columns.Add.Caption := 'Teste';
  lvResults.Columns.Add.Caption := 'Status';
  lvResults.Columns.Add.Caption := 'Tempo (ms)';
  lvResults.Columns.Add.Caption := 'Erro';
  
  // Ajustar larguras das colunas
  lvResults.Columns[0].Width := 150;
  lvResults.Columns[1].Width := 200;
  lvResults.Columns[2].Width := 80;
  lvResults.Columns[3].Width := 80;
  lvResults.Columns[4].Width := 300;
  
  SetupTestSuites;
  UpdateProgress('Pronto para executar testes');
end;

procedure TfrmTestRunner.FormDestroy(Sender: TObject);
begin
  FTestManager.Free;
end;

procedure TfrmTestRunner.SetupTestSuites;
begin
  // Adicionar suites de teste
  FTestManager.AddTestSuite(TEmpresaMigrationTests.Create);
  FTestManager.AddTestSuite(TEmpresaRepositoryTests.Create);
  FTestManager.AddTestSuite(TEmpresaServiceTests.Create);
  
  LogMessage(Format('Configuradas %d suites de teste', [FTestManager.TestSuites.Count]));
end;

procedure TfrmTestRunner.btnRunAllClick(Sender: TObject);
begin
  if FRunning then Exit;
  
  FRunning := True;
  EnableControls(False);
  btnClearResultsClick(nil);
  
  try
    UpdateProgress('Executando todos os testes...', 0);
    LogMessage('=== INICIANDO EXECUÇÃO DE TODOS OS TESTES ===');
    
    var StartTime := Now;
    
    // Executar em thread separada para não travar a UI
    TTask.Run(
      procedure
      var
        I, J: Integer;
        Suite: TTestSuite;
        TestResult: TTestResult;
        TotalTests, CurrentTest: Integer;
      begin
        try
          // Contar total de testes
          TotalTests := 0;
          for I := 0 to FTestManager.TestSuites.Count - 1 do
            Inc(TotalTests, FTestManager.TestSuites[I].GetTestCount);
          
          CurrentTest := 0;
          
          // Executar cada suite
          for I := 0 to FTestManager.TestSuites.Count - 1 do
          begin
            Suite := FTestManager.TestSuites[I];
            
            TThread.Synchronize(nil,
              procedure
              begin
                UpdateProgress(Format('Executando suite: %s', [Suite.SuiteName]), 
                  Round((CurrentTest / TotalTests) * 100));
                LogMessage(Format('Executando suite: %s', [Suite.SuiteName]));
              end);
            
            try
              Suite.RunAllTests;
              
              // Atualizar resultados na UI
              for J := 0 to Suite.Tests.Count - 1 do
              begin
                TestResult := Suite.Tests[J];
                Inc(CurrentTest);
                
                TThread.Synchronize(nil,
                  procedure
                  var
                    StatusStr: string;
                  begin
                    case TestResult.Status of
                      tsNotRun: StatusStr := 'Não Executado';
                      tsRunning: StatusStr := 'Executando';
                      tsPassed: StatusStr := 'Passou';
                      tsFailed: StatusStr := 'Falhou';
                      tsSkipped: StatusStr := 'Ignorado';
                    end;
                    
                    AddResultToList(Suite.SuiteName, TestResult.TestName, StatusStr,
                      TestResult.ExecutionTime, TestResult.ErrorMessage);
                      
                    UpdateProgress(Format('Teste: %s', [TestResult.TestName]), 
                      Round((CurrentTest / TotalTests) * 100));
                  end);
              end;
              
            except
              on E: Exception do
              begin
                TThread.Synchronize(nil,
                  procedure
                  begin
                    LogMessage(Format('Erro na suite %s: %s', [Suite.SuiteName, E.Message]));
                    AddResultToList(Suite.SuiteName, 'ERRO GERAL', 'Falhou', 0, E.Message);
                  end);
              end;
            end;
          end;
          
          var EndTime := Now;
          var TotalTime := MilliSecondsBetween(EndTime, StartTime);
          
          TThread.Synchronize(nil,
            procedure
            begin
              UpdateProgress('Testes concluídos', 100);
              LogMessage(Format('=== TESTES CONCLUÍDOS EM %dms ===', [TotalTime]));
              LogMessage(Format('Total de suites: %d', [FTestManager.TestSuites.Count]));
              
              var TotalTests := 0;
              var TotalPassed := 0;
              var TotalFailed := 0;
              var TotalSkipped := 0;
              
              for var Suite in FTestManager.TestSuites do
              begin
                Inc(TotalTests, Suite.GetTestCount);
                Inc(TotalPassed, Suite.GetPassedCount);
                Inc(TotalFailed, Suite.GetFailedCount);
                Inc(TotalSkipped, Suite.GetSkippedCount);
              end;
              
              LogMessage(Format('Resultados: %d testes | %d passou | %d falhou | %d ignorado',
                [TotalTests, TotalPassed, TotalFailed, TotalSkipped]));
            end);
          
        finally
          TThread.Synchronize(nil,
            procedure
            begin
              FRunning := False;
              EnableControls(True);
            end);
        end;
      end);
      
  except
    on E: Exception do
    begin
      LogMessage('Erro ao executar testes: ' + E.Message);
      FRunning := False;
      EnableControls(True);
    end;
  end;
end;

procedure TfrmTestRunner.btnRunMigrationClick(Sender: TObject);
begin
  RunTestsByType(ttMigration);
end;

procedure TfrmTestRunner.btnRunUnitClick(Sender: TObject);
begin
  RunTestsByType(ttUnit);
end;

procedure TfrmTestRunner.btnRunIntegrationClick(Sender: TObject);
begin
  RunTestsByType(ttIntegration);
end;

procedure TfrmTestRunner.btnRunPerformanceClick(Sender: TObject);
begin
  RunTestsByType(ttPerformance);
end;

procedure TfrmTestRunner.RunTestsByType(ATestType: TTestType);
var
  TypeName: string;
begin
  if FRunning then Exit;
  
  case ATestType of
    ttUnit: TypeName := 'Unitários';
    ttIntegration: TypeName := 'Integração';
    ttMigration: TypeName := 'Migração';
    ttPerformance: TypeName := 'Performance';
  end;
  
  FRunning := True;
  EnableControls(False);
  btnClearResultsClick(nil);
  
  try
    UpdateProgress(Format('Executando testes de %s...', [TypeName]), 0);
    LogMessage(Format('=== EXECUTANDO TESTES DE %s ===', [UpperCase(TypeName)]));
    
    FTestManager.RunSuitesByType(ATestType);
    
    UpdateProgress(Format('Testes de %s concluídos', [TypeName]), 100);
    LogMessage(Format('=== TESTES DE %s CONCLUÍDOS ===', [UpperCase(TypeName)]));
    
  finally
    FRunning := False;
    EnableControls(True);
  end;
end;

procedure TfrmTestRunner.btnGenerateReportClick(Sender: TObject);
var
  SaveDialog: TSaveDialog;
  FileName: string;
begin
  SaveDialog := TSaveDialog.Create(nil);
  try
    SaveDialog.Filter := 'Arquivos de Texto (*.txt)|*.txt|Todos os Arquivos (*.*)|*.*';
    SaveDialog.DefaultExt := 'txt';
    SaveDialog.FileName := Format('relatorio_testes_%s.txt', 
      [FormatDateTime('yyyymmdd_hhnnss', Now)]);
    
    if SaveDialog.Execute then
    begin
      FileName := SaveDialog.FileName;
      
      try
        FTestManager.GenerateConsolidatedReport(FileName);
        LogMessage('Relatório gerado: ' + FileName);
        ShowMessage('Relatório gerado com sucesso em: ' + FileName);
      except
        on E: Exception do
        begin
          LogMessage('Erro ao gerar relatório: ' + E.Message);
          ShowMessage('Erro ao gerar relatório: ' + E.Message);
        end;
      end;
    end;
  finally
    SaveDialog.Free;
  end;
end;

procedure TfrmTestRunner.btnClearResultsClick(Sender: TObject);
begin
  lvResults.Items.Clear;
  memoLog.Clear;
  progressBar.Position := 0;
  UpdateProgress('Resultados limpos');
end;

procedure TfrmTestRunner.lvResultsDblClick(Sender: TObject);
var
  Item: TListItem;
  Details: string;
begin
  if lvResults.Selected <> nil then
  begin
    Item := lvResults.Selected;
    Details := Format('Suite: %s'#13#10'Teste: %s'#13#10'Status: %s'#13#10'Tempo: %s ms'#13#10'Erro: %s',
      [Item.Caption, Item.SubItems[0], Item.SubItems[1], Item.SubItems[2], Item.SubItems[3]]);
    
    ShowMessage(Details);
  end;
end;

procedure TfrmTestRunner.UpdateProgress(const AMessage: string; AProgress: Integer);
begin
  lblStatus.Caption := AMessage;
  
  if AProgress >= 0 then
    progressBar.Position := AProgress;
    
  Application.ProcessMessages;
end;

procedure TfrmTestRunner.AddResultToList(const ASuiteName, ATestName, AStatus: string;
  AExecutionTime: Cardinal; const AError: string);
var
  Item: TListItem;
begin
  Item := lvResults.Items.Add;
  Item.Caption := ASuiteName;
  Item.SubItems.Add(ATestName);
  Item.SubItems.Add(AStatus);
  Item.SubItems.Add(IntToStr(AExecutionTime));
  Item.SubItems.Add(AError);
  
  // Colorir baseado no status
  if AStatus = 'Passou' then
    Item.ImageIndex := 0  // Verde
  else if AStatus = 'Falhou' then
    Item.ImageIndex := 1  // Vermelho
  else
    Item.ImageIndex := 2; // Amarelo
    
  lvResults.Scroll(0, Item.Index * lvResults.ItemHeight);
end;

procedure TfrmTestRunner.LogMessage(const AMessage: string);
begin
  memoLog.Lines.Add(Format('[%s] %s', [FormatDateTime('hh:nn:ss', Now), AMessage]));
  
  // Scroll para o final
  memoLog.SelStart := Length(memoLog.Text);
  memoLog.SelLength := 0;
  SendMessage(memoLog.Handle, EM_SCROLLCARET, 0, 0);
end;

procedure TfrmTestRunner.EnableControls(AEnabled: Boolean);
begin
  btnRunAll.Enabled := AEnabled;
  btnRunMigration.Enabled := AEnabled;
  btnRunUnit.Enabled := AEnabled;
  btnRunIntegration.Enabled := AEnabled;
  btnRunPerformance.Enabled := AEnabled;
  btnGenerateReport.Enabled := AEnabled;
end;

end.