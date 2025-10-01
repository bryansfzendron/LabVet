unit Especie;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, Mask, DBCtrls, Grids, DBGrids, ComCtrls, StdCtrls,
  Buttons, ExtCtrls;

type
  TFrmEspecie = class(TForm)
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
    Label3: TLabel;
    Panel4: TPanel;
    BBtnGravar: TBitBtn;
    BBtnCancelar: TBitBtn;
    DBEdit1: TDBEdit;
    QryQualquer: TQuery;
    UDPQualquer: TUpdateSQL;
    DSQualquer: TDataSource;
    QryQualquerCodEspecie: TAutoIncField;
    QryQualquerNomeEspecie: TStringField;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure BBtnIncluirClick(Sender: TObject);
    procedure BBtnAlterarClick(Sender: TObject);
    procedure BbtnExcluirClick(Sender: TObject);
    procedure BBtnFechatClick(Sender: TObject);
    procedure BBtnGravarClick(Sender: TObject);
    procedure BBtnCancelarClick(Sender: TObject);
    procedure BbtnImprimirClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmEspecie: TFrmEspecie;

implementation

uses RelEspecies;

{$R *.dfm}

procedure TFrmEspecie.FormClose(Sender: TObject; var Action: TCloseAction);
begin
   Release;
   FrmEspecie := nil;
end;

procedure TFrmEspecie.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;

end;

procedure TFrmEspecie.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
   BbtnImprimir.Enabled := False;

end;

procedure TFrmEspecie.BbtnPesquisarClick(Sender: TObject);
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

procedure TFrmEspecie.BBtnIncluirClick(Sender: TObject);
begin
   QryQualquer.Insert;
   PageControl1.ActivePage := TSManutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmEspecie.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   PageControl1.ActivePage := TSMAnutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmEspecie.BbtnExcluirClick(Sender: TObject);
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

procedure TFrmEspecie.BBtnFechatClick(Sender: TObject);
begin
   close;
end;

procedure TFrmEspecie.BBtnGravarClick(Sender: TObject);
begin
   IF length(QryQualquerNOmeEspecie.Value) <= 0 then
   begin
      ShowMessage('Nome da Espécie Obrigatória..');
      DbEdit1.SetFocus;
      exit;
   end;

   QryQualquer.Post;
   QryQualquer.ApplyUpdates;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmEspecie.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmEspecie.BbtnImprimirClick(Sender: TObject);
begin
   IF FrmRelEspecie = nil then
       FrmRelEspecie := TFrmRelEspecie.Create(Self);
    FrmRelEspecie.QuickRep1.Preview;
    FrmRelEspecie.Close;

end;

end.
