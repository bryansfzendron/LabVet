unit Cobranca;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, Buttons, StdCtrls, Mask, ToolEdit, Grids, DBGrids, DB, RxLookup,
  DBTables, ExtCtrls, DateUtils;

type
  TFrmCobranca = class(TForm)
    Panel1: TPanel;
    Panel2: TPanel;
    Panel3: TPanel;
    QryCliente: TQuery;
    QryContas: TQuery;
    DSCliente: TDataSource;
    DSContas: TDataSource;
    Label1: TLabel;
    RxDBLookupCombo1: TRxDBLookupCombo;
    QryContasCODSEQCONTAS: TAutoIncField;
    QryContasTIPOACAO: TStringField;
    QryContasDESCRICAO: TStringField;
    QryContasQTDEPARC: TIntegerField;
    QryContasNUMPARC: TIntegerField;
    QryContasDTEMISSAO: TDateTimeField;
    QryContasDTVENC: TDateTimeField;
    QryContasDTPGTO: TDateTimeField;
    QryContasVLCALCULADO: TFloatField;
    QryContasVLDESCONTO: TFloatField;
    QryContasVLFATURA: TFloatField;
    QryContasVLPGTO: TFloatField;
    QryContasCODCLIENTE: TIntegerField;
    QryContasCODFORN: TIntegerField;
    QryContasCONFERIDO: TIntegerField;
    QryContasNDOCTIT: TStringField;
    QryContasATIVO: TStringField;
    QryContasCODBANCO: TIntegerField;
    QryContasTIPOCADASTRO: TStringField;
    QryContasDESCR: TStringField;
    QryFatura: TQuery;
    DSExames: TDataSource;
    QryFaturaCodMovPedido: TAutoIncField;
    QryFaturaCodigoInterno: TStringField;
    QryFaturaCodigoPedido: TIntegerField;
    QryFaturaSenha: TStringField;
    QryFaturaCodCliente: TIntegerField;
    QryFaturaCodEspecie: TIntegerField;
    QryFaturaCodProfSolic: TIntegerField;
    QryFaturaCodProfLaudo: TIntegerField;
    QryFaturaAssinaturaScanner: TStringField;
    QryFaturaDataPedido: TDateTimeField;
    QryFaturaHoraPedido: TStringField;
    QryFaturaDataEnvio: TDateTimeField;
    QryFaturaValorTotal: TFloatField;
    QryFaturaPago: TStringField;
    QryFaturaFormadeEnvio: TStringField;
    QryFaturaRetirar: TStringField;
    QryFaturaRetirado: TStringField;
    QryFaturaContato: TStringField;
    QryFaturaStatus: TStringField;
    QryFaturaCodSeqContas: TIntegerField;
    QryFaturaNomeAnimal: TStringField;
    QryFaturaProprietario: TStringField;
    QryFaturaIdade: TStringField;
    QryFaturaSexoAnimal: TStringField;
    QryFaturaDataLiberacao: TDateTimeField;
    QryFaturaRaca: TStringField;
    QryFaturaCodMovExames: TAutoIncField;
    QryFaturaCodMovPedido_1: TIntegerField;
    QryFaturaCodExame: TIntegerField;
    QryFaturaDataProvResultado: TDateTimeField;
    QryFaturaDataResultado: TDateTimeField;
    QryFaturaValor: TFloatField;
    QryFaturaObservacao: TMemoField;
    QryFaturaCodEspecie_1: TIntegerField;
    QryFaturaNomeExame: TStringField;
    QryFaturaNomeExameReduz: TStringField;
    QryFaturaDias_Elaboracao_Exame: TIntegerField;
    QryFaturaImprimirSeparado: TStringField;
    QryFaturaMetodo: TStringField;
    QryFaturaMaterial: TStringField;
    QryFaturaLiberado: TStringField;
    QryContasCodCliente_1: TAutoIncField;
    QryContasNome: TStringField;
    QryContasEndereco: TStringField;
    QryContasnumero: TStringField;
    QryContasCompl: TStringField;
    QryContasBairro: TStringField;
    QryContasCEP: TStringField;
    QryContasCidade: TStringField;
    QryContasUF: TStringField;
    QryContasTelefone: TStringField;
    QryContasFax: TStringField;
    QryContasCelular: TStringField;
    QryContasemail: TStringField;
    QryContascpf_cgc: TStringField;
    QryContasContato: TStringField;
    QryContasDataCadastro: TDateTimeField;
    QryContasRestricao: TStringField;
    QryContasDataAtualizacao: TDateTimeField;
    QryContasAtivo_1: TStringField;
    QryContasCodVetResp: TIntegerField;
    Panel4: TPanel;
    Panel5: TPanel;
    DBGrid1: TDBGrid;
    DBGrid2: TDBGrid;
    Dti: TDateEdit;
    Dtf: TDateEdit;
    Label2: TLabel;
    Label3: TLabel;
    BbtnPesquisar: TBitBtn;
    SBImprimir: TSpeedButton;
    SBFechar: TSpeedButton;
    QryContasCodRespProf: TIntegerField;
    QryContasCodProfLaudo: TAutoIncField;
    QryContasAbrevConselho: TStringField;
    QryContasNumConselho: TStringField;
    QryContasNomeProfLaudo: TStringField;
    QryContasUF_1: TStringField;
    QryContasAssinatura: TBlobField;
    QryContasAtivo_2: TStringField;
    QryContasFuncao: TStringField;
    QryClientecodcliente: TAutoIncField;
    QryClientenome: TStringField;
    QryClienteCOLUMN3: TIntegerField;
    RadioGroup1: TRadioGroup;
    procedure SBFecharClick(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure SBImprimirClick(Sender: TObject);
    procedure RadioGroup1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
    wacao : integer;
  end;

var
  FrmCobranca: TFrmCobranca;

implementation

uses DM_LABVET, RelCobranca, RelDesconto;

{$R *.dfm}

procedure TFrmCobranca.SBFecharClick(Sender: TObject);
begin
   close;
end;

procedure TFrmCobranca.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
    Release;
    FrmCobranca := nil;
end;

procedure TFrmCobranca.FormCreate(Sender: TObject);
begin
   QryCliente.Close;
   QryCliente.Active := True;
   IF wacao = 1 then
      FrmCobranca.Caption := 'Relatório de Cobrança';
   IF wacao = 2 then
      FrmCobranca.Caption := 'Relatório de Valores Apurados e Descontos.';

      //   QryFatura.Active := True;
   dti.Date := incday(now,-45);
   dtf.Date := incday(now,15);
end;

procedure TFrmCobranca.BbtnPesquisarClick(Sender: TObject);
begin
   IF wacao = 1 then
      IF RxDBLookupCombo1.KeyValue < 0 then
      Begin
          ShowMessage('Selecione uma Clínica ');
          RxDBLookupCombo1.SetFocus;
          Exit;
      end;
   IF dti.Date > dtf.Date then
   Begin
      ShowMessage('Data Final maior que Data Inicial');
      Dti.SetFocus;
      exit;
   end;
   QryContas.Close;
   QryContas.SQL.Clear;
   QryContas.SQL.Add(' Select * ');
   QryContas.SQL.Add(' From Contas C ');
   QryContas.SQL.Add('          Inner Join Cliente Cl on c.codcliente = cl.codcliente ');
   QryContas.SQL.Add('          Left Join ProfissionalLaudo pl on c.codrespProf = pl.CodProfLaudo ');
   QryContas.SQL.Add(' Where (C.CodCliente = :CodCliente or :CodCliente = -1)   ');
   QryContas.SQL.Add('            and dtvenc between :dti and :dtf  ');
   IF radiogroup1.ItemIndex = 0 then
     QryContas.SQL.Add('            and (vlpgto is null or vlpgto < 0)');
   IF radiogroup1.ItemIndex = 1 then
     QryContas.SQL.Add('            and vlpgto > 0 ');

   QryContas.SQL.Add(' Order by nome, dtvenc   ');
   
   if RxDBLookupCombo1.KeyValue < 0 then
      QryContas.ParamByName('CodCliente').Value := -1
   else
      QryContas.ParamByName('CodCliente').Value := RxDBLookupCombo1.KeyValue;

   QryContas.ParamByName('dti').Value := dti.Date;
   QryContas.ParamByName('dtf').Value := Dtf.Date;
   QryContas.Active := true;
   IF QryContas.Eof then
   begin
      SBImprimir.Enabled := False;
     Qryfatura.Close;
   end
   else
   begin
      SBImprimir.Enabled := True;
      Qryfatura.Close;
      QryFatura.Active := True;
   end;
end;

procedure TFrmCobranca.SBImprimirClick(Sender: TObject);
var
  aa,mm,dd : word;
begin
   IF wacao = 1 then
   begin
     IF FrmRelCobranca = nil then
       FrmRelCobranca  := TFrmRelCobranca.Create(Self);
     if Application.MessageBox('Deseja Imprimir o Cabeçario ? ',
         'Confirme', 4  + MB_ICONQUESTION)= idYes then
     begin
        FrmRelCobranca.QRDBImageEsquerda.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText5.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText6.DataSet := DMLABVET.QryEmpresa;
//        FrmRelCobranca.QRDBText3.DataSet := DMLABVET.QryEmpresa;

        FrmRelCobranca.QRDBText28.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText29.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText30.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText35.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText37.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText38.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText39.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText40.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.QRDBText6.DataSet := DMLABVET.QryEmpresa;
        FrmRelCobranca.qRlaBEL17.Caption := 'Fone:';
        FrmRelCobranca.qRlaBEL22.Caption := 'CNPJ';
        FrmRelCobranca.qRlaBEL18.Caption := 'HEMATOLOGIA -  HEMOSTASIA - BIOQUÍMICA URINÁLISE -  ANÁLISE  DE';
        FrmRelCobranca.qRlaBEL19.Caption := 'FLUÍDOS CORPÓREOS - PARASITOLOGIA - MICROBIOLOGIA - TOXICOLOGIA';
        FrmRelCobranca.qRlaBEL20.Caption := 'BIOLOGIA MOLECULAR (PCR) - SOROLOGIA -ENDOCRINOLOGIA -CITOLOGIA';
        FrmRelCobranca.qRlaBEL21.Caption := 'HISTOPATOLOGIA - MIELOGRAMA';
        FrmRelCobranca.QRShape1.Width := 761;
        FrmRelCobranca.QRShape3.Width := 506;
        FrmRelCobranca.QRShape4.Width := 506;


     end
     else
     begin
        FrmRelCobranca.QRDBImageEsquerda.DataSet := nil;
        FrmRelCobranca.QRDBText5.DataSet := nil;
        FrmRelCobranca.QRDBText6.DataSet := nil;
        FrmRelCobranca.QRDBText28.DataSet := nil;
        FrmRelCobranca.QRDBText29.DataSet := nil;
        FrmRelCobranca.QRDBText30.DataSet := nil;
        FrmRelCobranca.QRDBText35.DataSet := nil;
        FrmRelCobranca.QRDBText37.DataSet := nil;
        FrmRelCobranca.QRDBText38.DataSet := nil;
        FrmRelCobranca.QRDBText39.DataSet := nil;
        FrmRelCobranca.QRDBText40.DataSet := nil;
        FrmRelCobranca.QRDBText6.DataSet := nil;;
        FrmRelCobranca.qRlaBEL17.Caption := '';
        FrmRelCobranca.qRlaBEL18.Caption := '';
        FrmRelCobranca.qRlaBEL19.Caption := '';
        FrmRelCobranca.qRlaBEL20.Caption := '';
        FrmRelCobranca.qRlaBEL22.Caption := '';
        FrmRelCobranca.qRlaBEL21.Caption := '';
        FrmRelCobranca.QRShape1.Width := 0;
        FrmRelCobranca.QRShape3.Width := 0;
        FrmRelCobranca.QRShape4.Width := 0;

        //        FrmRelCobranca.QRDBText20.DataSet := nil;

     end;
     decodedate(now,aa,mm,dd);
     FrmRelCobranca.QRLabel13.Caption := 'Presidente Prudente, '+inttostr(dd);
     IF mm = 1 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Janeiro de '+inttostr(aa);
     IF mm = 2 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Fevereiro de '+inttostr(aa);
     IF mm = 3 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Março de '+inttostr(aa);
     IF mm = 4 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Abril de '+inttostr(aa);
     IF mm = 5 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Maio de '+inttostr(aa);
     IF mm = 6 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Junho de '+inttostr(aa);
     IF mm = 7 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Julho de '+inttostr(aa);
     IF mm = 8 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Agosto de '+inttostr(aa);
     IF mm = 9 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Setembro de '+inttostr(aa);
     IF mm = 10 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Outubro de '+inttostr(aa);
     IF mm = 11 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Novembro de '+inttostr(aa);
     IF mm = 12 then
        FrmRelCobranca.QRLabel13.Caption := FrmRelCobranca.QRLabel13.Caption+' Dezembro de '+inttostr(aa);

      FrmRelCobranca.QuickRep1.Preview;
      FrmRelCobranca.Close;
      BbtnPesquisar.Click;
   end;
   //////////////////
   IF wacao = 2 then
   begin
     IF FrmRelDesconto = nil then
       FrmRelDesconto  := TFrmRelDesconto.Create(Self);
     FrmRelDesconto.QryContas.Close;

     FrmRelDesconto.QryContas.SQL.Clear;
     FrmRelDesconto.QryContas.SQL.Add(' Select * ');
     FrmRelDesconto.QryContas.SQL.Add(' From Contas C ');
     FrmRelDesconto.QryContas.SQL.Add('          Inner Join Cliente Cl on c.codcliente = cl.codcliente ');
     FrmRelDesconto.QryContas.SQL.Add('          Left Join ProfissionalLaudo pl on c.codrespProf = pl.CodProfLaudo ');
     FrmRelDesconto.QryContas.SQL.Add(' Where (C.CodCliente = :CodCliente or :CodCliente = -1)   ');
     FrmRelDesconto.QryContas.SQL.Add('            and dtvenc between :dti and :dtf  ');
     IF radiogroup1.ItemIndex = 0 then
        FrmRelDesconto.QryContas.SQL.Add('            and (vlpgto is null or vlpgto < 0)');
     IF radiogroup1.ItemIndex = 1 then
        FrmRelDesconto.QryContas.SQL.Add('            and vlpgto > 0 ');

     FrmRelDesconto.QryContas.SQL.Add(' Order by nome, dtvenc   ');


   if RxDBLookupCombo1.KeyValue < 0 then
      FrmRelDesconto.QryContas.ParamByName('CodCliente').Value := -1
   else
      FrmRelDesconto.QryContas.ParamByName('CodCliente').Value := RxDBLookupCombo1.KeyValue;

   FrmRelDesconto.QryContas.ParamByName('dti').Value := dti.Date;
   FrmRelDesconto.QryContas.ParamByName('dtf').Value := Dtf.Date;
   FrmRelDesconto.QryContas.Active := true;
///////////////////
     if Application.MessageBox('Deseja Imprimir o Cabeçario ? ',
         'Confirme', 4  + MB_ICONQUESTION)= idYes then
     begin
        FrmRelDesconto.QRDBImageEsquerda.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText5.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText6.DataSet := DMLABVET.QryEmpresa;
//        FrmRelCobranca.QRDBText3.DataSet := DMLABVET.QryEmpresa;

        FrmRelDesconto.QRDBText28.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText29.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText30.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText35.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText37.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText38.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText39.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText40.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.QRDBText6.DataSet := DMLABVET.QryEmpresa;
        FrmRelDesconto.qRlaBEL17.Caption := 'Fone:';
        FrmRelDesconto.qRlaBEL22.Caption := 'CNPJ';
        FrmRelDesconto.qRlaBEL18.Caption := 'HEMATOLOGIA -  HEMOSTASIA - BIOQUÍMICA URINÁLISE -  ANÁLISE  DE';
        FrmRelDesconto.qRlaBEL19.Caption := 'FLUÍDOS CORPÓREOS - PARASITOLOGIA - MICROBIOLOGIA - TOXICOLOGIA';
        FrmRelDesconto.qRlaBEL20.Caption := 'BIOLOGIA MOLECULAR (PCR) - SOROLOGIA -ENDOCRINOLOGIA -CITOLOGIA';
        FrmRelDesconto.qRlaBEL21.Caption := 'HISTOPATOLOGIA - MIELOGRAMA';
        FrmRelDesconto.QRShape1.Width := 761;
        FrmRelDesconto.QRShape3.Width := 506;
        FrmRelDesconto.QRShape4.Width := 506;


     end
     else
     begin
        FrmRelDesconto.QRDBImageEsquerda.DataSet := nil;
        FrmRelDesconto.QRDBText5.DataSet := nil;
        FrmRelDesconto.QRDBText6.DataSet := nil;
        FrmRelDesconto.QRDBText28.DataSet := nil;
        FrmRelDesconto.QRDBText29.DataSet := nil;
        FrmRelDesconto.QRDBText30.DataSet := nil;
        FrmRelDesconto.QRDBText35.DataSet := nil;
        FrmRelDesconto.QRDBText37.DataSet := nil;
        FrmRelDesconto.QRDBText38.DataSet := nil;
        FrmRelDesconto.QRDBText39.DataSet := nil;
        FrmRelDesconto.QRDBText40.DataSet := nil;
        FrmRelDesconto.QRDBText6.DataSet := nil;;
        FrmRelDesconto.qRlaBEL17.Caption := '';
        FrmRelDesconto.qRlaBEL18.Caption := '';
        FrmRelDesconto.qRlaBEL19.Caption := '';
        FrmRelDesconto.qRlaBEL20.Caption := '';
        FrmRelDesconto.qRlaBEL22.Caption := '';
        FrmRelDesconto.qRlaBEL21.Caption := '';
        FrmRelDesconto.QRShape1.Width := 0;
        FrmRelDesconto.QRShape3.Width := 0;
        FrmRelDesconto.QRShape4.Width := 0;

        //        FrmRelCobranca.QRDBText20.DataSet := nil;

     end;
     decodedate(now,aa,mm,dd);
     FrmRelDesconto.QRLabel13.Caption := 'Presidente Prudente, '+inttostr(dd);
     IF mm = 1 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Janeiro de '+inttostr(aa);
     IF mm = 2 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Fevereiro de '+inttostr(aa);
     IF mm = 3 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Março de '+inttostr(aa);
     IF mm = 4 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Abril de '+inttostr(aa);
     IF mm = 5 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Maio de '+inttostr(aa);
     IF mm = 6 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Junho de '+inttostr(aa);
     IF mm = 7 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Julho de '+inttostr(aa);
     IF mm = 8 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Agosto de '+inttostr(aa);
     IF mm = 9 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Setembro de '+inttostr(aa);
     IF mm = 10 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Outubro de '+inttostr(aa);
     IF mm = 11 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Novembro de '+inttostr(aa);
     IF mm = 12 then
        FrmRelDesconto.QRLabel13.Caption := FrmRelDesconto.QRLabel13.Caption+' Dezembro de '+inttostr(aa);

      FrmRelDesconto.QuickRep1.Preview;
      FrmRelDesconto.Close;
      BbtnPesquisar.Click;
   end;





end;

procedure TFrmCobranca.RadioGroup1Click(Sender: TObject);
begin
   QryCliente.Close;
   QryCliente.SQL.Clear;
   QryCliente.SQL.add(' Select cl.codcliente, cl.nome, count(*) ');
   QryCliente.SQL.add('From Contas C                              ');
   QryCliente.SQL.add('         Inner Join Cliente Cl on c.codcliente = cl.codcliente ');
   QryCliente.SQL.add('         Left Join ProfissionalLaudo pl on c.codrespProf = pl.CodProfLaudo ');
   IF RadioGroup1.ItemIndex = 0 then
      QryCliente.SQL.add('Where C.DtPgto is null ');
   IF RadioGroup1.ItemIndex = 1 then
      QryCliente.SQL.add('Where C.DtPgto is not null ');

   QryCliente.SQL.add('Group By Cl.codCliente, cl.nome ');
   QryCliente.SQL.add('Order by cl.Nome ');
   QryCliente.Active := True;
   QryContas.Close;
//   Qryfatura.Close;
//   QryFatura.Active := True;





end;

end.
