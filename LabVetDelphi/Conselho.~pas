unit Conselho;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ComCtrls, ExtCtrls, DB, DBTables, StdCtrls, Buttons, Grids,
  DBGrids, Mask, DBCtrls;

type
  TFrmConselho = class(TForm)
    Panel1: TPanel;
    Panel3: TPanel;
    PageControl1: TPageControl;
    TSPesquisa: TTabSheet;
    TSManutencao: TTabSheet;
    Panel2: TPanel;
    Panel4: TPanel;
    Panel5: TPanel;
    DBGrid1: TDBGrid;
    Label1: TLabel;
    EdNome: TEdit;
    BbtnPesquisar: TBitBtn;
    BBtnIncluir: TBitBtn;
    BBtnAlterar: TBitBtn;
    BbtnExcluir: TBitBtn;
    BBtnGravar: TBitBtn;
    BBtnCancelar: TBitBtn;
    QryQualquer: TQuery;
    UDPQualquer: TUpdateSQL;
    DSQualquer: TDataSource;
    QryQualquerAbrevConselho: TStringField;
    QryQualquerNomeConselho: TStringField;
    BbtnImprimir: TBitBtn;
    BBtnFechat: TBitBtn;
    Label2: TLabel;
    DBEdit1: TDBEdit;
    Label3: TLabel;
    DBEdit2: TDBEdit;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure FormActivate(Sender: TObject);
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
  FrmConselho: TFrmConselho;

implementation

uses DM_LABVET, RelConselho;

{$R *.dfm}

procedure TFrmConselho.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
    Release;
    FrmConselho := Nil;
end;

procedure TFrmConselho.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;
end;

procedure TFrmConselho.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
   BbtnImprimir.Enabled := False;
end;

procedure TFrmConselho.BbtnPesquisarClick(Sender: TObject);
begin
   QryQualquer.Close;
   QryQualquer.ParamByName('Nome').Value := TRIM(EdNome.Text)+'%';
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

procedure TFrmConselho.BBtnIncluirClick(Sender: TObject);
begin
   QryQualquer.Insert;
   PageControl1.ActivePage := TSManutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;
end;

procedure TFrmConselho.BBtnGravarClick(Sender: TObject);
begin
   IF Length(QryQualquerABrevConselho.Value) <= 0 then
   begin
      ShowMessage('Abreviatura do Conselho Obrigatória..');
      DbEdit1.SetFocus;
      exit;
   end;
   IF Length(QryQualquerNomeConselho.Value) <= 0 then
   begin
      ShowMessage('Nome do Conselho Obrigatório..');
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

procedure TFrmConselho.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;
end;

procedure TFrmConselho.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   PageControl1.ActivePage := TSMAnutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmConselho.BbtnExcluirClick(Sender: TObject);
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

procedure TFrmConselho.BbtnImprimirClick(Sender: TObject);
begin
    IF FrmRelConselho = nil then
       FrmRelConselho := TFrmRelConselho.Create(Self);
    FrmRelConselho.QuickRep1.Preview;
    FrmRelConselho.Close;
end;

procedure TFrmConselho.BBtnFechatClick(Sender: TObject);
begin
   close;
end;

end.
