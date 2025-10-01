unit RelPendentes;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, QRCtrls, QuickRpt, ExtCtrls;

type
  TFrmRelPendentes = class(TForm)
    QuickRep1: TQuickRep;
    PageHeader: TQRBand;
    QRDBImageEsquerda: TQRDBImage;
    QRDBText5: TQRDBText;
    QRDBText6: TQRDBText;
    QRDBText16: TQRDBText;
    QRDBText17: TQRDBText;
    QRDBText18: TQRDBText;
    QRDBText19: TQRDBText;
    QRDBText20: TQRDBText;
    QRDBText21: TQRDBText;
    QRDBText22: TQRDBText;
    QRDBText23: TQRDBText;
    QRDBText24: TQRDBText;
    PageFooter: TQRBand;
    QRDateTime: TQRSysData;
    PageNumber: TQRSysData;
    QRSubDetail1: TQRSubDetail;
    QRBand2: TQRBand;
    QRDBText1: TQRDBText;
    QRDBText33: TQRDBText;
    QRDBText8: TQRDBText;
    QRLabel5: TQRLabel;
    QRDBText3: TQRDBText;
    QRLabel6: TQRLabel;
    QRDBText4: TQRDBText;
    QRLabel9: TQRLabel;
    QRDBText10: TQRDBText;
    QRLabel8: TQRLabel;
    QRDBText9: TQRDBText;
    QRLabel11: TQRLabel;
    QRDBText34: TQRDBText;
    QRLabel13: TQRLabel;
    QRDBText14: TQRDBText;
    QRDBText15: TQRDBText;
    QRLabel1: TQRLabel;
    QRDBText11: TQRDBText;
    QRLabel2: TQRLabel;
    QRLabel3: TQRLabel;
    QRLabel4: TQRLabel;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure QRSubDetail1BeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmRelPendentes: TFrmRelPendentes;

implementation

uses Pendente, DM_LABVET;

{$R *.dfm}

procedure TFrmRelPendentes.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
   Release;
   FrmRelPendentes := nil;
end;

procedure TFrmRelPendentes.QRSubDetail1BeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);
begin
   IF FrmPendentes.QryMovExamesLiberado.Value = 'S' then
      QRDBText33.Color := ClWhite
   else
      QRDBText33.Color := ClRed;
end;

end.
