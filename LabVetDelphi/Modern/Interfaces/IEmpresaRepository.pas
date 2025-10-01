unit IEmpresaRepository;

interface

uses
  System.Generics.Collections, EmpresaDTO;

type
  IEmpresaRepository = interface
    ['{B8F5E2A1-4C3D-4E5F-8A9B-1C2D3E4F5A6B}']
    
    // Operações básicas CRUD
    function GetById(Id: Integer): TEmpresaDTO;
    function GetAll: TList<TEmpresaDTO>;
    function Insert(Empresa: TEmpresaDTO): Integer;
    function Update(Empresa: TEmpresaDTO): Boolean;
    function Delete(Id: Integer): Boolean;
    
    // Consultas específicas de negócio
    function GetByFantasia(Fantasia: string): TEmpresaDTO;
    function GetByCNPJ(CNPJ: string): TEmpresaDTO;
    function ExisteCNPJ(CNPJ: string; ExcluirId: Integer = 0): Boolean;
    
    // Operações de validação
    function ValidarDados(Empresa: TEmpresaDTO): TArray<string>;
    
    // Operações de pesquisa
    function Pesquisar(Termo: string): TList<TEmpresaDTO>;
  end;

implementation

end.