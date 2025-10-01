unit Empresa;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DBTables, DB, StdCtrls, Buttons, DBCtrls, Mask, ExtCtrls,
  ExtDlgs, jpeg;

type
  TFrmEmpresa = class(TForm)
    Panel1: TPanel;
    Panel2: TPanel;
    ScrollBox1: TScrollBox;
    Label1: TLabel;
    DBEdit1: TDBEdit;
    Label2: TLabel;
    DBEdit2: TDBEdit;
    Label3: TLabel;
    DBEdit3: TDBEdit;
    Label4: TLabel;
    DBEdit4: TDBEdit;
    Label5: TLabel;
    DBEdit5: TDBEdit;
    Label6: TLabel;
    DBEdit6: TDBEdit;
    Label7: TLabel;
    DBEdit7: TDBEdit;
    Label8: TLabel;
    DBEdit8: TDBEdit;
    Label9: TLabel;
    DBEdit9: TDBEdit;
    Label10: TLabel;
    DBEdit10: TDBEdit;
    Label11: TLabel;
    DBImage1: TDBImage;
    Label13: TLabel;
    DBEdit12: TDBEdit;
    Label14: TLabel;
    DBEdit13: TDBEdit;
    Label15: TLabel;
    DBEdit14: TDBEdit;
    Label16: TLabel;
    DBEdit15: TDBEdit;
    Label17: TLabel;
    DBEdit16: TDBEdit;
    BbtnGravar: TBitBtn;
    BitBtn1: TBitBtn;
    OpenPictureDialog1: TOpenPictureDialog;
    BitBtn2: TBitBtn;
    Label12: TLabel;
    DBEdit11: TDBEdit;
    Label18: TLabel;
    DBEdit17: TDBEdit;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure BitBtn1Click(Sender: TObject);
    procedure BbtnGravarClick(Sender: TObject);
    procedure DBImage1Click(Sender: TObject);
    procedure BitBtn2Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmEmpresa: TFrmEmpresa;

implementation

uses DM_LABVET;

{$R *.dfm}

procedure TFrmEmpresa.FormClose(Sender: TObject; var Action: TCloseAction);
begin
   Release;
   FrmEmpresa:=nil;
end;

procedure TFrmEmpresa.BitBtn1Click(Sender: TObject);
begin
   DMLabVet.QryEmpresa.Close;
   DMLabVet.QryEmpresa.Active := True;
   close;
end;

procedure TFrmEmpresa.BbtnGravarClick(Sender: TObject);
begin
   DMLabVEt.QryEmpresa.Post;
   DMLabVet.QryEmpresa.ApplyUpdates;
   DMLabVet.QryEmpresa.Close;
   DMLabVet.QryEmpresa.Active := True;
   DMLabVet.QryEmpresa.Edit;
end;

procedure TFrmEmpresa.DBImage1Click(Sender: TObject);
var
   BMP : TBitMap;
begin
   TRY
      BMP := TBitMap.Create;
      IF OpenPictureDialog1.Execute then
      begin
         IF DMLABVET.QryEmpresa.State in [dsInsert, dsEdit] then
         begin
            bmp.LoadFromFile(openPictureDialog1.FileName);
            DMLABVET.QryEmpresaImagem.Assign(bmp);
         end; // State
      end; // Execute
   EXCEPT
      DMLABVET.QryEmpresaImagem.Clear;
      dmlabvet.QryEmpresa.Post;
      dmlabvet.QryEmpresa.ApplyUpdates;
      dmlABVET.QryEmpresa.Edit;
      DBImage1.OnClick(nil);
   END;

end;


procedure TFrmEmpresa.BitBtn2Click(Sender: TObject);
begin
   DBImage1.OnClick(nil);
end;

end.
