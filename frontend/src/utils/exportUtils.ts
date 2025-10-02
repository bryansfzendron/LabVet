import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { DashboardMetrics, MonthlyData, TopClient, ExamTypeData, ProfessionalPerformance } from '../services/relatorio.service';

export interface ExportData {
  metrics: DashboardMetrics | null;
  pedidosPorMes: MonthlyData[];
  receitaPorMes: MonthlyData[];
  topClientes: TopClient[];
  examesPorTipo: ExamTypeData[];
  performanceProfissionais: ProfessionalPerformance[];
  selectedYear: number;
}

// Função para exportar relatório como PDF
export const exportToPDF = async (elementId: string, filename: string = 'relatorio-dashboard') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado para exportação');
    }

    // Configurações para melhor qualidade
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      height: element.scrollHeight,
      width: element.scrollWidth
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;

    // Adicionar cabeçalho
    pdf.setFontSize(16);
    pdf.text('Dashboard de Relatórios - LabVet', pdfWidth / 2, 8, { align: 'center' });
    
    // Adicionar data de geração
    pdf.setFontSize(10);
    pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, pdfWidth - 10, 8, { align: 'right' });

    // Adicionar imagem
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    // Salvar arquivo
    pdf.save(`${filename}-${new Date().toISOString().split('T')[0]}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    throw new Error('Falha ao gerar PDF. Tente novamente.');
  }
};

// Função para exportar dados como Excel
export const exportToExcel = (data: ExportData, filename: string = 'relatorio-dashboard') => {
  try {
    const workbook = XLSX.utils.book_new();

    // Aba 1: Métricas Gerais
    if (data.metrics) {
      const metricsData = [
        ['Métrica', 'Valor'],
        ['Total de Pedidos', data.metrics.totalPedidos],
        ['Pedidos Hoje', data.metrics.pedidosHoje],
        ['Receita Total', `R$ ${data.metrics.receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Receita do Mês', `R$ ${data.metrics.receitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Clientes Ativos', data.metrics.clientesAtivos],
        ['Total de Clientes', data.metrics.totalClientes],
        ['Exames Liberados', data.metrics.examesLiberados],
        ['Total de Exames', data.metrics.totalExames],
        ['Pedidos Pendentes', data.metrics.pedidosPendentes],
        ['Laudos Pendentes', data.metrics.laudosPendentes]
      ];
      const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData);
      XLSX.utils.book_append_sheet(workbook, metricsSheet, 'Métricas Gerais');
    }

    // Aba 2: Pedidos por Mês
    if (data.pedidosPorMes.length > 0) {
      const pedidosData = [
        ['Mês', 'Quantidade de Pedidos'],
        ...data.pedidosPorMes.map(item => [item.mes, item.total])
      ];
      const pedidosSheet = XLSX.utils.aoa_to_sheet(pedidosData);
      XLSX.utils.book_append_sheet(workbook, pedidosSheet, 'Pedidos por Mês');
    }

    // Aba 3: Receita por Mês
    if (data.receitaPorMes.length > 0) {
      const receitaData = [
        ['Mês', 'Receita (R$)'],
        ...data.receitaPorMes.map(item => [item.mes, item.total])
      ];
      const receitaSheet = XLSX.utils.aoa_to_sheet(receitaData);
      XLSX.utils.book_append_sheet(workbook, receitaSheet, 'Receita por Mês');
    }

    // Aba 4: Top Clientes
    if (data.topClientes.length > 0) {
      const clientesData = [
        ['Cliente', 'Quantidade de Pedidos', 'Receita Total (R$)'],
        ...data.topClientes.map(cliente => [
          cliente.nome,
          cliente.totalPedidos,
          cliente.valorTotal
        ])
      ];
      const clientesSheet = XLSX.utils.aoa_to_sheet(clientesData);
      XLSX.utils.book_append_sheet(workbook, clientesSheet, 'Top Clientes');
    }

    // Aba 5: Exames por Tipo
    if (data.examesPorTipo.length > 0) {
      const examesData = [
        ['Tipo de Exame', 'Quantidade'],
        ...data.examesPorTipo.map(exame => [exame.tipo, exame.quantidade])
      ];
      const examesSheet = XLSX.utils.aoa_to_sheet(examesData);
      XLSX.utils.book_append_sheet(workbook, examesSheet, 'Exames por Tipo');
    }

    // Aba 6: Performance dos Profissionais
    if (data.performanceProfissionais.length > 0) {
      const profissionaisData = [
        ['Profissional', 'Conselho', 'Número do Conselho', 'Laudos Assinados', 'Tempo Médio (horas)'],
        ...data.performanceProfissionais.map(prof => [
          prof.nome,
          prof.conselho,
          prof.numeroConselho,
          prof.laudosAssinados,
          prof.mediaTempoLaudo.toFixed(2)
        ])
      ];
      const profissionaisSheet = XLSX.utils.aoa_to_sheet(profissionaisData);
      XLSX.utils.book_append_sheet(workbook, profissionaisSheet, 'Performance Profissionais');
    }

    // Aba 7: Informações do Relatório
    const infoData = [
      ['Informações do Relatório', ''],
      ['Data de Geração', new Date().toLocaleDateString('pt-BR')],
      ['Hora de Geração', new Date().toLocaleTimeString('pt-BR')],
      ['Ano Selecionado', data.selectedYear],
      ['Sistema', 'LabVet - Laboratório Veterinário'],
      ['', ''],
      ['Observações:', ''],
      ['- Este relatório foi gerado automaticamente', ''],
      ['- Os dados refletem o estado atual do sistema', ''],
      ['- Para dúvidas, entre em contato com o suporte', '']
    ];
    const infoSheet = XLSX.utils.aoa_to_sheet(infoData);
    XLSX.utils.book_append_sheet(workbook, infoSheet, 'Informações');

    // Salvar arquivo
    XLSX.writeFile(workbook, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    return true;
  } catch (error) {
    console.error('Erro ao exportar Excel:', error);
    throw new Error('Falha ao gerar arquivo Excel. Tente novamente.');
  }
};

// Função para preparar dados para exportação
export const prepareExportData = (
  metrics: DashboardMetrics | null,
  pedidosPorMes: MonthlyData[],
  receitaPorMes: MonthlyData[],
  topClientes: TopClient[],
  examesPorTipo: ExamTypeData[],
  performanceProfissionais: ProfessionalPerformance[],
  selectedYear: number
): ExportData => {
  return {
    metrics,
    pedidosPorMes,
    receitaPorMes,
    topClientes,
    examesPorTipo,
    performanceProfissionais,
    selectedYear
  };
};

// Função para validar se há dados suficientes para exportação
export const validateExportData = (data: ExportData): { isValid: boolean; message?: string } => {
  if (!data.metrics) {
    return { isValid: false, message: 'Não há métricas disponíveis para exportação' };
  }

  const hasAnyData = data.pedidosPorMes.length > 0 || 
                     data.receitaPorMes.length > 0 || 
                     data.topClientes.length > 0 || 
                     data.examesPorTipo.length > 0 || 
                     data.performanceProfissionais.length > 0;

  if (!hasAnyData) {
    return { isValid: false, message: 'Não há dados suficientes para gerar o relatório' };
  }

  return { isValid: true };
};