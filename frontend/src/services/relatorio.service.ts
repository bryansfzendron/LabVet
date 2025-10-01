import api from './api';

// ================================
// INTERFACES E TIPOS
// ================================

export interface DashboardMetrics {
  totalPedidos: number;
  pedidosHoje: number;
  totalClientes: number;
  clientesAtivos: number;
  totalExames: number;
  examesLiberados: number;
  receitaTotal: number;
  receitaMes: number;
  pedidosPendentes: number;
  laudosPendentes: number;
  profissionaisAtivos: number;
  animaisCadastrados: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }>;
}

export interface MonthlyData {
  mes: string;
  total: number;
  ano: number;
}

export interface TopClient {
  id: number;
  nome: string;
  totalPedidos: number;
  valorTotal: number;
}

export interface ExamTypeData {
  tipo: string;
  quantidade: number;
  percentual: number;
}

export interface ProfessionalPerformance {
  id: number;
  nome: string;
  conselho: string;
  numeroConselho: string;
  laudosAssinados: number;
  mediaTempoLaudo: number;
}

export interface RelatorioCompleto {
  pedidos: Array<{
    id: number;
    dataColeta: string;
    status: string;
    cliente: {
      nome: string;
      email: string;
    };
    animal: {
      nome: string;
      especie: string;
    };
    exames: Array<{
      nome: string;
      status: string;
    }>;
    valorTotal: number;
    profissional?: {
      nome: string;
    };
  }>;
  resumo: {
    totalPedidos: number;
    valorTotal: number;
    pedidosPorStatus: Record<string, number>;
  };
}

// ================================
// SERVIÇO DE RELATÓRIOS
// ================================

class RelatorioService {
  private baseUrl = '/relatorios';

  // ================================
  // DASHBOARD E MÉTRICAS
  // ================================

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await api.get(`${this.baseUrl}/dashboard`);
    return response.data;
  }

  // ================================
  // GRÁFICOS E ANALYTICS
  // ================================

  async getPedidosPorMes(ano?: number): Promise<MonthlyData[]> {
    const params = ano ? { ano } : {};
    const response = await api.get(`${this.baseUrl}/pedidos-por-mes`, { params });
    return response.data;
  }

  async getReceitaPorMes(ano?: number): Promise<MonthlyData[]> {
    const params = ano ? { ano } : {};
    const response = await api.get(`${this.baseUrl}/receita-por-mes`, { params });
    return response.data;
  }

  async getTopClientes(limit = 10): Promise<TopClient[]> {
    const response = await api.get(`${this.baseUrl}/top-clientes`, {
      params: { limit }
    });
    return response.data;
  }

  async getExamesPorTipo(dataInicio?: string, dataFim?: string): Promise<ExamTypeData[]> {
    const params: any = {};
    if (dataInicio) params.dataInicio = dataInicio;
    if (dataFim) params.dataFim = dataFim;
    
    const response = await api.get(`${this.baseUrl}/exames-por-tipo`, { params });
    return response.data;
  }

  async getPerformanceProfissionais(dataInicio?: string, dataFim?: string): Promise<ProfessionalPerformance[]> {
    const params: any = {};
    if (dataInicio) params.dataInicio = dataInicio;
    if (dataFim) params.dataFim = dataFim;
    
    const response = await api.get(`${this.baseUrl}/performance-profissionais`, { params });
    return response.data;
  }

  // ================================
  // RELATÓRIOS COMPLETOS
  // ================================

  async getRelatorioCompleto(filters?: {
    dataInicio?: string;
    dataFim?: string;
    clienteId?: number;
    profissionalId?: number;
    status?: string;
  }): Promise<RelatorioCompleto> {
    const response = await api.get(`${this.baseUrl}/relatorio-completo`, {
      params: filters
    });
    return response.data;
  }

  async getRelatorioExamesLiberados(filters?: {
    dataInicio?: string;
    dataFim?: string;
  }): Promise<RelatorioCompleto> {
    const response = await api.get(`${this.baseUrl}/exames-liberados`, {
      params: filters
    });
    return response.data;
  }

  async getRelatorioFinanceiro(filters?: {
    dataInicio?: string;
    dataFim?: string;
  }): Promise<any> {
    const response = await api.get(`${this.baseUrl}/financeiro`, {
      params: filters
    });
    return response.data;
  }

  async getRelatorioProdutividade(filters?: {
    dataInicio?: string;
    dataFim?: string;
  }): Promise<ProfessionalPerformance[]> {
    const response = await api.get(`${this.baseUrl}/produtividade`, {
      params: filters
    });
    return response.data;
  }

  // ================================
  // UTILITÁRIOS
  // ================================

  /**
   * Converte dados mensais para formato de gráfico
   */
  formatMonthlyDataForChart(data: MonthlyData[]): ChartData {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const chartData = Array(12).fill(0);
    
    data.forEach(item => {
      const monthIndex = parseInt(item.mes) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        chartData[monthIndex] = item.total;
      }
    });

    return {
      labels: months,
      datasets: [{
        label: 'Total',
        data: chartData,
        backgroundColor: ['rgba(59, 130, 246, 0.5)'],
        borderColor: ['rgba(59, 130, 246, 1)'],
        borderWidth: 2
      }]
    };
  }

  /**
   * Formata dados de exames por tipo para gráfico de pizza
   */
  formatExamTypeDataForChart(data: ExamTypeData[]): ChartData {
    const colors = [
      'rgba(59, 130, 246, 0.8)',   // Azul
      'rgba(16, 185, 129, 0.8)',   // Verde
      'rgba(245, 158, 11, 0.8)',   // Amarelo
      'rgba(239, 68, 68, 0.8)',    // Vermelho
      'rgba(139, 92, 246, 0.8)',   // Roxo
      'rgba(236, 72, 153, 0.8)',   // Rosa
      'rgba(34, 197, 94, 0.8)',    // Verde claro
      'rgba(251, 146, 60, 0.8)',   // Laranja
    ];

    return {
      labels: data.map(item => item.tipo),
      datasets: [{
        label: 'Quantidade',
        data: data.map(item => item.quantidade),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2
      }]
    };
  }

  /**
   * Exporta relatório para PDF
   */
  async exportToPDF(relatorio: RelatorioCompleto, filename = 'relatorio.pdf'): Promise<void> {
    // Implementação futura com jsPDF
    console.log('Exportando para PDF:', filename, relatorio);
  }

  /**
   * Exporta dados para Excel
   */
  async exportToExcel(data: any[], filename = 'relatorio.xlsx'): Promise<void> {
    // Implementação futura com biblioteca de Excel
    console.log('Exportando para Excel:', filename, data);
  }
}

export default new RelatorioService();