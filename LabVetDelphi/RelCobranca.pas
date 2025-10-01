unit RelCobranca;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, QRCtrls, QuickRpt, ExtCtrls;

type
  TFrmRelCobranca = class(TForm)
    QuickRep1: TQuickRep;
    PageHeader: TQRBand;
    QRDBImageEsquerda: TQRDBImage;
    QRDBText5: TQRDBText;
    QRLabel5: TQRLabel;
    QRDBTextCliente: TQRDBText;
    QRDBText6: TQRDBText;
    QRLabel18: TQRLabel;
    QRShape3: TQRShape;
    QRShape4: TQRShape;
    QRLabel19: TQRLabel;
    QRLabel20: TQRLabel;
    QRLabel21: TQRLabel;
    PageFooter: TQRBand;
    QRLabel13: TQRLabel;
    QRDBText28: TQRDBText;
    QRDBText29: TQRDBText;
    QRDBText30: TQRDBText;
    QRDBText35: TQRDBText;
    QRDBText37: TQRDBText;
    QRShape1: TQRShape;
    QRDBText38: TQRDBText;
    QRDBText39: TQRDBText;
    QRDBText40: TQRDBText;
    QRLabel17: TQRLabel;
    QRLabel22: TQRLabel;
    QRBand2: TQRBand;
    QRDBText33: TQRDBText;
    QRLabel2: TQRLabel;
    QRDBText2: TQRDBText;
    QRLabel3: TQRLabel;
    QRLabel6: TQRLabel;
    QRDBText4: TQRDBText;
    QRLabel7: TQRLabel;
    QRDBText7: TQRDBText;
    QRLabel8: TQRLabel;
    QRDBText8: TQRDBText;
    QRDBText1: TQRDBText;
    QRDBText9: TQRDBText;
    QRDBText10: TQRDBText;
    QRDBText11: TQRDBText;
    QRDBText13: TQRDBText;
    QRDBText14: TQRDBText;
    QRLabel1: TQRLabel;
    QRLabel4: TQRLabel;
    QRLabel9: TQRLabel;
    QRLabel10: TQRLabel;
    QRLabel11: TQRLabel;
    QRLabel14: TQRLabel;
    QRLabel15: TQRLabel;
    QRShape2: TQRShape;
    QRLabel16: TQRLabel;
    QRDBText3: TQRDBText;
    QRDBText15: TQRDBText;
    QRDBImage1: TQRDBImage;
    QRShape5: TQRShape;
    QRDBText16: TQRDBText;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmRelCobranca: TFrmRelCobranca;

implementation

uses DM_LABVET, Cobranca;

{$R *.dfm}

procedure TFrmRelCobranca.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
    Release;
    FrmRelCobranca := nil;
end;

end.
