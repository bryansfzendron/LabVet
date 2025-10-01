unit RetiraPedido;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, Grids, DBGrids, ComCtrls, ExtCtrls, Buttons, DB, DBTables;

type
  TFrmRetiraPedido = class(TForm)
    QryRetirada: TQuery;
    PageControl1: TPageControl;
    TabSheet1: TTabSheet;
    TabSheet2: TTabSheet;
    Panel3: TPanel;
    Panel2: TPanel;
    SpeedButton5: TSpeedButton;
    BbtnFechar: TSpeedButton;
    DSRetirada: TDataSource;
    Panel1: TPanel;
    Panel4: TPanel;
    DBGrid1: TDBGrid;
    QryExames: TQuery;
    DSExames: TDataSource;
    QryExamesNomeExame: TStringField;
    DBGrid2: TDBGrid;
    Panel5: TPanel;
    Panel6: TPanel;
    SBMaterialRetirado: TSpeedButton;
    SpeedButton2: TSpeedButton;
    Panel7: TPanel;
    DBGrid3: TDBGrid;
    DBGrid4: TDBGrid;
    SP_PedidoRetirado: TStoredProc;
    QryRetiradaCodMovPedido: TAutoIncField;
    QryRetiradaCodigoInterno: TStringField;
    QryRetiradaCodigoPedido: TIntegerField;
    QryRetiradaSenha: TStringField;
    QryRetiradaCodCliente: TIntegerField;
    QryRetiradaCodEspecie: TIntegerField;
    QryRetiradaCodProfSolic: TIntegerField;
    QryRetiradaCodProfLaudo: TIntegerField;
    QryRetiradaAssinaturaScanner: TStringField;
    QryRetiradaDataPedido: TDateTimeField;
    QryRetiradaHoraPedido: TStringField;
    QryRetiradaDataEnvio: TDateTimeField;
    QryRetiradaValorTotal: TFloatField;
    QryRetiradaPago: TStringField;
    QryRetiradaFormadeEnvio: TStringField;
    QryRetiradaRetirar: TStringField;
    QryRetiradaRetirado: TStringField;
    QryRetiradaContato: TStringField;
    QryRetiradaStatus: TStringField;
    QryRetiradaCodSeqContas: TIntegerField;
    QryRetiradaNomeAnimal: TStringField;
    QryRetiradaProprietario: TStringField;
    QryRetiradaIdade: TStringField;
    QryRetiradaSexoAnimal: TStringField;
    QryRetiradaCliente: TStringField;
    QryRetiradaEndereco: TStringField;
    QryRetiradaHorapedido_1: TStringField;
    QryRetiradanumero: TStringField;
    QryRetiradacompl: TStringField;
    QryRetiradabairro: TStringField;
    QryRetiradacep: TStringField;
    QryRetiradacidade: TStringField;
    QryRetiradauf: TStringField;
    QryRetiradatelefone: TStringField;
    QryRetiradafax: TStringField;
    QryRetiradacontato_1: TStringField;
    QryRetiradacodEspecie_1: TAutoIncField;
    QryRetiradaEspecie: TStringField;
    QryRetiradaAbrevConselho: TStringField;
    QryRetiradaNumConselho: TStringField;
    QryRetiradaNomeProfSolic: TStringField;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure BbtnFecharClick(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure SpeedButton5Click(Sender: TObject);
    procedure SBMaterialRetiradoClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
    Retira : integer;
  end;

var
  FrmRetiraPedido: TFrmRetiraPedido;

implementation

uses RelRetiradaExames;

{$R *.dfm}

procedure TFrmRetiraPedido.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
    Release;
    FrmRetiraPedido := nil;
end;

procedure TFrmRetiraPedido.BbtnFecharClick(Sender: TObject);
begin
   close;
end;

procedure TFrmRetiraPedido.FormCreate(Sender: TObject);
begin
   TabSheet1.TabVisible := False;
   TabSheet2.TabVisible := False;

end;

procedure TFrmRetiraPedido.FormActivate(Sender: TObject);
begin
   IF Retira = 0 then
   begin
      PageControl1.ActivePage := TabSheet1;
      Caption := 'Pedidos a Serem Retirados no Cliente';
   end;
   IF Retira = 1 then
   begin
      PageControl1.ActivePage := TabSheet2;
      Caption := 'Confirma Retirada do Material no Cliente';
   end;

   QryExames.Close;
   QryExames.Active := True;
   QryRetirada.Close;
   QryRetirada.Active := True;

end;

procedure TFrmRetiraPedido.SpeedButton5Click(Sender: TObject);
begin
   IF FrmRelRetiradaExame = nil then
      FrmRelRetiradaExame := TFrmRelRetiradaExame.create(Self);
   FrmRelRetiradaExame.QuickRep1.Preview;
   FrmRelRetiradaExame.Close;   
end;

procedure TFrmRetiraPedido.SBMaterialRetiradoClick(Sender: TObject);
begin
   if Application.MessageBox('Material foi Retirado no Cliente ? ',
      'Confirme', 4  + MB_ICONQUESTION)= idYes then
   begin
      SP_PedidoRetirado.Prepare;
      SP_PedidoRetirado.ParamByName('@CodMovPedido_1').Value := QryRetiradaCodMovPedido.Value;
      SP_PedidoRetirado.ExecProc;
      QryExames.Close;
      QryExames.Active := True;
      QryRetirada.Close;
      QryRetirada.Active := True;
   end;
end;

end.
