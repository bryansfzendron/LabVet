unit EmpresaRepository;

interface

uses
  System.SysUtils, System.Generics.Collections, FireDAC.Comp.Client,
  FireDAC.Stan.Param, FireDAC.DatS, FireDAC.DApt.Intf, FireDAC.Stan.Error,
  IEmpresaRepository, EmpresaDTO, Data.DB;

type
  TEmpresaRepository = class(TInterfacedObject, IEmpresaRepository)
  private
    FConnection: TFDConnection;
    
    function DataSetToDTO(DataSet: TFDQuery): TEmpresaDTO;
    procedure DTOToParams(Empresa: TEmpresaDTO; Query: TFDQuery);
    
  public
    constructor Create(Connection: TFDConnection);
    
    // Implementação da interface IEmpresaRepository
    function GetById(Id: Integer): TEmpresaDTO;
    function GetAll: TList<TEmpresaDTO>;
    function Insert(Empresa: TEmpresaDTO): Integer;
    function Update(Empresa: TEmpresaDTO): Boolean;
    function Delete(Id: Integer): Boolean;
    
    function GetByFantasia(Fantasia: string): TEmpresaDTO;
    function GetByCNPJ(CNPJ: string): TEmpresaDTO;
    function ExisteCNPJ(CNPJ: string; ExcluirId: Integer = 0): Boolean;
    
    function ValidarDados(Empresa: TEmpresaDTO): TArray<string>;
    function Pesquisar(Termo: string): TList<TEmpresaDTO>;
  end;

implementation

uses
  System.RegularExpressions;

{ TEmpresaRepository }

constructor TEmpresaRepository.Create(Connection: TFDConnection);
begin
  inherited Create;
  FConnection := Connection;
end;

function TEmpresaRepository.DataSetToDTO(DataSet: TFDQuery): TEmpresaDTO;
var
  BlobStream: TStream;
begin
  Result := TEmpresaDTO.Create;
  try
    Result.CodEmpresa := DataSet.FieldByName('cod_empresa').AsInteger;
    Result.Empresa := DataSet.FieldByName('empresa').AsString;
    Result.Fantasia := DataSet.FieldByName('fantasia').AsString;
    Result.Abreviatura := DataSet.FieldByName('abreviatura').AsString;
    Result.Endereco := DataSet.FieldByName('endereco').AsString;
    Result.Bairro := DataSet.FieldByName('bairro').AsString;
    Result.Cidade := DataSet.FieldByName('cidade').AsString;
    Result.UF := DataSet.FieldByName('uf').AsString;
    Result.CEP := DataSet.FieldByName('cep').AsString;
    Result.CNPJ := DataSet.FieldByName('cnpj').AsString;
    Result.Fone1 := DataSet.FieldByName('fone1').AsString;
    Result.Fone2 := DataSet.FieldByName('fone2').AsString;
    
    // Tratamento especial para campo BLOB
    if not DataSet.FieldByName('imagem').IsNull then
    begin
      BlobStream := DataSet.CreateBlobStream(DataSet.FieldByName('imagem'), bmRead);
      try
        Result.Imagem.CopyFrom(BlobStream, 0);
      finally
        BlobStream.Free;
      end;
    end;
    
    Result.DataCadastro := DataSet.FieldByName('data_cadastro').AsDateTime;
    Result.Versao := DataSet.FieldByName('versao').AsString;
    Result.POP3 := DataSet.FieldByName('pop3').AsString;
    Result.SMTP := DataSet.FieldByName('smtp').AsString;
    Result.Email := DataSet.FieldByName('email').AsString;
    Result.Senha := DataSet.FieldByName('senha').AsString;
    Result.Site := DataSet.FieldByName('site').AsString;
    Result.CreatedAt := DataSet.FieldByName('created_at').AsDateTime;
    Result.UpdatedAt := DataSet.FieldByName('updated_at').AsDateTime;
  except
    Result.Free;
    raise;
  end;
end;

