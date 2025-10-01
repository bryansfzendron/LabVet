unit Backup;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ExtCtrls, StdCtrls, Buttons, DB, DBTables, ComCtrls, IdMessage,
  IdBaseComponent, IdComponent, IdTCPConnection, IdTCPClient,
  IdMessageClient, IdSMTP, Gauges, DateUtils,  Shellapi, IdFTP;

type
  TFrmBackup = class(TForm)
    Panel1: TPanel;
    Panel2: TPanel;
    Panel3: TPanel;
    SPBackup: TStoredProc;
    ProgressBar1: TProgressBar;
    Label1: TLabel;
    Label2: TLabel;
    ProgressBar2: TProgressBar;
    BitBtn1: TBitBtn;
    Memo1: TMemo;
    Label3: TLabel;
    Gauge1: TGauge;
    IdSMTP1: TIdSMTP;
    IdMessage1: TIdMessage;
    BbtnEmail: TBitBtn;
    IdFTP1: TIdFTP;
    procedure BitBtn1Click(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure IdSMTP1Work(Sender: TObject; AWorkMode: TWorkMode;
      const AWorkCount: Integer);
    procedure IdSMTP1WorkBegin(Sender: TObject; AWorkMode: TWorkMode;
      const AWorkCountMax: Integer);
    procedure BbtnEmailClick(Sender: TObject);
    procedure IdFTP1Work(Sender: TObject; AWorkMode: TWorkMode;
      const AWorkCount: Integer);
    procedure IdFTP1WorkBegin(Sender: TObject; AWorkMode: TWorkMode;
      const AWorkCountMax: Integer);
  private
    { Private declarations }
  public
    { Public declarations }
     tempo : integer;
     bytesToTransfer: integer;
  end;

var
  FrmBackup: TFrmBackup;

implementation

uses DM_LABVET;

{$R *.dfm}

procedure TFrmBackup.BitBtn1Click(Sender: TObject);
var
   caminho : string;
   AA, MM, DD, HH, Mi, SS, MS: Word;
   attach: TIdAttachment;
   tempStr, comando: String;
   i, x : integer;
   F : File;


begin
  BitBtn1.Enabled := False;
  ProgressBar1.Max := 100;
  ProgressBar1.Position := 30;
  SPBackup.Prepare;
  SPBAckup.ExecProc;
  Progressbar1.Position := 100;
  decodedate(now,aa,mm,dd);
  caminho := 'BK_LABVET.bak';
  chdir('c:\aguia\database\labvet');
  comando := '7z  a C:\Dropbox\ViddaLab\Sislabvet' +' '+caminho;
//  shellexecute (handle, 'open', pchar(comando),'', '', sw_shownormal);
  WinExec(pchar(Comando), SW_SHOW);
  BbtnEmail.Enabled := True;
  Gauge1.Visible := True;


end;

procedure TFrmBackup.FormClose(Sender: TObject; var Action: TCloseAction);
begin
   Release;
   FrmBackup := Nil;

end;

procedure TFrmBackup.IdSMTP1Work(Sender: TObject; AWorkMode: TWorkMode;
  const AWorkCount: Integer);
begin
  Gauge1.Progress := AWorkCount;

end;

procedure TFrmBackup.IdSMTP1WorkBegin(Sender: TObject;
  AWorkMode: TWorkMode; const AWorkCountMax: Integer);
begin
 //limpa a barra de progresso
  Gauge1.Progress := 1;
  //define o tamanho máximo para o Gauge
  if AWorkCountMax > 0 then
    Gauge1.MaxValue := AWorkCountMax
  else
    Gauge1.MaxValue := bytesToTransfer;

end;

procedure TFrmBackup.BbtnEmailClick(Sender: TObject);
var
   caminho : string;
   AA, MM, DD, HH, Mi, SS, MS: Word;
   attach: TIdAttachment;
   tempStr: String;
   i, x : integer;
   F : File;
   dt : TDatetime;
begin
  ////////////////////////
  ////// Enviando Backup para Email
    dt := now;
    decodedate(now,aa,mm,dd);
    caminho := 'C:\AGUIA\DATABASE\LABVET\Sislabvet'+inttostr(dayofweek(now))+inttostr(aa)+'.7z';

 //    ShowMessage(caminho);
     bytesToTransfer := 0;

     label1.Visible := true;
     TempStr := caminho;
     AssignFile(F, TempStr);
     Reset(F, 1);
     BytesToTransfer := BytesToTransfer + (FileSize(F));
     CloseFile(F);

//     if IdFTP1.Connected then
//         IdFTP1.Disconnect;
//     try
//         IdFTP1.Connect();
//     except
//       ShowMessage('Sem Conexão com a Internet, não foi possível verificar '+#13+
//                   'se existe atualização para o sistema..');
//       application.Terminate;
//       halt;
//     end;
//     try
//        IdFTP1.Delete('LABVET.7z');
//     except

//     end;
//     try
      //   IdFTP1.Put(TempStr,'LABVET.7z');

//         IdFTP1.Disconnect;
     try
         attach := TIdAttachment.Create(idmessage1.MessageParts);
         attach.FileName := ExtractFileName(tempStr);
         attach.StoredPathName := tempStr;
         IdMessage1.From.Address := 'luciano.olgado@politampas.com.br'; //e-mail do remetente
         IdMessage1.From.Name := 'SISLABVET - AGUIA SUPORTE - BACKUP AUTOMATIZADO ';
         IdMessage1.Recipients.EMailAddresses := 'l_olgado@hotmail.com;vidda_labvet@hotmail.com'; //e-mail do destinatário
         IdMessage1.Subject := 'SISLABVET - Backup Diario Processo. Automatizado - SISLABVET'; //Assunto

         //Configuração do IdSMTP
         IdSMTP1.Host := 'mail.politampas.com.br'; //Host SMTP
         IdSMTP1.Port := 25; //Port do yahoo
         IdSMTP1.UserName := 'luciano.olgado@politampas.com.br'; //Login do usuário
         IdSMTP1.Password := 'matrix18'; //Senha do usuário

         try
            IdSMTP1.Connect; //Estabelece a conexão
         except
             ShowMessage('Provalmente Internet não esta Ativa');
             close;
             exit;
         end;
         try
             IdSMTP1.Authenticate; //Faz a autenticação
         except
             ShowMessage('Erro de Autenticação: Usuário e Senha');
             close;
             exit;
         end;
         try
            IdSMTP1.Send(IdMessage1); //Envia a mensagem
         except
            showmessage('Email não Enviado.'+CHR(13)+
             'Provavelmente Micro Desconectado da Internet. '); //Mensagem de erro
            close;
            exit;
         end;
         IdSMTP1.Disconnect;
         gauge1.Progress := BytesToTransfer;
         ShowMessage('Mensagem Enviada com Sucesso. Duração do Envio '+timetostr(now-dt));
         Gauge1.Visible := False;
         close;
     except
        showmessage('Erro no Envio do Email.');
        close;
        exit;
     end;   
end;

procedure TFrmBackup.IdFTP1Work(Sender: TObject; AWorkMode: TWorkMode;
  const AWorkCount: Integer);
begin
  Gauge1.Progress := AWorkCount;

end;

procedure TFrmBackup.IdFTP1WorkBegin(Sender: TObject; AWorkMode: TWorkMode;
  const AWorkCountMax: Integer);
begin
  //limpa a barra de progresso
  Gauge1.Progress := 1;
  //define o tamanho máximo para o Gauge
  if AWorkCountMax > 0 then
    Gauge1.MaxValue := AWorkCountMax
  else
    Gauge1.MaxValue := bytesToTransfer;
end;

end.
