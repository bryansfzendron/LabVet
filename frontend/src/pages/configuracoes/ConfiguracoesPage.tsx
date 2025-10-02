import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Building2, 
  Users, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Save,
  Eye,
  EyeOff,
  TestTube,
  FileText,
  DollarSign,
  Wrench,
  AlertTriangle,
  Clock,
  HardDrive,
  Key,
  UserCheck
} from 'lucide-react';
import { useConfigStore } from '@/stores/configStore';
import UserManagement from '@/components/configuracoes/UserManagement';
import SecurityLogs from '@/components/configuracoes/SecurityLogs';

interface ConfigSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const ConfiguracoesPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('sistema');
  const [showPassword, setShowPassword] = useState(false);

  // Store e hooks
  const {
    config,
    isLoading,
    error,
    hasUnsavedChanges,
    updateEmpresa,
    updateSistema,
    updateNotificacoes,
    updateEmail,
    updateExames,
    updateFinanceiro,
    saveConfig,
    clearError,
  } = useConfigStore();

  const configSections: ConfigSection[] = [
    {
      id: 'sistema',
      title: 'Sistema',
      icon: Settings,
      description: 'Configurações gerais do sistema'
    },
    {
      id: 'empresa',
      title: 'Dados da Empresa',
      icon: Building2,
      description: 'Informações básicas da empresa'
    },
    {
      id: 'usuarios',
      title: 'Usuários e Permissões',
      icon: Users,
      description: 'Gerenciar usuários e níveis de acesso'
    },
    {
      id: 'exames',
      title: 'Configurações de Exames',
      icon: TestTube,
      description: 'Configurar prazos e templates de laudos'
    },
    {
      id: 'financeiro',
      title: 'Configurações Financeiras',
      icon: DollarSign,
      description: 'Configurar preços, descontos e formas de pagamento'
    },
    {
      id: 'notificacoes',
      title: 'Notificações',
      icon: Bell,
      description: 'Configurar alertas e notificações'
    },
    {
      id: 'email',
      title: 'Configurações de Email',
      icon: Mail,
      description: 'Configurar servidor SMTP para envio de emails'
    },
    {
      id: 'seguranca',
      title: 'Segurança',
      icon: Shield,
      description: 'Configurações de segurança e backup'
    }
  ];

  const handleSave = async () => {
    await saveConfig();
  };

  // Limpar erro quando componente desmonta
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const renderSistemaSection = () => {
    const handleMaintenanceToggle = (checked: boolean) => {
      if (checked) {
        // Confirmação antes de ativar o modo manutenção
        const confirmActivation = window.confirm(
          '⚠️ ATENÇÃO!\n\n' +
          'Ativar o modo manutenção irá:\n' +
          '• Bloquear o acesso de todos os usuários\n' +
          '• Exibir uma página de manutenção\n' +
          '• Apenas administradores poderão acessar o sistema\n\n' +
          'Deseja continuar?'
        );
        if (confirmActivation) {
          updateSistema({ manutencao: true });
          // Mostrar toast de confirmação
          setTimeout(() => {
            alert('✅ Modo manutenção ATIVADO!\n\nApenas administradores podem acessar o sistema agora.');
          }, 500);
        }
      } else {
        const confirmDeactivation = window.confirm(
          'Desativar o modo manutenção?\n\n' +
          'O sistema voltará a funcionar normalmente para todos os usuários.'
        );
        if (confirmDeactivation) {
          updateSistema({ manutencao: false });
          setTimeout(() => {
            alert('✅ Modo manutenção DESATIVADO!\n\nSistema funcionando normalmente.');
          }, 500);
        }
      }
    };
  
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuso Horário
            </label>
            <select
              value={config.sistema.timezone}
              onChange={(e) => updateSistema({ timezone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
              <option value="America/Rio_Branco">Rio Branco (UTC-5)</option>
              <option value="America/Manaus">Manaus (UTC-4)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nível de Logs
            </label>
            <select
              value={config.sistema.logs_nivel}
              onChange={(e) => updateSistema({ logs_nivel: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
  
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Configurações Avançadas</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.sistema.backup_automatico}
                onChange={(e) => updateSistema({ backup_automatico: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Backup automático diário</span>
            </label>
            
            {/* Modo Manutenção com estilo especial */}
            <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              config.sistema.manutencao 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    config.sistema.manutencao ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {config.sistema.manutencao ? (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Wrench className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h4 className={`text-sm font-medium ${
                      config.sistema.manutencao ? 'text-red-900' : 'text-gray-900'
                    }`}>
                      Modo Manutenção
                    </h4>
                    <p className={`text-xs ${
                      config.sistema.manutencao ? 'text-red-700' : 'text-gray-600'
                    }`}>
                      {config.sistema.manutencao 
                        ? '🔒 Sistema bloqueado - apenas admins podem acessar'
                        : '✅ Sistema funcionando normalmente'
                      }
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.sistema.manutencao}
                    onChange={(e) => handleMaintenanceToggle(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`relative w-11 h-6 rounded-full peer transition-colors duration-200 ${
                    config.sistema.manutencao 
                      ? 'bg-red-600' 
                      : 'bg-gray-200'
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300`}>
                    <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 ${
                      config.sistema.manutencao ? 'translate-x-full' : ''
                    }`}></div>
                  </div>
                </label>
              </div>
              
              {config.sistema.manutencao && (
                <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-xs text-red-800">
                      <p className="font-medium">🚨 Sistema em Modo Manutenção ATIVO</p>
                      <ul className="mt-1 space-y-1">
                        <li>• Usuários comuns não conseguem acessar</li>
                        <li>• Apenas administradores têm acesso</li>
                        <li>• Página de manutenção sendo exibida</li>
                      </ul>
                      <p className="mt-2 font-medium">Para desativar, clique no botão acima.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEmpresaSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Empresa
          </label>
          <input
            type="text"
            value={config.empresa.nome}
            onChange={(e) => updateEmpresa({ nome: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNPJ
          </label>
          <input
            type="text"
            value={config.empresa.cnpj}
            onChange={(e) => updateEmpresa({ cnpj: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Endereço
          </label>
          <input
            type="text"
            value={config.empresa.endereco}
            onChange={(e) => updateEmpresa({ endereco: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cidade
          </label>
          <input
            type="text"
            value={config.empresa.cidade}
            onChange={(e) => updateEmpresa({ cidade: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <input
            type="text"
            value={config.empresa.estado}
            onChange={(e) => updateEmpresa({ estado: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CEP
          </label>
          <input
            type="text"
            value={config.empresa.cep}
            onChange={(e) => updateEmpresa({ cep: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="text"
            value={config.empresa.telefone}
            onChange={(e) => updateEmpresa({ telefone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={config.empresa.email}
            onChange={(e) => updateEmpresa({ email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={config.empresa.website}
            onChange={(e) => updateEmpresa({ website: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderEmailSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Servidor SMTP
          </label>
          <input
            type="text"
            value={config.email.servidor}
            onChange={(e) => updateEmail({ servidor: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Porta
          </label>
          <input
            type="text"
            value={config.email.porta}
            onChange={(e) => updateEmail({ porta: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usuário
          </label>
          <input
            type="email"
            value={config.email.usuario}
            onChange={(e) => updateEmail({ usuario: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={config.email.senha}
              onChange={(e) => updateEmail({ senha: e.target.value })}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Remetente
          </label>
          <input
            type="text"
            value={config.email.remetente_nome}
            onChange={(e) => updateEmail({ remetente_nome: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email do Remetente
          </label>
          <input
            type="email"
            value={config.email.remetente_email}
            onChange={(e) => updateEmail({ remetente_email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.email.ssl}
              onChange={(e) => updateEmail({ ssl: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Usar SSL/TLS</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderExamesSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prazo Padrão (dias)
          </label>
          <input
            type="number"
            value={config.exames.prazo_padrao}
            onChange={(e) => updateExames({ prazo_padrao: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Template de Laudo
          </label>
          <select
            value={config.exames.template_laudo}
            onChange={(e) => updateExames({ template_laudo: e.target.value as 'padrao' | 'detalhado' | 'simples' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="padrao">Padrão</option>
            <option value="detalhado">Detalhado</option>
            <option value="simples">Simples</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prefixo do Pedido
          </label>
          <input
            type="text"
            value={config.exames.prefixo_pedido}
            onChange={(e) => updateExames({ prefixo_pedido: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.exames.auto_aprovacao}
              onChange={(e) => updateExames({ auto_aprovacao: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Auto aprovação</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.exames.numeracao_automatica}
              onChange={(e) => updateExames({ numeracao_automatica: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Numeração automática</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderFinanceiroSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Moeda
          </label>
          <select
            value={config.financeiro.moeda}
            onChange={(e) => updateFinanceiro({ moeda: e.target.value as 'BRL' | 'USD' | 'EUR' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="BRL">Real (R$)</option>
            <option value="USD">Dólar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desconto Máximo (%)
          </label>
          <input
            type="number"
            value={config.financeiro.desconto_maximo}
            onChange={(e) => updateFinanceiro({ desconto_maximo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Juros por Atraso (% ao mês)
          </label>
          <input
            type="number"
            step="0.1"
            value={config.financeiro.juros_atraso}
            onChange={(e) => updateFinanceiro({ juros_atraso: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dias para Vencimento
          </label>
          <input
            type="number"
            value={config.financeiro.dias_vencimento}
            onChange={(e) => updateFinanceiro({ dias_vencimento: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Forma de Pagamento Padrão
          </label>
          <select
            value={config.financeiro.forma_pagamento_padrao}
            onChange={(e) => updateFinanceiro({ forma_pagamento_padrao: e.target.value as 'dinheiro' | 'cartao' | 'pix' | 'transferencia' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao_credito">Cartão de Crédito</option>
            <option value="cartao_debito">Cartão de Débito</option>
            <option value="pix">PIX</option>
            <option value="boleto">Boleto</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificacoesSection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notificações por Email</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificacoes.email_novos_pedidos}
              onChange={(e) => updateNotificacoes({ email_novos_pedidos: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Novos pedidos</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificacoes.email_resultados_prontos}
              onChange={(e) => updateNotificacoes({ email_resultados_prontos: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Resultados prontos</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificacoes.email_pagamentos}
              onChange={(e) => updateNotificacoes({ email_pagamentos: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Confirmação de pagamentos</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Outras Notificações</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificacoes.sms_resultados}
              onChange={(e) => updateNotificacoes({ sms_resultados: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">SMS para resultados prontos</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificacoes.push_notifications}
              onChange={(e) => updateNotificacoes({ push_notifications: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Notificações push no navegador</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderUsuariosSection = () => (
    <UserManagement />
  );

  const renderSegurancaSection = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Shield className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Configurações Avançadas
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                Estas configurações afetam a segurança do sistema. Altere apenas se souber o que está fazendo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Backup e Segurança */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <HardDrive className="w-5 h-5 mr-2" />
          Backup e Segurança
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.sistema.backup_automatico}
                onChange={(e) => updateSistema({ backup_automatico: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Backup automático diário</span>
            </label>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Horário:</label>
              <input
                type="time"
                defaultValue="02:00"
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Retenção (dias):</label>
              <input
                type="number"
                defaultValue="30"
                min="1"
                max="365"
                className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
              Fazer Backup Agora
            </button>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm">
              Restaurar Backup
            </button>
          </div>
        </div>
      </div>

      {/* Configurações de Sessão */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <UserCheck className="w-5 h-5 mr-2" />
          Configurações de Sessão
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Timeout de sessão (min):</label>
              <input
                type="number"
                defaultValue="30"
                min="5"
                max="480"
                className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Tentativas de login:</label>
              <input
                type="number"
                defaultValue="5"
                min="3"
                max="10"
                className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
              />
            </div>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={true}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Log de tentativas falhadas</span>
            </label>
          </div>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
              Forçar Logout de Todos
            </button>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={false}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Autenticação 2FA (em breve)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Logs e Auditoria */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Logs e Auditoria
        </h3>
        <SecurityLogs />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'empresa':
        return renderEmpresaSection();
      case 'email':
        return renderEmailSection();
      case 'exames':
        return renderExamesSection();
      case 'financeiro':
        return renderFinanceiroSection();
      case 'notificacoes':
        return renderNotificacoesSection();
      case 'sistema':
        return renderSistemaSection();
      case 'usuarios':
        return renderUsuariosSection();
      case 'seguranca':
        return renderSegurancaSection();
      default:
        return renderEmpresaSection();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Configure o sistema de acordo com suas necessidades</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Menu Lateral */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <nav className="space-y-1">
              {configSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-4 h-4 mr-3" />
                      <div>
                        <div>{section.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{section.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {configSections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-gray-600 mt-1">
                {configSections.find(s => s.id === activeSection)?.description}
              </p>
            </div>

            {renderContent()}

            {/* Botão Salvar */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Configurações
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;