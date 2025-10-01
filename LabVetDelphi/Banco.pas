unit Banco;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, Mask, DBCtrls, StdCtrls, Grids, DBGrids, ComCtrls,
  ExtCtrls, Buttons;

type
  TFrmbanco = class(TForm)
    Panel1: TPanel;
    Label1: TLabel;
    EdNome: TEdit;
    BbtnPesquisar: TBitBtn;
    RadioGroup1: TRadioGroup;
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
    Panel4: TPanel;
    BBtnGravar: TBitBtn;
    BBtnCancelar: TBitBtn;
    ScrollBox1: TScrollBox;
    DBCheckBox2: TDBCheckBox;
    QryQualquer: TQuery;
    UDPQualquer: TUpdateSQL;
    DSQualquer: TDataSource;
    QryQualquerCODBANCO: TAutoIncField;
    QryQualquerNOMEBANCO: TStringField;
    QryQualquerNUMAGENCIA: TStringField;
    QryQualquerNOMEAGENCIA: TStringField;
    QryQualquerNUMCONTA: TStringField;
    QryQualquerATIVO: TStringField;
    Label2: TLabel;
    DBEdit1: TDBEdit;
    Label3: TLabel;
    DBEdit2: TDBEdit;
    Label4: TLabel;
    DBEdit3: TDBEdit;
    Label5: TLabel;
    DBEdit4: TDBEdit;
    QryQualquerNUMBANCO: TStringField;
    Label6: TLabel;
    DBEdit5: TDBEdit;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure BBtnFechatClick(Sender: TObject);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure BBtnIncluirClick(Sender: TObject);
    procedure BBtnAlterarClick(Sender: TObject);
    procedure BbtnExcluirClick(Sender: TObject);
    procedure BBtnGravarClick(Sender: TObject);
    procedure BBtnCancelarClick(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormActivate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Frmbanco: TFrmbanco;

implementation

{$R *.dfm}

procedure TFrmbanco.FormClose(Sender: TObject; var Action: TCloseAction);
begin
   release;
   frmbanco := nil;
end;

procedure TFrmbanco.BBtnFechatClick(Sender: TObject);
begin
   close;
end;

procedure TFrmbanco.BbtnPesquisarClick(Sender: TObject);
begin
   QryQualquer.Close;
   QryQualquer.ParamByName('NomeBanco').Value := TRIM(EdNome.Text)+'%';
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
//      BbtnImprimir.Enabled := False;
   end
   else
   begin
       BbtnINcluir.Enabled := True;
       BbtnAlterar.Enabled := True;
       BbtnExcluir.Enabled := True;
//       BbtnImprimir.Enabled := True;
   end;



end;

procedure TFrmbanco.BBtnIncluirClick(Sender: TObject);
begin
   QryQualquer.Insert;
   QryQualquerAtivo.Value := 'S';

   PageControl1.ActivePage := TSManutencao;
   DbCheckBox2.Checked := True;
   DbEdit5.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmbanco.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   PageControl1.ActivePage := TSMAnutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmbanco.BbtnExcluirClick(Sender: TObject);
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

procedure TFrmbanco.BBtnGravarClick(Sender: TObject);
begin
   IF length(QryQualquerNumBanco.Value) < 1 then
   begin
      ShowMessage('Número do Banco não informado...');
      DBEdit5.SetFocus;
      Exit;
   end;
   IF length(QryQualquerNomeBanco.Value) < 1 then
   begin
      ShowMessage('nome do Banco não informado...');
      DBEdit1.SetFocus;
      Exit;
   end;
   IF length(QryQualquerNumAgencia.Value) < 1 then
   begin
      ShowMessage('Número do Agência não informado...');
      DBEdit2.SetFocus;
      Exit;
   end;
   IF length(QryQualquerNomeAgencia.Value) < 1 then
   begin
      ShowMessage('Nome da Agência não informado...');
      DBEdit3.SetFocus;
      Exit;
   end;
   IF length(QryQualquerNumConta.Value) < 1 then
   begin
      ShowMessage('Número da Conta não informado...');
      DBEdit4.SetFocus;
      Exit;
   end;



   QryQualquer.Post;
   QryQualquer.ApplyUpdates;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmbanco.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmbanco.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;

end;

procedure TFrmbanco.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
//   BbtnImprimir.Enabled := False;
   RadioGroup1.ItemIndex := 0;

end;

end.
