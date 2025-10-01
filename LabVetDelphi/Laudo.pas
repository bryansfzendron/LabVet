unit Laudo;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DBTables, DB, StdCtrls, DBCtrls, Mask, RXDBCtrl, Grids, DBGrids,
  ComCtrls, CurrEdit, DateUtils, ToolEdit, RxLookup, Buttons, ExtCtrls,
  CheckLst;

type
  TFrmLaudo = class(TForm)
    Panel1: TPanel;
    BbtnPesquisar: TBitBtn;
    BbtnLimpa: TBitBtn;
    Panel3: TPanel;
    PageControl1: TPageControl;
    TSPesquisa: TTabSheet;
    Panel2: TPanel;
    BbtnImprimir: TBitBtn;
    BBtnFechat: TBitBtn;
    Panel5: TPanel;
    Panel6: TPanel;
    DBGrid1: TDBGrid;
    Panel7: TPanel;
    Panel8: TPanel;
    Label7: TLabel;
    Panel10: TPanel;
    Panel13: TPanel;
    TSItens: TTabSheet;
    Panel11: TPanel;
    BbtnGravaItens: TBitBtn;
    BbtnCancelaItens: TBitBtn;
    ScrollBox2: TScrollBox;
    Label24: TLabel;
    QryQualquer: TQuery;
    UDPQualquer: TUpdateSQL;
    DSQualquer: TDataSource;
    QryCliente: TQuery;
    QryClienteCodCliente: TAutoIncField;
    QryClienteNome: TStringField;
    QryClienteEndereco: TStringField;
    QryClientenumero: TStringField;
    QryClienteCompl: TStringField;
    QryClienteBairro: TStringField;
    QryClienteCEP: TStringField;
    QryClienteCidade: TStringField;
    QryClienteUF: TStringField;
    QryClienteTelefone: TStringField;
    QryClienteFax: TStringField;
    QryClienteCelular: TStringField;
    QryClienteemail: TStringField;
    QryClientecpf_cgc: TStringField;
    QryClienteContato: TStringField;
    QryClienteDataCadastro: TDateTimeField;
    QryClienteRestricao: TStringField;
    QryClienteDataAtualizacao: TDateTimeField;
    QryClienteAtivo: TStringField;
    DSCliente: TDataSource;
    QRYEspecie: TQuery;
    DSEspecie: TDataSource;
    QryMovExames: TQuery;
    QryMovExamesCodMovExames: TAutoIncField;
    QryMovExamesCodMovPedido: TIntegerField;
    QryMovExamesCodExame: TIntegerField;
    QryMovExamesDataProvResultado: TDateTimeField;
    QryMovExamesDataResultado: TDateTimeField;
    QryMovExamesValor: TFloatField;
    QryMovExamesObservacao: TMemoField;
    QryMovExamesCodEspecie: TIntegerField;
    QryMovExamesNomeExame: TStringField;
    QryMovExamesNomeExameReduz: TStringField;
    QryMovExamesDias_Elaboracao_Exame: TIntegerField;
    QryMovExamesImprimirSeparado: TStringField;
    QryMovExamesMetodo: TStringField;
    QryMovExamesMaterial: TStringField;
    DSMovExames: TDataSource;
    UPDItens: TUpdateSQL;
    QryExameItensSeq: TQuery;
    QryProfSolic: TQuery;
    QryProfSolicCodProfSolic: TAutoIncField;
    QryProfSolicAbrevConselho: TStringField;
    QryProfSolicNomeProfSolic: TStringField;
    QryProfSolicNumConselho: TStringField;
    QryProfSolicEmail: TStringField;
    QryProfSolicTelefone: TStringField;
    QryProfSolicCelular: TStringField;
    QryProfSolicNascimento: TDateTimeField;
    QryProfSolicativo: TStringField;
    DSPRofSolic: TDataSource;
    QryExames: TQuery;
    QryExamesCodExame: TAutoIncField;
    QryExamesCodEspecie: TIntegerField;
    QryExamesNomeExame: TStringField;
    QryExamesNomeExameReduz: TStringField;
    QryExamesValor: TFloatField;
    QryExamesDias_Elaboracao_Exame: TIntegerField;
    QryExamesImprimirSeparado: TStringField;
    QryExamesMetodo: TStringField;
    QryExamesMaterial: TStringField;
    DSExames: TDataSource;
    QryExamesItens: TQuery;
    DSExamesItens: TDataSource;
    QryMovItensExames: TQuery;
    QryMovItensExamesCodMovItensExames: TAutoIncField;
    QryMovItensExamesCodMovExames: TIntegerField;
    QryMovItensExamesCodExame: TIntegerField;
    QryMovItensExamesCodItensExame: TIntegerField;
    QryMovItensExamesResultado1: TFloatField;
    QryMovItensExamesResultado2: TFloatField;
    QryMovItensExamesResultadoTexto: TMemoField;
    QryMovItensExamesOrdemApresentacao: TIntegerField;
    QryMovItensExamesNomeItemExame: TStringField;
    QryMovItensExamesReferencia1: TStringField;
    QryMovItensExamesReferencia2: TStringField;
    QryMovItensExamesDigitaCampo: TStringField;
    QryMovItensExamesMinimo: TFloatField;
    QryMovItensExamesMaximo: TFloatField;
    QryMovItensExamesObrigatorio: TStringField;
    QryMovItensExamesTipoCampo: TStringField;
    DSMovItensExames: TDataSource;
    UPDMovExamesItens: TUpdateSQL;
    Panel4: TPanel;
    Panel9: TPanel;
    BbtnIncluirItens: TBitBtn;
    Panel12: TPanel;
    Panel14: TPanel;
    DBGrid3: TDBGrid;
    Label2: TLabel;
    PageControl2: TPageControl;
    TabSheet1: TTabSheet;
    TabSheet2: TTabSheet;
    Label5: TLabel;
    DBMemo1: TDBMemo;
    Label3: TLabel;
    Label6: TLabel;
    DBEdit4: TDBEdit;
    Label4: TLabel;
    Label8: TLabel;
    DBEdit5: TDBEdit;
    DBEdit6: TDBEdit;
    Label10: TLabel;
    Label11: TLabel;
    DBText1: TDBText;
    DBText2: TDBText;
    Memo1: TMemo;
    SP_UPD_MOVEXAMES: TStoredProc;
    SP_UPD_MOVITENSEXAMES: TStoredProc;
    Panel15: TPanel;
    Panel16: TPanel;
    BbtnExcluirItens: TBitBtn;
    GroupBox3: TGroupBox;
    Label12: TLabel;
    Label13: TLabel;
    Label14: TLabel;
    QryMovExamesLiberado: TStringField;
    SPLiberado: TStoredProc;
    DBText3: TDBText;
    DBText4: TDBText;
    Label15: TLabel;
    Label16: TLabel;
    QryMovExamesRel: TQuery;
    DSMovExamesRel: TDataSource;
    QryMovItensExamesRel: TQuery;
    DSMovItensExamesRel: TDataSource;
    QryMovExamesRelCodMovExames: TAutoIncField;
    QryMovExamesRelCodMovPedido: TIntegerField;
    QryMovExamesRelCodExame: TIntegerField;
    QryMovExamesRelDataProvResultado: TDateTimeField;
    QryMovExamesRelDataResultado: TDateTimeField;
    QryMovExamesRelValor: TFloatField;
    QryMovExamesRelObservacao: TMemoField;
    QryMovExamesRelCodEspecie: TIntegerField;
    QryMovExamesRelNomeExame: TStringField;
    QryMovExamesRelNomeExameReduz: TStringField;
    QryMovExamesRelDias_Elaboracao_Exame: TIntegerField;
    QryMovExamesRelImprimirSeparado: TStringField;
    QryMovExamesRelMetodo: TStringField;
    QryMovExamesRelMaterial: TStringField;
    QryMovExamesRelLiberado: TStringField;
    TSLaudo: TTabSheet;
    QryProfLaudo: TQuery;
    DSProfLaudo: TDataSource;
    QryProfLaudoCodProfLaudo: TAutoIncField;
    QryProfLaudoAbrevConselho: TStringField;
    QryProfLaudoNumConselho: TStringField;
    QryProfLaudoNomeProfLaudo: TStringField;
    QryProfLaudoUF: TStringField;
    QryProfLaudoAssinatura: TBlobField;
    QryProfLaudoAtivo: TStringField;
    Panel17: TPanel;
    BitBtn2: TBitBtn;
    BitBtn3: TBitBtn;
    ScrollBox1: TScrollBox;
    RxDBLookupCombo3: TRxDBLookupCombo;
    Label17: TLabel;
    CheckBox1: TCheckBox;
    SPRespLaudo: TStoredProc;
    GroupBox1: TGroupBox;
    Label18: TLabel;
    Label19: TLabel;
    Edit1: TEdit;
    Label9: TLabel;
    RxDBLookupCombo2: TRxDBLookupCombo;
    Label29: TLabel;
    RxDBLookupCombo1: TRxDBLookupCombo;
    Label21: TLabel;
    Edit2: TEdit;
    Label1: TLabel;
    Edit3: TEdit;
    Label26: TLabel;
    Label30: TLabel;
    Label28: TLabel;
    EdCodPedido: TRxCalcEdit;
    Edit5: TEdit;
    Edit4: TEdit;
    GroupBox2: TGroupBox;
    Label22: TLabel;
    Label23: TLabel;
    Dti: TDateEdit;
    Dtf: TDateEdit;
    RadioGroup1: TRadioGroup;
    EdPedido: TRxCalcEdit;
    EdProtocolo: TEdit;
    Label20: TLabel;
    Label27: TLabel;
    QRYEspecieCodEspecie: TAutoIncField;
    QRYEspecieNomeEspecie: TStringField;
    CheckBox2: TCheckBox;
    Label31: TLabel;
    QryMovItensExamesUnidade1: TStringField;
    QryMovItensExamesUnidade2: TStringField;
    DBEdit1: TDBEdit;
    Label32: TLabel;
    QryExameItensSeqCodItensExame: TAutoIncField;
    QryExameItensSeqCodExame: TIntegerField;
    QryExameItensSeqOrdemApresentacao: TIntegerField;
    QryExameItensSeqNomeItemExame: TStringField;
    QryExameItensSeqReferencia1: TStringField;
    QryExameItensSeqReferencia2: TStringField;
    QryExameItensSeqUnidade1: TStringField;
    QryExameItensSeqUnidade2: TStringField;
    QryExameItensSeqDigitaCampo: TStringField;
    QryExameItensSeqMinimo: TFloatField;
    QryExameItensSeqMaximo: TFloatField;
    QryExameItensSeqObrigatorio: TStringField;
    QryExameItensSeqTipoCampo: TStringField;
    QryExamesItensCodItensExame: TAutoIncField;
    QryExamesItensCodExame: TIntegerField;
    QryExamesItensOrdemApresentacao: TIntegerField;
    QryExamesItensNomeItemExame: TStringField;
    QryExamesItensReferencia1: TStringField;
    QryExamesItensReferencia2: TStringField;
    QryExamesItensUnidade1: TStringField;
    QryExamesItensUnidade2: TStringField;
    QryExamesItensDigitaCampo: TStringField;
    QryExamesItensMinimo: TFloatField;
    QryExamesItensMaximo: TFloatField;
    QryExamesItensObrigatorio: TStringField;
    QryExamesItensTipoCampo: TStringField;
    QryMovItensExamesRelCodMovItensExames: TAutoIncField;
    QryMovItensExamesRelCodMovExames: TIntegerField;
    QryMovItensExamesRelCodExame: TIntegerField;
    QryMovItensExamesRelCodItensExame: TIntegerField;
    QryMovItensExamesRelResultado1: TFloatField;
    QryMovItensExamesRelResultado2: TFloatField;
    QryMovItensExamesRelResultadoTexto: TMemoField;
    QryMovItensExamesRelOrdemApresentacao: TIntegerField;
    QryMovItensExamesRelNomeItemExame: TStringField;
    QryMovItensExamesRelReferencia1: TStringField;
    QryMovItensExamesRelReferencia2: TStringField;
    QryMovItensExamesRelUnidade1: TStringField;
    QryMovItensExamesRelUnidade2: TStringField;
    QryMovItensExamesRelDigitaCampo: TStringField;
    QryMovItensExamesRelMinimo: TFloatField;
    QryMovItensExamesRelMaximo: TFloatField;
    QryMovItensExamesRelObrigatorio: TStringField;
    QryMovItensExamesRelTipoCampo: TStringField;
    Dbedit2: TRxDBCalcEdit;
    DBEdit3: TRxDBCalcEdit;
    QryQualquerCodMovPedido: TAutoIncField;
    QryQualquerCodigoInterno: TStringField;
    QryQualquerCodigoPedido: TIntegerField;
    QryQualquerSenha: TStringField;
    QryQualquerCodCliente: TIntegerField;
    QryQualquerCodEspecie: TIntegerField;
    QryQualquerCodProfSolic: TIntegerField;
    QryQualquerCodProfLaudo: TIntegerField;
    QryQualquerAssinaturaScanner: TStringField;
    QryQualquerDataPedido: TDateTimeField;
    QryQualquerHoraPedido: TStringField;
    QryQualquerDataEnvio: TDateTimeField;
    QryQualquerValorTotal: TFloatField;
    QryQualquerPago: TStringField;
    QryQualquerFormadeEnvio: TStringField;
    QryQualquerRetirar: TStringField;
    QryQualquerRetirado: TStringField;
    QryQualquerContato: TStringField;
    QryQualquerStatus: TStringField;
    QryQualquerCodSeqContas: TIntegerField;
    QryQualquerNomeAnimal: TStringField;
    QryQualquerProprietario: TStringField;
    QryQualquerIdade: TStringField;
    QryQualquerSexoAnimal: TStringField;
    QryQualquerDataLiberacao: TDateTimeField;
    QryQualquerCliente: TStringField;
    QryQualquernomeespecie: TStringField;
    QryQualquerAbrevConselho: TStringField;
    QryQualquerNomeprofLaudo: TStringField;
    QryQualquerNumConselho: TStringField;
    QryMovItensExamesCasasDecimais1: TIntegerField;
    QryMovItensExamesCasasDecimais2: TIntegerField;
    QryMovItensExamesTipoCampo2: TStringField;
    QryMovItensExamesRelCasasDecimais1: TIntegerField;
    QryMovItensExamesRelCasasDecimais2: TIntegerField;
    QryMovItensExamesRelTipoCampo2: TStringField;
    QryExamesItensCasasDecimais1: TIntegerField;
    QryExamesItensCasasDecimais2: TIntegerField;
    QryExamesItensTipoCampo2: TStringField;
    QryQualquerRaca: TStringField;
    BbtnVolta: TBitBtn;
    BbtnAvanca: TBitBtn;
    QryQualquerano: TIntegerField;
    PageControl3: TPageControl;
    TabSheet3: TTabSheet;
    TabSheet4: TTabSheet;
    DBGrid2: TDBGrid;
    GroupBox4: TGroupBox;
    CheckBox3: TCheckBox;
    QryQualquerNomeprofSolic: TStringField;
    BbtnFechar: TBitBtn;
    Label25: TLabel;
    BbtnCancelaLib: TBitBtn;
    DBText5: TDBText;
    Label33: TLabel;
    Panel18: TPanel;
    CheckListBox1: TCheckListBox;
    Label34: TLabel;
    Label35: TLabel;
    Label36: TLabel;
    QryQualquerAbrevConsSolic: TStringField;
    QryQualquerNumConsSolic: TStringField;
    QryProfLaudoFuncao: TStringField;
    QryProfLaudoMensagem_Qualidade: TStringField;
    QryExamesPedido: TQuery;
    DSExamesPedido: TDataSource;
    Label37: TLabel;
    RxDBLookupCombo4: TRxDBLookupCombo;
    QryExamesPedidoCodExame: TAutoIncField;
    QryExamesPedidoCodEspecie: TIntegerField;
    QryExamesPedidoNomeExame: TStringField;
    QryExamesPedidoNomeExameReduz: TStringField;
    QryExamesPedidoValor: TFloatField;
    QryExamesPedidoDias_Elaboracao_Exame: TIntegerField;
    QryExamesPedidoImprimirSeparado: TStringField;
    QryExamesPedidoMetodo: TStringField;
    QryExamesPedidoMaterial: TStringField;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure BbtnLimpaClick(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure BBtnFechatClick(Sender: TObject);
    procedure BbtnIncluirItensClick(Sender: TObject);
    procedure BbtnCancelaItensClick(Sender: TObject);
    procedure BbtnGravaItensClick(Sender: TObject);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure DSQualquerDataChange(Sender: TObject; Field: TField);
    procedure DSMovExamesDataChange(Sender: TObject; Field: TField);
    procedure DBGrid2CellClick(Column: TColumn);
    procedure DBGrid2DrawColumnCell(Sender: TObject; const Rect: TRect;
      DataCol: Integer; Column: TColumn; State: TGridDrawState);
    procedure BbtnExcluirItensClick(Sender: TObject);
    procedure BbtnImprimirClick(Sender: TObject);
    procedure BitBtn2Click(Sender: TObject);
    procedure BitBtn3Click(Sender: TObject);
    procedure DBGrid1CellClick(Column: TColumn);
    procedure DBGrid1DrawColumnCell(Sender: TObject; const Rect: TRect;
      DataCol: Integer; Column: TColumn; State: TGridDrawState);
    procedure BbtnTodosLaudosClick(Sender: TObject);
    procedure RxDBGrid1DrawColumnCell(Sender: TObject; const Rect: TRect;
      DataCol: Integer; Column: TColumn; State: TGridDrawState);
    procedure BbtnVoltaClick(Sender: TObject);
    procedure BbtnAvancaClick(Sender: TObject);
    procedure CheckBox3Click(Sender: TObject);
    procedure BbtnCancelaLibClick(Sender: TObject);
    procedure Dbedit2Change(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure RxDBLookupCombo1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
    laudo : integer;
    codpedido, codexame, coditensexame, acessoitens : integer;
    alterou, digita1, digita2 :boolean;
  end;

var
  FrmLaudo: TFrmLaudo;

implementation

uses RelResultado, DM_LABVET;

{$R *.dfm}

procedure TFrmLaudo.FormClose(Sender: TObject; var Action: TCloseAction);
begin
   Release;
   FrmLaudo := nil;
end;

procedure TFrmLaudo.BbtnLimpaClick(Sender: TObject);
begin
   RxDBLookupCombo1.ClearValue;
   RxDBLookupCombo2.ClearValue;
   RxDBLookupCombo4.ClearValue;
   QryExamesPedido.Close;
   EDProtocolo.Clear;
   EdPedido.Clear;
   EdCodPedido.Clear;
   Edit1.Clear;
   Edit4.Clear;
   Edit5.Clear;
   Edit3.Clear;
   Dti.Date := incday(strtodate(datetostr(now)),-10);
   Dtf.Date := strtodate(datetostr(now));

end;

procedure TFrmLaudo.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSItens.TabVisible := False;
   TabSheet1.TabVisible := False;
   TabSheet2.TabVisible := False;
   TSLaudo.TabVisible := False;
   TabSheet3.TabVisible := False;
   TabSheet4.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;
//   BbtnLaudo.Caption := 'Responsável Pelo'+#13+'Laudo';
   RxDBLookupCombo1.ClearValue;
   RxDBLookupCombo2.ClearValue;
   EDProtocolo.Clear;
   EdPedido.Clear;
   EdCodPedido.Clear;
   Edit1.Clear;
   Edit4.Clear;
   Edit5.Clear;
   Edit3.Clear;
   CodPedido := 0;
   CodExame := 0;
   CodItensExame := 0;


   /////////////
      QryQualquer.Close;
   QryProfSolic.Close;
   QryProfSolic.Active := true;
   QryEspecie.Close;
   QryEspecie.Active := true;

    QryProfLaudo.Close;
   QryProfLaudo.Active := true;
   QryCliente.Close;
   QryCliente.Active := True;
///////////   
   QryMovExames.close;
   QryMovItensExames.close;

   QryMovExames.Active := true; // Luciano 09-02-21
   QryMovItensExames.Active := true;  // Luciano 09-02-21
//////////
    QryMovExamesrel.Close;
    QryMovItensExamesRel.Close;
    QryMovExamesrel.Active := True; // Luciano 09-02-21
    QryMovItensExamesRel.Active := True; // Luciano 09-02-21

//   RxDBLookupCombo2.KeyValue := QryClienteCodCliente.Value;

   IF laudo = 0 then
   begin
      BbtnImprimir.Enabled := False;
      BbtnIncluiritens.Enabled := False;
      BbtnExcluirItens.Enabled := False;
//      BbtnLaudo.Enabled := False;
      BbtnCancelaLib.Visible := True;
      DBGrid3.Visible := true;
      BbtnCancelaLib.Enabled := False;
   end;
   IF laudo = 1 then
   begin
      BbtnImprimir.Enabled := False;
      BbtnIncluiritens.Visible := False;
      BbtnExcluirItens.Visible := False;
//      BbtnLaudo.Visible := False;
      DBGrid3.Visible := False;
      BbtnCancelaLib.Visible := False;
   end;

   dti.Date := now;
   dtf.Date := now;


end;

procedure TFrmLaudo.BBtnFechatClick(Sender: TObject);
begin
   close;
end;

procedure TFrmLaudo.BbtnIncluirItensClick(Sender: TObject);
begin
   alterou := false;
   CodPedido := QryQualquerCodMovPedido.Value;
   CodExame := QryMovExamesCodMovExames.Value;
   CodItensExame := QryMovItensExamesCodMovItensExames.value;
   Edpedido.Value := CodPedido;


//   bbtnpesquisar.click;


   QryMovItensExames.Edit;
//   QryMovExames.Edit;
   edit1.Text := QryMovExamesMaterial.Value;
   // Primeiro acesso
   if  acessoitens = 0 then
       memo1.Lines.Text := QryMovExamesObservacao.Value;
//   else

//   else
//       memo1.Lines.Text := QryMovExamesObservacao.Value

   IF QryMovItensExamesTipoCampo.Value = 'N' then
   begin
      PageControl2.ActivePage := TabSheet1;
      Label3.Visible := True;
      DbEdit2.Visible := True;
      Label6.Visible := True;
      DbEdit4.Visible := True;
      Label10.Visible := True;
      DbEdit6.Visible := True;
      Label5.Visible := False;
      DbMemo1.Visible := False;
      digita1 := True;
//      IF Length(QryMovItensExamesResultado1.AsString) = 0 then
//         DbEdit2.Value := null;
//      IF QryMovItensExamesResultado2.IsNull then
//         DbEdit3.Value := null;

         //      DbMemo1.Lines.Clear;
      IF Length(QryMovItensExamesReferencia2.Value) < 1 then
      begin
         Label4.Visible := False;
         DbEdit3.Visible := False;
         Label8.Visible := False;
         DbEdit5.Visible := False;
         digita2 := False;
      end
      else
      begin
         Label4.Visible := True;
         DbEdit3.Visible := True;
         Label8.Visible := True;
         DbEdit5.Visible := True;
         digita2 := True;
       end;
   end
   else
   begin
      PageControl2.ActivePage := TabSheet2;
      Label3.Visible := False;
      DbEdit2.Visible := False;
      Label6.Visible := False;
      DbEdit4.Visible := False;
      Label4.Visible := False;
      DbEdit4.Visible := False;
      Label8.Visible := False;
      DbEdit5.Visible := False;
      Label10.Visible := False;
      DbEdit6.Visible := False;
      Digita1 := False;
      Digita2 := False;
      Label5.Visible := True;
      DbMemo1.Visible := True;
   end;
   PageControl1.ActivePage := TSItens;
   IF QryMovItensExamesTipoCampo.Value = 'N' then
      DbEdit2.SetFocus
   else
      DBMemo1.SetFocus;



end;

procedure TFrmLaudo.BbtnCancelaItensClick(Sender: TObject);
begin
   QrymovItensExames.Cancel;
   QryMovItensExames.Close;
   QryMovItensExames.Active := True;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;
end;

procedure TFrmLaudo.BbtnGravaItensClick(Sender: TObject);
begin
  acessoItens := 1;
  IF QryMovItensExamesTipoCampo.Value = 'N' then
  begin
     IF QryMovItensExamesMinimo.Value > 0 then
        IF QryMovItensExamesResultado1.Value < QryMovItensExamesMinimo.Value then
           ShowMessage('<<< Advertência >>>'+#13+ 'Valor do Resultado Menor que Paramêtro Minimo..'+#13+
                       'Gravação Será Realizada');
     IF QryMovItensExamesMaximo.Value > 0 then
        IF QryMovItensExamesResultado1.Value > QryMovItensExamesMAximo.Value then
           ShowMessage('<<< Advertência >>>'+#13+ 'Valor do Resultado Maior que Paramêtro Máximo..'+#13+
                       'Gravação Será Realizada');
   end;
   SP_UPD_MOVITENSEXAMES.Prepare;
   With SP_UPD_MOVITENSEXAMES do
   begin
       ParamByname('@CodMovItensExames_1').Value := QryMovItensExamesCodMovItensExames.Value;
       IF alterou then
       begin
          IF ((QryMovItensExamesResultado1.Value >= 0) ) then
              ParamByname('@Resultado1_2').Value :=  QryMovItensExamesResultado1.Value
          else
     	        ParamByname('@Resultado1_2').Value :=  null;
       end
       else
       begin
          IF ((QryMovItensExamesResultado1.Value >= 0.01) ) then
              ParamByname('@Resultado1_2').Value :=  QryMovItensExamesResultado1.Value
          else
     	        ParamByname('@Resultado1_2').Value :=  null;
       end;
       if not digita1 then
 	        ParamByname('@Resultado1_2').Value :=  null;

       if Alterou then
       begin
          IF ((QryMovItensExamesResultado2.Value >= 0) ) then
       	     ParamByname('@Resultado2_3').Value := QryMovItensExamesResultado2.Value
          else
             ParamByname('@Resultado2_3').Value := null;
       end
       else
       begin
          IF ((QryMovItensExamesResultado2.Value >= 0.01) or alterou ) then
       	     ParamByname('@Resultado2_3').Value := QryMovItensExamesResultado2.Value
          else
             ParamByname('@Resultado2_3').Value := null;
       end;
       if not digita2 then
 	        ParamByname('@Resultado2_3').Value :=  null;

       IF QryMovItensExamesTipoCampo.Value = 'N' then
	         ParamByname('@ResultadoTexto_4').Value := null
       else
    	     ParamByname('@ResultadoTexto_4').Value := QryMovItensExamesResultadoTexto.Value;
       execproc;
   end;

   SP_UPD_MOVEXAMES.Prepare;
   With SP_UPD_MOVEXAMES do
   begin
       ParamByname('@CodMovExames_1').Value := QryMovExamesCodMovExames.Value;
	     ParamByname('@Observacao_2').Value :=  memo1.Lines.Text;
       ParamByName('@material_3').Value := Edit1.Text;
       execproc;
   end;

//   PageControl1.ActivePage := TSPesquisa;

   IF ((Not QryMovItensExames.Eof) and (QryMovItensExames.RecordCount > 1))  then
   begin
      QryMovItensExames.Next;
      BbtnIncluirItens.Click;
   end
   else
   begin
      PageControl1.ActivePage := TSPesquisa;
      Panel1.Enabled := True;
      BbtnPesquisar.Click;
   end;

end;

procedure TFrmLaudo.BbtnPesquisarClick(Sender: TObject);
begin
//   QryMovExames.Close;
//   QryMovItensExames.Close;
//   QryMovExames.Active := True;
//   QryMovItensExames.Active := True;
   QryQualquer.Close;
   IF RxDBLookupCombo2.KeyValue > 0 then
      QryQualquer.ParamByName('CodCliente').Value := RxDBLookupCombo2.KeyValue
   else
      QryQualquer.ParamByName('CodCliente').Value := -1;
   IF RxDBLookupCombo1.KeyValue > 0 then
      QryQualquer.ParamByName('CodEspecie').Value := RxDBLookupCombo1.KeyValue
   else
      QryQualquer.ParamByName('CodEspecie').Value := -1;
   IF RxDBLookupCombo4.KeyValue > 0 then
      QryQualquer.ParamByName('CodExame').Value := RxDBLookupCombo4.KeyValue
   else
      QryQualquer.ParamByName('CodExame').Value := -1;

   QryQualquer.ParamByName('Dti').Value := Dti.Date;
   QryQualquer.ParamByName('Dtf').Value := Dtf.Date;
   IF Edpedido.Value > 0 then
      QryQualquer.ParamByName('CodMovPedido').Value := EdPedido.Value
   else
      QryQualquer.ParamByName('CodMovPedido').Value := -1;
   IF LENGTH(TRIM(EdProtocolo.Text)) > 0 then
      QryQualquer.ParamByName('CodigoInterno').Value := EdProtocolo.Text
   else
      QryQualquer.ParamByName('CodigoInterno').Value := '-1';
   IF LENGTH(TRIM(Edit2.Text)) > 0 then
      QryQualquer.ParamByName('NomeAnimal').Value := '%'+Edit2.Text+'%'
   else
      QryQualquer.ParamByName('NomeAnimal').Value := '-1';

   IF LENGTH(TRIM(Edit3.Text)) > 0 then
      QryQualquer.ParamByName('Proprietario').Value := '%'+Edit3.Text+'%'
   else
      QryQualquer.ParamByName('Proprietario').Value := '-1';

   IF LENGTH(TRIM(Edit4.Text)) > 0 then
      QryQualquer.ParamByName('SexoAnimal').Value := '%'+Edit4.Text+'%'
   else
      QryQualquer.ParamByName('SexoAnimal').Value := '-1';

   IF LENGTH(TRIM(Edit5.Text)) > 0 then
      QryQualquer.ParamByName('IdadeAnimal').Value := Edit5.Text
   else
      QryQualquer.ParamByName('IdadeAnimal').Value := '-1';

   IF EdCodPedido.Value > 0 then
      QryQualquer.ParamByName('CodigoPedido').Value := EdCodPedido.Value
   else
      QryQualquer.ParamByName('CodigoPedido').Value := -1;

   IF RadioGroup1.ItemIndex = 0 then
      QryQualquer.ParamByName('Status').Value := 'P'
   else
      QryQualquer.ParamByName('Status').Value := 'C';


   QryQualquer.Active := True;
   if qryqualquer.Eof then
   begin
      BbtnINcluirItens.Enabled := False;
      BbtnExcluirItens.Enabled := False;
      BbtnImprimir.Enabled := False;
      CheckListBox1.Items.Clear;
//      BbtnLaudo.Enabled := False;
      BbtnCancelaLib.Enabled := False;
   end
   else
   begin
      IF laudo = 0 then
      begin
         BbtnINcluirItens.Enabled := True;
         BbtnExcluirItens.Enabled := True;
         BbtnImprimir.Enabled := True;
//         BbtnLaudo.Enabled := True;
         BbtnCancelaLib.Enabled := True;
      end;
      IF laudo = 1 then
      begin
         BbtnINcluirItens.Enabled := False;
         BbtnExcluirItens.Enabled := False;
         BbtnImprimir.Enabled := True;
//         BbtnLaudo.Enabled := False;
         BbtnCancelaLib.Enabled := False;
      end;

      IF CodPedido <> 0 then
         QryQualquer.Locate('CodMovPedido',CodPedido,[]);
      IF CodExame <> 0 Then
         QryMovExames.Locate('CodMovExames',CodExame,[]);
      IF CodItensExame <> 0 then
         QryMovItensExames.Locate('CodMovItensExames',CodItensExame,[]);

   end;
   memo1.Lines.Clear;
   acessoitens := 0;
end;

procedure TFrmLaudo.DSQualquerDataChange(Sender: TObject; Field: TField);
begin
//   QryMovExamesRel.Close;
//   QryMovExamesRel.ParamByName('CodMovPedido').Value := QryQualquerCodMovPedido.Value;
//   QryMovExamesRel.Active := True;
   IF QryMovExames.Eof then
   begin
      IF QryQualquer.Eof then
         BbtnIncluirItens.Enabled := False
      else
      begin
         IF laudo = 0 then
            BbtnIncluirItens.Enabled := True;
         IF laudo = 1 then
            BbtnIncluirItens.Enabled := False;
      end;
      BbtnExcluirItens.Enabled := false;
   end
   else
   begin
      IF laudo = 0 then
      begin
         BbtnIncluirItens.Enabled := True;
         BbtnExcluirItens.Enabled := true;
      end;
      IF laudo = 1 then
      begin
         BbtnIncluirItens.Enabled := False;
         BbtnExcluirItens.Enabled := False;
      end;
   end;
   CheckListBox1.Items.Clear;
   QryMovExames.First;
     While not QryMovExames.Eof do
      begin
            CheckListBox1.Items.Add(copy(inttostr(QryMovExamesCodMovExames.value)+'          ',1,10)+' '+copy(QryMovExamesNomeExame.value+'                                                         ',1,40)+'    '+QryMovExamesLiberado.Value);
            QryMovExames.Next;
      end;
 
end;

procedure TFrmLaudo.DSMovExamesDataChange(Sender: TObject; Field: TField);
begin
//  IF QryMovExames.Active then
//  begin
//     QryMovItensExames.Close;
//     QryMovItensExames.ParamByName('CodMovExames').Value := QryMovExamesCodMovExames.Value;
//     QryMovItensExames.Active := True;
//  end
//  else
//     QryMovItensExames.Close;

end;

procedure TFrmLaudo.DBGrid2CellClick(Column: TColumn);
begin
    DBGrid2.Canvas.Brush.Color:= clBlue;
end;

procedure TFrmLaudo.DBGrid2DrawColumnCell(Sender: TObject;
  const Rect: TRect; DataCol: Integer; Column: TColumn;
  State: TGridDrawState);
begin
    if QryMovExamesLiberado.Value = 'S' then
      //Azul
         DBGrid2.Canvas.Brush.Color:= $00FFE29F
    else
       DBGrid2.Canvas.Brush.Color:= clInfoBk;//$0083F7FA;
    if ((QryMovExamesLiberado.value <> 'S') and (QryMovExamesDataProvResultado.value < now))  then
       DBGrid2.Canvas.Brush.Color:= clred;

   {if DM_AgendaPaciente.qryTipoConsulta.Value = 'U' then
      DBGrid.Canvas.Font.Color :=clRed;
   {else
      if DM_AgendaPaciente.qryTipoConsulta.Value = 'R' then
        DBGrid.Canvas.Font.Color :=$00C0CFB1
     else DBGrid.Canvas.Font.Color :=$004A46F7;}


DBGrid2.Canvas.Font.Color:= clWindowText;
DBGrid2.Canvas.FillRect(Rect);
DBGrid2.DefaultDrawColumnCell(Rect, DataCol, Column, State);

//verde $00C0CFB1
//rosa $008885FA
//vermelho $004A46F7                     //amarelo $0083F7FA


end;

procedure TFrmLaudo.BbtnExcluirItensClick(Sender: TObject);
var
  ok : boolean;
begin
  CodPedido := QryQualquerCodMovPedido.Value;
  CodExame := QryMovExamesCodMovExames.Value;
  CodItensExame := QryMovItensExamesCodMovItensExames.value;
  ok := true;
  QryMovItensExames.First;
  IF QryMovItensExames.Eof then
  begin
     SPLIBERADO.Prepare;
     With SPLiberado do
     begin
        ParamByname('@CodMovExames_1').Value := QryMovExamesCodMovExames.Value;
        if not ok then
           ParamByname('@Liberado_2').Value :=  'N'
        else
           ParamByname('@Liberado_2').Value :=  'S';
        execproc;
///////////////
        SPRespLAUDO.Prepare;
        With SPRespLAUDO do
        begin
            ParamByname('@CodMovPedido_1').Value := QryQualquerCodMovPedido.Value;
            ParamByname('@CodProfLaudo_2').Value :=  QryProfLaudoCodProfLaudo.Value;
     	      ParamByname('@AssinaturaScanner_3').Value :=  'N';
      	    ParamByname('@status_4').Value :=  'C';
            execproc;
        end;



   end;


  end;
  While Not QryMovItensExames.Eof do
  begin
     if QryMovItensExamesTipoCampo.Value = 'N' then
     begin
        IF length(QryMovItensExamesReferencia1.Value) > 0 then
           IF ((QryMovItensExamesResultado1.IsNull) and (QryMovItensExamesObrigatorio.Value = 'S')) then
           begin
               ShowMessage('Item do Exame. '+QryMovItensExamesNomeItemExame.Value+#13+
                       'Campo de 1º Resultado sem Informação. Favor Lançar o Resultado.');
               Ok := False;
           end;
        IF length(QryMovItensExamesReferencia2.Value) > 0 then
           IF ((QryMovItensExamesResultado2.IsNull) and (QryMovItensExamesObrigatorio.Value = 'S'))then
           begin
               ShowMessage('Item do Exame. '+QryMovItensExamesNomeItemExame.Value+#13+
                       'Campo de 2º Resultado sem Informação. Favor Lançar o Resultado.');
               Ok := False;
           end;
     end
     else
     begin
        if ((length(QryMovItensExamesResultadoTexto.Value) <= 1)and (QryMovItensExamesObrigatorio.Value = 'S')) then
        begin
           ShowMessage('Item do Exame. '+QryMovItensExamesNomeItemExame.Value+#13+
                       'Campo de Resultado sem Informação. Favor Lançar o Resultado.');
           Ok := False;
        end;
     end;
     QryMovItensExames.Next;
  end;

   IF not ok then
     ShowMessage('Exame não liberado o Resultado. Favor Corrigir as pendências');

   SPLIBERADO.Prepare;
   With SPLiberado do
   begin
      ParamByname('@CodMovExames_1').Value := QryMovExamesCodMovExames.Value;
      if not ok then
         ParamByname('@Liberado_2').Value :=  'N'
      else
         ParamByname('@Liberado_2').Value :=  'S';
      execproc;
   end;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

//   IF QryQualquerCodProfLaudo.IsNull then
//   begin
      CodPedido := QryQualquerCodMovPedido.Value;
      CodExame := QryMovExamesCodMovExames.Value;
      CodItensExame := QryMovItensExamesCodMovItensExames.value;
      QryQualquer.Edit;
      PageControl1.ActivePage := TSLaudo;
      RxDBLookupCombo3.KeyValue := qryProflaudoCodProfLaudo.Value;
      RxDBLookupCombo3.SetFocus;
//   end;
end;

procedure TFrmLaudo.BbtnImprimirClick(Sender: TObject);
var
  dd,mm,aa : word;
  total, i : integer;
  ok : boolean;
begin
   ok := True;
   CodPedido := QryQualquerCodMovPedido.Value;
   CodExame := QryMovExamesCodMovExames.Value;
   CodItensExame := QryMovItensExamesCodMovItensExames.value;
   QryProfLaudo.Locate('CodProfLaudo',qryproflaudoCodProflaudo.Value,[]);
   IF laudo = 0 then
   begin
      QryMovExamesRel.Close;
      QryMovExamesRel.SQL.Clear;
      QryMovExamesRel.SQL.Add(' Select  Me.*  ');
      QryMovExamesRel.SQL.Add(' From MovExames Me ');
      QryMovExamesRel.SQL.Add(' Where ');
      QryMovExamesRel.SQL.Add(' (me.CodMovPedido = :CodMovPedido) ');
      QryMovExamesRel.SQL.Add(' and   ');
      QryMovExamesRel.SQL.Add(' (Liberado = ''S'')  ');
      QryMovExamesRel.SQL.Add(' Order by Me.Liberado  ');
      QryMovExamesRel.Active := True;

   end;
   IF laudo = 1 then
   begin
      ok := false;
      QryMovExamesRel.Close;
      QryMovExamesRel.SQL.Clear;
      QryMovExamesRel.SQL.Add(' Select  Me.*  ');
      QryMovExamesRel.SQL.Add(' From MovExames Me ');
      QryMovExamesRel.SQL.Add(' Where ');
      QryMovExamesRel.SQL.Add(' (me.CodMovPedido = :CodMovPedido) ');
      QryMovExamesRel.SQL.Add(' and   ');
      QryMovExamesRel.SQL.Add(' (Liberado = ''S'')  ');
      QryMovExamesRel.SQL.Add(' and ( ');
      total:= Checklistbox1.Items.Capacity - 1;
      for i := 0 to total do
      begin
          if checklistbox1.Checked[i] then
          begin
             IF not ok then
                QryMovExamesRel.SQL.Add(' Me.CodMovExames = '+trim(copy(checklistbox1.Items.Strings[i],1,10)) )
             else
                QryMovExamesRel.SQL.Add(' OR Me.CodMovExames = '+trim(copy(checklistbox1.Items.Strings[i],1,10)) );
             ok := true;
          end;
      end;
      IF not ok then
         QryMovExamesRel.SQL.Add('  Me.CodMovExames = 0 ) ')
      else
         QryMovExamesRel.SQL.Add('  ) ');
      QryMovExamesRel.SQL.Add(' Order by Me.Liberado  ');
//      ShowMessage(QryMovExamesRel.SQL.Text);
      QryMovExamesRel.Active := True;
   end;
//   QryMovExamesRel.First;
   IF QryMovExamesRel.Eof then
   Begin
      IF laudo = 0 then
         ShowMessage('Nenhum Resultado esta Liberado para Impressão...');
      IF laudo = 1 then
         ShowMessage('Nenhum Exame foi selecionado ou o resultado não esta Liberado para Impressão...');
      exit;
   end;
//    Pend := False;
    IF FrmResultado = nil then
       FrmResultado  := TFrmResultado.Create(Self);
{
    QryMovExames.First;
    FrmResultado.QRRichText1.Lines.Clear;
    While not QryMovExames.Eof do
    begin
       IF QryMovExamesLiberado.Value = 'N' then
       begin
          IF not pend  then
          begin
             Pend := True;
             FrmResultado.QRRichText1.Color := CLSilver;
             FrmResultado.QRRichText1.Lines.Add('Exames Pendentes');
          end;

          FrmResultado.QRRichText1.Lines.Add(QryMovExamesNomeExame.Value);
          FrmResultado.QRRichText1.Height := FrmResultado.QRRichText1.Height + 15;
//          IF FrmResultado.QRRichText1.Height > FrmResultado.PageHeader.Height then
          FrmResultado.PageHeader.Height := FrmResultado.PageHeader.Height + 15;
       end;
       QryMovExames.Next;
    end;
    QryMovExames.First;

    IF not pend then
    begin
//         FrmResultado.QRRichText1.Lines.Add('Não Existem Exames Pendentes');
       FrmResultado.QRRichText1.Color := CLWindow;
    end;
}
     if Application.MessageBox('Deseja Imprimir o Cabeçario e o Assinatura ? ',
         'Confirme', 4  + MB_ICONQUESTION)= idYes then
     begin
        FrmResultado.QRDBImageEsquerda.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText5.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText6.DataSet := DMLABVET.QryEmpresa;
//        FrmResultado.QRDBText3.DataSet := DMLABVET.QryEmpresa;

        FrmResultado.QRDBText28.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText29.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText30.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText35.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText37.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText38.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText39.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText40.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.QRDBText6.DataSet := DMLABVET.QryEmpresa;
        FrmResultado.qRlaBEL17.Caption := 'Fone:';
        FrmResultado.qRlaBEL22.Caption := 'CNPJ';
        FrmResultado.qRlaBEL18.Caption := 'HEMATOLOGIA -  HEMOSTASIA - BIOQUÍMICA URINÁLISE -  ANÁLISE  DE';
        FrmResultado.qRlaBEL19.Caption := 'FLUÍDOS CORPÓREOS - PARASITOLOGIA - MICROBIOLOGIA - TOXICOLOGIA';
        FrmResultado.qRlaBEL20.Caption := 'BIOLOGIA MOLECULAR (PCR) - SOROLOGIA -ENDOCRINOLOGIA -CITOLOGIA';
        FrmResultado.qRlaBEL21.Caption := 'HISTOPATOLOGIA - MIELOGRAMA';
//        IF QryProfLaudoMensagem_Qualidade.Value = 'S' then
//        begin
//            FrmResultado.QRLMensQualidade1.Caption := 'Controle de';
//            FrmResultado.QRLMensQualidade2.Caption := 'Qualidade';
//        end
//        Else
//        begin
        FrmResultado.QRLMensQualidade1.Caption := '';
        FrmResultado.QRLMensQualidade2.Caption := '';
//        end;

        FrmResultado.QRShape1.Width := 761;
        FrmResultado.QRShape3.Width := 506;
        FrmResultado.QRShape4.Width := 506;

        if  FrmLaudo.QryProfLaudoAssinatura.BlobSize > 1 then
            FrmResultado.QRDBImage1.DataSet := FrmLaudo.QryProfLaudo
        else
           FrmResultado.QRDBImage1.DataSet := nil;

     end
     else
     begin

            FrmResultado.QRDBImageEsquerda.DataSet := nil;
            FrmResultado.QRDBText5.DataSet := nil;
            FrmResultado.QRDBText6.DataSet := nil;
            FrmResultado.QRDBText28.DataSet := nil;
            FrmResultado.QRDBText29.DataSet := nil;
            FrmResultado.QRDBText30.DataSet := nil;
            FrmResultado.QRDBText35.DataSet := nil;
            FrmResultado.QRDBText37.DataSet := nil;
            FrmResultado.QRDBText38.DataSet := nil;
            FrmResultado.QRDBText39.DataSet := nil;
            FrmResultado.QRDBText40.DataSet := nil;
            FrmResultado.QRDBText6.DataSet := nil;;
            FrmResultado.qRlaBEL17.Caption := '';
            FrmResultado.qRlaBEL18.Caption := '';
            FrmResultado.qRlaBEL19.Caption := '';
            FrmResultado.qRlaBEL20.Caption := '';
            FrmResultado.qRlaBEL22.Caption := '';
            FrmResultado.qRlaBEL21.Caption := '';

            if Application.MessageBox('Deseja Controle de Qualidade e o Assinatura ? ',
            'Confirme', 4  + MB_ICONQUESTION)= idYes then
            begin
                FrmResultado.QRLMensQualidade1.Caption := 'Controle de';
                FrmResultado.QRLMensQualidade2.Caption := 'Qualidade';
                if  FrmLaudo.QryProfLaudoAssinatura.BlobSize > 1 then
                    FrmResultado.QRDBImage1.DataSet := FrmLaudo.QryProfLaudo
                else
                    FrmResultado.QRDBImage1.DataSet := nil;
            end
            Else
            begin
                FrmResultado.QRLMensQualidade1.Caption := '';
                FrmResultado.QRLMensQualidade2.Caption := '';
                FrmResultado.QRDBImage1.DataSet := nil;
            end;
            FrmResultado.QRShape1.Width := 0;
            FrmResultado.QRShape3.Width := 0;
            FrmResultado.QRShape4.Width := 0;

        //        FrmResultado.QRDBText20.DataSet := nil;
//            FrmResultado.QRDBImage1.DataSet := nil;

     end;
//     FrmResultado.ShowModal;
    decodedate(now,aa,mm,dd);
    FrmResultado.QRLabel13.Caption := 'Presidente Prudente, '+inttostr(dd);
    IF mm = 1 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Janeiro de '+inttostr(aa);
    IF mm = 2 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Fevereiro de '+inttostr(aa);
    IF mm = 3 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Março de '+inttostr(aa);
    IF mm = 4 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Abril de '+inttostr(aa);
    IF mm = 5 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Maio de '+inttostr(aa);
    IF mm = 6 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Junho de '+inttostr(aa);
    IF mm = 7 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Julho de '+inttostr(aa);
    IF mm = 8 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Agosto de '+inttostr(aa);
    IF mm = 9 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Setembro de '+inttostr(aa);
    IF mm = 10 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Outubro de '+inttostr(aa);
    IF mm = 11 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Novembro de '+inttostr(aa);
    IF mm = 12 then
       FrmResultado.QRLabel13.Caption := FrmResultado.QRLabel13.Caption+' Dezembro de '+inttostr(aa);

    FrmResultado.QuickRep1.Preview;
    FrmResultado.Close;
    QryMovItensExames.Close;
    QryMovItensExames.Active := True;
    PageControl1.ActivePage := TSPesquisa;
    Panel1.Enabled := True;
    BbtnPesquisar.Click;

end;

procedure TFrmLaudo.BitBtn2Click(Sender: TObject);
var
  ok :boolean;
begin
   ok := True;
   IF RxDBLookupCombo3.KeyValue < 1 then
   begin
      ShowMessage('Selecione o responsável pelo Laudo.');
      RxDBLookupCombo3.SetFocus;
      exit;
   end;
   codexame := QryMovItensExamesCodMovItensExames.Value;
   QryMovExames.First;
   While not QryMovExames.Eof do
   begin
      IF QryMovExamesLiberado.Value <> 'S' then
        ok := False;
      QryMovExames.Next;
   end;

   SPRespLAUDO.Prepare;
   With SPRespLAUDO do
   begin
       ParamByname('@CodMovPedido_1').Value := QryQualquerCodMovPedido.Value;
	     ParamByname('@CodProfLaudo_2').Value :=  RxDBLookupCombo3.KeyValue;
       IF CheckBox1.Checked then
    	     ParamByname('@AssinaturaScanner_3').Value :=  'S'
       else
    	     ParamByname('@AssinaturaScanner_3').Value :=  'N';
       IF CheckBox2.Checked and not ok then
          ShowMessage('Não Foi Possível Concluir o Pedido. Ainda Existe Exames Pendentes'+#13+
                      'Apenas Será Informado o Profissional Responsável'+#13+
                      'Após digitar os Exames Pendentes, Concluir novamente o Pedido.');
       IF ok then
    	     ParamByname('@status_4').Value :=  'C'
       else
    	     ParamByname('@Status_4').Value :=  'P';

       execproc;
   end;

   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmLaudo.BitBtn3Click(Sender: TObject);
begin
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;
end;

procedure TFrmLaudo.DBGrid1CellClick(Column: TColumn);
begin
    DBGrid1.Canvas.Brush.Color:= clBlue;

end;

procedure TFrmLaudo.DBGrid1DrawColumnCell(Sender: TObject;
  const Rect: TRect; DataCol: Integer; Column: TColumn;
  State: TGridDrawState);
begin
    if QryQualquerCodProfLaudo.Value > 0 then
      //Azul
         DBGrid1.Canvas.Brush.Color:= $00FFE29F
    else
       DBGrid1.Canvas.Brush.Color:= clInfoBk;
//    if ((QryMovExamesLiberado.value <> 'S') and (QryMovExamesDataProvResultado.value < now))  then
//       DBGrid2.Canvas.Brush.Color:= clred;

   {if DM_AgendaPaciente.qryTipoConsulta.Value = 'U' then
      DBGrid.Canvas.Font.Color :=clRed;
   {else
      if DM_AgendaPaciente.qryTipoConsulta.Value = 'R' then
        DBGrid.Canvas.Font.Color :=$00C0CFB1
     else DBGrid.Canvas.Font.Color :=$004A46F7;}


DBGrid1.Canvas.Font.Color:= clWindowText;
DBGrid1.Canvas.FillRect(Rect);
DBGrid1.DefaultDrawColumnCell(Rect, DataCol, Column, State);

//verde $00C0CFB1
//rosa $008885FA
//vermelho $004A46F7                     //amarelo $0083F7FA



end;

procedure TFrmLaudo.BbtnTodosLaudosClick(Sender: TObject);
begin
//   PageControl1.ActivePage := tstodos;
//   DSMovItensExames.AutoEdit := True;
end;

procedure TFrmLaudo.RxDBGrid1DrawColumnCell(Sender: TObject;
  const Rect: TRect; DataCol: Integer; Column: TColumn;
  State: TGridDrawState);

begin
 
 if not odd(QryMovItensExames.RecNo) then
 begin
   DBGrid1.Canvas.Brush.Color:= clMoneyGreen;
   DBGrid1.Canvas.FillRect(Rect);
   DBGrid1.DefaultDrawDataCell(Rect, Column.Field, State);

   if gdFocused in State then
   begin
     DBGrid1.Canvas.Brush.Color:= clBlack;
     DBGrid1.Canvas.FillRect(Rect);
     DBGrid1.DefaultDrawDataCell(Rect, Column.Field, State);
   end;
 end;
end;

procedure TFrmLaudo.BbtnVoltaClick(Sender: TObject);
begin
   BbtnGravaItens.Click;
   QryMovItensExames.Prior;
   IF Not QryMovItensExames.bof then
   begin
      QryMovItensExames.Prior;
      BbtnIncluirItens.Click;
   end;
end;

procedure TFrmLaudo.BbtnAvancaClick(Sender: TObject);
begin
   bbtnGravaItens.Click;

end;

procedure TFrmLaudo.CheckBox3Click(Sender: TObject);
Var
   i, total: integer;
begin
  total:= Checklistbox1.Items.Capacity - 1;
   if Checkbox3.Checked then
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

procedure TFrmLaudo.BbtnCancelaLibClick(Sender: TObject);
begin
  CodPedido := QryQualquerCodMovPedido.Value;
  CodExame := QryMovExamesCodMovExames.Value;
  CodItensExame := QryMovItensExamesCodMovItensExames.value;
  SPLIBERADO.Prepare;
  With SPLiberado do
  begin
      ParamByname('@CodMovExames_1').Value := QryMovExamesCodMovExames.Value;
      ParamByname('@Liberado_2').Value :=  'N';
      execproc;
   end;
   try
     SPRespLAUDO.Prepare;
     With SPRespLAUDO do
     begin
         ParamByname('@CodMovPedido_1').Value := QryQualquerCodMovPedido.Value;
         ParamByname('@CodProfLaudo_2').Value :=  QryQualquerCodProfLaudo.Value;
         ParamByname('@AssinaturaScanner_3').Value :=  'N';
    	    ParamByname('@status_4').Value :=  'P';
        execproc;
     end;
   except
   end;

   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmLaudo.Dbedit2Change(Sender: TObject);
begin
   Alterou := True;
end;

procedure TFrmLaudo.FormActivate(Sender: TObject);
begin
   IF laudo = 0 then
   begin
      PageControl3.ActivePage := TabSheet3;
   end;
   IF laudo = 1 then
   begin
      PageControl3.ActivePage := TabSheet4;
   end;

end;

procedure TFrmLaudo.RxDBLookupCombo1Change(Sender: TObject);
begin
    QryExamesPedido.Close;
    QryExamesPedido.ParamByName('CodEspecie').Value := QryEspecieCodEspecie.Value;
    QryExamesPedido.Active := True;
    QryExamesPedido.First;
    RxDBLookupCombo4.KeyValue := QryExamesPedidoCodExame.value;
end;

end.
