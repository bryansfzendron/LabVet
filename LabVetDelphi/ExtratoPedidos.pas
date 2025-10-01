unit ExtratoPedidos;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, Mask, ToolEdit, ComCtrls, ExtCtrls, DB, DBTables,
  Grids, DBGrids, Buttons;

type
  TFrmExtratoPedido = class(TForm)
    Panel1: TPanel;
    Panel2: TPanel;
    Panel3: TPanel;
    StatusBar1: TStatusBar;
    Dti: TDateEdit;
    Dtf: TDateEdit;
    Label1: TLabel;
    Label2: TLabel;
    BbtnPesquisar: TBitBtn;
    QryExtratoAnal: TQuery;
    QryExtratoAnalCodMovPedido: TAutoIncField;
    QryExtratoAnalDataPedido: TDateTimeField;
    QryExtratoAnalNomeAnimal: TStringField;
    QryExtratoAnalProprietario: TStringField;
    QryExtratoAnalIdade: TStringField;
    QryExtratoAnalSexoAnimal: TStringField;
    QryExtratoAnalValor: TFloatField;
    QryExtratoAnalNomeExame: TStringField;
    QryExtratoAnalcliente: TStringField;
    DSExtratoAna: TDataSource;
    QryExtratoSint: TQuery;
    PageControl1: TPageControl;
    TabSheet1: TTabSheet;
    TabSheet2: TTabSheet;
    DBGrid1: TDBGrid;
    DBGrid2: TDBGrid;
    DSExtratoSint: TDataSource;
    QryExtratoSintnomeexame: TStringField;
    QryExtratoSintvalor: TFloatField;
    QryExtratoSintqtde: TIntegerField;
    BBtnFechat: TBitBtn;
    BbtnAnalitico: TBitBtn;
    BitBtn1: TBitBtn;
    QryExtratoCliente: TQuery;
    QryExtratoClienteclinica: TStringField;
    QryExtratoClientevalor: TFloatField;
    DSCliente: TDataSource;
    TabSheet3: TTabSheet;
    DBGrid3: TDBGrid;
    BbtnExtratoClinica: TBitBtn;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure BBtnFechatClick(Sender: TObject);
    procedure BbtnAnaliticoClick(Sender: TObject);
    procedure BitBtn1Click(Sender: TObject);
    procedure BbtnExtratoClinicaClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmExtratoPedido: TFrmExtratoPedido;

implementation

uses RelExtratoAnal, RelExtratoSint, RelExtratoCliente;

{$R *.dfm}

procedure TFrmExtratoPedido.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
   Release;
   FrmExtratoPedido := nil;
end;

procedure TFrmExtratoPedido.FormCreate(Sender: TObject);
begin
   Dti.Date := now;
   Dtf.Date := now;
   PageControl1.ActivePage := TabSheet1;
end;

procedure TFrmExtratoPedido.BbtnPesquisarClick(Sender: TObject);
var
  total : Double;
begin
    QryExtratoAnal.Close;
    QryExtratoAnal.ParamByName('dti').Value := dti.Date;
    QryExtratoAnal.ParamByName('dtf').Value := dtf.Date;
    QryExtratoAnal.Active := True;
    total := 0;
    While not QryExtratoAnal.Eof do
    begin
       total := total + QryExtratoAnalValor.value;

       QryExtratoAnal.Next;
    end;
    StatusBar1.Panels[1].Text := formatfloat('#,###,###,##0.00',total);
    QryExtratoAnal.First;
//----------------------------------
    QryExtratoSint.Close;
    QryExtratoSint.ParamByName('dti').Value := dti.Date;
    QryExtratoSint.ParamByName('dtf').Value := dtf.Date;
    QryExtratoSint.Active := True;
    total := 0;
    While not QryExtratoSint.Eof do
    begin
       total := total + QryExtratoSintValor.value*QryExtratoSintQtde.value;

       QryExtratoSint.Next;
    end;
//    StatusBar1.Panels[2].Text := formatfloat('#,###,###,##0.00',total);
    QryExtratoSint.First;
///---------------------------
    QryExtratoCliente.Close;
    QryExtratoCliente.ParamByName('dti').Value := dti.Date;
    QryExtratoCliente.ParamByName('dtf').Value := dtf.Date;
    QryExtratoCliente.Active := True;
    total := 0;
    While not QryExtratoCliente.Eof do
    begin
       total := total + QryExtratoClienteValor.value;

       QryExtratoCliente.Next;
    end;
//    StatusBar1.Panels[3].Text := formatfloat('#,###,###,##0.00',total);
    QryExtratoCliente.First;






    IF QryExtratoAnal.Eof then
    begin


    end
    else
    begin



    end;




end;

procedure TFrmExtratoPedido.BBtnFechatClick(Sender: TObject);
begin
    close;
end;

procedure TFrmExtratoPedido.BbtnAnaliticoClick(Sender: TObject);
begin
    IF FrmRelExtratoAnal = nil then
       FrmRelExtratoAnal := TFrmRelExtratoAnal.Create(Self);
    FrmRelExtratoAnal.QRLabel3.Caption := 'Extrato de Pedido Analítico de '+datetostr(dti.Date)+' à '+datetostr(dtf.Date);   
    FrmRelExtratoAnal.QuickRep1.Preview;
    FrmRelExtratoAnal.Close;

end;

procedure TFrmExtratoPedido.BitBtn1Click(Sender: TObject);
begin
    IF FrmRelExtratoSint = nil then
       FrmRelExtratoSint := TFrmRelExtratoSint.Create(Self);
    FrmRelExtratoSint.QRLabel3.Caption := 'Extrato de Pedido Sintético de '+datetostr(dti.Date)+' à '+datetostr(dtf.Date);
    FrmRelExtratoSint.QuickRep1.Preview;
    FrmRelExtratoSint.Close;

end;

procedure TFrmExtratoPedido.BbtnExtratoClinicaClick(Sender: TObject);
begin
    IF FrmRelExtratoCliente = nil then
       FrmRelExtratoCliente := TFrmRelExtratoCliente.Create(Self);
    FrmRelExtratoCliente.QRLabel3.Caption := 'Extrato de Pedido por Cliente de '+datetostr(dti.Date)+' à '+datetostr(dtf.Date);
    FrmRelExtratoCliente.QuickRep1.Preview;
    FrmRelExtratoCliente.Close;

end;

end.
