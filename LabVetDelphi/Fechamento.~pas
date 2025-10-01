unit Fechamento;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, Grids, DBGrids, ComCtrls, StdCtrls, Mask,
  ToolEdit, RxLookup, Buttons, DateUtils, ExtCtrls, CheckLst, DBCtrls, CurrEdit,
  RXDBCtrl;

type
  TFrmFechamento = class(TForm)
    Panel1: TPanel;
    Label9: TLabel;
    BbtnPesquisar: TBitBtn;
    RxDBLookupCombo2: TRxDBLookupCombo;
    GroupBox2: TGroupBox;
    Label23: TLabel;
    Dtf: TDateEdit;
    Panel2: TPanel;
    PageControl1: TPageControl;
    TabSheet1: TTabSheet;
    TabSheet2: TTabSheet;
    Panel3: TPanel;
    BBtnIncluir: TBitBtn;
    BBtnFechat: TBitBtn;
    QryCliente: TQuery;
    DSClinica: TDataSource;
    Panel4: TPanel;
    Panel6: TPanel;
    CheckBox1: TCheckBox;
    StatusBar1: TStatusBar;
    CheckListBox1: TCheckListBox;
    Label2: TLabel;
    QryFechamento: TQuery;
    DSFechamento: TDataSource;
    QryFechamentoCodMovPedido: TAutoIncField;
    QryFechamentoCodigoInterno: TStringField;
    QryFechamentoCodigoPedido: TIntegerField;
    QryFechamentoSenha: TStringField;
    QryFechamentoCodCliente: TIntegerField;
    QryFechamentoCodEspecie: TIntegerField;
    QryFechamentoCodProfSolic: TIntegerField;
    QryFechamentoCodProfLaudo: TIntegerField;
    QryFechamentoAssinaturaScanner: TStringField;
    QryFechamentoDataPedido: TDateTimeField;
    QryFechamentoHoraPedido: TStringField;
    QryFechamentoDataEnvio: TDateTimeField;
    QryFechamentoValorTotal: TFloatField;
    QryFechamentoPago: TStringField;
    QryFechamentoFormadeEnvio: TStringField;
    QryFechamentoRetirar: TStringField;
    QryFechamentoRetirado: TStringField;
    QryFechamentoContato: TStringField;
    QryFechamentoStatus: TStringField;
    QryFechamentoCodSeqContas: TIntegerField;
    QryFechamentoNomeAnimal: TStringField;
    QryFechamentoProprietario: TStringField;
    QryFechamentoIdade: TStringField;
    QryFechamentoSexoAnimal: TStringField;
    QryFechamentoCodMovExames: TAutoIncField;
    QryFechamentoCodMovPedido_1: TIntegerField;
    QryFechamentoCodExame: TIntegerField;
    QryFechamentoDataProvResultado: TDateTimeField;
    QryFechamentoDataResultado: TDateTimeField;
    QryFechamentoValor: TFloatField;
    QryFechamentoObservacao: TMemoField;
    QryFechamentoCodEspecie_1: TIntegerField;
    QryFechamentoNomeExame: TStringField;
    QryFechamentoNomeExameReduz: TStringField;
    QryFechamentoDias_Elaboracao_Exame: TIntegerField;
    QryFechamentoImprimirSeparado: TStringField;
    QryFechamentoMetodo: TStringField;
    QryFechamentoMaterial: TStringField;
    QryFechamentoLiberado: TStringField;
    Label1: TLabel;
    Label3: TLabel;
    Label4: TLabel;
    Label5: TLabel;
    Label6: TLabel;
    Label7: TLabel;
    QryContas: TQuery;
    UpdateSQL1: TUpdateSQL;
    DsContas: TDataSource;
    QryContasCODSEQCONTAS: TAutoIncField;
    QryContasTIPOACAO: TStringField;
    QryContasDESCRICAO: TStringField;
    QryContasQTDEPARC: TIntegerField;
    QryContasNUMPARC: TIntegerField;
    QryContasDTEMISSAO: TDateTimeField;
    QryContasDTVENC: TDateTimeField;
    QryContasDTPGTO: TDateTimeField;
    QryContasVLFATURA: TFloatField;
    QryContasVLDESCONTO: TFloatField;
    QryContasVLPGTO: TFloatField;
    QryContasCODCLIENTE: TIntegerField;
    QryContasCODFORN: TIntegerField;
    QryContasCONFERIDO: TIntegerField;
    QryContasNDOCTIT: TStringField;
    QryContasATIVO: TStringField;
    QryContasCODBANCO: TIntegerField;
    QryContasTIPOCADASTRO: TStringField;
    QryContasDESCR: TStringField;
    Panel5: TPanel;
    Panel8: TPanel;
    BitBtn1: TBitBtn;
    BbtnCancelar: TBitBtn;
    Label8: TLabel;
    DBEdit1: TDBEdit;
    Label10: TLabel;
    QryContasVLCAlCULADO: TFloatField;
    Label15: TLabel;
    DBDateEdit1: TDBDateEdit;
    DBDateEdit2: TDBDateEdit;
    Label16: TLabel;
    RxDBCalcEdit1: TRxDBCalcEdit;
    Label11: TLabel;
    RxDBCalcEdit2: TRxDBCalcEdit;
    Label17: TLabel;
    RxDBCalcEdit3: TRxDBCalcEdit;
    SP_FATURA_EXAMES: TStoredProc;
    Label12: TLabel;
    DBEdit2: TDBEdit;
    Label13: TLabel;
    DBEdit3: TDBEdit;
    SPContas: TStoredProc;
    QryBanco: TQuery;
    DSBanco: TDataSource;
    QryBancoCODBANCO: TAutoIncField;
    QryBancoNUMBANCO: TStringField;
    QryBancoNOMEBANCO: TStringField;
    QryBancoNUMAGENCIA: TStringField;
    QryBancoNOMEAGENCIA: TStringField;
    QryBancoNUMCONTA: TStringField;
    QryBancoATIVO: TStringField;
    RxDBLookupCombo1: TRxDBLookupCombo;
    Label14: TLabel;
    Label18: TLabel;
    RxDBLookupCombo3: TRxDBLookupCombo;
    QryProfResp: TQuery;
    DsProfResp: TDataSource;
    QryProfRespCodProfLaudo: TAutoIncField;
    QryProfRespAbrevConselho: TStringField;
    QryProfRespNumConselho: TStringField;
    QryProfRespNomeProfLaudo: TStringField;
    QryProfRespUF: TStringField;
    QryProfRespAssinatura: TBlobField;
    QryProfRespAtivo: TStringField;
    QryContasCodRespProf: TIntegerField;
    QryClienteCodCliente: TAutoIncField;
    QryClientenome: TStringField;
    QryClienteteste: TIntegerField;
    QryFechamentoDataLiberacao: TDateTimeField;
    QryFechamentoRaca: TStringField;
    DsDesconto: TDataSource;
    QryDesconto: TQuery;
    QryDescontoCODDESCONTO: TAutoIncField;
    QryDescontoNome: TStringField;
    QryDescontoValorInicial: TFloatField;
    QryDescontoValorFinal: TFloatField;
    QryDescontoDesconto: TFloatField;
    QryDescontoAtivo: TStringField;
    QryContasCODDESCONTO: TIntegerField;
    Label19: TLabel;
    RxDBLookupCombo4: TRxDBLookupCombo;
    Label20: TLabel;
    RxCalcEdit1: TRxCalcEdit;
    Label21: TLabel;
    Label22: TLabel;
    procedure BBtnFechatClick(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure CheckBox1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure BBtnIncluirClick(Sender: TObject);
    procedure RxDBCalcEdit2Change(Sender: TObject);
    procedure BitBtn1Click(Sender: TObject);
    procedure BbtnCancelarClick(Sender: TObject);
    procedure CheckListBox1Click(Sender: TObject);
    procedure RxDBLookupCombo4Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmFechamento: TFrmFechamento;

implementation

{$R *.dfm}

procedure TFrmFechamento.BBtnFechatClick(Sender: TObject);
begin
   Close;
end;

procedure TFrmFechamento.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
   Release;
   FrmFechamento := nil;
end;

procedure TFrmFechamento.BbtnPesquisarClick(Sender: TObject);
begin
   QryFechamento.Close;
   QryFechamento.SQL.Clear;
   QryFechamento.SQL.Add (' Select * ');
   QryFechamento.SQL.Add ('From MovPedido MP ');
   QryFechamento.SQL.Add ('     Inner Join MovExames M On mp.codmovpedido = m.codmovpedido ');
   QryFechamento.SQL.Add ('Where ');
   QryFechamento.SQL.Add ('   Mp.CodCliente = :CodCliente ');
   QryFechamento.SQL.Add ('and                 ');
   QryFechamento.SQL.Add ('   Mp.datapedido <= :dtf ');
   QryFechamento.SQL.Add ('and                      ');
   QryFechamento.SQL.Add ('   Mp.CodSeqContas is null ');
   QryFechamento.SQL.Add ('order by CodigoPedido ');
   QryFechamento.Close;
   QryFechamento.ParamByName('CodCliente').Value := RxDBLookupCombo2.KeyValue;
   QryFechamento.ParamByName('dtf').Value := dtf.Date;
   Qryfechamento.Active := true;
   label2.Caption := QryClienteNome.Value;
   IF QryFechamento.Eof then
   begin
      ShowMessage('No Perido selecionado e para Este cliente, não Existe Lancamentos...');
      BbtnIncluir.Enabled := False;
      checkbox1.Enabled := False;
   end
   else
   begin
      checkbox1.Enabled := True;
      BbtnIncluir.Enabled := True;
      CheckListBox1.Items.Clear;
      While not Qryfechamento.Eof do
      begin
         CheckListBox1.Items.Add(' '+copy(inttostr(QryFechamentoCodMovPedido.Value)+'          ',1,10)+
                                 copy(inttostr(QryFechamentoCodigoPedido.Value)+'          ',1,10)+
                                 copy(QryFechamentoNomeAnimal.Value+'                              ',1,30)+'  '+
                                 copy(QryFechamentoNomeExame.Value+'                                        ',1,40)+
                                 copy(datetostr(QryFechamentoDatapedido.Value)+'    ',1,10)+'   '+Formatfloat('#0.00',QryFechamentoValor.Value)
         );
         QryFechamento.Next;
      end;
      CheckBox1.Checked := False;
      CheckBox1.Checked := True;
//      CheckBox1.Enabled := False;
   end;

end;

procedure TFrmFechamento.FormActivate(Sender: TObject);
begin
   QryCliente.Active := False;
   QryCliente.Active := True;
   QryBanco.Active := False;
   QryBanco.Active := True;
   QryProfResp.Active := False;
   QryProfResp.Active := True;
   QryFechamento.Active := False;
   QryDesconto.Active := False;
   QryDesconto.Active := True;
   checklistbox1.Items.Clear;

end;

procedure TFrmFechamento.CheckBox1Click(Sender: TObject);
Var
   i, total: integer;
begin
  total:= Checklistbox1.Items.Capacity - 1;
   if Checkbox1.Checked then
   begin
      CheckListBox1.Enabled := false;
      for i := 0 to total do
      begin
         checklistbox1.Checked[i] := true;
      end;
   end
   else
   begin
      CheckListBox1.Enabled := true;
      for i := 0 to total do
      begin
         checklistbox1.Checked[i] := false;
      end;
   end;


end;

procedure TFrmFechamento.FormCreate(Sender: TObject);
begin
   TabSheet1.TabVisible := False;
   TabSheet2.TabVisible := False;
   PageControl1.ActivePage := TabSheet1;
   BbtnIncluir.Enabled := False;
   BbtnIncluir.Caption := 'Gravar'+#13+'Contas no Receber';
   dtf.Date := now;
   Checkbox1.Enabled := True;
end;

procedure TFrmFechamento.BBtnIncluirClick(Sender: TObject);
var
   total, i, CodDesconto : integer;
   vltotal : double;
   ok : boolean;
begin
   QryContas.Active := True;
   panel1.Enabled := false;
   ok := false;
   IF checkbox1.Checked then
   begin
      total:= Checklistbox1.Items.Capacity - 1;
      for i := 0 to total do
      begin
         if checklistbox1.Checked[i] then
            ok := True;
      end;
   end
   else
   begin
       QryFechamento.Close;
       QryFechamento.SQL.Clear;
       QryFechamento.SQL.Add (' Select * ');
       QryFechamento.SQL.Add ('From MovPedido MP ');
       QryFechamento.SQL.Add ('     Inner Join MovExames M On mp.codmovpedido = m.codmovpedido ');
       QryFechamento.SQL.Add ('Where ');
//       QryFechamento.SQL.Add ('   Mp.CodCliente = :CodCliente ');
//       QryFechamento.SQL.Add ('and                 ');
//       QryFechamento.SQL.Add ('   Mp.datapedido <= :dtf ');
//       QryFechamento.SQL.Add ('and                      ');
       QryFechamento.SQL.Add ('   Mp.CodSeqContas is null ');
       QryFechamento.SQL.Add ('and (                      ');
//////
       ok := false;
       total:= Checklistbox1.Items.Capacity - 1;
       for i := 0 to total do
       begin
          if checklistbox1.Checked[i] then
          begin
             if not ok then
             begin
                QryFechamento.SQL.Add (' m.CodMovPedido = '+trim(copy(checkListBox1.Items.ValueFromIndex[i],1,9)));
                ok := True;
             end
             else
             begin
                QryFechamento.SQL.Add (' or m.CodMovPedido = '+trim(copy(checkListBox1.Items.ValueFromIndex[i],1,9)));
             end;
          end;
       end;
       QryFechamento.SQL.Add ('  )                    ');
       QryFechamento.SQL.Add ('order by CodigoPedido ');
       QryFechamento.Active := True;
   end;
   If Not Ok then
   begin
      ShowMessage('Nenhuma dos Exames para Cobrança foi Selecionada...');
      panel1.Enabled := True;
   end
   else
   begin
      PageControl1.ActivePage := TabSheet2;
      QryContas.Insert;
      QryContasQtdePArc.Value := 1;
      QryContasNumParc.Value := 1;
      QryContasTipoAcao.Value := 'R';
      QryContasDtEmissao.Value := now;
      QryContasDtVenc.Value := now;
      QryContasCodCliente.Value := RxDBLookupCombo2.KeyValue;
      QryContasAtivo.Value := 'S';
      vltotal := 0;
      QryFechamento.First;
      While not QryFechamento.Eof do
      begin
         vltotal := vltotal + QryFechamentoValor.Value;
         Qryfechamento.Next;
      end;
      QryContasVlCalculado.Value := vltotal;
      QryContasDescricao.Value := QryClienteNome.Value;
      QryContasVlDesconto.Value := 0;
      QryContasTipoCadastro.Value := 'A';
      QryContasVLFatura.Value := Vltotal;
      QryDesconto.First;
      CodDesconto := 0;
      While not QryDesconto.Eof do
      begin
         IF ((Vltotal >= QryDescontoValorinicial.Value)
             and (vltotal <= QryDescontoValorFinal.Value)) then
            CodDesconto := QryDescontoCodDesconto.Value;
         QryDesconto.Next;
      end;
      IF CodDesconto > 0 then
      begin
         QryContasCodDesconto.Value := CodDesconto;
         RXCalcEdit1.Value := (vltotal*QryDescontoDesconto.Value/100);
         Label22.Caption := FormatFloat('#0.##',QryDescontoDesconto.Value);
      end
      else
      begin
         RXCalcEdit1.value := 0;
         Label22.Caption := '0';
      end;
      QryContasVLFatura.Value := Vltotal - RXCalcEdit1.Value;
   end;
end;

procedure TFrmFechamento.RxDBCalcEdit2Change(Sender: TObject);
begin
   RxDBCalcEdit3.Value := RxDBCalcEdit1.Value - RxDBCalcEdit2.Value - RXCalcEdit1.Value;
end;

procedure TFrmFechamento.BitBtn1Click(Sender: TObject);
var
  codseqcontas : integer;
  dd,mm,aa : word;
begin
   IF RxDBLookupCombo1.KeyValue < 1 then
   begin
      ShowMessage('Informe o Banco..');
      RxDBLookupCombo1.SetFocus;
      Exit;
   end;
   IF RxDBLookupCombo3.KeyValue < 1 then
   begin
      ShowMessage('Informe o Profissional Responsavel..');
      RxDBLookupCombo1.SetFocus;
      Exit;
   end;

   SPContas.Prepare;
   with SPContas do
   begin
      ParamByname('@TIPOACAO_2').Value := QryContasTipoacao.Value;
			ParamByname('@DESCRICAO_3').Value := QryContasdescricao.Value;
			ParamByname('@QTDEPARC_4').Value := QryContasqtdeparc.Value;
			ParamByname('@NUMPARC_5').Value := QryContasnumparc.Value;
      decodedate(qrycontasdtemissao.Value,aa,mm,dd);
			ParamByname('@DTEMISSAO_6').Value := encodedate(aa,mm,dd);
      decodedate(qrycontasdtVenc.Value,aa,mm,dd);
			ParamByname('@DTVENC_7').Value := Encodedate(aa,mm,dd);
			ParamByname('@VLCALCULADO_8').Value := QryContasvlcalculado.Value;
			ParamByname('@VLDESCONTO_9').Value := QryContasvldesconto.Value+RXCALCEDIT1.Value;
			ParamByname('@VLFATURA_10').Value := QryContasvlcalculado.Value-QryContasvldesconto.Value-RXCALCEDIT1.Value;
			ParamByname('@CODCLIENTE_11').Value := QryContascodcliente.Value;
			ParamByname('@CODFORN_12').Value := null;
			ParamByname('@NDOCTIT_13').Value := QryContasndoctit.Value;
			ParamByname('@ATIVO_14').Value := QryContasativo.Value;
			ParamByname('@CODBANCO_15').Value := QryContascodbanco.Value;
			ParamByname('@TIPOCADASTRO_16').Value := QryContastipocadastro.Value;
			ParamByname('@DESCR_17').Value := QryContasdescr.Value;
			ParamByname('@CODRespProf_18').Value := QryProfRespCodProfLaudo.Value;
			ParamByname('@CODDESCONTO_19').Value := QryDescontoCodDESCONTO.Value;

      execproc;
      codseqcontas := Parambyname('@codseqcontas_1').Value;
   end;

   QryFechamento.First;
   While not Qryfechamento.Eof do
   begin
      SP_FATURA_EXAMES.Prepare;
      SP_FATURA_EXAMES.ParamByName('@CodMovPedido_1').Value := QryfechamentoCodMovPedido.Value;
      SP_FATURA_EXAMES.ParamByName('@codseqcontas_2').Value := Codseqcontas;
      SP_Fatura_Exames.ParamByName('@PAgo_3').Value := null;
      SP_FATURA_EXAMES.ExecProc;
      QryFechamento.Next;
   end;
   QryContas.Close;
   QryCliente.Close;
   QryCliente.Active := True;
   panel1.Enabled := True;
   PageControl1.ActivePage := TabSheet1;
   CheckListBox1.Items.Clear;
   checkbox1.Enabled := true;
   CheckBox1.Checked := False;
   bbtnPesquisar.Click;

end;

procedure TFrmFechamento.BbtnCancelarClick(Sender: TObject);
begin
   QryContas.Close;
   panel1.Enabled := True;
   PageControl1.ActivePage := TabSheet1;
   CheckListBox1.Items.Clear;
   checkbox1.Enabled := true;
   CheckBox1.Checked := False;
   bbtnPesquisar.Click;
end;

procedure TFrmFechamento.CheckListBox1Click(Sender: TObject);
Var
   i, total, codInterno: integer;
begin
     codinterno := strtoint(trim(copy(checkListBox1.Items.ValueFromIndex[CheckListBox1.ItemIndex],1,9)));
     if checklistbox1.Checked[CheckListBox1.ItemIndex] then
     begin
         total:= Checklistbox1.Items.Capacity - 1;
         for i := 0 to total do
         begin
             IF strtoint(trim(copy(checkListBox1.Items.ValueFromIndex[i],1,9))) = codinterno then
                 checklistbox1.Checked[i] := true;
         end;
     end
     else
     begin
         total:= Checklistbox1.Items.Capacity - 1;
         for i := 0 to total do
         begin
             IF strtoint(trim(copy(checkListBox1.Items.ValueFromIndex[i],1,9))) = codinterno then
                 checklistbox1.Checked[i] := false;
         end;


     end;
end;

procedure TFrmFechamento.RxDBLookupCombo4Change(Sender: TObject);
begin
   RXCalcEdit1.Value := (RXDBCALCEDIT1.Value*QryDescontoDesconto.Value/100);
   Label22.Caption := FormatFloat('#0.##',QryDescontoDesconto.Value);
   RXDBCalcedit3.Value := RXDBCALCEDIT1.Value - RXDBCALCEDIT2.Value - RXCALCEDIT1.Value;
end;

end.
