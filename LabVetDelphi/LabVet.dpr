program LabVet;

uses
  Forms,
  Menu in 'Menu.pas' {FrmMenu},
  DM_LABVET in 'DM_LABVET.pas' {DMLABVET: TDataModule},
  Conselho in 'Conselho.pas' {FrmConselho},
  RelConselho in 'RelConselho.pas' {FrmRelConselho},
  Empresa in 'Empresa.pas' {FrmEmpresa},
  ProfSolicitante in 'ProfSolicitante.pas' {FrmProfSolic},
  RelProfSolic in 'RelProfSolic.pas' {FrmRelProfSolic},
  ProfLaudo in 'ProfLaudo.pas' {FrmProfLaudo},
  RelProfLaudo in 'RelProfLaudo.pas' {FrmRelProfLaudo},
  Clientes in 'Clientes.pas' {FrmClientes},
  RelClientes in 'RelClientes.pas' {FrmRelClientes},
  Animais in 'Animais.pas' {FrmAnimais},
  Especie in 'Especie.pas' {FrmEspecie},
  RelEspecies in 'RelEspecies.pas' {FrmRelEspecie},
  ExamesParametros in 'ExamesParametros.pas' {FrmExamesParam},
  Pedido in 'Pedido.pas' {FrmPedido},
  RelPedidos in 'RelPedidos.pas' {FrmRelPedidos},
  Laudo in 'Laudo.pas' {FrmLaudo},
  FTP in 'FTP.pas' {FrmFtp};

{$R *.res}

begin
  Application.Initialize;
  Application.Title := 'Sistema de Laboratório Veterinário';
  Application.CreateForm(TDMLABVET, DMLABVET);
  Application.CreateForm(TFrmMenu, FrmMenu);
  Application.Run;
end.
