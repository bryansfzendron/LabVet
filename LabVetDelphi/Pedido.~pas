unit Pedido;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, StdCtrls, RxDBComb, Spin, DBCtrls, ToolEdit,
  CurrEdit, RXDBCtrl, Mask, Grids, DBGrids, ComCtrls, RxLookup, Buttons,
  ExtCtrls, DateUtils, Winsock;

type
  TFrmPedido = class(TForm)
    Panel1: TPanel;
    Label9: TLabel;
    BbtnPesquisar: TBitBtn;
    RxDBLookupCombo2: TRxDBLookupCombo;
    Panel3: TPanel;
    PageControl1: TPageControl;
    TSPesquisa: TTabSheet;
    Panel2: TPanel;
    BBtnIncluir: TBitBtn;
    BBtnAlterar: TBitBtn;
    BbtnExcluir: TBitBtn;
    BbtnImprimir: TBitBtn;
    BBtnFechat: TBitBtn;
    Panel5: TPanel;
    Panel6: TPanel;
    DBGrid1: TDBGrid;
    Panel7: TPanel;
    Panel8: TPanel;
    Label7: TLabel;
    Panel9: TPanel;
    BbtnIncluirItens: TBitBtn;
    BbtnAlterarItens: TBitBtn;
    BbtnExcluirItens: TBitBtn;
    Panel10: TPanel;
    TSManutencao: TTabSheet;
    Panel4: TPanel;
    BBtnGravar: TBitBtn;
    BBtnCancelar: TBitBtn;
    TSItens: TTabSheet;
    Panel11: TPanel;
    BitBtn1: TBitBtn;
    BbtnCancelaItens: TBitBtn;
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
    QryEspecie: TQuery;
    DsEspecie: TDataSource;
    QryMovExames: TQuery;
    DSMovExames: TDataSource;
    UPDItens: TUpdateSQL;
    QryExameItensSeq: TQuery;
    QryExameItensSeqCodItensExame: TAutoIncField;
    QryExameItensSeqCodExame: TIntegerField;
    QryExameItensSeqOrdemApresentacao: TIntegerField;
    QryExameItensSeqNomeItemExame: TStringField;
    QryExameItensSeqReferencia: TStringField;
    QryExameItensSeqUnidade: TStringField;
    QryExameItensSeqDigitaCampo: TStringField;
    QryExameItensSeqMinimo: TFloatField;
    QryExameItensSeqMaximo: TFloatField;
    QryExameItensSeqObrigatorio: TStringField;
    QryExameItensSeqTipoCampo: TStringField;
    GroupBox2: TGroupBox;
    Dti: TDateEdit;
    Dtf: TDateEdit;
    EdPedido: TRxCalcEdit;
    Label1: TLabel;
    ScrollBox1: TScrollBox;
    Label3: TLabel;
    DBEdit2: TDBEdit;
    Label6: TLabel;
    Label18: TLabel;
    DBEdit15: TDBEdit;
    Label8: TLabel;
    DBEdit6: TDBEdit;
    DBDateEdit1: TDBDateEdit;
    MedHora: TMaskEdit;
    Label2: TLabel;
    RxDBLookupCombo3: TRxDBLookupCombo;
    Label5: TLabel;
    Label10: TLabel;
    RxDBLookupCombo4: TRxDBLookupCombo;
    QryProfSolic: TQuery;
    DSPRofSolic: TDataSource;
    QryProfSolicCodProfSolic: TAutoIncField;
    QryProfSolicAbrevConselho: TStringField;
    QryProfSolicNomeProfSolic: TStringField;
    QryProfSolicNumConselho: TStringField;
    QryProfSolicEmail: TStringField;
    QryProfSolicTelefone: TStringField;
    QryProfSolicCelular: TStringField;
    QryProfSolicNascimento: TDateTimeField;
    QryProfSolicativo: TStringField;
    DBCheckBox1: TDBCheckBox;
    RxDBLookupCombo5: TRxDBLookupCombo;
    Label4: TLabel;
    EdProtocolo: TEdit;
    Label20: TLabel;
    Label22: TLabel;
    Label23: TLabel;
    BbtnLimpa: TBitBtn;
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
    ScrollBox2: TScrollBox;
    Label37: TLabel;
    DBEdit16: TDBEdit;
    QryExames: TQuery;
    DSExames: TDataSource;
    QryExamesCodExame: TAutoIncField;
    QryExamesCodEspecie: TIntegerField;
    QryExamesNomeExame: TStringField;
    QryExamesNomeExameReduz: TStringField;
    QryExamesValor: TFloatField;
    QryExamesDias_Elaboracao_Exame: TIntegerField;
    QryExamesImprimirSeparado: TStringField;
    QryExamesMetodo: TStringField;
    QryExamesMaterial: TStringField;
    QryExamesItens: TQuery;
    DSExamesItens: TDataSource;
    QryExamesItensCodItensExame: TAutoIncField;
    QryExamesItensCodExame: TIntegerField;
    QryExamesItensOrdemApresentacao: TIntegerField;
    QryExamesItensNomeItemExame: TStringField;
    QryExamesItensReferencia1: TStringField;
    QryExamesItensReferencia2: TStringField;
    QryExamesItensDigitaCampo: TStringField;
    QryExamesItensMinimo: TFloatField;
    QryExamesItensMaximo: TFloatField;
    QryExamesItensObrigatorio: TStringField;
    QryExamesItensTipoCampo: TStringField;
    QryMovItensExames: TQuery;
    DSMovItensExames: TDataSource;
    UPDMovExamesItens: TUpdateSQL;
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
    RxDBLookupCombo6: TRxDBLookupCombo;
    Label24: TLabel;
    SPInsertMovExames: TStoredProc;
    Panel12: TPanel;
    Panel13: TPanel;
    DBGrid2: TDBGrid;
    Panel14: TPanel;
    DBGrid3: TDBGrid;
    SPInsertMovItensExames: TStoredProc;
    Panel15: TPanel;
    DBGrid4: TDBGrid;
    QryMovExamesLiberado: TStringField;
    SPUpdMovExames: TStoredProc;
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
    QryQualquerCliente: TStringField;
    QryQualquernomeespecie: TStringField;
    Label21: TLabel;
    Edit1: TEdit;
    Label27: TLabel;
    QryEspecieCodEspecie: TAutoIncField;
    QryEspecieNomeEspecie: TStringField;
    DBEdit1: TDBEdit;
    Label15: TLabel;
    Label12: TLabel;
    DBEdit3: TDBEdit;
    Label13: TLabel;
    DBEdit4: TDBEdit;
    Label11: TLabel;
    DBEdit5: TDBEdit;
    DBEdit7: TDBEdit;
    Label14: TLabel;
    Label25: TLabel;
    Label26: TLabel;
    Edit3: TEdit;
    Label28: TLabel;
    Label29: TLabel;
    RxDBLookupCombo1: TRxDBLookupCombo;
    RadioGroup1: TRadioGroup;
    Label30: TLabel;
    Edit5: TEdit;
    EdCodPedido: TRxCalcEdit;
    QryClienteCodVetResp: TIntegerField;
    Edit4: TEdit;
    QryMovItensExamesUnidade1: TStringField;
    QryMovItensExamesUnidade2: TStringField;
    QryExamesItensUnidade1: TStringField;
    QryExamesItensUnidade2: TStringField;
    QryMovItensExamesCasasDecimais1: TIntegerField;
    QryMovItensExamesCasasDecimais2: TIntegerField;
    QryMovItensExamesTipoCampo2: TStringField;
    QryExamesItensCasasDecimais1: TIntegerField;
    QryExamesItensCasasDecimais2: TIntegerField;
    QryExamesItensTipoCampo2: TStringField;
    Label16: TLabel;
    DBEdit8: TDBEdit;
    QryQualquerDataLiberacao: TDateTimeField;
    QryQualquerRaca: TStringField;
    QryQualquerAno: TIntegerField;
    QryMovItensExamesFormula: TStringField;
    QryMovItensExamesOrigemCalculo: TStringField;
    QryMovItensExamesCodPai: TIntegerField;
    QryMovItensExamesPercFormula: TFloatField;
    procedure FormActivate(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure BBtnIncluirClick(Sender: TObject);
    procedure BBtnAlterarClick(Sender: TObject);
    procedure BbtnExcluirClick(Sender: TObject);
    procedure BBtnFechatClick(Sender: TObject);
    procedure BbtnIncluirItensClick(Sender: TObject);
    procedure BbtnAlterarItensClick(Sender: TObject);
    procedure BbtnExcluirItensClick(Sender: TObject);
    procedure BBtnGravarClick(Sender: TObject);
    procedure BBtnCancelarClick(Sender: TObject);
    procedure BitBtn1Click(Sender: TObject);
    procedure BbtnCancelaItensClick(Sender: TObject);
    procedure RxDBLookupCombo2Exit(Sender: TObject);
    procedure DSClienteDataChange(Sender: TObject; Field: TField);
    procedure Button1Click(Sender: TObject);
    procedure BbtnLimpaClick(Sender: TObject);
    procedure DSQualquerDataChange(Sender: TObject; Field: TField);
    procedure DSExamesDataChange(Sender: TObject; Field: TField);
    procedure RxDBLookupCombo6Change(Sender: TObject);
    procedure DSMovExamesDataChange(Sender: TObject; Field: TField);
    procedure BbtnImprimirClick(Sender: TObject);
    procedure RxDBLookupCombo3Change(Sender: TObject);
    procedure Edit4Change(Sender: TObject);
    procedure DBEdit4Change(Sender: TObject);
  private
    { Private declarations }
    entrada : integer;
  public
    { Public declarations }
  end;

var
  FrmPedido: TFrmPedido;
  function Encripta(const S: String; Key: Word): String;
function Decripta(const S: String; Key: Word): String;
function GetIP:string;
function SysComputerName: string;
Function Codifica( const Str1: string): String;


implementation

uses DM_LABVET, Menu, RelPedidos;

{$R *.dfm}

Function Codifica( const Str1: string): String;
{Encripta uma string}
var
Mascara,Str2: String;
PonM, PonS: Byte;
begin
Mascara := '#$%$'#13#12;
Str2 := '';
PonM := 1;
for PonS:=1 to length(Str1) do
    begin
    AppendStr( Str2, Chr( Ord(Str1[PonS]) Xor Ord(Mascara[PonM])));
    Inc( PonM);
    if PonM>Length(Mascara) then
       begin
       PonM:=1;
       end;
    Result := Str2;
    end;
end;


function Decripta(const S: String; Key: Word): String;
const
  C1 = 52845;
  C2 = 22719;
var
  I: byte;
begin
  SetLength(Result,Length(S));
  for I := 1 to Length(S) do
  begin
    Result[I]:=char(byte(S[I]) -I);
  end;
end;


function SysComputerName: string;
var
  I: DWord;
begin
  I := MAX_COMPUTERNAME_LENGTH + 1;
  SetLength(Result, I);
  Windows.GetComputerName(PChar(Result), I);
  Result := string(PChar(Result));
end;

function GetIP:string;
//--> Declare a Winsock na clausula uses da unit
var
  WSAData: TWSAData;
  HostEnt: PHostEnt;
  Name:string;
begin
  WSAStartup(2, WSAData);
  SetLength(Name, 255);
  Gethostname(PChar(Name), 255);
  SetLength(Name, StrLen(PChar(Name)));
  HostEnt := gethostbyname(PChar(Name));
  with HostEnt^ do
  begin
    Result := Format('%d%d%d%d',
    [Byte(h_addr^[0]),Byte(h_addr^[1]),
    Byte(h_addr^[2]),Byte(h_addr^[3])]);
  end;
  WSACleanup;
end;

function Encripta(const S: String; Key: Word): String;
const
  C1 = 52845;
  C2 = 22719;
var
  I: byte;
begin
{0 Ascii 48
1 Ascii 49
2 Ascii 50
3 Ascii 51
4 Ascii 52
5 Ascii 53
6 Ascii 54
7 Ascii 55
8 Ascii 56
9 Ascii 57}

  SetLength(Result,Length(S));
  for I := 1 to Length(S) do
  begin
     IF char(byte(S[I])) = '9' then
        Result[I]:=char(byte(S[I]))
     else
        Result[I]:=char(byte(S[I]) + 1);
     IF not (Result[I] in ['0','1','2','3','4','5','6','7','8','9']) then
        Result[I] := '9';
  end;
end;







procedure TFrmPedido.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   QryProfSolic.Close;
   QryProfSolic.Active := true;
   QryCliente.Close;
   QryCliente.Active := True;
   QryEspecie.Close;
   QryEspecie.Active := True;

//   RxDBLookupCombo2.KeyValue := QryClienteCodCliente.Value;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
   BbtnImprimir.Enabled := False;
   BbtnIncluiritens.Enabled := False;
   BbtnExcluirItens.Enabled := False;
   BbtnAlterarItens.Enabled := False;
   dti.Date := now;
   dtf.Date := now;

end;

procedure TFrmPedido.FormClose(Sender: TObject; var Action: TCloseAction);
begin
    Release;
    FrmPedido := nil;
end;

procedure TFrmPedido.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   TSItens.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;
   RxDBLookupCombo1.ClearValue;
   RxDBLookupCombo2.ClearValue;
   Entrada := 1;
end;

procedure TFrmPedido.BbtnPesquisarClick(Sender: TObject);
begin
   QryQualquer.Close;
   IF RxDBLookupCombo2.KeyValue > 0 then
      QryQualquer.ParamByName('CodCliente').Value := RxDBLookupCombo2.KeyValue
   else
      QryQualquer.ParamByName('CodCliente').Value := -1;
   IF RxDBLookupCombo1.KeyValue > 0 then
      QryQualquer.ParamByName('CodEspecie').Value := RxDBLookupCombo1.KeyValue
   else
      QryQualquer.ParamByName('CodEspecie').Value := -1;
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
   IF LENGTH(TRIM(Edit1.Text)) > 0 then
      QryQualquer.ParamByName('NomeAnimal').Value := '%'+Edit1.Text+'%'
   else
      QryQualquer.ParamByName('NomeAnimal').Value := '-1';

   IF LENGTH(TRIM(Edit3.Text)) > 0 then
      QryQualquer.ParamByName('Proprietario').Value := '%'+Edit3.Text+'%'
   else
      QryQualquer.ParamByName('Proprietario').Value := '-1';

   IF LENGTH(TRIM(Edit4.Text)) > 0 then
      QryQualquer.ParamByName('SexoAnimal').Value := Edit4.Text
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
      BbtnINcluir.Enabled := True;
      BbtnAlterar.Enabled := False;
      BbtnExcluir.Enabled := False;
      BbtnImprimir.Enabled := False;
   end
   else
   begin
       BbtnINcluir.Enabled := True;
       BbtnAlterar.Enabled := True;
       BbtnExcluir.Enabled := True;
       BbtnImprimir.Enabled := True;
   end;

end;

procedure TFrmPedido.BBtnIncluirClick(Sender: TObject);
var
   codInterno : String;
begin
   QryQualquer.Insert;
   CodInterno := encripta(Copy(datetimetostr(now),1,2)+Copy(datetimetostr(now),4,2)+ Copy(datetimetostr(now),12,2)+Copy(datetimetostr(now),15,2)+Copy(datetimetostr(now),18,2)+Copy(datetimetostr(now),7,4),1);
   QryQualquerCodigoInterno.Value := TRIM(TRIM(DMLabvet.QryEmpresaAbreviatura.Value)+codinterno);
//          Copy(datetimetostr(now),1,2)+
 //         Copy(datetimetostr(now),4,2)+
//          Copy(datetimetostr(now),12,2)+Copy(datetimetostr(now),15,2)+
//          Copy(datetimetostr(now),18,2)+Copy(datetimetostr(now),7,4));
   QryQualquerSenha.Value := Encripta(copy(datetimetostr(now),1,2)+copy(datetimetostr(now),12,2)+copy(datetimetostr(now),15,2)+copy(datetimetostr(now),18,2),1);
   QryQualquerDataPedido.Value := strtodate(datetostr(now));
   QryQualquerHoraPedido.Value := timetostr(now);
   QryQualquerStatus.Value := 'P';
   MedHora.Text := QryQualquerHoraPedido.Value;
   QryQualquerRetirar.Value := 'N';
   DBCheckBox1.Checked := False;
   IF RxDBLookupCombo2.KeyValue > 0 then
   begin
      RxDBLookupCombo3.KeyValue :=  RxDBLookupCombo2.KeyValue;
      RxDBLookupCombo4.KeyValue := QryClienteCodVetResp.Value;
   end;
   if RxDBLookupCombo1.KeyValue > 0 then
   RxDBLookupCombo5.KeyValue :=  RxDBLookupCombo1.KeyValue;
//   ShowMessage('Usuario:'+QryQualquerCodigoInterno.Value+' Senha:'+QryQualquerSenha.Value);
//   DBCheckBox1.Checked;
//   QryQualquerImprimirSeparado.Value := 'S';
//   IF RxDBLookupCombo2.KeyValue > 0 then
//      QryQualquerCodEspecie.Value := RxDBLookupCombo2.KeyValue;
   PageControl1.ActivePage := TSManutencao;
   DBDateEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmPedido.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   MedHora.Text := QryQualquerHoraPedido.Value;
   if QryQualquerRetirar.Value = 'S' then
      DBCheckBox1.Checked := True
   else
      DBCheckBox1.Checked := False;

   PageControl1.ActivePage := TSMAnutencao;
//   DbEdit1.SetFocus;
   Panel1.Enabled := False;
   DBDateEdit1.SetFocus;

end;

procedure TFrmPedido.BbtnExcluirClick(Sender: TObject);
begin
   if ((QryQualquer.Eof) and (QryQualquer.RecNo = 0)) then
      ShowMessage('Último Encontrado, Pesquise Novamente')
  else
     if Application.MessageBox('Deseja excluir ? ',
         'Confirme', 4  + MB_ICONQUESTION)= idYes then
     begin
        try
           QryQualquer.Delete;
           QryQualquer.ApplyUpdates;
           QryQualquer.Close;
           QryQualquer.Active := true;
        except
           ShowMessage('Exclusão Proibida, Cadastro já Utilizado..');
           QryQualquer.Close;
           QryQualquer.Active := true;
        end;
     end;

end;

procedure TFrmPedido.BBtnFechatClick(Sender: TObject);
begin
    close;
end;

procedure TFrmPedido.BbtnIncluirItensClick(Sender: TObject);
begin
   QryExames.Close;
   QryExames.ParamByName('CodEspecie').Value := QryQualquerCodEspecie.Value;
   QryExames.Active := True;
   QryMovExames.Insert;
   QryMovExamesCodEspecie.Value := QryQualquerCodEspecie.Value;
   QryMovExamesLiberado.Value := 'N';
   RxDBLookupCombo6.Enabled := True;
// Carrega Ultimo Itens Lançado...
//   QryExameItensSeq.Close;
//   QryExameItensSeq.ParamByName('CodExame').Value := QryQualquerCodExame.Value;
//   QryExameItensSeq.Active := True;
//   if QryExameItensSeq.Eof then
//      SpinEdit1.Value := 1
//   else
//      SpinEdit1.Value := QryExameItensSeqOrdemApresentacao.Value+1;
///////////////
   QryMovExames.Insert;
//   RxDBComboBox1.ItemIndex := 0;
//   QryExamesItensTipoCampo.Value := 'N';
//   DBCheckBox2.Checked := true;
//   QryExamesItensDigitaCampo.Value := 'S';
//   DBCheckBox3.Checked := True;
//   QryExamesItensObrigatorio.Value := 'S';

//   QryExamesItensCodExame.Value := QryQualquerCodExame.Value;
//   Label19.Caption := QryQualquerNomeExame.Value;
   PageControl1.ActivePage := TSItens;
//   SpinEdit1.SetFocus;
   Panel1.Enabled := False;
   RxDBLookupCombo6.KeyValue := QryExamesCodExame.Value;

end;

procedure TFrmPedido.BbtnAlterarItensClick(Sender: TObject);
begin
   QryMovExames.Edit;
//   Label19.Caption := QryQualquerNomeExame.Value;
//   SpinEdit1.Value := QryExamesItensOrdemApresentacao.Value;
   PageControl1.ActivePage := TSItens;
//   DbEdit6.SetFocus;
   Panel1.Enabled := False;
   RxDBLookupCombo6.Enabled := False;
end;

procedure TFrmPedido.BbtnExcluirItensClick(Sender: TObject);
begin
  if ((QryQualquerStatus.Value = 'C')) then
  begin
     ShowMessage('Pedido já concluído......'+#13+
                 'Exclusão Não Permitida.....');
     exit;
  end;
   if ((QryMovExames.Eof) and (QryMovExames.RecNo = 0)) then
      ShowMessage('Último Encontrado, Pesquise Novamente')
  else
     if Application.MessageBox('Deseja excluir ? '+#13+
         'Você apagara o Exames e seus Itens.........',
         'Confirme', 4  + MB_ICONQUESTION)= idYes then
     begin
        try
           QryMovItensExames.First;
           While Not QryMovItensExames.Eof do
           begin
              QryMovItensExames.Delete;

//              QryMovItensExames.Next;

           end;
           QryMovItensExames.ApplyUpdates;
           QrymovExames.Delete;
           QrymovExames.ApplyUpdates;
           QrymovExames.Close;
           QrymovExames.Active := true;
        except
           ShowMessage('Exclusão Proibida, Cadastro já Utilizado..');
           QrymovExames.Close;
           QryMovExames.Active := true;
        end;
     end;



end;

procedure TFrmPedido.BBtnGravarClick(Sender: TObject);
begin

//   IF QryQualquerCodEspecie.Value <= 0 then
//   begin
//      ShowMessage('Selecione a Especie.');
//      RxDBLookupCombo5.SetFocus;
//      exit;
//  end;

   IF QryQualquerCodProfSolic.Value <= 0 then
   begin
      ShowMessage('Selecione o Veterinário.');
      RxDBLookupCombo4.SetFocus;
      exit;
   end;

   IF QryQualquerCodCliente.Value <= 0 then
   begin
      ShowMessage('Selecione o Clínica Veterinária.');
      RxDBLookupCombo3.SetFocus;
      exit;
   end;

   QryQualquerNomeEspecie.Value := QryEspecieNomeEspecie.Value;
   QryQualquerCliente.Value := QryClienteNome.Value;
   RxDBLookupCombo2.KeyValue :=  RxDBLookupCombo3.KeyValue;
   IF RxDBLookupCombo5.KeyValue > 0 then
      RxDBLookupCombo1.KeyValue :=  RxDBLookupCombo5.KeyValue;
   EdProtocolo.Text := QryQualquerCodigoInterno.Value;
   QryQualquerhorapedido.Value := MedHora.Text;
   QryQualquer.Post;
   QryQualquer.ApplyUpdates;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;

   BbtnPesquisar.Click;





end;

procedure TFrmPedido.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmPedido.BitBtn1Click(Sender: TObject);
var
   CodMovExames, CodMovItensExames : integer;
begin
      SPInsertMovExames.Prepare;
      With SPInsertMovExames do
      begin
          ParamByname('@CodMovPedido_2').Value := QryQualquerCodMovpedido.Value;
    	     ParamByname('@CodExame_3').Value :=  QryExamesCodExame.Value;
	     ParamByname('@DataProvResultado_4').Value := incday(QryQualquerDataPedido.Value,QryExamesDias_Elaboracao_Exame.Value);
	     ParamByname('@Valor_5').Value := QryExamesValor.Value;
	     ParamByname('@CodEspecie_6').Value := QryQualquerCodEspecie.Value;
	     ParamByname('@NomeExame_7').Value := QryExamesNomeExame.Value;
	     ParamByname('@NomeExameReduz_8').Value := QryExamesNomeExameReduz.Value;
	     ParamByname('@Dias_Elaboracao_Exame_9').Value := QryExamesDias_Elaboracao_Exame.Value;
	     ParamByname('@ImprimirSeparado_10').Value := QryExamesImprimirSeparado.Value;
	     ParamByname('@Metodo_11').Value := QryExamesMetodo.Value;
       if Length(Dbedit16.Text) > 0 then
	        ParamByname('@Material_12').Value := DbEdit16.Text
       else
          ParamByName('@Material_12').Value := QryExamesMaterial.Value;
       execproc;
       CodMovExames := ParamByName('@CodMovExames_1').Value;
   end;

////////////============
   QryExamesItens.First;
   While not QryExamesItens.Eof do
   begin

      SPInsertMovItensExames.Prepare;
      With SPInsertMovItensExames do
      begin
          ParamByname('@CodMovExames_2').Value := CodMovExames;
    	    ParamByname('@CodExame_3').Value :=  QryMovExamesCodExame.Value;
   	      ParamByname('@CodItensExame_4').Value := QryExamesItensCodItensExame.Value;
	        ParamByname('@Resultado1_5').Value := null;
	        ParamByname('@Resultado2_6').Value := null;
	        ParamByname('@ResultadoTexto_7').Value := null;
	        ParamByname('@OrdemApresentacao_8').Value := QryExamesItensOrdemApresentacao.Value;
	        ParamByname('@NomeItemExame_9').Value := QryExamesItensNomeItemExame.Value;
	        ParamByname('@Referencia1_10').Value := QryExamesItensReferencia1.Value;
	        ParamByname('@Referencia2_11').Value := QryExamesItensReferencia2.Value;
          ParamByname('@Unidade1_12').Value := QryExamesItensUnidade1.Value;
	        ParamByname('@DigitaCampo_13').Value := QryExamesItensDigitaCampo.Value;
	        ParamByname('@Obrigatorio_14').Value := QryExamesItensObrigatorio.Value;
	        ParamByname('@TipoCampo_15').Value := QryExamesItensTipoCampo.Value;
	        ParamByname('@Maximo_16').Value := QryExamesItensMaximo.Value;
	        ParamByname('@Minimo_17').Value := QryExamesItensMinimo.Value;
          ParamByname('@Unidade2_18').Value := QryExamesItensUnidade2.Value;
          ParamByname('@CasasDecimais1_19').Value := QryExamesItensCasasDecimais1.Value;
          ParamByname('@CasasDecimais2_20').Value := QryExamesItensCasasDecimais2.Value;
          ParamByname('@TipoCampo2_21').Value := QryExamesItensTipoCampo2.Value;
          execproc;
          CodMovItensExames := ParamByName('@CodMovItensExames_1').Value;
      end;
      QryExamesItens.Next;
   end;
   QryMovExames.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmPedido.BbtnCancelaItensClick(Sender: TObject);
begin
   QrymovExames.Cancel;
   QryMovExames.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmPedido.RxDBLookupCombo2Exit(Sender: TObject);
begin
//   QryAnimal.Close;
//   QryAnimal.ParamByName('CodCliente').Value := QryClienteCodCliente.Value;
//   QryAnimal.Active := True;
end;

procedure TFrmPedido.DSClienteDataChange(Sender: TObject; Field: TField);
begin
//   QryAnimal.Close;
//   QryAnimal.ParamByName('CodCliente').Value := QryClienteCodCliente.Value;
//   QryAnimal.Active := True;
end;

procedure TFrmPedido.Button1Click(Sender: TObject);
begin
//   ShowMessage(copy(datetimetostr(now),1,2)+copy(datetimetostr(now),12,2)+copy(datetimetostr(now),15,2)+copy(datetimetostr(now),18,2)+' --> '+Encripta(copy(datetimetostr(now),1,2)+copy(datetimetostr(now),12,2)+copy(datetimetostr(now),15,2)+copy(datetimetostr(now),18,2),1));
//  ShowMessage(Codifica(datetimetostr(now)));
end;

procedure TFrmPedido.BbtnLimpaClick(Sender: TObject);
begin
   RxDBLookupCombo1.ClearValue;
   RxDBLookupCombo2.ClearValue;
   EDProtocolo.Clear;
   EdPedido.Clear;
   EdCodPedido.Clear;
   Edit1.Clear;
   Edit4.Clear;
   Edit5.Clear;
   Edit3.Clear;
   Dti.Date := incday(strtodate(datetostr(now)),-15);
   Dtf.Date := strtodate(datetostr(now));
end;

procedure TFrmPedido.DSQualquerDataChange(Sender: TObject; Field: TField);
begin
   QryMovExames.Close;
   QryMovExames.ParamByName('CodMovPedido').Value := QryQualquerCodMovPedido.Value;
   QryMovExames.Active := True;
   IF QryMovExames.Eof then
   begin
      IF QryQualquer.Eof then
         BbtnIncluirItens.Enabled := False
      else
         BbtnIncluirItens.Enabled := True;
      BbtnExcluirItens.Enabled := false;
   end
   else
   begin
      BbtnIncluirItens.Enabled := True;
      BbtnExcluirItens.Enabled := true;

   end;
end;

procedure TFrmPedido.DSExamesDataChange(Sender: TObject; Field: TField);
begin
   IF QryExames.Active then
   begin
      QryExamesItens.Close;
      QryExamesItens.ParamByName('CodExame').Value := QryExamesCodExame.Value;
      QryExamesItens.Active := True;

   end
   else
      QryExamesItens.Close;

end;

procedure TFrmPedido.RxDBLookupCombo6Change(Sender: TObject);
begin
      QryMovExamesMaterial.Value := QryExamesMaterial.Value;
end;

procedure TFrmPedido.DSMovExamesDataChange(Sender: TObject; Field: TField);
begin
  IF QryMovExames.Active then
  begin
     QryMovItensExames.Close;
     QryMovItensExames.ParamByName('CodMovExames').Value := QryMovExamesCodMovExames.Value;
     QryMovItensExames.Active := True;
  end
  else
     QryMovItensExames.Close;

end;

procedure TFrmPedido.BbtnImprimirClick(Sender: TObject);
begin
    IF FrmRelPedidos = nil then
       FrmRelPedidos  := TFrmRelPedidos.Create(Self);
    FrmRelPedidos.QuickRep1.Preview;
    FrmRelPedidos.Close;
    BbtnPesquisar.Click;
end;

procedure TFrmPedido.RxDBLookupCombo3Change(Sender: TObject);
begin
      QryQualquerCodProfSolic.Value := QryClienteCodVetResp.Value;
      RxDBLookupCombo4.KeyValue := QryClienteCodVetResp.Value;
end;

procedure TFrmPedido.Edit4Change(Sender: TObject);
begin
   IF length(Edit4.Text) > 0 then
   begin
      IF (edit4.Text = 'F') or (Edit4.Text = 'M') then
         edit5.SetFocus
      else
      begin
         ShowMessage('Só permitido (M)acho ou (F)êmea');
         Edit4.Clear;
         Edit4.SetFocus;
      end;

   end;

end;

procedure TFrmPedido.DBEdit4Change(Sender: TObject);
begin

   IF (length(DBEdit4.Text) > 0) and (PageControl1.ActivePage = TSManutencao) then
   begin
      IF (DBedit4.Text = 'F') or (DBEdit4.Text = 'M') then
         DBedit5.SetFocus
      else
      begin
         ShowMessage('Só permitido (M)acho ou (F)êmea');
         DBEdit4.Clear;
         DBEdit4.SetFocus;
      end;

   end;

end;

end.
