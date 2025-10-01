unit RelRetiradaExames;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, QRCtrls, QuickRpt, ExtCtrls;

type
  TFrmRelRetiradaExame = class(TForm)
    QuickRep1: TQuickRep;
    PageHeader: TQRBand;
    QRLabel3: TQRLabel;
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
    ColumnHeaderBand1: TQRBand;
    QRLabel1: TQRLabel;
    QRLabel5: TQRLabel;
    QRDBText3: TQRDBText;
    QRDBText4: TQRDBText;
    QRLabel6: TQRLabel;
    QRDBText8: TQRDBText;
    QRLabel7: TQRLabel;
    QRLabel8: TQRLabel;
    QRDBText9: TQRDBText;
    QRLabel9: TQRLabel;
    QRDBText10: TQRDBText;
    QRLabel10: TQRLabel;
    QRDBText11: TQRDBText;
    QRLabel11: TQRLabel;
    QRDBText12: TQRDBText;
    QRDBText14: TQRDBText;
    QRLabel13: TQRLabel;
    QRDBText15: TQRDBText;
    QRShape1: TQRShape;
    PageFooter: TQRBand;
    QRDateTime: TQRSysData;
    PageNumber: TQRSysData;
    QRLabel14: TQRLabel;
    QRShape2: TQRShape;
    QRLabel15: TQRLabel;
    QRLabel2: TQRLabel;
    QRDBText1: TQRDBText;
    QRDBText2: TQRDBText;
    QRLabel4: TQRLabel;
    QRDBText25: TQRDBText;
    QRDBText26: TQRDBText;
    QRLabel16: TQRLabel;
    QRDBText27: TQRDBText;
    QRLabel17: TQRLabel;
    QRDBText28: TQRDBText;
    QRLabel18: TQRLabel;
    QRDBText29: TQRDBText;
    QRDBText30: TQRDBText;
    QRDBText31: TQRDBText;
    QRSubDetail1: TQRSubDetail;
    QRDBText7: TQRDBText;
    QRShape3: TQRShape;
    QRLabel12: TQRLabel;
    QRDBText13: TQRDBText;
    QRLabel19: TQRLabel;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmRelRetiradaExame: TFrmRelRetiradaExame;

implementation

uses RetiraPedido, DM_LABVET;

{$R *.dfm}

procedure TFrmRelRetiradaExame.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
    Release;
    FrmRelRetiradaExame := Nil;
end;

end.
