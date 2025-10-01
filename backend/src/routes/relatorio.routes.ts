import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  // Dashboard e métricas
  getDashboardMetrics,
  getDashboardStats,
  
  // Gráficos e analytics
  getPedidosPorMes,
  getExamesPorMes,
  getReceitaPorMes,
  getTopClientes,
  getExamesPorTipo,
  getPerformanceProfissionais,
  
  // Relatórios completos
  getRelatorioCompleto,
  getRelatorioExamesLiberados,
  getRelatorioFinanceiro,
  getRelatorioProdutividade,
  
  // CRUD básico para compatibilidade
  getRelatorio,
  getRelatorioById,
  createRelatorio,
  updateRelatorio,
  deleteRelatorio
} from '../controllers/relatorio.controller';

const router = Router();

// ================================
// DASHBOARD E MÉTRICAS
// ================================

/**
 * @route   GET /api/relatorios/dashboard
 * @desc    Obter métricas principais do dashboard
 * @access  Private
 */
router.get('/dashboard', authenticateToken, getDashboardMetrics);

/**
 * @route   GET /api/relatorios/dashboard-stats
 * @desc    Alias para métricas do dashboard (compatibilidade)
 * @access  Private
 */
router.get('/dashboard-stats', authenticateToken, getDashboardStats);

// ================================
// GRÁFICOS E ANALYTICS
// ================================

/**
 * @route   GET /api/relatorios/pedidos-por-mes
 * @desc    Dados de pedidos por mês para gráfico
 * @access  Private
 * @query   ano - Ano para filtrar (opcional, padrão: ano atual)
 */
router.get('/pedidos-por-mes', authenticateToken, getPedidosPorMes);

/**
 * @route   GET /api/relatorios/exames-por-mes
 * @desc    Alias para pedidos por mês (compatibilidade)
 * @access  Private
 */
router.get('/exames-por-mes', authenticateToken, getExamesPorMes);

/**
 * @route   GET /api/relatorios/receita-por-mes
 * @desc    Dados de receita por mês para gráfico
 * @access  Private
 * @query   ano - Ano para filtrar (opcional, padrão: ano atual)
 */
router.get('/receita-por-mes', authenticateToken, getReceitaPorMes);

/**
 * @route   GET /api/relatorios/top-clientes
 * @desc    Top clientes por número de pedidos
 * @access  Private
 * @query   limit - Número máximo de clientes (opcional, padrão: 10)
 */
router.get('/top-clientes', authenticateToken, getTopClientes);

/**
 * @route   GET /api/relatorios/exames-por-tipo
 * @desc    Distribuição de exames por tipo
 * @access  Private
 * @query   dataInicio - Data inicial (opcional)
 * @query   dataFim - Data final (opcional)
 */
router.get('/exames-por-tipo', authenticateToken, getExamesPorTipo);

/**
 * @route   GET /api/relatorios/performance-profissionais
 * @desc    Performance dos profissionais (laudos assinados)
 * @access  Private
 * @query   dataInicio - Data inicial (opcional)
 * @query   dataFim - Data final (opcional)
 */
router.get('/performance-profissionais', authenticateToken, getPerformanceProfissionais);

// ================================
// RELATÓRIOS COMPLETOS
// ================================

/**
 * @route   GET /api/relatorios/relatorio-completo
 * @desc    Relatório completo com filtros avançados
 * @access  Private
 * @query   dataInicio - Data inicial (opcional)
 * @query   dataFim - Data final (opcional)
 * @query   clienteId - ID do cliente (opcional)
 * @query   profissionalId - ID do profissional (opcional)
 * @query   status - Status dos pedidos (opcional)
 */
router.get('/relatorio-completo', authenticateToken, getRelatorioCompleto);

/**
 * @route   GET /api/relatorios/exames-liberados
 * @desc    Relatório de exames liberados (alias para relatório completo)
 * @access  Private
 */
router.get('/exames-liberados', authenticateToken, getRelatorioExamesLiberados);

/**
 * @route   GET /api/relatorios/financeiro
 * @desc    Relatório financeiro (redireciona para rotas específicas)
 * @access  Private
 */
router.get('/financeiro', authenticateToken, getRelatorioFinanceiro);

/**
 * @route   GET /api/relatorios/produtividade
 * @desc    Relatório de produtividade (alias para performance profissionais)
 * @access  Private
 */
router.get('/produtividade', authenticateToken, getRelatorioProdutividade);

// ================================
// CRUD BÁSICO (COMPATIBILIDADE)
// ================================

/**
 * @route   GET /api/relatorios
 * @desc    Listar relatórios (alias para relatório completo)
 * @access  Private
 */
router.get('/', authenticateToken, getRelatorio);

/**
 * @route   GET /api/relatorios/:id
 * @desc    Obter relatório por ID
 * @access  Private
 */
router.get('/:id', authenticateToken, getRelatorioById);

/**
 * @route   POST /api/relatorios
 * @desc    Criar novo relatório (não implementado)
 * @access  Private
 */
router.post('/', authenticateToken, createRelatorio);

/**
 * @route   PUT /api/relatorios/:id
 * @desc    Atualizar relatório (não implementado)
 * @access  Private
 */
router.put('/:id', authenticateToken, updateRelatorio);

/**
 * @route   DELETE /api/relatorios/:id
 * @desc    Deletar relatório (não implementado)
 * @access  Private
 */
router.delete('/:id', authenticateToken, deleteRelatorio);

export default router;