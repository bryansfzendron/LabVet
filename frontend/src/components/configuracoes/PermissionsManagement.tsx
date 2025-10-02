import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  FileText, 
  BarChart3, 
  ClipboardList, 
  UserCheck,
  PawPrint,
  TestTube,
  DollarSign,
  Calendar,
  LayoutDashboard,
  Settings,
  Save,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import { usePermissionsConditional } from '../../hooks/usePermissionsConditional';

interface PerfilPermissoes {
  admin?: boolean;
  configuracoes?: boolean;
  usuarios?: boolean;
  relatorios?: boolean;
  pedidos?: boolean;
  laudos?: boolean;
  clientes?: boolean;
  animais?: boolean;
  exames?: boolean;
  financeiro?: boolean;
  agenda?: boolean;
  dashboard?: boolean;
}

interface Perfil {
  id: number;
  nome: string;
  codigo: string;
  descricao?: string;
  permissoes: PerfilPermissoes;
  ativo: boolean;
}

const PermissionsManagement: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  const [selectedPerfil, setSelectedPerfil] = useState<Perfil | null>(null);
  const [permissoes, setPermissoes] = useState<PerfilPermissoes>({});

  // Verificar se o usuário é admin
  const isAdmin = currentUser?.perfil?.permissoes?.admin || false;

  // Usar hook condicional para carregar perfis apenas se for admin
  const { 
    perfis, 
    loading, 
    saving, 
    error, 
    success, 
    updatePermissoes,
    setError,
    setSuccess
  } = usePermissionsConditional({
    enabled: isAdmin
  });

  // Definição das permissões disponíveis com ícones e descrições
  const permissoesDisponiveis = [
    {
      key: 'admin' as keyof PerfilPermissoes,
      label: 'Administrador',
      description: 'Acesso total ao sistema',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      key: 'configuracoes' as keyof PerfilPermissoes,
      label: 'Configurações',
      description: 'Gerenciar configurações do sistema',
      icon: Settings,
      color: 'text-gray-600'
    },
    {
      key: 'usuarios' as keyof PerfilPermissoes,
      label: 'Usuários',
      description: 'Gerenciar usuários e perfis',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      key: 'relatorios' as keyof PerfilPermissoes,
      label: 'Relatórios',
      description: 'Visualizar e gerar relatórios',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      key: 'pedidos' as keyof PerfilPermissoes,
      label: 'Pedidos',
      description: 'Gerenciar pedidos de exames',
      icon: ClipboardList,
      color: 'text-orange-600'
    },
    {
      key: 'laudos' as keyof PerfilPermissoes,
      label: 'Laudos',
      description: 'Gerenciar laudos médicos',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      key: 'clientes' as keyof PerfilPermissoes,
      label: 'Clientes',
      description: 'Gerenciar cadastro de clientes',
      icon: UserCheck,
      color: 'text-indigo-600'
    },
    {
      key: 'animais' as keyof PerfilPermissoes,
      label: 'Animais',
      description: 'Gerenciar cadastro de animais',
      icon: PawPrint,
      color: 'text-amber-600'
    },
    {
      key: 'exames' as keyof PerfilPermissoes,
      label: 'Exames',
      description: 'Gerenciar tipos de exames',
      icon: TestTube,
      color: 'text-cyan-600'
    },
    {
      key: 'financeiro' as keyof PerfilPermissoes,
      label: 'Financeiro',
      description: 'Acessar módulo financeiro',
      icon: DollarSign,
      color: 'text-emerald-600'
    },
    {
      key: 'agenda' as keyof PerfilPermissoes,
      label: 'Agenda',
      description: 'Gerenciar agenda de exames',
      icon: Calendar,
      color: 'text-pink-600'
    },
    {
      key: 'dashboard' as keyof PerfilPermissoes,
      label: 'Dashboard',
      description: 'Visualizar dashboard principal',
      icon: LayoutDashboard,
      color: 'text-slate-600'
    }
  ];

  const handlePerfilSelect = (perfil: Perfil) => {
    setSelectedPerfil(perfil);
    setPermissoes(perfil.permissoes || {});
    setError(null);
    setSuccess(null);
  };

  const handlePermissaoChange = (key: keyof PerfilPermissoes, value: boolean) => {
    setPermissoes(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    if (!selectedPerfil) return;

    try {
      await updatePermissoes(selectedPerfil.id, permissoes);
      
      setSelectedPerfil(prev => prev ? { ...prev, permissoes } : null);
      setSuccess('Permissões atualizadas com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (error: any) {
      console.error('Erro ao salvar permissões:', error);
      setError(error.response?.data?.error || 'Erro ao salvar permissões');
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Acesso Restrito</h3>
          <p className="text-gray-600">
            Apenas administradores podem gerenciar permissões de perfis.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Permissões</h2>
          <p className="text-gray-600">Configure as permissões de acesso para cada perfil</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Perfis */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Perfis</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {perfis.map((perfil) => (
                <button
                  key={perfil.id}
                  onClick={() => handlePerfilSelect(perfil)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    selectedPerfil?.id === perfil.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                  disabled={perfil.codigo === 'ADMIN'}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{perfil.nome}</p>
                      <p className="text-sm text-gray-600">{perfil.codigo}</p>
                      {perfil.descricao && (
                        <p className="text-xs text-gray-500 mt-1">{perfil.descricao}</p>
                      )}
                    </div>
                    {perfil.codigo === 'ADMIN' && (
                      <Shield className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Configuração de Permissões */}
        <div className="lg:col-span-2">
          {selectedPerfil ? (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Permissões - {selectedPerfil.nome}
                    </h3>
                    <p className="text-sm text-gray-600">{selectedPerfil.descricao}</p>
                  </div>
                  {selectedPerfil.codigo !== 'ADMIN' && (
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {selectedPerfil.codigo === 'ADMIN' ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Perfil Administrador
                    </h4>
                    <p className="text-gray-600">
                      O perfil Administrador possui acesso total ao sistema e suas permissões não podem ser alteradas.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {permissoesDisponiveis.map((permissao) => {
                      const IconComponent = permissao.icon;
                      const isChecked = permissoes[permissao.key] || false;
                      
                      return (
                        <div
                          key={permissao.key}
                          className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0">
                            <IconComponent className={`h-5 w-5 ${permissao.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {permissao.label}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {permissao.description}
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => handlePermissaoChange(permissao.key, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="text-center">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecione um Perfil
                </h3>
                <p className="text-gray-600">
                  Escolha um perfil na lista ao lado para configurar suas permissões.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionsManagement;