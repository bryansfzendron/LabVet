unit EmpresaService;

interface

uses
  System.SysUtils, System.Generics.Collections, IEmpresaRepository, EmpresaDTO;

type
  TEmpresaService = class
  private
    FRepository: IEmpresaRepository;
    
    function ValidarCNPJ(CNPJ: string): Boolean;
    function CalcularDigitoVerificadorCNPJ(CNPJ: string): string;
    
  public
    constructor Create(Repository: IEmpresaRepository);
    
    // Operações principais de negócio
    function CadastrarEmpresa(Empresa: TEmpresaDTO): Boolean;
    function AtualizarEmpresa(Empresa: TEmpresaDTO): Boolean;
    function ExcluirEmpresa(Id: Integer): Boolean;
    function ObterEmpresaPorId(Id: Integer): TEmpresaDTO;
    function ListarEmpresas: TList<TEmpresaDTO>;
    
    // Operações específicas de negócio
    function PesquisarEmpresas(Termo: string): TList<TEmpresaDTO>;
    function ValidarDadosEmpresa(Empresa: TEmpresaDTO): TArray<string>;
    function VerificarCNPJDisponivel(CNPJ: string; ExcluirId: Integer = 0): Boolean;
    
    // Operações de configuração
    function ConfigurarEmail(Id: Integer; SMTP, POP3, Email, Senha: string): Boolean;
    function AtualizarVersaoSistema(Id: Integer; Versao: string): Boolean;
    
    // Relatórios e estatísticas
    function ObterEstatisticasEmpresas: string;
  end;

implementation

uses
  System.RegularExpressions, System.StrUtils;

{ TEmpresaService }

constructor TEmpresaService.Create(Repository: IEmpresaRepository);
begin
  inherited Create;
  FRepository := Repository;
end;

function TEmpresaService.CadastrarEmpresa(Empresa: TEmpresaDTO): Boolean;
var
  Erros: TArray<string>;
begin
  Result := False;
  
  // Validar dados
  Erros := ValidarDadosEmpresa(Empresa);
  if Length(Erros) > 0 then
    raise Exception.Create('Dados inválidos: ' + string.Join('; ', Erros));
  
  // Verificar se CNPJ já existe
  if (Trim(Empresa.CNPJ) <> '') and not VerificarCNPJDisponivel(Empresa.CNPJ) then
    raise Exception.Create('CNPJ já cadastrado para outra empresa');
  
  try
    // Definir dados padrão
    Empresa.DataCadastro := Now;
    Empresa.CreatedAt := Now;
    Empresa.UpdatedAt := Now;
    
    // Inserir no banco
    Empresa.CodEmpresa := FRepository.Insert(Empresa);
    Result := Empresa.CodEmpresa > 0;
  except
    on E: Exception do
      raise Exception.Create('Erro ao cadastrar empresa: ' + E.Message);
  end;
end;

function TEmpresaService.AtualizarEmpresa(Empresa: TEmpresaDTO): Boolean;
var
  Erros: TArray<string>;
  EmpresaExistente: TEmpresaDTO;
begin
  Result := False;
  
  // Verificar se empresa existe
  EmpresaExistente := FRepository.GetById(Empresa.CodEmpresa);
  if EmpresaExistente = nil then
    raise Exception.Create('Empresa não encontrada');
  
  try
    // Validar dados
    Erros := ValidarDadosEmpresa(Empresa);
    if Length(Erros) > 0 then
      raise Exception.Create('Dados inválidos: ' + string.Join('; ', Erros));
    
    // Verificar se CNPJ já existe para outra empresa
    if (Trim(Empresa.CNPJ) <> '') and not VerificarCNPJDisponivel(Empresa.CNPJ, Empresa.CodEmpresa) then
      raise Exception.Create('CNPJ já cadastrado para outra empresa');
    
    // Manter dados de criação
    Empresa.CreatedAt := EmpresaExistente.CreatedAt;
    Empresa.UpdatedAt := Now;
    
    // Atualizar no banco
    Result := FRepository.Update(Empresa);
  finally
    EmpresaExistente.Free;
  end;
end;

function TEmpresaService.ExcluirEmpresa(Id: Integer): Boolean;
var
  EmpresaExistente: TEmpresaDTO;
begin
  // Verificar se empresa existe
  EmpresaExistente := FRepository.GetById(Id);
  if EmpresaExistente = nil then
    raise Exception.Create('Empresa não encontrada');
  
  try
    // Aqui poderiam ser adicionadas validações de negócio
    // Por exemplo: verificar se existem pedidos vinculados à empresa
    
    Result := FRepository.Delete(Id);
  finally
    EmpresaExistente.Free;
  end;
end;

function TEmpresaService.ObterEmpresaPorId(Id: Integer): TEmpresaDTO;
begin
  Result := FRepository.GetById(Id);
  if Result = nil then
    raise Exception.Create('Empresa não encontrada');
end;

function TEmpresaService.ListarEmpresas: TList<TEmpresaDTO>;
begin
  Result := FRepository.GetAll;
end;

function TEmpresaService.PesquisarEmpresas(Termo: string): TList<TEmpresaDTO>;
begin
  if Trim(Termo) = '' then
    raise Exception.Create('Termo de pesquisa não pode estar vazio');
    
  Result := FRepository.Pesquisar(Termo);
end;

function TEmpresaService.ValidarDadosEmpresa(Empresa: TEmpresaDTO): TArray<string>;
var
  Erros: TArray<string>;
