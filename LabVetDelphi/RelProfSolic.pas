unit RelProfSolic;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, QRCtrls, QuickRpt, ExtCtrls;

type
  TFrmRelProfSolic = class(TForm)
    QuickRep1: TQuickRep;
    PageHeader: TQRBand;
    QRLabel3: TQRLabel;
    QRDBImageEsquerda: TQRDBImage;
    ColumnHeaderBand1: TQRBand;
    QRLabel4: TQRLabel;
    QRLabel1: TQRLabel;
    QRBand1: TQRBand;
    QRDBText1: TQRDBText;
    QRDBText7: TQRDBText;
    PageFooter: TQRBand;
    QRDateTime: TQRSysData;
    PageNumber: TQRSysData;
    QRLabel2: TQRLabel;
    QRLabel5: TQRLabel;
    QRDBText2: TQRDBText;
    QRDBText3: TQRDBText;
    QRDBText4: TQRDBText;
    QRLabel6: TQRLabel;
    QRLabel7: TQRLabel;
    QRDBText8: TQRDBText;
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
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmRelProfSolic: TFrmRelProfSolic;

implementation

uses ProfSolicitante;

{$R *.dfm}

procedure TFrmRelProfSolic.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
   Release;
   FrmRelProfSolic := nil;
end;

end.
