unit DM_LABVET;

interface

uses
  SysUtils, Classes, DBXpress, DBTables, DB, SqlExpr;

type
  TDMLABVET = class(TDataModule)
    DBLABVET: TDatabase;
    QryEmpresa: TQuery;
    UPDEMpresa: TUpdateSQL;
    QryEmpresaCodEmpresa: TAutoIncField;
    QryEmpresaEmpresa: TStringField;
    QryEmpresaFantasia: TStringField;
    QryEmpresaAbreviatura: TStringField;
    QryEmpresaEndereco: TStringField;
    QryEmpresaBairro: TStringField;
    QryEmpresaCidade: TStringField;
    QryEmpresaUF: TStringField;
    QryEmpresaCNPJ: TStringField;
    QryEmpresaFone1: TStringField;
    QryEmpresaFone2: TStringField;
    QryEmpresaImagem: TBlobField;
    QryEmpresaData: TDateTimeField;
    QryEmpresaversao: TStringField;
    QryEmpresapop3: TStringField;
    QryEmpresasmtp: TStringField;
    QryEmpresaemail: TStringField;
    QryEmpresasenha: TStringField;
    DSEmpresa: TDataSource;
    QryEmpresaCEP: TStringField;
    QryEmpresasite: TStringField;
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  DMLABVET: TDMLABVET;

implementation

{$R *.dfm}

end.
