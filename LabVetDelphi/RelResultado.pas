unit RelResultado;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, QRCtrls, QuickRpt, ExtCtrls;

type
  TFrmResultado = class(TForm)
    QuickRep1: TQuickRep;
    PageHeader: TQRBand;
    QRDBImageEsquerda: TQRDBImage;
    QRDBText5: TQRDBText;
    PageFooter: TQRBand;
    QRShape2: TQRShape;
    QRDBText25: TQRDBText;
    QRLabel5: TQRLabel;
    QRLabel6: TQRLabel;
    QRDBText4: TQRDBText;
    QRLabel9: TQRLabel;
    QRDBText10: TQRDBText;
    QRLabel8: TQRLabel;
    QRDBText9: TQRDBText;
    QRLabel10: TQRLabel;
    QRDBText11: TQRDBText;
    QRBand2: TQRBand;
    QRDBText1: TQRDBText;
    QRDBText2: TQRDBText;
    QRDBText7: TQRDBText;
    QRDBText12: TQRDBText;
    QRLabel2: TQRLabel;
    QRDBText13: TQRDBText;
    QRDBText31: TQRDBText;
    QRDBText32: TQRDBText;
    QRDBImage1: TQRDBImage;
    QRLabel4: TQRLabel;
    QRDBText33: TQRDBText;
    QRLabel11: TQRLabel;
    QRDBText34: TQRDBText;
    QRDBRichText2: TQRDBRichText;
    QRLabel3: TQRLabel;
    QRDBText8: TQRDBText;
    QRLabel7: TQRLabel;
    QRDBText36: TQRDBText;
    QRDBTextCliente: TQRDBText;
    QRLabel1: TQRLabel;
    QRMemo1: TQRMemo;
    QRLabel12: TQRLabel;
    QRLabel13: TQRLabel;
    QRLabel14: TQRLabel;
    QRLabel15: TQRLabel;
    QRLabel16: TQRLabel;
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
    QRDBText6: TQRDBText;
    QRLabel18: TQRLabel;
    QRShape3: TQRShape;
    QRShape4: TQRShape;
    QRLabel19: TQRLabel;
    QRLabel20: TQRLabel;
    QRLabel21: TQRLabel;
    QRLabel22: TQRLabel;
    QRLabel23: TQRLabel;
    QRDBTextRaca: TQRDBText;
    QRLabel24: TQRLabel;
    QRLabel25: TQRLabel;
    QRDBRichText1: TQRDBRichText;
    QRLMensQualidade1: TQRLabel;
    QRLMensQualidade2: TQRLabel;
    QRDBText3: TQRDBText;
    QRLabel26: TQRLabel;
    QRLabel27: TQRLabel;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure QRSubDetail1BeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
    procedure QRBand2BeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
    procedure PageFooterBeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
    procedure QRSubDetail2BeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
    procedure PageHeaderBeforePrint(Sender: TQRCustomBand;
      var PrintBand: Boolean);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmResultado: TFrmResultado;

implementation

uses DM_LABVET, Laudo;

{$R *.dfm}

procedure TFrmResultado.FormClose(Sender: TObject; var Action: TCloseAction);
begin
   Release;
   FrmResultado := nil;
end;

procedure TFrmResultado.QRSubDetail1BeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);
begin
   IF FrmLaudo.QryMovItensExamesRelTipoCampo.Value = 'N' then
   begin
      QRDBRichText1.Visible := False;
      QrLabel24.Width := 162;
      Qrlabel25.Width := 162;

      QRLabel24.Visible := True;
      IF FrmLaudo.qrymovitensExamesRelCasasDecimais1.Value = 0 then
         QRLabel24.Caption := FormatFloat('#,###,###,##0.##',FrmLaudo.QryMovItensExamesRelResultado1.Value)
      else
         IF FrmLaudo.qrymovitensExamesRelCasasDecimais1.Value = 1 then
            QRLabel24.Caption := FormatFloat('#,###,###,##0.0#',FrmLaudo.QryMovItensExamesRelResultado1.Value)
         else
            IF FrmLaudo.qrymovitensExamesRelCasasDecimais1.Value = 2 then
                QRLabel24.Caption := FormatFloat('#,###,###,##0.00',FrmLaudo.QryMovItensExamesRelResultado1.Value)
            else
               IF FrmLaudo.qrymovitensExamesRelCasasDecimais1.Value = 3 then
                  QRLabel24.Caption := FormatFloat('#,###,###,##0.000',FrmLaudo.QryMovItensExamesRelResultado1.Value)
               else
                  QRLabel24.Caption := FormatFloat('#,###,###,###.##',FrmLaudo.QryMovItensExamesRelResultado1.Value);
        QRLabel24.Caption := TRIM(QRLabel24.Caption) + TRIM(FrmLaudo.QryMovItensExamesRelUnidade1.Value);
