unit Transferencia;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, Buttons, ExtCtrls, CurrEdit, Mask, ToolEdit, RxLookup,
  DBTables, DB, DateUtils;

type
  TFrmTransfere = class(TForm)
    QryOrigem: TQuery;
    QryOrigemCODBANCO: TAutoIncField;
    QryOrigemNUMBANCO: TStringField;
    QryOrigemNOMEBANCO: TStringField;
    QryOrigemNUMAGENCIA: TStringField;
    QryOrigemNOMEAGENCIA: TStringField;
    QryOrigemNUMCONTA: TStringField;
    QryOrigemATIVO: TStringField;
    QryDestino: TQuery;
    QryDestinoCODBANCO: TAutoIncField;
    QryDestinoNUMBANCO: TStringField;
    QryDestinoNOMEBANCO: TStringField;
    QryDestinoNUMAGENCIA: TStringField;
    QryDestinoNOMEAGENCIA: TStringField;
    QryDestinoNUMCONTA: TStringField;
    QryDestinoATIVO: TStringField;
    DSORigem: TDataSource;
    DSDestino: TDataSource;
    SPContas: TStoredProc;
    Label1: TLabel;
    RxDBLookupCombo1: TRxDBLookupCombo;
    RxDBLookupCombo2: TRxDBLookupCombo;
    Label2: TLabel;
    DateEdit1: TDateEdit;
    Label3: TLabel;
    CurrencyEdit1: TCurrencyEdit;
    Label4: TLabel;
    Panel1: TPanel;
    BbtnTransfere: TBitBtn;
    SpeedButton2: TSpeedButton;
    procedure BbtnTransfereClick(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure SpeedButton2Click(Sender: TObject);
    procedure FormActivate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmTransfere: TFrmTransfere;

implementation

{$R *.dfm}

procedure TFrmTransfere.BbtnTransfereClick(Sender: TObject);
begin
   if Application.MessageBox('Confirma Transferência Entre as Contas ? ',
         'Confirme', 4  + MB_ICONQUESTION)= idYes then
   begin
       IF RxDBLookupCombo1.KeyValue < 1 then
       begin
          ShowMessage('Selecione a Origem da Transferência..');
          RxDBLookupCombo1.SetFocus;
          Exit;
       end;
       IF RxDBLookupCombo2.KeyValue < 1 then
       begin
          ShowMessage('Selecione a Destino da Transferência..');
          RxDBLookupCombo2.SetFocus;
          Exit;
       end;
       IF RxDBLookupCombo1.KeyValue = RxDBLookupCombo2.KeyValue then
       begin
          ShowMessage('Origem e Destino Iguais, Selecione Contas Diferentes..');
          RxDBLookupCombo1.SetFocus;
          Exit;
       end;

       IF DateEdit1.Date <= incday(now,-3650) then
       begin
          ShowMessage('Coloque a Data da Transferência..');
          DateEdit1.SetFocus;
          Exit;
       end;
       IF CurrencyEdit1.Value < 0 then
       begin
          ShowMessage('Coloque o Valor da Transferência..');
          CurrencyEdit1.SetFocus;
          Exit;
       end;
       SpContas.Prepare;
       with spContas do
       begin
   // @CodSeqContas_1 	[int] output,
          paramByName('@TIPOACAO_2').value := 'P';
          paramByName('@DESCRICAO_3').value := 'TRANSFERÊNCIA ENTRE CONTAS';
          paramByName('@QTDEPARC_4').value := 1;
          paramByName('@NUMPARC_5').value := 1;
          paramByName('@DTEMISSAO_6').value := DateEdit1.Date;
          paramByName('@DTVENC_7').value := DateEdit1.Date;
          paramByName('@VLCALCULADO_8').value := 0;
          paramByName('@VLDESCONTO_9').value := 0;
          paramByName('@VLFATURA_10').value := CurrencyEdit1.Value;
          paramByName('@CODCLIENTE_11').value := null;
          paramByName('@CODFORN_12').value := null;
          paramByName('@NDOCTIT_13').value := null;
          paramByName('@ATIVO_14').value := 'S';
          paramByName('@CODBANCO_15').value := QryOrigemCodBanco.Value;
          paramByName('@TIPOCADASTRO_16').value := 'T';
          paramByName('@DESCR_17').value := 'TRANSFERÊNCIA ENTRE CONTAS';
          paramByName('@CodRespProf_18').value := NULL;
          paramByName('@CODDESCONTO_19').value := NULL;
          paramByName('@VLPGTO_20').value := CurrencyEdit1.Value;
          paramByName('@DTPGTO_21').value := DateEdit1.Date;
          execproc;
       end;

       SpContas.Prepare;
       with spContas do
       begin
   // @CodSeqContas_1 	[int] output,
          paramByName('@TIPOACAO_2').value := 'R';
          paramByName('@DESCRICAO_3').value := 'TRANSFERÊNCIA ENTRE CONTAS';
          paramByName('@QTDEPARC_4').value := 1;
          paramByName('@NUMPARC_5').value := 1;
          paramByName('@DTEMISSAO_6').value := DateEdit1.Date;
          paramByName('@DTVENC_7').value := DateEdit1.Date;
          paramByName('@VLCALCULADO_8').value := 0;
          paramByName('@VLDESCONTO_9').value := 0;
          paramByName('@VLFATURA_10').value := CurrencyEdit1.Value;
          paramByName('@CODCLIENTE_11').value := null;
          paramByName('@CODFORN_12').value := null;
          paramByName('@NDOCTIT_13').value := null;
          paramByName('@ATIVO_14').value := 'S';
          paramByName('@CODBANCO_15').value := QryDestinoCodBanco.Value;
          paramByName('@TIPOCADASTRO_16').value := 'T';
          paramByName('@DESCR_17').value := 'TRANSFERÊNCIA ENTRE CONTAS';
          paramByName('@CodRespProf_18').value := NULL;
          paramByName('@CODDESCONTO_19').value := NULL;
          paramByName('@VLPGTO_20').value := CurrencyEdit1.Value;
          paramByName('@DTPGTO_21').value := DateEdit1.Date;
          execproc;
     end;
     ShowMessage('Transferência Realizada com Suscesso..');
     close;
  end;


end;

procedure TFrmTransfere.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
   Release;
   FrmTransfere := nil;
end;

procedure TFrmTransfere.SpeedButton2Click(Sender: TObject);
begin
   close;
end;

procedure TFrmTransfere.FormActivate(Sender: TObject);
begin
   QryOrigem.Close;
   QryOrigem.Active := True;
   QryDestino.Close;
   QryDestino.Active := True;

end;

end.
