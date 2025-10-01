program SisLabVet;

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
  FTP in 'FTP.pas' {FrmFtp},
  RelResultado in 'RelResultado.pas' {FrmResultado},
  RetiraPedido in 'RetiraPedido.pas' {FrmRetiraPedido},
  RelRetiradaExames in 'RelRetiradaExames.pas' {FrmRelRetiradaExame},
  Banco in 'Banco.pas' {Frmbanco},
  Fornecedor in 'Fornecedor.pas' {FrmFornecedor},
  RelFornecedor in 'RelFornecedor.pas' {FrmRelFornecedores},
  Fechamento in 'Fechamento.pas' {FrmFechamento},
  Contas in 'Contas.pas' {FrmContas},
  Pendente in 'Pendente.pas' {FrmPendentes},
  RelPendentes in 'RelPendentes.pas' {FrmRelPendentes},
  Cobranca in 'Cobranca.pas' {FrmCobranca},
  RelCobranca in 'RelCobranca.pas' {FrmRelCobranca},
  Backup in 'Backup.pas' {FrmBackup},
  RelContas in 'RelContas.pas' {FrmRelContas},
  Desconto in 'Desconto.pas' {FrmDesconto},
  Transferencia in 'Transferencia.pas' {FrmTransfere},
  ExtratoPedidos in 'ExtratoPedidos.pas' {FrmExtratoPedido},
  RelExtratoAnal in 'RelExtratoAnal.pas' {FrmRelExtratoAnal},
  RelExtratoSint in 'RelExtratoSint.pas' {FrmRelExtratoSint},
  RelExtratoCliente in 'RelExtratoCliente.pas' {FrmRelExtratoCliente},
  RelDesconto in 'RelDesconto.pas' {FrmRelDesconto};

{$R *.res}

begin
  Application.Initialize;
  Application.Title := 'Sistema de Laboratório Veterinário';
  Application.CreateForm(TDMLABVET, DMLABVET);
  Application.CreateForm(TFrmMenu, FrmMenu);
  Application.CreateForm(TFrmRelExtratoSint, FrmRelExtratoSint);
  Application.CreateForm(TFrmRelExtratoCliente, FrmRelExtratoCliente);
  Application.CreateForm(TFrmRelDesconto, FrmRelDesconto);
  Application.Run;
end.
