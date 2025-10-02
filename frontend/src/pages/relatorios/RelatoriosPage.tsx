import React, { useState, useEffect } from 'react';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  Activity,
  AlertCircle,
  RefreshCw,
  Wifi,
  Server,
  FileDown,
  FileSpreadsheet
} from 'lucide-react';
import MetricCard from '../../components/relatorios/MetricCard';
import ChartCard from '../../components/relatorios/ChartCard';
import relatorioService from '../../services/relatorio.service';
import { exportToPDF, exportToExcel, prepareExportData, validateExportData } from '../../utils/exportUtils';
import useApiCache from '../../hooks/useApiCache';
import toast from 'react-hot-toast';

// Tipos de erro específicos
interface ErrorState {
  type: 'network' | 'server' | 'auth' | 'data' | 'unknown';
  message: string;
  details?: any;
}

const RelatoriosPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [retryCount, setRetryCount] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  // Usando o hook de cache para cada endpoint com configurações mais conservadoras
  const metricsCache = useApiCache(
    `dashboard-metrics-${selectedYear}`,
    () => relatorioService.getDashboardMetrics(),
    { cacheTime: 10 * 60 * 1000, debounceTime: 2000, retryDelay: 3000 } // Cache de 10 minutos, debounce de 2s
  );

  const pedidosCache = useApiCache(
    `pedidos-por-mes-${selectedYear}`,
    () => relatorioService.getPedidosPorMes(selectedYear),
    { cacheTime: 15 * 60 * 1000, debounceTime: 2000, retryDelay: 3000 } // Cache de 15 minutos
  );

  const receitaCache = useApiCache(
    `receita-por-mes-${selectedYear}`,
    () => relatorioService.getReceitaPorMes(selectedYear),
    { cacheTime: 15 * 60 * 1000, debounceTime: 2000, retryDelay: 3000 }
  );

  const clientesCache = useApiCache(
    `top-clientes-${selectedYear}`,
    () => relatorioService.getTopClientes(),
    { cacheTime: 20 * 60 * 1000, debounceTime: 2000, retryDelay: 3000 } // Cache de 20 minutos
  );

  const examesCache = useApiCache(
    `exames-por-tipo-${selectedYear}`,
    () => relatorioService.getExamesPorTipo(),
    { cacheTime: 20 * 60 * 1000, debounceTime: 2000, retryDelay: 3000 }
  );

  const performanceCache = useApiCache(
    `performance-profissionais-${selectedYear}`,
    () => relatorioService.getPerformanceProfissionais(),
    { cacheTime: 30 * 60 * 1000, debounceTime: 2000, retryDelay: 3000 } // Cache de 30 minutos
  );

  // Estados derivados dos caches com validações mais robustas
  const metrics = metricsCache.data;
  const pedidosPorMes = Array.isArray(pedidosCache.data) ? pedidosCache.data : [];
  const receitaPorMes = Array.isArray(receitaCache.data) ? receitaCache.data : [];
  const topClientes = Array.isArray(clientesCache.data) ? clientesCache.data : [];
  const examesPorTipo = Array.isArray(examesCache.data) ? examesCache.data : [];
  const performanceProfissionais = Array.isArray(performanceCache.data) ? performanceCache.data : [];

  // Estados de loading
  const loadingStates = {
    metrics: metricsCache.loading,
    pedidosPorMes: pedidosCache.loading,
    receitaPorMes: receitaCache.loading,
    topClientes: clientesCache.loading,
    examesPorTipo: examesCache.loading,
    performanceProfissionais: performanceCache.loading
  };

  const hasAnyLoading = Object.values(loadingStates).some(loading => loading);

  // Carrega dados quando o ano muda
  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregamento sequencial com delays maiores para evitar rate limiting
        console.log('Iniciando carregamento sequencial dos dados...');
        
        // Carrega métricas primeiro
        await new Promise(resolve => setTimeout(resolve, 100));
        metricsCache.fetch();
        
        // Aguarda 2 segundos antes da próxima requisição
        await new Promise(resolve => setTimeout(resolve, 100));
        pedidosCache.fetch();
        
        // Aguarda mais 2 segundos
        await new Promise(resolve => setTimeout(resolve, 100));
        receitaCache.fetch();
        
        // Aguarda mais 2 segundos
        await new Promise(resolve => setTimeout(resolve, 100));
        clientesCache.fetch();
        
        // Aguarda mais 2 segundos
        await new Promise(resolve => setTimeout(resolve, 100));
        examesCache.fetch();
        
        // Aguarda mais 2 segundos
        await new Promise(resolve => setTimeout(resolve, 100));
        performanceCache.fetch();
        
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    };

    loadData();
  }, [selectedYear]);

  // Função para analisar erros
  const parseError = (error: any): ErrorState => {
    if (!error) {
      return { type: 'unknown', message: 'Erro desconhecido' };
    }

    // Erro de rede
    if (!navigator.onLine) {
      return {
        type: 'network',
        message: 'Sem conexão com a internet',
        details: error
      };
    }

    // Erro de resposta HTTP
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
          return {
            type: 'auth',
            message: 'Sessão expirada. Faça login novamente.',
            details: data
          };
        case 403:
          return {
            type: 'auth',
            message: 'Acesso negado. Você não tem permissão para visualizar estes dados.',
            details: data
          };
        case 404:
          return {
            type: 'data',
            message: 'Dados não encontrados para o período selecionado.',
            details: data
          };
        case 429:
          return {
            type: 'server',
            message: 'Muitas requisições. Os dados serão carregados automaticamente em alguns instantes.',
            details: data
          };
        case 500:
        case 502:
        case 503:
        case 504:
          return {
            type: 'server',
            message: 'Erro no servidor. Tente novamente em alguns minutos.',
            details: data
          };
        default:
          return {
            type: 'server',
            message: `Erro do servidor (${status}). Tente novamente.`,
            details: data
          };
      }
    }

    // Erro de timeout
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return {
        type: 'network',
        message: 'Timeout na conexão. Verifique sua internet e tente novamente.',
        details: error
      };
    }

    // Erro de rede genérico
    if (error.request) {
      return {
        type: 'network',
        message: 'Erro de conexão. Verifique sua internet.',
        details: error
      };
    }

    return {
      type: 'unknown',
      message: error.message || 'Erro inesperado',
      details: error
    };
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    
    // Força refresh de todos os caches
    metricsCache.refresh();
    pedidosCache.refresh();
    receitaCache.refresh();
    clientesCache.refresh();
    examesCache.refresh();
    performanceCache.refresh();
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      
      const exportData = prepareExportData(
        metrics,
        pedidosPorMes,
        receitaPorMes,
        topClientes,
        examesPorTipo,
        performanceProfissionais,
        selectedYear
      );

      const validation = validateExportData(exportData);
      if (!validation.isValid) {
        toast.error(validation.message || 'Dados insuficientes para exportação');
        return;
      }

      await exportToPDF('dashboard-content', `relatorio-dashboard-${selectedYear}`);
      toast.success('Relatório PDF gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      
      const exportData = prepareExportData(
        metrics,
        pedidosPorMes,
        receitaPorMes,
        topClientes,
        examesPorTipo,
        performanceProfissionais,
        selectedYear
      );

      const validation = validateExportData(exportData);
      if (!validation.isValid) {
        toast.error(validation.message || 'Dados insuficientes para exportação');
        return;
      }

      exportToExcel(exportData, `relatorio-dashboard-${selectedYear}`);
      toast.success('Relatório Excel gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar Excel:', error);
      toast.error('Erro ao gerar Excel. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const getErrorIcon = (type: ErrorState['type']) => {
    switch (type) {
      case 'network':
        return Wifi;
      case 'server':
        return Server;
      case 'auth':
        return AlertCircle;
      case 'data':
        return FileText;
      default:
        return AlertCircle;
    }
  };

  const getErrorColor = (type: ErrorState['type']) => {
    switch (type) {
      case 'network':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'server':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'auth':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'data':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Componente de Loading
  const LoadingCard: React.FC<{ type?: 'metric' | 'chart' }> = ({ type = 'metric' }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse ${
      type === 'chart' ? 'h-80' : 'h-32'
    }`}>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      {type === 'chart' && (
        <div className="mt-6 h-48 bg-gray-200 rounded"></div>
      )}
    </div>
  );

  // Funções de formatação de dados para gráficos
  const formatPedidosChartData = () => {
    if (!Array.isArray(pedidosPorMes) || pedidosPorMes.length === 0) {
      return [];
    }
    return pedidosPorMes.map(item => ({
      name: `${item.mes}/${item.ano}`,
      value: item.total
    }));
  };

  const formatReceitaChartData = () => {
    if (!Array.isArray(receitaPorMes) || receitaPorMes.length === 0) {
      return [];
    }
    return receitaPorMes.map(item => ({
      name: `${item.mes}/${item.ano}`,
      value: item.total
    }));
  };

  const formatTopClientesData = () => {
    if (!Array.isArray(topClientes) || topClientes.length === 0) {
      return [];
    }
    return topClientes.slice(0, 5).map(cliente => ({
      name: cliente.nome.length > 15 ? cliente.nome.substring(0, 15) + '...' : cliente.nome,
      value: cliente.totalPedidos
    }));
  };

  const formatExamesChartData = () => {
    if (!Array.isArray(examesPorTipo) || examesPorTipo.length === 0) {
      return [];
    }
    return examesPorTipo.map(exame => ({
      name: exame.tipo,
      value: exame.quantidade
    }));
  };

  // Verifica se há algum erro crítico
  const hasAnyError = metricsCache.error || pedidosCache.error || receitaCache.error || 
                     clientesCache.error || examesCache.error || performanceCache.error;

  // Se há erro crítico, mostra tela de erro
  if (hasAnyError && !hasAnyLoading) {
    const mainError = metricsCache.error || pedidosCache.error || receitaCache.error || 
                     clientesCache.error || examesCache.error || performanceCache.error;
    const parsedError = parseError(mainError);
    const ErrorIcon = getErrorIcon(parsedError.type);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className={`max-w-md w-full mx-4 p-8 rounded-xl border-2 ${getErrorColor(parsedError.type)}`}>
          <div className="text-center">
            <ErrorIcon className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ops! Algo deu errado</h2>
            <p className="mb-6">{parsedError.message}</p>
            
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Tentar Novamente</span>
              </button>
              
              {parsedError.type === 'auth' && (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Ir para Login
                </button>
              )}
            </div>
            
            {retryCount > 0 && (
              <p className="text-sm text-gray-500 mt-4">
                Tentativas: {retryCount}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Relatórios</h1>
          <p className="text-gray-600 mt-1">Visualize relatórios e estatísticas</p>
          {hasAnyLoading && (
            <p className="text-sm text-blue-600 mt-1 flex items-center">
              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              Carregando dados...
            </p>
          )}
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
          {/* Seletor de Ano */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={hasAnyLoading}
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          {/* Botões de Exportação */}
          <div className="flex gap-2">
            <button
              onClick={handleExportPDF}
              disabled={isExporting || hasAnyLoading}
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileDown className={`w-4 h-4 ${isExporting ? 'animate-pulse' : ''}`} />
              <span>PDF</span>
            </button>
            
            <button
              onClick={handleExportExcel}
              disabled={isExporting || hasAnyLoading}
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileSpreadsheet className={`w-4 h-4 ${isExporting ? 'animate-pulse' : ''}`} />
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo do Dashboard */}
      <div id="dashboard-content" className="space-y-6">
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingStates.metrics ? (
            <LoadingCard />
          ) : (
            <MetricCard
              title="Total de Pedidos"
              value={metrics?.totalPedidos || 0}
              subtitle="Pedidos realizados"
              icon={FileText}
              color="blue"
            />
          )}
          {loadingStates.metrics ? (
            <LoadingCard />
          ) : (
            <MetricCard
              title="Pedidos Hoje"
              value={metrics?.pedidosHoje || 0}
              subtitle="Novos pedidos hoje"
              icon={Calendar}
              color="green"
            />
          )}
          {loadingStates.metrics ? (
            <LoadingCard />
          ) : (
            <MetricCard
              title="Receita Total"
              value={`R$ ${(metrics?.receitaTotal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              subtitle="Receita acumulada"
              icon={DollarSign}
              color="yellow"
            />
          )}
          {loadingStates.metrics ? (
            <LoadingCard />
          ) : (
            <MetricCard
              title="Receita do Mês"
              value={`R$ ${(metrics?.receitaMes || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              subtitle="Receita atual"
              icon={TrendingUp}
              color="purple"
            />
          )}
        </div>

        {/* Segunda linha de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingStates.metrics ? (
            <LoadingCard />
          ) : (
            <MetricCard
              title="Clientes Ativos"
              value={metrics?.clientesAtivos || 0}
              subtitle={`Total: ${metrics?.totalClientes || 0}`}
              icon={Users}
              color="indigo"
            />
          )}
          {loadingStates.metrics ? (
            <LoadingCard />
          ) : (
            <MetricCard
              title="Exames Liberados"
              value={metrics?.examesLiberados || 0}
              subtitle={`Total: ${metrics?.totalExames || 0}`}
              icon={Activity}
              color="green"
            />
          )}
          {loadingStates.metrics ? (
            <LoadingCard />
          ) : (
            <MetricCard
              title="Pedidos Pendentes"
              value={metrics?.pedidosPendentes || 0}
              subtitle="Aguardando processamento"
              icon={FileText}
              color="red"
            />
          )}
          {loadingStates.metrics ? (
            <LoadingCard />
          ) : (
            <MetricCard
              title="Laudos Pendentes"
              value={metrics?.laudosPendentes || 0}
              subtitle="Aguardando assinatura"
              icon={FileText}
              color="yellow"
            />
          )}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loadingStates.pedidosPorMes ? (
            <LoadingCard type="chart" />
          ) : (
            <ChartCard
              title="Pedidos por Mês"
              subtitle={`Evolução mensal - ${selectedYear}`}
              data={formatPedidosChartData()}
              type="bar"
              dataKey="value"
              xAxisKey="name"
              color="#3B82F6"
              height={300}
            />
          )}
          {loadingStates.receitaPorMes ? (
            <LoadingCard type="chart" />
          ) : (
            <ChartCard
              title="Receita por Mês"
              subtitle={`Evolução da receita - ${selectedYear}`}
              data={formatReceitaChartData()}
              type="line"
              dataKey="value"
              xAxisKey="name"
              color="#10B981"
              height={300}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loadingStates.examesPorTipo ? (
            <LoadingCard type="chart" />
          ) : (
            <ChartCard
              title="Exames por Tipo"
              subtitle="Distribuição dos tipos de exames"
              data={formatExamesChartData()}
              type="pie"
              dataKey="value"
              height={300}
              showGrid={false}
            />
          )}
          {loadingStates.topClientes ? (
            <LoadingCard type="chart" />
          ) : (
            <ChartCard
              title="Top 5 Clientes"
              subtitle="Clientes com mais pedidos"
              data={formatTopClientesData()}
              type="bar"
              dataKey="value"
              xAxisKey="name"
              color="#8B5CF6"
              height={300}
            />
          )}
        </div>

        {/* Tabela de Performance dos Profissionais */}
        {loadingStates.performanceProfissionais ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          performanceProfissionais.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance dos Profissionais</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profissional
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Conselho
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Laudos Assinados
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tempo Médio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceProfissionais.map((prof) => (
                      <tr key={prof.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {prof.nome}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {prof.conselho} {prof.numeroConselho}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {prof.laudosAssinados}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {prof.mediaTempoLaudo.toFixed(1)}h
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
        </div>
      </div>
    );
};

export default RelatoriosPage;