procedure TEmpresaRepository.DTOToParams(Empresa: TEmpresaDTO; Query: TFDQuery);
begin
  Query.ParamByName('empresa').AsString := Empresa.Empresa;
  Query.ParamByName('fantasia').AsString := Empresa.Fantasia;
  Query.ParamByName('abreviatura').AsString := Empresa.Abreviatura;
  Query.ParamByName('endereco').AsString := Empresa.Endereco;
  Query.ParamByName('bairro').AsString := Empresa.Bairro;
  Query.ParamByName('cidade').AsString := Empresa.Cidade;
  Query.ParamByName('uf').AsString := Empresa.UF;
  Query.ParamByName('cep').AsString := Empresa.CEP;
  Query.ParamByName('cnpj').AsString := Empresa.CNPJ;
  Query.ParamByName('fone1').AsString := Empresa.Fone1;
  Query.ParamByName('fone2').AsString := Empresa.Fone2;
  
  // Tratamento especial para campo BLOB
  if Empresa.Imagem.Size > 0 then
  begin
    Empresa.Imagem.Position := 0;
    Query.ParamByName('imagem').LoadFromStream(Empresa.Imagem, ftBlob);
  end
  else
    Query.ParamByName('imagem').Clear;
    
  Query.ParamByName('data_cadastro').AsDateTime := Empresa.DataCadastro;
  Query.ParamByName('versao').AsString := Empresa.Versao;
  Query.ParamByName('pop3').AsString := Empresa.POP3;
  Query.ParamByName('smtp').AsString := Empresa.SMTP;
  Query.ParamByName('email').AsString := Empresa.Email;
  Query.ParamByName('senha').AsString := Empresa.Senha;
  Query.ParamByName('site').AsString := Empresa.Site;
  Query.ParamByName('updated_at').AsDateTime := Now;
end;

function TEmpresaRepository.GetById(Id: Integer): TEmpresaDTO;
var
  Query: TFDQuery;
begin
  Result := nil;
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 
      'SELECT * FROM empresa WHERE cod_empresa = :id';
    Query.ParamByName('id').AsInteger := Id;
    Query.Open;
    
    if not Query.Eof then
      Result := DataSetToDTO(Query);
  finally
    Query.Free;
  end;
end;

function TEmpresaRepository.GetAll: TList<TEmpresaDTO>;
var
  Query: TFDQuery;
begin
  Result := TList<TEmpresaDTO>.Create;
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 
      'SELECT * FROM empresa ORDER BY empresa';
    Query.Open;
    
    while not Query.Eof do
    begin
      Result.Add(DataSetToDTO(Query));
      Query.Next;
    end;
  finally
    Query.Free;
  end;
end;

function TEmpresaRepository.Insert(Empresa: TEmpresaDTO): Integer;
var
  Query: TFDQuery;
begin
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 
      'INSERT INTO empresa (' +
      '  empresa, fantasia, abreviatura, endereco, bairro, cidade, uf, ' +
      '  cep, cnpj, fone1, fone2, imagem, data_cadastro, versao, ' +
      '  pop3, smtp, email, senha, site, created_at, updated_at' +
      ') VALUES (' +
      '  :empresa, :fantasia, :abreviatura, :endereco, :bairro, :cidade, :uf, ' +
      '  :cep, :cnpj, :fone1, :fone2, :imagem, :data_cadastro, :versao, ' +
      '  :pop3, :smtp, :email, :senha, :site, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP' +
      ') RETURNING cod_empresa';
      
    DTOToParams(Empresa, Query);
    Query.Open;
    
    Result := Query.FieldByName('cod_empresa').AsInteger;
    Empresa.CodEmpresa := Result;
  finally
    Query.Free;
  end;
end;

function TEmpresaRepository.Update(Empresa: TEmpresaDTO): Boolean;
var
  Query: TFDQuery;
begin
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 
      'UPDATE empresa SET ' +
      '  empresa = :empresa, fantasia = :fantasia, abreviatura = :abreviatura, ' +
      '  endereco = :endereco, bairro = :bairro, cidade = :cidade, uf = :uf, ' +
      '  cep = :cep, cnpj = :cnpj, fone1 = :fone1, fone2 = :fone2, ' +
      '  imagem = :imagem, data_cadastro = :data_cadastro, versao = :versao, ' +
      '  pop3 = :pop3, smtp = :smtp, email = :email, senha = :senha, ' +
      '  site = :site, updated_at = :updated_at ' +
      'WHERE cod_empresa = :cod_empresa';
      
    DTOToParams(Empresa, Query);
    Query.ParamByName('cod_empresa').AsInteger := Empresa.CodEmpresa;
    
    Query.ExecSQL;
    Result := Query.RowsAffected > 0;
  finally
    Query.Free;
  end;
