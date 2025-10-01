unit EmpresaTests;

interface

uses
  TestFramework, EmpresaRepository, EmpresaService, EmpresaDTO,
  IEmpresaRepository, System.SysUtils, System.Classes;

type
  // Testes de migração para a tabela Empresa
  TEmpresaMigrationTests = class(TMigrationTestBase)
  public
    constructor Create;
    
    procedure TestDataMigration;
    procedure TestDataIntegrity;
    procedure TestPerformanceComparison;
    procedure TestCNPJUniqueness;
    procedure TestImageMigration;
  end;
  
  // Testes do repositório Empresa
  TEmpresaRepositoryTests = class(TRepositoryTestBase)
  private
    FRepository: IEmpresaRepository;
    FTestEmpresa: EmpresaDTO;
    
  protected
    procedure TestCRUDOperations(const AEntityName: string); override;
    procedure TestValidation(const AEntityName: string); override;
    procedure TestBusinessRules(const AEntityName: string); override;
    
  public
    constructor Create;
    destructor Destroy; override;
    
    procedure Setup; override;
    procedure Teardown; override;
    
    procedure TestCreate;
    procedure TestRead;
    procedure TestUpdate;
    procedure TestDelete;
    procedure TestGetByFantasia;
    procedure TestGetByCNPJ;
    procedure TestExisteCNPJ;
    procedure TestPesquisar;
    procedure TestValidarDados;
  end;
  
  // Testes do serviço Empresa
  TEmpresaServiceTests = class(TServiceTestBase)
  private
    FService: TEmpresaService;
    FTestEmpresa: EmpresaDTO;
    
  protected
    procedure TestBusinessLogic(const AServiceName: string); override;
    procedure TestErrorHandling(const AServiceName: string); override;
    procedure TestTransactions(const AServiceName: string); override;
    
  public
    constructor Create;
    destructor Destroy; override;
    
    procedure Setup; override;
    procedure Teardown; override;
    
    procedure TestCriarEmpresa;
    procedure TestAtualizarEmpresa;
    procedure TestValidarCNPJ;
    procedure TestConfigurarEmail;
    procedure TestAtualizarVersao;
    procedure TestObterEstatisticas;
    procedure TestExcluirEmpresa;
  end;

implementation

uses
  ConnectionManager, Data.DB;

{ TEmpresaMigrationTests }

constructor TEmpresaMigrationTests.Create;
begin
  inherited Create('Testes de Migração - Empresa');
  
  // Adicionar testes específicos
  AddTest('TestDataMigration', ttMigration);
  AddTest('TestDataIntegrity', ttMigration);
  AddTest('TestPerformanceComparison', ttPerformance);
  AddTest('TestCNPJUniqueness', ttMigration);
  AddTest('TestImageMigration', ttMigration);
end;

procedure TEmpresaMigrationTests.TestDataMigration;
var
  LegacyQuery, ModernQuery: TFDQuery;
begin
  // Executar consulta no sistema legado
  LegacyQuery := ExecuteLegacyQuery('SELECT * FROM Empresa ORDER BY CodEmpresa');
  try
    // Executar consulta no sistema moderno
    ModernQuery := ExecuteModernQuery('SELECT * FROM empresa ORDER BY cod_empresa');
    try
      // Comparar os datasets
      CompareDataSets(LegacyQuery, ModernQuery, 'Empresa');
      
    finally
      ModernQuery.Free;
    end;
  finally
    LegacyQuery.Free;
  end;
end;

