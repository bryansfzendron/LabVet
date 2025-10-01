unit RelExtratoAnal;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, QRCtrls, QuickRpt, ExtCtrls;

type
  TFrmRelExtratoAnal = class(TForm)
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
    QRLabel4: TQRLabel;
    QRLabel1: TQRLabel;
    QRBand1: TQRBand;
    QRDBText1: TQRDBText;
    QRDBText7: TQRDBText;
    PageFooter: TQRBand;
    QRDateTime: TQRSysData;
    QRLabel2: TQRLabel;
    QRDBText2: TQRDBText;
    QRLabel5: TQRLabel;
    QRLabel6: TQRLabel;
    QRDBText3: TQRDBText;
    QRDBText4: TQRDBText;
    QRLabel7: TQRLabel;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure PageFooterBeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmRelExtratoAnal: TFrmRelExtratoAnal;

implementation

uses DM_LABVET, ExtratoPedidos;

{$R *.dfm}

procedure TFrmRelExtratoAnal.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
   Release;
   FrmRelExtratoAnal := nil;
end;

procedure TFrmRelExtratoAnal.PageFooterBeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);
begin
    Qrlabel7.Caption := 'Total.: '+FrmExtratoPedido.StatusBar1.Panels[1].Text;
end;

end.
