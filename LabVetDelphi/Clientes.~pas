unit Clientes;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, Mask, DBCtrls, Grids, DBGrids, ComCtrls, StdCtrls,
  Buttons, ExtCtrls, RxLookup;

type
  TFrmClientes = class(TForm)
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
    QryQualquerCodCliente: TAutoIncField;
    QryQualquerNome: TStringField;
    QryQualquerEndereco: TStringField;
    QryQualquernumero: TStringField;
    QryQualquerCompl: TStringField;
    QryQualquerBairro: TStringField;
    QryQualquerCEP: TStringField;
    QryQualquerCidade: TStringField;
    QryQualquerUF: TStringField;
    QryQualquerTelefone: TStringField;
    QryQualquerFax: TStringField;
    QryQualquerCelular: TStringField;
    QryQualqueremail: TStringField;
    QryQualquercpf_cgc: TStringField;
    QryQualquerContato: TStringField;
    QryQualquerDataCadastro: TDateTimeField;
    QryQualquerRestricao: TStringField;
    QryQualquerDataAtualizacao: TDateTimeField;
    QryQualquerAtivo: TStringField;
    ScrollBox1: TScrollBox;
    RadioGroup1: TRadioGroup;
    DBCheckBox1: TDBCheckBox;
    Label2: TLabel;
    DBEdit1: TDBEdit;
    Label3: TLabel;
    DBEdit2: TDBEdit;
    Label4: TLabel;
    DBEdit3: TDBEdit;
    Label5: TLabel;
    DBEdit4: TDBEdit;
    Label6: TLabel;
    DBEdit5: TDBEdit;
    Label7: TLabel;
    DBEdit6: TDBEdit;
    Label8: TLabel;
    DBEdit7: TDBEdit;
    Label9: TLabel;
    DBEdit8: TDBEdit;
    Label10: TLabel;
    DBEdit9: TDBEdit;
    Label11: TLabel;
    DBEdit10: TDBEdit;
    Label12: TLabel;
    DBEdit11: TDBEdit;
    Label13: TLabel;
    DBEdit12: TDBEdit;
    Label14: TLabel;
    DBEdit13: TDBEdit;
    Label15: TLabel;
    DBEdit14: TDBEdit;
    DBCheckBox2: TDBCheckBox;
    QryVeterinario: TQuery;
    DSVeterinario: TDataSource;
    QryVeterinarioCodProfSolic: TAutoIncField;
    QryVeterinarioAbrevConselho: TStringField;
    QryVeterinarioNomeProfSolic: TStringField;
    QryVeterinarioNumConselho: TStringField;
    QryVeterinarioEmail: TStringField;
    QryVeterinarioTelefone: TStringField;
    QryVeterinarioCelular: TStringField;
    QryVeterinarioNascimento: TDateTimeField;
    QryVeterinarioativo: TStringField;
    QryQualquerCodVetResp: TIntegerField;
    Label16: TLabel;
    RxDBLookupCombo1: TRxDBLookupCombo;
    QryQualquerVeterinario: TStringField;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure BBtnIncluirClick(Sender: TObject);
    procedure BBtnAlterarClick(Sender: TObject);
    procedure BbtnExcluirClick(Sender: TObject);
    procedure BBtnGravarClick(Sender: TObject);
    procedure BBtnCancelarClick(Sender: TObject);
    procedure BBtnFechatClick(Sender: TObject);
    procedure BbtnImprimirClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmClientes: TFrmClientes;

implementation

uses RelClientes;

{$R *.dfm}

procedure TFrmClientes.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
    Release;
    FrmClientes := nil;
end;

procedure TFrmClientes.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;
end;

procedure TFrmClientes.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   QryVeterinario.Close;
   QryVeterinario.Active := True;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
   BbtnImprimir.Enabled := False;
   RadioGroup1.ItemIndex := 0;
end;

procedure TFrmClientes.BbtnPesquisarClick(Sender: TObject);
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

procedure TFrmClientes.BBtnIncluirClick(Sender: TObject);
begin
   QryQualquer.Insert;
   QryQualquerAtivo.Value := 'S';
   QryQualquerRestricao.Value := 'N';
   QryQualquerDataCadastro.Value := now;
   PageControl1.ActivePage := TSManutencao;
   DbCheckBox1.Checked := False;
   DbCheckBox2.Checked := True;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;
end;

procedure TFrmClientes.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   QryQualquerDataAtualizacao.Value := now;
   PageControl1.ActivePage := TSMAnutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;
end;

procedure TFrmClientes.BbtnExcluirClick(Sender: TObject);
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

procedure TFrmClientes.BBtnGravarClick(Sender: TObject);
begin
   QryQualquer.Post;
   QryQualquer.ApplyUpdates;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;
end;

procedure TFrmClientes.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;
end;

procedure TFrmClientes.BBtnFechatClick(Sender: TObject);
begin
   close;
end;

procedure TFrmClientes.BbtnImprimirClick(Sender: TObject);
begin
    IF FrmRelClientes = nil then
       FrmRelClientes := TFrmRelClientes.Create(Self);
    FrmRelClientes.QuickRep1.Preview;
    FrmRelClientes.Close;

end;

end.
