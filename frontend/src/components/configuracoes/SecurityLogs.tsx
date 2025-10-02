import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Clock, 
  AlertTriangle
} from 'lucide-react';
import { LogsService } from '@/services/logs.service';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuthStore } from '@/stores/auth.store';
import { useSecurityLogsConditional } from '@/hooks/useSecurityLogsConditional';
import { toast } from 'react-hot-toast';

const SecurityLogs: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'logs' | 'sessions' | 'history'>('logs');
  const [loadingSessionId, setLoadingSessionId] = useState<string | null>(null);
  
  // Verificar se o usuário é admin
  const isAdmin = currentUser?.perfil?.permissoes?.admin;
  
  // Usar hook condicional
  const {
    logs,
    sessoes,
    historicoLogin,
    loading,
    stats,
    loadData,
    loadStats
  } = useSecurityLogsConditional({ enabled: !!isAdmin });
  
  // Filtros
  const [filtros, setFiltros] = useState({
    acao: '',
    dataInicio: '',
    dataFim: '',
    page: 1,
    limit: 20
  });

  // Carregar dados iniciais apenas se for admin
  useEffect(() => {
    if (isAdmin) {
      loadData(activeTab, filtros);
      loadStats();
    }
  }, [activeTab, filtros, isAdmin]);

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
  };

  const getAcaoColor = (acao: string) => {
    switch (acao.toUpperCase()) {
      case 'LOGIN':
        return 'text-green-600 bg-green-100';
      case 'LOGOUT':
        return 'text-blue-600 bg-blue-100';
      case 'DELETE':
        return 'text-red-600 bg-red-100';
      case 'UPDATE':
        return 'text-yellow-600 bg-yellow-100';
      case 'CREATE':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleEncerrarSessao = async (sessionId: string, nomeUsuario: string) => {
    if (!isAdmin) {
      toast.error('Você não tem permissão para encerrar sessões');
      return;
    }

    // Confirmação antes de encerrar
    const confirmacao = window.confirm(
      `Tem certeza que deseja encerrar a sessão do usuário "${nomeUsuario}"?\n\nEsta ação não pode ser desfeita e o usuário será desconectado imediatamente.`
    );

    if (!confirmacao) {
      return;
    }
    
    setLoadingSessionId(sessionId);
    
    try {
      await LogsService.encerrarSessao(sessionId);
      toast.success(`Sessão do usuário "${nomeUsuario}" encerrada com sucesso!`);
      
      // Recarregar sessões após encerrar
      await loadData('sessions', filtros);
    } catch (error: any) {
      console.error('Erro ao encerrar sessão:', error);
      
      // Tratamento específico de erros
      if (error?.response?.status === 404) {
        toast.error('Sessão não encontrada ou já foi encerrada');
      } else if (error?.response?.status === 403) {
        toast.error('Você não tem permissão para encerrar esta sessão');
      } else if (error?.response?.status >= 500) {
        toast.error('Erro interno do servidor. Tente novamente em alguns instantes');
      } else {
        toast.error('Erro ao encerrar sessão. Verifique sua conexão e tente novamente');
      }
    } finally {
      setLoadingSessionId(null);
    }
  };

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-blue-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Total de Logs</p>
            <p className="text-2xl font-semibold text-gray-900">{stats?.totalLogs || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-green-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Logs Hoje</p>
            <p className="text-2xl font-semibold text-gray-900">{stats?.logsHoje || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-purple-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Sessões Ativas</p>
            <p className="text-2xl font-semibold text-gray-900">{sessoes.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-orange-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Esta Semana</p>
            <p className="text-2xl font-semibold text-gray-900">{stats?.logsSemana || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFiltros = () => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ação
          </label>
          <select
            value={filtros.acao}
            onChange={(e) => setFiltros({ ...filtros, acao: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas as ações</option>
            <option value="LOGIN">Login</option>
            <option value="LOGOUT">Logout</option>
            <option value="CREATE">Criação</option>
            <option value="UPDATE">Atualização</option>
            <option value="DELETE">Exclusão</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Início
          </label>
          <input
            type="date"
            value={filtros.dataInicio}
            onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Fim
          </label>
          <input
            type="date"
            value={filtros.dataFim}
            onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-end">
          <button
            onClick={() => setFiltros({ acao: '', dataInicio: '', dataFim: '', page: 1, limit: 20 })}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-4">
      {renderFiltros()}
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tabela
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAcaoColor(log.acao)}`}>
                      {log.acao}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.tabela || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.usuario?.nome || log.usuarioId || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.ip || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {logs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum log encontrado</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSessoes = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Atividade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Navegador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessoes.map((sessao) => (
                <tr key={sessao.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sessao.nomeUsuario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sessao.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(sessao.ultimaAtividade)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sessao.ativo ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
                    }`}>
                      {sessao.ativo ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                    {sessao.userAgent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEncerrarSessao(sessao.id, sessao.nomeUsuario)}
                      disabled={loadingSessionId === sessao.id || !sessao.ativo}
                      className={`${
                        loadingSessionId === sessao.id
                          ? 'text-gray-400 cursor-not-allowed'
                          : !sessao.ativo
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                      } px-2 py-1 rounded transition-colors duration-200`}
                      title={
                        !sessao.ativo 
                          ? 'Sessão já está inativa' 
                          : loadingSessionId === sessao.id 
                          ? 'Encerrando sessão...' 
                          : 'Encerrar sessão'
                      }
                    >
                      {loadingSessionId === sessao.id ? (
                        <div className="flex items-center space-x-1">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-400"></div>
                          <span>Encerrando...</span>
                        </div>
                      ) : (
                        'Encerrar'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {sessoes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhuma sessão ativa encontrada</p>
        </div>
      )}
    </div>
  );

  const renderHistorico = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Navegador
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historicoLogin.map((login) => (
                <tr key={login.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(login.dataLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {login.nomeUsuario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {login.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      login.sucesso ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
                    }`}>
                      {login.sucesso ? 'Sucesso' : 'Falha'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                    {login.userAgent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {historicoLogin.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum histórico de login encontrado</p>
        </div>
      )}
    </div>
  );

  // Verificar se o usuário tem permissão de admin
  if (!isAdmin) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Acesso Restrito</h3>
          <p className="text-gray-500">
            Você não tem permissão para acessar os logs de segurança do sistema.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      {stats && renderStats()}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'logs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Activity className="h-4 w-4 inline mr-2" />
            Logs do Sistema
          </button>
          
          <button
            onClick={() => setActiveTab('sessions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sessions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Sessões Ativas
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Clock className="h-4 w-4 inline mr-2" />
            Histórico de Login
          </button>
        </nav>
      </div>

      {/* Conteúdo */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Carregando...</p>
        </div>
      ) : (
        <>
          {activeTab === 'logs' && renderLogs()}
          {activeTab === 'sessions' && renderSessoes()}
          {activeTab === 'history' && renderHistorico()}
        </>
      )}
    </div>
  );
};

export default SecurityLogs;