procedure TEmpresaMigrationTests.TestDataIntegrity;
begin
  // Validar integridade dos dados migrados
  ValidateDataIntegrity('empresa');
  
  // Testes específicos de integridade
  var Query := ExecuteModernQuery(
    'SELECT COUNT(*) as total FROM empresa WHERE cnpj IS NULL OR cnpj = ''''');
  try
    if Query.FieldByName('total').AsInteger > 0 then
      raise Exception.Create('Existem empresas sem CNPJ após migração');
  finally
    Query.Free;
  end;
  
  // Verificar se não há CNPJs duplicados
  Query := ExecuteModernQuery(
    'SELECT cnpj, COUNT(*) as total FROM empresa GROUP BY cnpj HAVING COUNT(*) > 1');
  try
    if not Query.IsEmpty then
      raise Exception.CreateFmt('CNPJ duplicado encontrado: %s', 
        [Query.FieldByName('cnpj').AsString]);
  finally
    Query.Free;
  end;
end;

procedure TEmpresaMigrationTests.TestPerformanceComparison;
begin
  // Testar performance de consultas básicas
  ValidatePerformance('SELECT simples', 1000, 
    procedure
    begin
      var Query := ExecuteModernQuery('SELECT * FROM empresa LIMIT 100');
      Query.Free;
    end);
    
  // Testar performance de busca por CNPJ
  ValidatePerformance('Busca por CNPJ', 500,
    procedure
    begin
      var Query := ExecuteModernQuery('SELECT * FROM empresa WHERE cnpj = ''12345678000195''');
      Query.Free;
    end);
    
  // Testar performance de busca por nome fantasia
  ValidatePerformance('Busca por fantasia', 1000,
    procedure
    begin
      var Query := ExecuteModernQuery('SELECT * FROM empresa WHERE fantasia ILIKE ''%teste%''');
      Query.Free;
    end);
end;

procedure TEmpresaMigrationTests.TestCNPJUniqueness;
var
  Query: TFDQuery;
begin
  // Tentar inserir empresa com CNPJ duplicado
  Query := TFDQuery.Create(nil);
  try
    Query.Connection := FModernConnection;
    Query.SQL.Text := 
      'INSERT INTO empresa (empresa, cnpj, fantasia) VALUES (''Teste'', ''12345678000195'', ''Teste'')';
    
    try
      Query.ExecSQL;
      // Se chegou aqui, deveria ter dado erro
      raise Exception.Create('Constraint de CNPJ único não está funcionando');
    except
      on E: Exception do
      begin
        // Esperamos um erro de constraint violation
        if Pos('unique', LowerCase(E.Message)) = 0 then
          raise Exception.Create('Erro inesperado ao testar CNPJ único: ' + E.Message);
      end;
    end;
  finally
    Query.Free;
  end;
end;

procedure TEmpresaMigrationTests.TestImageMigration;
var
  Query: TFDQuery;
begin
  // Verificar se imagens foram migradas corretamente
  Query := ExecuteModernQuery('SELECT cod_empresa, imagem FROM empresa WHERE imagem IS NOT NULL');
  try
    while not Query.Eof do
    begin
      // Verificar se o campo imagem não está vazio
      if Query.FieldByName('imagem').IsNull then
        raise Exception.CreateFmt('Imagem nula para empresa %d', 
          [Query.FieldByName('cod_empresa').AsInteger]);
          
      // Verificar se tem conteúdo mínimo (pelo menos alguns bytes)
      if Length(Query.FieldByName('imagem').AsBytes) < 10 then
        raise Exception.CreateFmt('Imagem muito pequena para empresa %d', 
          [Query.FieldByName('cod_empresa').AsInteger]);
          
      Query.Next;
    end;
  finally
    Query.Free;
  end;
end;

{ TEmpresaRepositoryTests }

constructor TEmpresaRepositoryTests.Create;
begin
  inherited Create('Testes de Repositório - Empresa');
  
  AddTest('TestCreate', ttUnit);
  AddTest('TestRead', ttUnit);
  AddTest('TestUpdate', ttUnit);
  AddTest('TestDelete', ttUnit);
  AddTest('TestGetByFantasia', ttUnit);
  AddTest('TestGetByCNPJ', ttUnit);
  AddTest('TestExisteCNPJ', ttUnit);
  AddTest('TestPesquisar', ttUnit);
  AddTest('TestValidarDados', ttUnit);
end;

destructor TEmpresaRepositoryTests.Destroy;
begin
  if Assigned(FTestEmpresa) then
    FTestEmpresa.Free;
  inherited;
end;

procedure TEmpresaRepositoryTests.Setup;
begin
  inherited;
  FRepository := TEmpresaRepository.Create;
  
  // Criar empresa de teste
  FTestEmpresa := EmpresaDTO.Create;
  FTestEmpresa.Empresa := 'Empresa Teste Ltda';
  FTestEmpresa.CNPJ := '12345678000195';
  FTestEmpresa.Fantasia := 'Teste';
  FTestEmpresa.Email := 'teste@empresa.com';
  FTestEmpresa.Telefone := '(11) 1234-5678';
  FTestEmpresa.CEP := '01234-567';
  FTestEmpresa.Endereco := 'Rua Teste, 123';
  FTestEmpresa.Cidade := 'São Paulo';
  FTestEmpresa.UF := 'SP';
end;

procedure TEmpresaRepositoryTests.Teardown;
begin
  // Limpar dados de teste
  if Assigned(FRepository) and (FTestEmpresa.CodEmpresa > 0) then
  begin
    try
      FRepository.Excluir(FTestEmpresa.CodEmpresa);
    except
      // Ignorar erros de limpeza
    end;
  end;
  inherited;
end;

procedure TEmpresaRepositoryTests.TestCRUDOperations(const AEntityName: string);
begin
  TestCreate;
  TestRead;
  TestUpdate;
  TestDelete;
end;

procedure TEmpresaRepositoryTests.TestValidation(const AEntityName: string);
begin
  TestValidarDados;
end;

procedure TEmpresaRepositoryTests.TestBusinessRules(const AEntityName: string);
begin
  TestExisteCNPJ;
  TestGetByCNPJ;
  TestGetByFantasia;
  TestPesquisar;
end;

procedure TEmpresaRepositoryTests.TestCreate;
var
  NovoId: Integer;
begin
  NovoId := FRepository.Inserir(FTestEmpresa);
  
  if NovoId <= 0 then
    raise Exception.Create('Falha ao inserir empresa - ID inválido');
    
  FTestEmpresa.CodEmpresa := NovoId;
end;

procedure TEmpresaRepositoryTests.TestRead;
var
  EmpresaLida: EmpresaDTO;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCreate;
    
  EmpresaLida := FRepository.ObterPorId(FTestEmpresa.CodEmpresa);
  try
    if not Assigned(EmpresaLida) then
      raise Exception.Create('Empresa não encontrada após inserção');
      
    if EmpresaLida.CNPJ <> FTestEmpresa.CNPJ then
      raise Exception.Create('CNPJ não confere após leitura');
      
    if EmpresaLida.Empresa <> FTestEmpresa.Empresa then
      raise Exception.Create('Nome da empresa não confere após leitura');
      
  finally
    EmpresaLida.Free;
  end;
end;

procedure TEmpresaRepositoryTests.TestUpdate;
var
  EmpresaAtualizada: EmpresaDTO;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCreate;
    
  // Alterar dados
  FTestEmpresa.Fantasia := 'Teste Atualizado';
  FTestEmpresa.Email := 'novo@empresa.com';
  
  if not FRepository.Atualizar(FTestEmpresa) then
    raise Exception.Create('Falha ao atualizar empresa');
    
  // Verificar se foi atualizado
  EmpresaAtualizada := FRepository.ObterPorId(FTestEmpresa.CodEmpresa);
  try
    if EmpresaAtualizada.Fantasia <> 'Teste Atualizado' then
      raise Exception.Create('Fantasia não foi atualizada');
      
    if EmpresaAtualizada.Email <> 'novo@empresa.com' then
      raise Exception.Create('Email não foi atualizado');
      
  finally
    EmpresaAtualizada.Free;
  end;
end;

procedure TEmpresaRepositoryTests.TestDelete;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCreate;
    
  if not FRepository.Excluir(FTestEmpresa.CodEmpresa) then
    raise Exception.Create('Falha ao excluir empresa');
    
  // Verificar se foi excluída
  var EmpresaExcluida := FRepository.ObterPorId(FTestEmpresa.CodEmpresa);
  if Assigned(EmpresaExcluida) then
  begin
    EmpresaExcluida.Free;
    raise Exception.Create('Empresa ainda existe após exclusão');
  end;
  
  FTestEmpresa.CodEmpresa := 0; // Resetar para não tentar excluir novamente
end;

procedure TEmpresaRepositoryTests.TestGetByFantasia;
var
  Empresas: TArray<EmpresaDTO>;
  I: Integer;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCreate;
    
  Empresas := FRepository.ObterPorFantasia('Teste');
  try
    if Length(Empresas) = 0 then
      raise Exception.Create('Nenhuma empresa encontrada por fantasia');
      
    // Verificar se nossa empresa está na lista
    var Encontrada := False;
    for I := 0 to High(Empresas) do
    begin
      if Empresas[I].CodEmpresa = FTestEmpresa.CodEmpresa then
      begin
        Encontrada := True;
        Break;
      end;
    end;
    
    if not Encontrada then
      raise Exception.Create('Empresa de teste não encontrada na busca por fantasia');
      
  finally
    for I := 0 to High(Empresas) do
      Empresas[I].Free;
  end;
end;

procedure TEmpresaRepositoryTests.TestGetByCNPJ;
var
  EmpresaEncontrada: EmpresaDTO;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCreate;
    
  EmpresaEncontrada := FRepository.ObterPorCNPJ(FTestEmpresa.CNPJ);
  try
    if not Assigned(EmpresaEncontrada) then
      raise Exception.Create('Empresa não encontrada por CNPJ');
      
    if EmpresaEncontrada.CodEmpresa <> FTestEmpresa.CodEmpresa then
      raise Exception.Create('Empresa errada retornada na busca por CNPJ');
      
  finally
    EmpresaEncontrada.Free;
  end;
end;

procedure TEmpresaRepositoryTests.TestExisteCNPJ;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCreate;
    
  if not FRepository.ExisteCNPJ(FTestEmpresa.CNPJ) then
    raise Exception.Create('CNPJ não foi encontrado quando deveria existir');
    
  if FRepository.ExisteCNPJ('99999999999999') then
    raise Exception.Create('CNPJ inexistente foi encontrado');
end;

procedure TEmpresaRepositoryTests.TestPesquisar;
var
  Empresas: TArray<EmpresaDTO>;
  I: Integer;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCreate;
    
  Empresas := FRepository.Pesquisar('Teste', 10);
  try
    if Length(Empresas) = 0 then
      raise Exception.Create('Nenhuma empresa encontrada na pesquisa');
      
    // Verificar se nossa empresa está na lista
    var Encontrada := False;
    for I := 0 to High(Empresas) do
    begin
      if Empresas[I].CodEmpresa = FTestEmpresa.CodEmpresa then
      begin
        Encontrada := True;
        Break;
      end;
    end;
    
    if not Encontrada then
      raise Exception.Create('Empresa de teste não encontrada na pesquisa geral');
      
  finally
    for I := 0 to High(Empresas) do
      Empresas[I].Free;
  end;
end;

procedure TEmpresaRepositoryTests.TestValidarDados;
var
  EmpresaInvalida: EmpresaDTO;
  Erros: TArray<string>;
begin
  EmpresaInvalida := EmpresaDTO.Create;
  try
    // Empresa sem dados obrigatórios
    Erros := FRepository.ValidarDados(EmpresaInvalida);
    
    if Length(Erros) = 0 then
      raise Exception.Create('Validação deveria ter retornado erros para empresa vazia');
      
    // Empresa com CNPJ inválido
    EmpresaInvalida.Empresa := 'Teste';
    EmpresaInvalida.CNPJ := '123'; // CNPJ inválido
    
    Erros := FRepository.ValidarDados(EmpresaInvalida);
    
    var TemErroCNPJ := False;
    for var Erro in Erros do
    begin
      if Pos('CNPJ', Erro) > 0 then
      begin
        TemErroCNPJ := True;
        Break;
      end;
    end;
    
    if not TemErroCNPJ then
      raise Exception.Create('Validação deveria ter detectado CNPJ inválido');
      
  finally
    EmpresaInvalida.Free;
  end;
end;

{ TEmpresaServiceTests }

constructor TEmpresaServiceTests.Create;
begin
  inherited Create('Testes de Serviço - Empresa');
  
  AddTest('TestCriarEmpresa', ttUnit);
  AddTest('TestAtualizarEmpresa', ttUnit);
  AddTest('TestValidarCNPJ', ttUnit);
  AddTest('TestConfigurarEmail', ttUnit);
  AddTest('TestAtualizarVersao', ttUnit);
  AddTest('TestObterEstatisticas', ttUnit);
  AddTest('TestExcluirEmpresa', ttUnit);
end;

destructor TEmpresaServiceTests.Destroy;
begin
  if Assigned(FTestEmpresa) then
    FTestEmpresa.Free;
  if Assigned(FService) then
    FService.Free;
  inherited;
end;

procedure TEmpresaServiceTests.Setup;
begin
  inherited;
  FService := TEmpresaService.Create;
  
  // Criar empresa de teste
  FTestEmpresa := EmpresaDTO.Create;
  FTestEmpresa.Empresa := 'Empresa Service Teste Ltda';
  FTestEmpresa.CNPJ := '98765432000198';
  FTestEmpresa.Fantasia := 'Service Teste';
  FTestEmpresa.Email := 'service@teste.com';
end;

procedure TEmpresaServiceTests.Teardown;
begin
  // Limpar dados de teste
  if Assigned(FService) and (FTestEmpresa.CodEmpresa > 0) then
  begin
    try
      FService.ExcluirEmpresa(FTestEmpresa.CodEmpresa);
    except
      // Ignorar erros de limpeza
    end;
  end;
  inherited;
end;

procedure TEmpresaServiceTests.TestBusinessLogic(const AServiceName: string);
begin
  TestCriarEmpresa;
  TestValidarCNPJ;
  TestConfigurarEmail;
  TestObterEstatisticas;
end;

procedure TEmpresaServiceTests.TestErrorHandling(const AServiceName: string);
begin
  // Testar criação com dados inválidos
  var EmpresaInvalida := EmpresaDTO.Create;
  try
    try
      FService.CriarEmpresa(EmpresaInvalida);
      raise Exception.Create('Deveria ter dado erro ao criar empresa inválida');
    except
      on E: Exception do
      begin
        // Esperamos um erro de validação
        if Pos('validação', LowerCase(E.Message)) = 0 then
          raise Exception.Create('Erro inesperado: ' + E.Message);
      end;
    end;
  finally
    EmpresaInvalida.Free;
  end;
end;

procedure TEmpresaServiceTests.TestTransactions(const AServiceName: string);
begin
  // Testes de transação seriam mais complexos
  // Por enquanto, teste básico de rollback
  TestCriarEmpresa;
  TestExcluirEmpresa;
end;

procedure TEmpresaServiceTests.TestCriarEmpresa;
var
  NovoId: Integer;
begin
  NovoId := FService.CriarEmpresa(FTestEmpresa);
  
  if NovoId <= 0 then
    raise Exception.Create('Falha ao criar empresa via service');
    
  FTestEmpresa.CodEmpresa := NovoId;
end;

procedure TEmpresaServiceTests.TestAtualizarEmpresa;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCriarEmpresa;
    
  FTestEmpresa.Fantasia := 'Service Atualizado';
  
  if not FService.AtualizarEmpresa(FTestEmpresa) then
    raise Exception.Create('Falha ao atualizar empresa via service');
end;

procedure TEmpresaServiceTests.TestValidarCNPJ;
begin
  if not FService.ValidarCNPJ('11222333000181') then
    raise Exception.Create('CNPJ válido foi rejeitado');
    
  if FService.ValidarCNPJ('123456789') then
    raise Exception.Create('CNPJ inválido foi aceito');
    
  if FService.ValidarCNPJ('') then
    raise Exception.Create('CNPJ vazio foi aceito');
end;

procedure TEmpresaServiceTests.TestConfigurarEmail;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCriarEmpresa;
    
  if not FService.ConfigurarEmail(FTestEmpresa.CodEmpresa, 'smtp.teste.com', 587, 
    'usuario@teste.com', 'senha123') then
    raise Exception.Create('Falha ao configurar email');
end;

procedure TEmpresaServiceTests.TestAtualizarVersao;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCriarEmpresa;
    
  if not FService.AtualizarVersaoSistema(FTestEmpresa.CodEmpresa, '2.0.0') then
    raise Exception.Create('Falha ao atualizar versão do sistema');
end;

procedure TEmpresaServiceTests.TestObterEstatisticas;
var
  Stats: string;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCriarEmpresa;
    
  Stats := FService.ObterEstatisticasEmpresa(FTestEmpresa.CodEmpresa);
  
  if Stats = '' then
    raise Exception.Create('Estatísticas não foram geradas');
    
  if Pos('Empresa:', Stats) = 0 then
    raise Exception.Create('Estatísticas não contêm informações esperadas');
end;

procedure TEmpresaServiceTests.TestExcluirEmpresa;
begin
  if FTestEmpresa.CodEmpresa <= 0 then
    TestCriarEmpresa;
    
  if not FService.ExcluirEmpresa(FTestEmpresa.CodEmpresa) then
    raise Exception.Create('Falha ao excluir empresa via service');
    
  FTestEmpresa.CodEmpresa := 0; // Resetar para não tentar excluir novamente
end;

end.