//      IF (FrmLaudo.qrymovitensExamesRelCasasDecimais1.Value > 3) or (FrmLaudo.qrymovitensExamesRelCasasDecimais1.IsNull) then
//         QrDBText26.Mask := '#,###,###,##0.00';

      QRLabel25.Visible := True;
      IF FrmLaudo.qrymovitensExamesRelCasasDecimais2.Value = 0 then
         QRLabel25.Caption := FormatFloat('#,###,###,##0.##',FrmLaudo.QryMovItensExamesRelResultado2.Value)
      else
         IF FrmLaudo.qrymovitensExamesRelCasasDecimais2.Value = 1 then
            QRLabel25.Caption := FormatFloat('#,###,###,##0.0#',FrmLaudo.QryMovItensExamesRelResultado2.Value)
         else
            IF FrmLaudo.qrymovitensExamesRelCasasDecimais2.Value = 2 then
               QRLabel25.Caption := FormatFloat('#,###,###,##0.00',FrmLaudo.QryMovItensExamesRelResultado2.Value)
            else
               IF FrmLaudo.qrymovitensExamesRelCasasDecimais2.Value = 3 then
                   QRLabel25.Caption := FormatFloat('#,###,###,##0.000',FrmLaudo.QryMovItensExamesRelResultado2.Value)
               else
                   QRLabel25.Caption := FormatFloat('#,###,###,###.##',FrmLaudo.QryMovItensExamesRelResultado2.Value);
        QRLabel25.Caption := TRIM(QRLabel25.Caption) + TRIM(FrmLaudo.QryMovItensExamesRelUnidade2.Value);

                   //      IF (FrmLaudo.qrymovitensExamesRelCasasDecimais2.Value > 3) or (FrmLaudo.qrymovitensExamesRelCasasDecimais2.IsNull) then
//         QrDBText27.Mask := '#,###,###,##0.00';



      QrLabel15.Visible := True;
      QrLabel15.Caption := TRIM(FrmLaudo.QryMovItensExamesRelReferencia1.Value)+' '+TRIM(FrmLaudo.QryMovItensExamesRelUnidade1.Value);
      QrLabel16.Visible := True;
      QrLabel16.Caption := TRIM(FrmLaudo.QryMovItensExamesRelReferencia2.Value)+' '+TRIM(FrmLaudo.QryMovItensExamesRelUnidade2.Value);

//      QRDBText14.Visible := true;
//      QRDBText15.Visible := true;


      IF Length(FrmLaudo.QryMovItensExamesRelReferencia2.Value) < 1 then
      begin
         QRLABEL25.Width := 0;
         QrLabel16.Visible := False;
      end
      else
      begin
         QrLabel16.Visible := True;
         QRLabel25.Width := 162;
      end;
   end
   else
   begin
      QRLabel24.Visible := False;
      QRLabel25.Visible := False;

      QrLabel24.Width := 0;
      QrLabel25.Width := 0;

      Qrlabel15.Visible := True;
      QrLabel15.Caption := TRIM(FrmLaudo.QryMovItensExamesRelReferencia1.Value)+' '+TRIM(FrmLaudo.QryMovItensExamesRelUnidade1.Value);
      QrLabel16.Visible := True;
      QrLabel16.Caption := TRIM(FrmLaudo.QryMovItensExamesRelReferencia2.Value)+' '+TRIM(FrmLaudo.QryMovItensExamesRelUnidade2.Value);

      QRDBRichText1.Visible := true;
      IF Length(TRIM(FrmLaudo.QryMovItensExamesRelReferencia1.Value)) > 0 then
         QRDBRichText1.Width := 328
      else
         QRDBRichText1.Width := 559;

   end;



end;

procedure TFrmResultado.QRBand2BeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);
begin
   IF FrmLaudo.QryMovExamesRelImprimirSeparado.Value = 'S' then
      QRBand2.ForceNewPage := true
   else
      QRBand2.ForceNewPage := False;
   if Length(FrmLaudo.QryMovExamesRelmATERIAL.Value) < 1 then
   begin
      Qrlabel4.Caption := '';
      Qrband2.Height := 27;
   end
   else
   begin
      QrLabel4.Caption := 'Material:';
      QrBand2.Height := 47;
   end;

{   IF Length(FrmLaudo.QryMovExamesRelObservacao.Value) > 1 then
   begin
      QRDBRichText2.Visible := true;
      QrLabel1.Visible := true;
      Qrband2.Height := 48;
   end
   else
   begin
      QRDBRichText2.Visible := false;
      QrLabel1.Visible := False;
      Qrband2.Height := 24;
   end;
 }
end;

procedure TFrmResultado.PageFooterBeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);
begin
    IF FrmLaudo.QryQualquerAssinaturaScanner.Value = 'S' then
       QRDBImage1.Visible := True
    else
       QRDBImage1.Visible := False;

end;

procedure TFrmResultado.QRSubDetail2BeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);
begin
   IF Length(FrmLaudo.QryMovExamesRelObservacao.Value) < 3 then
      QrLabel1.Caption := ''
   else
      QrLabel1.Caption := 'Observação';
end;

procedure TFrmResultado.PageHeaderBeforePrint(Sender: TQRCustomBand;
  var PrintBand: Boolean);

begin

   Qrlabel23.Caption := '/'+inttostr(frmlaudo.qryqualquerano.value);
end;

end.