end;

function TEmpresaRepository.Delete(Id: Integer): Boolean;
var
  Query: TFDQuery;
begin
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 'DELETE FROM empresa WHERE cod_empresa = :id';
    Query.ParamByName('id').AsInteger := Id;
    Query.ExecSQL;
    
    Result := Query.RowsAffected > 0;
  finally
    Query.Free;
  end;
end;

function TEmpresaRepository.GetByFantasia(Fantasia: string): TEmpresaDTO;
var
  Query: TFDQuery;
begin
  Result := nil;
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 
      'SELECT * FROM empresa WHERE UPPER(fantasia) = UPPER(:fantasia)';
    Query.ParamByName('fantasia').AsString := Fantasia;
    Query.Open;
    
    if not Query.Eof then
      Result := DataSetToDTO(Query);
  finally
    Query.Free;
  end;
end;

function TEmpresaRepository.GetByCNPJ(CNPJ: string): TEmpresaDTO;
var
  Query: TFDQuery;
  CNPJLimpo: string;
begin
  Result := nil;
  CNPJLimpo := TRegEx.Replace(CNPJ, '[^0-9]', '');
  
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 
      'SELECT * FROM empresa WHERE REGEXP_REPLACE(cnpj, ''[^0-9]'', '''', ''g'') = :cnpj';
    Query.ParamByName('cnpj').AsString := CNPJLimpo;
    Query.Open;
    
    if not Query.Eof then
      Result := DataSetToDTO(Query);
  finally
    Query.Free;
  end;
end;

function TEmpresaRepository.ExisteCNPJ(CNPJ: string; ExcluirId: Integer): Boolean;
var
  Query: TFDQuery;
  CNPJLimpo: string;
begin
  CNPJLimpo := TRegEx.Replace(CNPJ, '[^0-9]', '');
  
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 
      'SELECT COUNT(*) as total FROM empresa ' +
      'WHERE REGEXP_REPLACE(cnpj, ''[^0-9]'', '''', ''g'') = :cnpj ' +
      'AND cod_empresa <> :excluir_id';
    Query.ParamByName('cnpj').AsString := CNPJLimpo;
    Query.ParamByName('excluir_id').AsInteger := ExcluirId;
    Query.Open;
    
    Result := Query.FieldByName('total').AsInteger > 0;
  finally
    Query.Free;
  end;
end;

function TEmpresaRepository.ValidarDados(Empresa: TEmpresaDTO): TArray<string>;
var
  Errors: TArray<string>;
begin
  // Primeiro, validações básicas do DTO
  Errors := Empresa.GetValidationErrors;
  
  // Validações que dependem do banco de dados
  if Trim(Empresa.CNPJ) <> '' then
  begin
    if ExisteCNPJ(Empresa.CNPJ, Empresa.CodEmpresa) then
    begin
      SetLength(Errors, Length(Errors) + 1);
      Errors[High(Errors)] := 'CNPJ já cadastrado para outra empresa';
    end;
  end;
  
  Result := Errors;
end;

function TEmpresaRepository.Pesquisar(Termo: string): TList<TEmpresaDTO>;
var
  Query: TFDQuery;
begin
  Result := TList<TEmpresaDTO>.Create;
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FConnection;
    Query.SQL.Text := 
      'SELECT * FROM empresa ' +
      'WHERE UPPER(empresa) LIKE UPPER(:termo) ' +
      '   OR UPPER(fantasia) LIKE UPPER(:termo) ' +
      '   OR UPPER(cidade) LIKE UPPER(:termo) ' +
      'ORDER BY empresa';
    Query.ParamByName('termo').AsString := '%' + Termo + '%';
    Query.Open;
    
    while not Query.Eof do
    begin
      Result.Add(DataSetToDTO(Query));
      Query.Next;
    end;
  finally
    Query.Free;
  end;
end;

end.