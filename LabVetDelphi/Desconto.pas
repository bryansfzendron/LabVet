unit Desconto;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, Mask, DBCtrls, Grids, DBGrids, ComCtrls, StdCtrls,
  Buttons, ExtCtrls, ToolEdit, CurrEdit, RXDBCtrl;

type
  TFrmDesconto = class(TForm)
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
    RxDBCalcEdit1: TRxDBCalcEdit;
    Label2: TLabel;
    Label4: TLabel;
    RxDBCalcEdit2: TRxDBCalcEdit;
    RxDBCalcEdit3: TRxDBCalcEdit;
    Label5: TLabel;
    QryQualquerCODDESCONTO: TAutoIncField;
    QryQualquerNome: TStringField;
    QryQualquerValorInicial: TFloatField;
    QryQualquerValorFinal: TFloatField;
    QryQualquerDesconto: TFloatField;
    QryQualquerAtivo: TStringField;
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure BBtnIncluirClick(Sender: TObject);
    procedure BBtnAlterarClick(Sender: TObject);
    procedure BbtnExcluirClick(Sender: TObject);
    procedure BBtnGravarClick(Sender: TObject);
    procedure BBtnCancelarClick(Sender: TObject);
    procedure BBtnFechatClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmDesconto: TFrmDesconto;

implementation

{$R *.dfm}

procedure TFrmDesconto.BbtnPesquisarClick(Sender: TObject);
begin
   QryQualquer.Close;
   QryQualquer.ParamByName('Nome').Value := TRIM(EdNome.Text)+'%';
   QryQualquer.Active := True;
   if qryqualquer.Eof then
   begin
      BbtnINcluir.Enabled := True;
      BbtnAlterar.Enabled := False;
      BbtnExcluir.Enabled := False;
 //     BbtnImprimir.Enabled := False;
   end
   else
   begin
       BbtnINcluir.Enabled := True;
       BbtnAlterar.Enabled := True;
       BbtnExcluir.Enabled := True;
//       BbtnImprimir.Enabled := True;
   end;

end;

procedure TFrmDesconto.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;

end;

procedure TFrmDesconto.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
//   BbtnImprimir.Enabled := False;

end;

procedure TFrmDesconto.FormClose(Sender: TObject; var Action: TCloseAction);
begin
    Release;
    FrmDesconto := Nil;
end;

procedure TFrmDesconto.BBtnIncluirClick(Sender: TObject);
begin
   QryQualquer.Insert;
   PageControl1.ActivePage := TSManutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmDesconto.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   PageControl1.ActivePage := TSMAnutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;
end;

procedure TFrmDesconto.BbtnExcluirClick(Sender: TObject);
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

procedure TFrmDesconto.BBtnGravarClick(Sender: TObject);
begin
   IF length(QryQualquerNOme.Value) <= 0 then
   begin
      ShowMessage('Nome do Desconto..');
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

procedure TFrmDesconto.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmDesconto.BBtnFechatClick(Sender: TObject);
begin
   close;
end;

end.
