unit FTP;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, IdBaseComponent, IdComponent, IdTCPConnection, IdTCPClient,
  IdFTP, StdCtrls, Buttons, Gauges, ShellApi;

type
  TFrmFTP = class(TForm)
    Gauge1: TGauge;
    ListBox1: TListBox;
    BBtnAtualiza: TBitBtn;
    BBtnFechar: TBitBtn;
    BBTnPesquisa: TBitBtn;
    IdFTP1: TIdFTP;
    Label1: TLabel;
    procedure BBTnPesquisaClick(Sender: TObject);
    procedure BBtnAtualizaClick(Sender: TObject);
    procedure BBtnFecharClick(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure IdFTP1Work(Sender: TObject; AWorkMode: TWorkMode;
      const AWorkCount: Integer);
    procedure IdFTP1WorkBegin(Sender: TObject; AWorkMode: TWorkMode;
      const AWorkCountMax: Integer);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmFTP: TFrmFTP;
  bytesToTransfer: integer;
implementation

uses Menu;

{$R *.dfm}

procedure TFrmFTP.BBTnPesquisaClick(Sender: TObject);
var
indice: integer;
begin
  try

    chdir('c:\aguia');
    //efetua a conexão ao FTP
    if IdFTP1.Connected then
      IdFTP1.Disconnect;
    try
       IdFTP1.Connect();
    except
       application.Terminate;
       halt;
    end;
    label1.caption := '';
    try
       IdFtp1.ChangeDir('Downloads');
       label1.Caption := '\Downloads';
    except
    end;
    Try
       IdFtp1.ChangeDir('Atualizacao');
       label1.Caption := label1.caption+'\Atualizacao';
    except
    end;
    try
       IdFtp1.ChangeDir('sislabvet');
       label1.caption := label1.caption+'\sislabvet';
    except
    end;


 //   ShowMessage(IdFTP1.ListResult);
    IdFTP1.List(ListBox1.Items,'*.*',false);

    //se não houverem arquivos, aborta
    if ListBox1.Items.Count = 0 then
      Abort;


    if frmmenu.StatusBar1.Panels[3].Text <> copy(listbox1.Items[0],10,6) then
    begin
//       ShowMessage('Atualização Necessária...'+chr(13)+' Pressione OK e Aguarde Fechamento do Sistema.');
       bbtnatualiza.Click;
       FrmFtp.Caption := 'Sistema Atualizado. Reiniciando o Sistema...';
       Application.Terminate;
    end
    else
    begin
//       ShowMessage('Sistema Já Atualizado. Click em OK e Depois Fechar. Obrigado...');;
//       halt;
//       FrmFtp.Caption := 'Atualização Não Necessária, Click em Fechar...'
       Application.Terminate;
    end;
  except
     close;

  end;

end;

procedure TFrmFTP.BBtnAtualizaClick(Sender: TObject);
var
indice: integer;
begin
  try
    //para cada ítem do ListBox1
    for indice:=0 to ListBox1.Items.Count -1 do
    begin
      try
        //marca o ítem selecionado
        ListBox1.Selected[indice] := true;
        //captura o tamanho do arquivo para a varíavel global
        bytesToTransfer := IdFTP1.Size(ListBox1.Items.Strings[indice]);
        //inicia a transferência do arquivo
       //IdFTP1.Get(ListBox1.Items.Strings[indice],ListBox1.Items.Strings[indice],true,false);
        IdFTP1.Get(ListBox1.Items.Strings[indice],
        'X'+ListBox1.Items.Strings[indice],true);
      except
        on e:exception do
          showmessage(e.Message);
      end;
    end;
  except
     IdFTP1.Disconnect;
     ShowMessage('Atualização com Erro.');
     Application.Terminate;
  end;
    //desconecta
   IdFTP1.Disconnect;
   Gauge1.Progress := bytesToTransfer;
   Deletefile('c:\aguia\sislabvetxz.exe');
   Renamefile('c:\aguia\sislabvet.exe','c:\aguia\sislabvetxz.exe');
   ShellExecute(Handle, 'open', pchar('X'+listbox1.Items[0]) , '', '', SW_SHOWNORMAL);
   Application.Terminate;

end;

procedure TFrmFTP.BBtnFecharClick(Sender: TObject);
begin
   close;
end;

procedure TFrmFTP.FormActivate(Sender: TObject);
begin
   bbtnpesquisa.Enabled := False;
   bbtnatualiza.Enabled := False;
   BBTnPesquisa.Click;
   BbtnFechar.Click;
end;

procedure TFrmFTP.FormClose(Sender: TObject; var Action: TCloseAction);
begin
 Release;
 FrmFtp := nil;
end;

procedure TFrmFTP.IdFTP1Work(Sender: TObject; AWorkMode: TWorkMode;
  const AWorkCount: Integer);
begin
  Gauge1.Progress := AWorkCount;

end;

procedure TFrmFTP.IdFTP1WorkBegin(Sender: TObject; AWorkMode: TWorkMode;
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
