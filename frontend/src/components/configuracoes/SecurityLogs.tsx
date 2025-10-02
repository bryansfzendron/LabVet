import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Users, 
  Clock, 
  AlertTriangle, 
  Eye, 
  X,
  Download,
  Filter,
  Search,
  Calendar
} from 'lucide-react';
import { LogsService, LogSistema, SessaoAtiva } from '@/services/logs.service';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const SecurityLogs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'logs' | 'sessions' | 'history'>('logs');
  const [logs, setLogs] = useState<LogSistema[]>([]);
  const [sessoes, setSessoes] = useState<SessaoAtiva[]>([]);
  const [historicoLogin, setHistoricoLogin] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  
  // Filtros
  const [filtros, setFiltros] = useState({
    acao: '',
    dataInicio: '',
    dataFim: '',
    page: 1,
    limit: 20
  });

  // Carregar dados iniciais
  useEffect(() => {
    loadData();
    loadStats();
  }, [activeTab, filtros]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'logs':
          const logsResponse = await LogsService.getLogs(filtros);
          console.log('Resposta dos logs:', logsResponse); // Debug
          if (logsResponse && logsResponse.logs) {
            setLogs(logsResponse.logs);
          } else {
            console.error('Estrutura de resposta inválida:', logsResponse);
            setLogs([]);
          }
          break;
        case 'sessions':
          const sessoesData = await LogsService.getSessoesAtivas();
          setSessoes(sessoesData || []);
          break;
        case 'history':
          const historicoData = await LogsService.getHistoricoLogin();
          setHistoricoLogin(historicoData || []);
          break;
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Definir valores padrão em caso de erro
      switch (activeTab) {
        case 'logs':
          setLogs([]);
          break;
        case 'sessions':
          setSessoes([]);
          break;
        case 'history':
          setHistoricoLogin([]);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await LogsService.getLogStats();
      setStats(statsData);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

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

  const handleEncerrarSessao = async (sessionId: string) => {
    try {
      await LogsService.encerrarSessao(sessionId);
      // Recarregar sessões após encerrar
      const sessoesData = await LogsService.getSessoesAtivas();
      setSessoes(sessoesData || []);
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error);
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
                      onClick={() => handleEncerrarSessao(sessao.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Encerrar
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