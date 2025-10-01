unit Animais;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, StdCtrls, DBCtrls, ToolEdit, RXDBCtrl, RxLookup,
  Mask, Grids, DBGrids, ComCtrls, ExtCtrls, Buttons;

type
  TFrmAnimais = class(TForm)
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
    BbtnImprimir: TBitBtn;
    BBtnFechat: TBitBtn;
    Panel5: TPanel;
    DBGrid1: TDBGrid;
    TSManutencao: TTabSheet;
    Label2: TLabel;
    Label3: TLabel;
    Label4: TLabel;
    Label6: TLabel;
    Label7: TLabel;
    Label8: TLabel;
    Panel4: TPanel;
    BBtnGravar: TBitBtn;
    BBtnCancelar: TBitBtn;
    DBEdit1: TDBEdit;
    DBEdit2: TDBEdit;
    RxDBLookupCombo1: TRxDBLookupCombo;
    DBEdit4: TDBEdit;
    DBEdit5: TDBEdit;
    DBDateEdit1: TDBDateEdit;
    DBCheckBox1: TDBCheckBox;
    QryQualquer: TQuery;
    UDPQualquer: TUpdateSQL;
    DSQualquer: TDataSource;
    QryCliente: TQuery;
    DSCliente: TDataSource;
    Label9: TLabel;
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
    RxDBLookupCombo2: TRxDBLookupCombo;
    QryQualquerCodAnimal: TAutoIncField;
    QryQualquerCodCliente: TIntegerField;
    QryQualquerCodEspecie: TIntegerField;
    QryQualquerNome: TStringField;
    QryQualquerCor: TStringField;
    QryQualquerDono: TStringField;
    QryQualquerDataCadastro: TDateTimeField;
    QryQualquerNascimento: TDateTimeField;
    QryQualquerAtivo: TStringField;
    QryEspecie: TQuery;
    DSEspecie: TDataSource;
    QryEspecieCodEspecie: TAutoIncField;
    QryEspecieNomeEspecie: TStringField;
    QryQualquerRaca: TStringField;
    Label5: TLabel;
    RxDBLookupCombo3: TRxDBLookupCombo;
    QryQualquerNomeCliente: TStringField;
    QryQualquerEspecie: TStringField;
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
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmAnimais: TFrmAnimais;

implementation

{$R *.dfm}

procedure TFrmAnimais.FormClose(Sender: TObject; var Action: TCloseAction);
begin
   Release;
   FrmAnimais := nil;
end;

procedure TFrmAnimais.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;

end;

procedure TFrmAnimais.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   QryCliente.Close;
   QryCliente.Active := True;
   QryEspecie.Close;
   QryEspecie.Active := True;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
   BbtnImprimir.Enabled := False;
   RAdioGroup1.ItemIndex := 0;

end;

procedure TFrmAnimais.BbtnPesquisarClick(Sender: TObject);
begin
   QryQualquer.Close;
   QryQualquer.ParamByName('Nome').Value := TRIM(EdNome.Text)+'%';
   IF RxDBLookupCombo2.KeyValue > 0 then
      QryQualquer.ParamByName('CodCliente').Value := RxDBLookupCombo2.KeyValue
   else
      QryQualquer.ParamByName('CodCliente').Value := -1;
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

procedure TFrmAnimais.BBtnIncluirClick(Sender: TObject);
begin
   QryQualquer.Insert;
   QryQualquerAtivo.Value := 'S';
   IF RxDBLookupCombo2.KeyValue > 0 then
      QryQualquerCodCliente.Value := RxDBLookupCombo2.KeyValue;
   PageControl1.ActivePage := TSManutencao;
   DbCheckBox1.Checked := True;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmAnimais.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   PageControl1.ActivePage := TSMAnutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmAnimais.BbtnExcluirClick(Sender: TObject);
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

procedure TFrmAnimais.BBtnGravarClick(Sender: TObject);
begin
   IF QryQualquerCodCliente.Value <= 0 then
   begin
      ShowMessage('Selecione o Cliente.');
      RxDBLookupCombo1.SetFocus;
      exit;
   end;
   IF QryQualquerCodEspecie.Value <= 0 then
   begin
      ShowMessage('Selecione a Espécie.');
      RxDBLookupCombo3.SetFocus;
      exit;
   end;

   IF Length(QryQualquerNome.Value) <= 0 then
   begin
      ShowMessage('Preencha  o  Nome do Animal.');
      DbEdit1.SetFocus;
      exit;
   end;
   QryQualquerNomeCliente.Value := QryClienteNome.Value;
   QryQualquerEspecie.Value := QryEspecieNomeEspecie.Value;
   QryQualquerDataCadastro.Value := now;
   QryQualquer.Post;
   QryQualquer.ApplyUpdates;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;



end;

procedure TFrmAnimais.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmAnimais.BBtnFechatClick(Sender: TObject);
begin
    close;
end;

end.