begin
  // Validações básicas do DTO
  Erros := Empresa.GetValidationErrors;
  
  // Validações específicas de negócio
  if (Trim(Empresa.CNPJ) <> '') and not ValidarCNPJ(Empresa.CNPJ) then
  begin
    SetLength(Erros, Length(Erros) + 1);
    Erros[High(Erros)] := 'CNPJ inválido';
  end;
  
  // Validar se abreviatura não é muito longa
  if Length(Trim(Empresa.Abreviatura)) > 5 then
  begin
    SetLength(Erros, Length(Erros) + 1);
    Erros[High(Erros)] := 'Abreviatura deve ter no máximo 5 caracteres';
  end;
  
  Result := Erros;
end;

function TEmpresaService.VerificarCNPJDisponivel(CNPJ: string; ExcluirId: Integer): Boolean;
begin
  if Trim(CNPJ) = '' then
  begin
    Result := True;
    Exit;
  end;
  
  Result := not FRepository.ExisteCNPJ(CNPJ, ExcluirId);
end;

function TEmpresaService.ValidarCNPJ(CNPJ: string): Boolean;
var
  CNPJLimpo: string;
  DigitosCalculados: string;
begin
  Result := False;
  
  // Remover caracteres não numéricos
  CNPJLimpo := TRegEx.Replace(CNPJ, '[^0-9]', '');
  
  // Verificar se tem 14 dígitos
  if Length(CNPJLimpo) <> 14 then
    Exit;
  
  // Verificar se não são todos iguais
  if CNPJLimpo = StringOfChar(CNPJLimpo[1], 14) then
    Exit;
  
  // Calcular dígitos verificadores
  DigitosCalculados := CalcularDigitoVerificadorCNPJ(Copy(CNPJLimpo, 1, 12));
  
  // Verificar se os dígitos conferem
  Result := Copy(CNPJLimpo, 13, 2) = DigitosCalculados;
end;

function TEmpresaService.CalcularDigitoVerificadorCNPJ(CNPJ: string): string;
var
  Soma, Resto, Digito1, Digito2: Integer;
  Multiplicadores1: array[0..11] of Integer = (5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
  Multiplicadores2: array[0..12] of Integer = (6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
  i: Integer;
begin
  // Calcular primeiro dígito
  Soma := 0;
  for i := 0 to 11 do
    Soma := Soma + StrToInt(CNPJ[i + 1]) * Multiplicadores1[i];
  
  Resto := Soma mod 11;
  if Resto < 2 then
    Digito1 := 0
  else
    Digito1 := 11 - Resto;
  
  // Calcular segundo dígito
  Soma := 0;
  for i := 0 to 11 do
    Soma := Soma + StrToInt(CNPJ[i + 1]) * Multiplicadores2[i];
  Soma := Soma + Digito1 * Multiplicadores2[12];
  
  Resto := Soma mod 11;
  if Resto < 2 then
    Digito2 := 0
  else
    Digito2 := 11 - Resto;
  
  Result := IntToStr(Digito1) + IntToStr(Digito2);
end;

function TEmpresaService.ConfigurarEmail(Id: Integer; SMTP, POP3, Email, Senha: string): Boolean;
var
  Empresa: TEmpresaDTO;
begin
  Empresa := FRepository.GetById(Id);
  if Empresa = nil then
    raise Exception.Create('Empresa não encontrada');
  
  try
    // Validar email
    if not TRegEx.IsMatch(Email, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') then
      raise Exception.Create('Email inválido');
    
    // Atualizar configurações
    Empresa.SMTP := SMTP;
    Empresa.POP3 := POP3;
    Empresa.Email := Email;
    Empresa.Senha := Senha;
    Empresa.UpdatedAt := Now;
    
    Result := FRepository.Update(Empresa);
  finally
    Empresa.Free;
  end;
end;

function TEmpresaService.AtualizarVersaoSistema(Id: Integer; Versao: string): Boolean;
var
  Empresa: TEmpresaDTO;
begin
  Empresa := FRepository.GetById(Id);
  if Empresa = nil then
    raise Exception.Create('Empresa não encontrada');
  
  try
    Empresa.Versao := Versao;
    Empresa.UpdatedAt := Now;
    
    Result := FRepository.Update(Empresa);
  finally
    Empresa.Free;
  end;
end;

function TEmpresaService.ObterEstatisticasEmpresas: string;
var
  Empresas: TList<TEmpresaDTO>;
  TotalEmpresas, EmpresasComEmail, EmpresasComSite: Integer;
  i: Integer;
begin
  Empresas := FRepository.GetAll;
  try
    TotalEmpresas := Empresas.Count;
    EmpresasComEmail := 0;
    EmpresasComSite := 0;
    
    for i := 0 to Empresas.Count - 1 do
    begin
      if Trim(Empresas[i].Email) <> '' then
        Inc(EmpresasComEmail);
      if Trim(Empresas[i].Site) <> '' then
        Inc(EmpresasComSite);
    end;
    
    Result := Format(
      'Total de empresas: %d' + sLineBreak +
      'Empresas com email: %d (%.1f%%)' + sLineBreak +
      'Empresas com site: %d (%.1f%%)',
      [TotalEmpresas,
       EmpresasComEmail, IfThen(TotalEmpresas > 0, (EmpresasComEmail / TotalEmpresas) * 100, 0),
       EmpresasComSite, IfThen(TotalEmpresas > 0, (EmpresasComSite / TotalEmpresas) * 100, 0)]
    );
  finally
    // Liberar memória
    for i := 0 to Empresas.Count - 1 do
      Empresas[i].Free;
    Empresas.Free;
  end;
end;

end.