unit RelExtratoSint;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, QRCtrls, QuickRpt, ExtCtrls;

type
  TFrmRelExtratoSint = class(TForm)
    QuickRep1: TQuickRep;
    PageHeader: TQRBand;
    QRLabel3: TQRLabel;
    QRDBImageEsquerda: TQRDBImage;
    QRDBText6: TQRDBText;
    QRDBText17: TQRDBText;
    QRDBText22: TQRDBText;
    QRDBText24: TQRDBText;
    QRDBText23: TQRDBText;
    QRDBText18: TQRDBText;
    QRDBText21: TQRDBText;
    QRDBText16: TQRDBText;
    QRDBText20: TQRDBText;
    QRDBText19: TQRDBText;
    QRDBText5: TQRDBText;
    ColumnHeaderBand1: TQRBand;
    QRLabel5: TQRLabel;
    QRLabel6: TQRLabel;
    QRBand1: TQRBand;
    QRDBText3: TQRDBText;
    QRDBText4: TQRDBText;
    PageFooter: TQRBand;
    QRDateTime: TQRSysData;
    QRLabel7: TQRLabel;
    QRLabel1: TQRLabel;
    QRLabel2: TQRLabel;
    QRDBText1: TQRDBText;
    QRLabel4: TQRLabel;
    procedure QRBand1BeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure PageFooterBeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmRelExtratoSint: TFrmRelExtratoSint;

implementation

uses DM_LABVET, ExtratoPedidos;

{$R *.dfm}

procedure TFrmRelExtratoSint.QRBand1BeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);
begin
    Qrlabel4.Caption := FormatFloat('#,###,###,##0.00',FrmExtratoPedido.QryExtratoSintvalor.Value*FrmExtratoPedido.QryExtratoSintqtde.Value);
end;

procedure TFrmRelExtratoSint.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
   Release;
   FrmRelExtratoSint := nil;
end;

procedure TFrmRelExtratoSint.PageFooterBeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);
begin
    Qrlabel7.Caption := 'Total.: '+FrmExtratoPedido.StatusBar1.Panels[1].Text;
end;

end.
