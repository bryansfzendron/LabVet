unit ProfSolicitante;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, Mask, DBCtrls, Grids, DBGrids, ComCtrls, StdCtrls,
  Buttons, ExtCtrls, RxLookup, ToolEdit, RXDBCtrl;

type
  TFrmProfSolic = class(TForm)
    Panel1: TPanel;
    Label1: TLabel;
    EdNome: TEdit;
    BbtnPesquisar: TBitBtn;
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
    DBGrid1: TDBGrid;
    TSManutencao: TTabSheet;
    Panel4: TPanel;
    BBtnGravar: TBitBtn;
    BBtnCancelar: TBitBtn;
    QryQualquer: TQuery;
    UDPQualquer: TUpdateSQL;
    DSQualquer: TDataSource;
    QryQualquerCodProfSolic: TAutoIncField;
    QryQualquerAbrevConselho: TStringField;
    QryQualquerNomeProfSolic: TStringField;
    QryQualquerNumConselho: TStringField;
    Label2: TLabel;
    DBEdit1: TDBEdit;
    Label3: TLabel;
    DBEdit2: TDBEdit;
    QryConselho: TQuery;
    DSConselho: TDataSource;
    QryConselhoAbrevConselho: TStringField;
    QryConselhoNomeConselho: TStringField;
    Label4: TLabel;
    RxDBLookupCombo1: TRxDBLookupCombo;
    QryQualquerEmail: TStringField;
    QryQualquerTelefone: TStringField;
    QryQualquerCelular: TStringField;
    QryQualquerNascimento: TDateTimeField;
    Label5: TLabel;
    DBEdit3: TDBEdit;
    Label6: TLabel;
    DBEdit4: TDBEdit;
    Label7: TLabel;
    DBEdit5: TDBEdit;
    Label8: TLabel;
    DBDateEdit1: TDBDateEdit;
    QryQualquerativo: TStringField;
    DBCheckBox1: TDBCheckBox;
    RadioGroup1: TRadioGroup;
    procedure FormActivate(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure BBtnIncluirClick(Sender: TObject);
    procedure BBtnGravarClick(Sender: TObject);
    procedure BBtnCancelarClick(Sender: TObject);
    procedure BBtnAlterarClick(Sender: TObject);
    procedure BbtnExcluirClick(Sender: TObject);
    procedure BbtnImprimirClick(Sender: TObject);
    procedure BBtnFechatClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmProfSolic: TFrmProfSolic;

implementation

uses RelProfSolic;

{$R *.dfm}

procedure TFrmProfSolic.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   QryConselho.Close;
   QryConselho.Active := True;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
   BbtnImprimir.Enabled := False;
   RAdioGroup1.ItemIndex := 0;
end;

procedure TFrmProfSolic.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;

end;

procedure TFrmProfSolic.FormClose(Sender: TObject; var Action: TCloseAction);
begin
    Release;
    FrmProfSolic := Nil;
end;

procedure TFrmProfSolic.BbtnPesquisarClick(Sender: TObject);
begin
   QryQualquer.Close;
   QryQualquer.ParamByName('Nome').Value := TRIM(EdNome.Text)+'%';
   IF RadioGroup1.ItemIndex = 0 then
      QryQualquer.ParamByName('Status').Value := 'S';
   IF RadioGroup1.ItemIndex = 1 then
      QryQualquer.ParamByName('Status').Value := 'N';
   IF RadioGroup1.ItemIndex = 2 then
      QryQualquer.ParamByName('Status').Value := '-1';
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

procedure TFrmProfSolic.BBtnIncluirClick(Sender: TObject);
begin
   QryQualquer.Insert;
   QryQualquerAtivo.Value := 'S';
   PageControl1.ActivePage := TSManutencao;
   DbCheckBox1.Checked := True;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmProfSolic.BBtnGravarClick(Sender: TObject);
begin
   IF Length(QryQualquerAbrevConselho.Value) <= 0 then
   begin
      ShowMessage('Selecione o Conselho do Profissional.');
      RxDBLookupCombo1.SetFocus;
      exit;
   end;
   IF Length(QryQualquerNumConselho.Value) <= 0 then
   begin
      ShowMessage('Preencha  o  Numero Conselho do Profissional.');
      DbEdit2.SetFocus;
      exit;
   end;

   QryQualquer.Post;
   QryQualquer.ApplyUpdates;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmProfSolic.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmProfSolic.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   PageControl1.ActivePage := TSMAnutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmProfSolic.BbtnExcluirClick(Sender: TObject);
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

procedure TFrmProfSolic.BbtnImprimirClick(Sender: TObject);
begin
    IF FrmRelProfSolic = nil then
       FrmRelProfSolic := TFrmRelProfSolic.Create(Self);
    FrmRelProfSolic.QuickRep1.Preview;
    FrmRelProfSolic.Close;

end;

procedure TFrmProfSolic.BBtnFechatClick(Sender: TObject);
begin
   close;
end;

end.
