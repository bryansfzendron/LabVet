unit ConnectionManager;

interface

uses
  System.SysUtils, System.IniFiles, FireDAC.Comp.Client, FireDAC.Stan.Def,
  FireDAC.Stan.Async, FireDAC.DApt, FireDAC.UI.Intf, FireDAC.VCLUI.Wait,
  FireDAC.Comp.UI, FireDAC.Phys, FireDAC.Phys.PG, FireDAC.Phys.PGDef,
  FireDAC.Stan.Pool, FireDAC.Stan.Error;

type
  TConnectionManager = class
  private
    class var FInstance: TConnectionManager;
    FConnection: TFDConnection;
    FConnectionDef: TFDConnectionDefParams;
    
    constructor Create;
    procedure ConfigurarConexao;
    procedure CarregarConfiguracoes;
    function CriptografarSenha(const Senha: string): string;
    function DescriptografarSenha(const SenhaCriptografada: string): string;
    
  public
    class function GetInstance: TConnectionManager;
    class procedure DestroyInstance;
    
    function GetConnection: TFDConnection;
    procedure TestarConexao;
    procedure ReconectarSeNecessario;
    
    // Configurações de conexão
    procedure ConfigurarConexaoCloud(const Host, Database, Username, Password: string; Port: Integer = 5432);
    procedure SalvarConfiguracoes(const Host, Database, Username, Password: string; Port: Integer = 5432);
    
    destructor Destroy; override;
  end;

implementation

uses
  System.Classes, Vcl.Forms;

{ TConnectionManager }

class function TConnectionManager.GetInstance: TConnectionManager;
begin
  if not Assigned(FInstance) then
    FInstance := TConnectionManager.Create;
  Result := FInstance;
end;

class procedure TConnectionManager.DestroyInstance;
begin
  if Assigned(FInstance) then
  begin
    FInstance.Free;
    FInstance := nil;
  end;
end;

constructor TConnectionManager.Create;
begin
  inherited;
  FConnection := TFDConnection.Create(nil);
  ConfigurarConexao;
end;

destructor TConnectionManager.Destroy;
begin
  if Assigned(FConnection) then
  begin
    if FConnection.Connected then
      FConnection.Connected := False;
    FConnection.Free;
  end;
  inherited;
end;

procedure TConnectionManager.ConfigurarConexao;
begin
  // Configurações básicas do FireDAC
  FConnection.DriverName := 'PG';
  FConnection.LoginPrompt := False;
  
  // Configurações de pool de conexões
  FConnection.Params.Values['Pooled'] := 'True';
  FConnection.Params.Values['POOL_MaximumItems'] := '50';
  FConnection.Params.Values['POOL_ExpireTimeout'] := '90000';
  FConnection.Params.Values['POOL_CleanupTimeout'] := '30000';
  
  // Configurações de timeout
  FConnection.Params.Values['ConnectionTimeout'] := '30';
  FConnection.Params.Values['CommandTimeout'] := '60';
  
  // Configurações de SSL
  FConnection.Params.Values['SSLMode'] := 'require';
  
  // Configurações de aplicação
  FConnection.Params.Values['ApplicationName'] := 'LabVet_Desktop_v2.0';
  
  // Carregar configurações do arquivo
  CarregarConfiguracoes;
end;

procedure TConnectionManager.CarregarConfiguracoes;
var
  IniFile: TIniFile;
  ConfigFile: string;
  Host, Database, Username, Password: string;
  Port: Integer;
begin
  ConfigFile := ExtractFilePath(Application.ExeName) + 'config.ini';
  
  if not FileExists(ConfigFile) then
  begin
    // Criar arquivo de configuração padrão
    IniFile := TIniFile.Create(ConfigFile);
    try
      IniFile.WriteString('Database', 'Host', 'localhost');
      IniFile.WriteString('Database', 'Database', 'labvet_db');
      IniFile.WriteString('Database', 'Username', 'labvet_user');
      IniFile.WriteString('Database', 'Password', CriptografarSenha('labvet_password'));
      IniFile.WriteInteger('Database', 'Port', 5432);
      IniFile.WriteBool('Database', 'UseSSL', True);
    finally
      IniFile.Free;
    end;
  end;
  
  IniFile := TIniFile.Create(ConfigFile);
  try
    Host := IniFile.ReadString('Database', 'Host', 'localhost');
    Database := IniFile.ReadString('Database', 'Database', 'labvet_db');
    Username := IniFile.ReadString('Database', 'Username', 'labvet_user');
    Password := DescriptografarSenha(IniFile.ReadString('Database', 'Password', ''));
    Port := IniFile.ReadInteger('Database', 'Port', 5432);
    
    ConfigurarConexaoCloud(Host, Database, Username, Password, Port);
  finally
    IniFile.Free;
  end;
end;

procedure TConnectionManager.ConfigurarConexaoCloud(const Host, Database, Username, Password: string; Port: Integer);
begin
  FConnection.Params.Values['Server'] := Host;
  FConnection.Params.Values['Database'] := Database;
  FConnection.Params.Values['User_Name'] := Username;
  FConnection.Params.Values['Password'] := Password;
  FConnection.Params.Values['Port'] := IntToStr(Port);
  
  // Configurações específicas para cloud
  FConnection.Params.Values['CharacterSet'] := 'UTF8';
  FConnection.Params.Values['ExtendedMetadata'] := 'True';
  
  // Log de conexão para debug (remover em produção)
  {$IFDEF DEBUG}
  FConnection.Params.Values['MonitorBy'] := 'Remote';
  {$ENDIF}
end;

procedure TConnectionManager.SalvarConfiguracoes(const Host, Database, Username, Password: string; Port: Integer);
var
  IniFile: TIniFile;
  ConfigFile: string;
begin
  ConfigFile := ExtractFilePath(Application.ExeName) + 'config.ini';
  
  IniFile := TIniFile.Create(ConfigFile);
  try
    IniFile.WriteString('Database', 'Host', Host);
    IniFile.WriteString('Database', 'Database', Database);
    IniFile.WriteString('Database', 'Username', Username);
    IniFile.WriteString('Database', 'Password', CriptografarSenha(Password));
    IniFile.WriteInteger('Database', 'Port', Port);
  finally
    IniFile.Free;
  end;
  
  // Aplicar novas configurações
  ConfigurarConexaoCloud(Host, Database, Username, Password, Port);
end;

function TConnectionManager.GetConnection: TFDConnection;
begin
  ReconectarSeNecessario;
  Result := FConnection;
end;

procedure TConnectionManager.TestarConexao;
begin
  try
    if FConnection.Connected then
      FConnection.Connected := False;
      
    FConnection.Connected := True;
    
    // Testar com uma query simples
    FConnection.ExecSQL('SELECT 1');
    
  except
    on E: Exception do
      raise Exception.Create('Erro ao conectar com o banco de dados: ' + E.Message);
  end;
end;

procedure TConnectionManager.ReconectarSeNecessario;
begin
  try
    if not FConnection.Connected then
      FConnection.Connected := True;
      
    // Testar se a conexão está realmente ativa
    FConnection.ExecSQL('SELECT 1');
  except
    on E: EFDDBEngineException do
    begin
      // Tentar reconectar em caso de erro de conexão
      try
        FConnection.Connected := False;
        Sleep(1000); // Aguardar 1 segundo
        FConnection.Connected := True;
      except
        on E2: Exception do
          raise Exception.Create('Falha ao reconectar com o banco de dados: ' + E2.Message);
      end;
    end;
  end;
end;

function TConnectionManager.CriptografarSenha(const Senha: string): string;
var
  i: Integer;
  Chave: Byte;
begin
  // Criptografia simples XOR (para produção, usar algo mais robusto)
  Result := '';
  Chave := 123; // Chave fixa para exemplo
  
  for i := 1 to Length(Senha) do
  begin
    Result := Result + IntToHex(Ord(Senha[i]) xor Chave, 2);
  end;
end;

function TConnectionManager.DescriptografarSenha(const SenhaCriptografada: string): string;
var
  i: Integer;
  Chave: Byte;
  HexByte: string;
begin
  // Descriptografia simples XOR
  Result := '';
  Chave := 123; // Mesma chave usada na criptografia
  
  if Length(SenhaCriptografada) mod 2 <> 0 then
    Exit; // Tamanho inválido
    
  for i := 1 to Length(SenhaCriptografada) div 2 do
  begin
    HexByte := Copy(SenhaCriptografada, (i-1)*2 + 1, 2);
    try
      Result := Result + Chr(StrToInt('$' + HexByte) xor Chave);
    except
      Exit; // Erro na conversão
    end;
  end;
end;

initialization

finalization
  TConnectionManager.DestroyInstance;

end.