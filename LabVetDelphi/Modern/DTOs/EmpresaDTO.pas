unit EmpresaDTO;

interface

uses
  System.Classes, System.SysUtils;

type
  TEmpresaDTO = class
  private
    FCodEmpresa: Integer;
    FEmpresa: string;
    FFantasia: string;
    FAbreviatura: string;
    FEndereco: string;
    FBairro: string;
    FCidade: string;
    FUF: string;
    FCEP: string;
    FCNPJ: string;
    FFone1: string;
    FFone2: string;
    FImagem: TMemoryStream;
    FDataCadastro: TDateTime;
    FVersao: string;
    FPOP3: string;
    FSMTP: string;
    FEmail: string;
    FSenha: string;
    FSite: string;
    FCreatedAt: TDateTime;
    FUpdatedAt: TDateTime;
    
  public
    constructor Create;
    destructor Destroy; override;
    
    // Métodos de validação
    function IsValid: Boolean;
    function GetValidationErrors: TArray<string>;
    
    // Métodos utilitários
    function CNPJLimpo: string;
    function TelefoneLimpo(Telefone: string): string;
    function CEPLimpo: string;
    
    // Propriedades
    property CodEmpresa: Integer read FCodEmpresa write FCodEmpresa;
    property Empresa: string read FEmpresa write FEmpresa;
    property Fantasia: string read FFantasia write FFantasia;
    property Abreviatura: string read FAbreviatura write FAbreviatura;
    property Endereco: string read FEndereco write FEndereco;
    property Bairro: string read FBairro write FBairro;
    property Cidade: string read FCidade write FCidade;
    property UF: string read FUF write FUF;
    property CEP: string read FCEP write FCEP;
    property CNPJ: string read FCNPJ write FCNPJ;
    property Fone1: string read FFone1 write FFone1;
    property Fone2: string read FFone2 write FFone2;
    property Imagem: TMemoryStream read FImagem write FImagem;
    property DataCadastro: TDateTime read FDataCadastro write FDataCadastro;
    property Versao: string read FVersao write FVersao;
    property POP3: string read FPOP3 write FPOP3;
    property SMTP: string read FSMTP write FSMTP;
    property Email: string read FEmail write FEmail;
    property Senha: string read FSenha write FSenha;
    property Site: string read FSite write FSite;
    property CreatedAt: TDateTime read FCreatedAt write FCreatedAt;
    property UpdatedAt: TDateTime read FUpdatedAt write FUpdatedAt;
  end;

implementation

uses
  System.RegularExpressions;

{ TEmpresaDTO }

constructor TEmpresaDTO.Create;
begin
  inherited;
  FImagem := TMemoryStream.Create;
  FDataCadastro := Now;
  FCreatedAt := Now;
  FUpdatedAt := Now;
end;

destructor TEmpresaDTO.Destroy;
begin
  FImagem.Free;
  inherited;
end;

function TEmpresaDTO.IsValid: Boolean;
begin
  Result := Length(GetValidationErrors) = 0;
end;

function TEmpresaDTO.GetValidationErrors: TArray<string>;
var
  Errors: TArray<string>;
begin
  SetLength(Errors, 0);
  
  // Validação do nome da empresa
  if Trim(FEmpresa) = '' then
  begin
    SetLength(Errors, Length(Errors) + 1);
    Errors[High(Errors)] := 'Nome da empresa é obrigatório';
  end;
  
  // Validação do CNPJ
  if Trim(FCNPJ) <> '' then
  begin
    if Length(CNPJLimpo) <> 14 then
    begin
      SetLength(Errors, Length(Errors) + 1);
      Errors[High(Errors)] := 'CNPJ deve ter 14 dígitos';
    end;
  end;
  
  // Validação do email
  if Trim(FEmail) <> '' then
  begin
    if not TRegEx.IsMatch(FEmail, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') then
    begin
      SetLength(Errors, Length(Errors) + 1);
      Errors[High(Errors)] := 'Email inválido';
    end;
  end;
  
  // Validação da UF
  if Trim(FUF) <> '' then
  begin
    if Length(FUF) <> 2 then
    begin
      SetLength(Errors, Length(Errors) + 1);
      Errors[High(Errors)] := 'UF deve ter 2 caracteres';
    end;
  end;
  
  Result := Errors;
end;

function TEmpresaDTO.CNPJLimpo: string;
begin
  Result := TRegEx.Replace(FCNPJ, '[^0-9]', '');
end;

function TEmpresaDTO.TelefoneLimpo(Telefone: string): string;
begin
  Result := TRegEx.Replace(Telefone, '[^0-9]', '');
end;

function TEmpresaDTO.CEPLimpo: string;
begin
  Result := TRegEx.Replace(FCEP, '[^0-9]', '');
end;

end.