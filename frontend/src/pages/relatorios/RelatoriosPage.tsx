import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  Activity,
  Download
} from 'lucide-react';
import MetricCard from '../../components/relatorios/MetricCard';
import ChartCard from '../../components/relatorios/ChartCard';
import relatorioService, { DashboardMetrics, MonthlyData, TopClient, ExamTypeData, ProfessionalPerformance } from '../../services/relatorio.service';

const RelatoriosPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [pedidosPorMes, setPedidosPorMes] = useState<MonthlyData[]>([]);
  const [receitaPorMes, setReceitaPorMes] = useState<MonthlyData[]>([]);
  const [topClientes, setTopClientes] = useState<TopClient[]>([]);
  const [examesPorTipo, setExamesPorTipo] = useState<ExamTypeData[]>([]);
  const [performanceProfissionais, setPerformanceProfissionais] = useState<ProfessionalPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadDashboardData();
  }, [selectedYear]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carregar dados em paralelo
      const [
        metricsData,
        pedidosData,
        receitaData,
        clientesData,
        examesData,
        profissionaisData
      ] = await Promise.all([
        relatorioService.getDashboardMetrics(),
        relatorioService.getPedidosPorMes(selectedYear),
        relatorioService.getReceitaPorMes(selectedYear),
        relatorioService.getTopClientes(5),
        relatorioService.getExamesPorTipo(),
        relatorioService.getPerformanceProfissionais()
      ]);

      setMetrics(metricsData);
      setPedidosPorMes(pedidosData);
      setReceitaPorMes(receitaData);
      setTopClientes(clientesData);
      setExamesPorTipo(examesData);
      setPerformanceProfissionais(profissionaisData);
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
      setError('Erro ao carregar dados do dashboard. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const formatPedidosChartData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months.map((month, index) => {
      const data = pedidosPorMes.find(p => parseInt(p.mes) === index + 1);
      return {
        name: month,
        value: data?.total || 0
      };
    });
  };

  const formatReceitaChartData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months.map((month, index) => {
      const data = receitaPorMes.find(r => parseInt(r.mes) === index + 1);
      return {
        name: month,
        value: data?.total || 0
      };
    });
  };

  const formatExamesChartData = () => {
    return examesPorTipo.map(exame => ({
      name: exame.tipo,
      value: exame.quantidade
    }));
  };

  const formatTopClientesData = () => {
    return topClientes.map(cliente => ({
      name: cliente.nome,
      value: cliente.totalPedidos
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Relatórios</h1>
          <p className="text-gray-600 mt-1">Carregando dados...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Relatórios</h1>
          <p className="text-gray-600 mt-1">Visualize relatórios e estatísticas</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-red-900 mb-2">Erro ao Carregar Dados</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={loadDashboardData}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Relatórios</h1>
          <p className="text-gray-600 mt-1">Visualize relatórios e estatísticas em tempo real</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[2024, 2023, 2022, 2021].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total de Pedidos"
          value={metrics?.totalPedidos || 0}
          subtitle="Pedidos realizados"
          icon={FileText}
          color="blue"
        />
        <MetricCard
          title="Pedidos Hoje"
          value={metrics?.pedidosHoje || 0}
          subtitle="Novos pedidos hoje"
          icon={Calendar}
          color="green"
        />
        <MetricCard
          title="Receita Total"
          value={`R$ ${(metrics?.receitaTotal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          subtitle="Receita acumulada"
          icon={DollarSign}
          color="yellow"
        />
        <MetricCard
          title="Receita do Mês"
          value={`R$ ${(metrics?.receitaMes || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          subtitle="Receita atual"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Segunda linha de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Clientes Ativos"
          value={metrics?.clientesAtivos || 0}
          subtitle={`Total: ${metrics?.totalClientes || 0}`}
          icon={Users}
          color="indigo"
        />
        <MetricCard
          title="Exames Liberados"
          value={metrics?.examesLiberados || 0}
          subtitle={`Total: ${metrics?.totalExames || 0}`}
          icon={Activity}
          color="green"
        />
        <MetricCard
          title="Pedidos Pendentes"
          value={metrics?.pedidosPendentes || 0}
          subtitle="Aguardando processamento"
          icon={FileText}
          color="red"
        />
        <MetricCard
          title="Laudos Pendentes"
          value={metrics?.laudosPendentes || 0}
          subtitle="Aguardando assinatura"
          icon={FileText}
          color="yellow"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Exames por Tipo"
          subtitle="Distribuição dos tipos de exames"
          data={formatExamesChartData()}
          type="pie"
          dataKey="value"
          height={300}
          showGrid={false}
        />
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
      </div>

      {/* Tabela de Performance dos Profissionais */}
      {performanceProfissionais.length > 0 && (
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
      )}
    </div>
  );
};

export default RelatoriosPage;