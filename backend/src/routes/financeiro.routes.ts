import { Router } from 'express';
import {     
  // Bancos
  getBancos,
  getBancoById,
  createBanco,
  updateBanco,
  deactivateBanco,
  reactivateBanco,
  
  // Contas  
  createConta,
  getContas,
  getContaById,
  updateConta,
  pagarConta,
  cancelarConta,
  deleteConta,

  // Relatórios Financeiros
  getContasReceber,
  getContasPagar,
  getFluxoCaixa,

  // Compatibilidade (funções legadas)
  createMovimentacao,
  getMovimentacoes,
  pagarMovimentacao
} from '../controllers/financeiro.controller';
import { authenticateToken } from '../middleware/auth';
import { requireManager } from '../middleware/permissions';

const router = Router();

// Aplicar autenticação a todas as rotas
router.use(authenticateToken);

// ================================
// ROTAS DE BANCOS
// ================================

/**
 * @route   GET /api/financeiro/bancos
 * @desc    Listar bancos ativos
 * @access  Private
 * @query   ativo?: boolean
 */
router.get('/bancos', getBancos);

/**
 * @route   GET /api/financeiro/bancos/:id
 * @desc    Obter banco por ID
 * @access  Private
 * @params  id: number
 */
router.get('/bancos/:id', getBancoById);

/**
 * @route   POST /api/financeiro/bancos
 * @desc    Criar novo banco
 * @access  Private (Gerente+)
 * @body    { codigo?, nome, agencia?, nomeAgencia?, conta? }
 */
router.post('/bancos', requireManager, createBanco);

/**
 * @route   PUT /api/financeiro/bancos/:id
 * @desc    Atualizar banco
 * @access  Private (Gerente+)
 * @params  id: number
 * @body    { codigo?, nome?, agencia?, nomeAgencia?, conta? }
 */
router.put('/bancos/:id', requireManager, updateBanco);

/**
 * @route   DELETE /api/financeiro/bancos/:id
 * @desc    Desativar banco
 * @access  Private (Gerente+)
 * @params  id: number
 */
router.delete('/bancos/:id', requireManager, deactivateBanco);

/**
 * @route   PATCH /api/financeiro/bancos/:id/reactivate
 * @desc    Reativar banco
 * @access  Private (Gerente+)
 * @params  id: number
 */
router.patch('/bancos/:id/reactivate', requireManager, reactivateBanco);

// ================================
// ROTAS DE CONTAS
// ================================

/**
 * @route   GET /api/financeiro/contas
 * @desc    Listar contas com filtros e paginação
 * @access  Private
 * @query   page?, limit?, tipo?, status?, bancoId?, dataInicio?, dataFim?, search?
 */
router.get('/contas', getContas);

/**
 * @route   GET /api/financeiro/contas/:id
 * @desc    Obter conta por ID
 * @access  Private
 * @params  id: number
 */
router.get('/contas/:id', getContaById);

/**
 * @route   POST /api/financeiro/contas
 * @desc    Criar nova conta
 * @access  Private (Gerente+)
 * @body    { pedidoId?, bancoId?, tipo, descricao, valor, dataVencimento, observacoes? }
 */
router.post('/contas', requireManager, createConta);

/**
 * @route   PUT /api/financeiro/contas/:id
 * @desc    Atualizar conta
 * @access  Private (Gerente+)
 * @params  id: number
 * @body    { bancoId?, tipo?, descricao?, valor?, dataVencimento?, observacoes? }
 */
router.put('/contas/:id', requireManager, updateConta);

/**
 * @route   PATCH /api/financeiro/contas/:id/pagar
 * @desc    Marcar conta como paga
 * @access  Private (Gerente+)
 * @params  id: number
 * @body    { dataPagamento, bancoId? }
 */
router.patch('/contas/:id/pagar', requireManager, pagarConta);

/**
 * @route   PATCH /api/financeiro/contas/:id/cancelar
 * @desc    Cancelar conta
 * @access  Private (Gerente+)
 * @params  id: number
 */
router.patch('/contas/:id/cancelar', requireManager, cancelarConta);

/**
 * @route   DELETE /api/financeiro/contas/:id
 * @desc    Deletar conta
 * @access  Private (Gerente+)
 * @params  id: number
 */
router.delete('/contas/:id', requireManager, deleteConta);

// ================================
// ROTAS DE RELATÓRIOS FINANCEIROS
// ================================

/**
 * @route   GET /api/financeiro/relatorios/contas-receber
 * @desc    Relatório de contas a receber
 * @access  Private (Gerente+)
 * @query   dataInicio?, dataFim?, status?, bancoId?
 */
router.get('/relatorios/contas-receber', requireManager, getContasReceber);

/**
 * @route   GET /api/financeiro/relatorios/contas-pagar
 * @desc    Relatório de contas a pagar
 * @access  Private (Gerente+)
 * @query   dataInicio?, dataFim?, status?, bancoId?
 */
router.get('/relatorios/contas-pagar', requireManager, getContasPagar);

/**
 * @route   GET /api/financeiro/relatorios/fluxo-caixa
 * @desc    Relatório de fluxo de caixa
 * @access  Private (Gerente+)
 * @query   dataInicio?, dataFim?
 */
router.get('/relatorios/fluxo-caixa', requireManager, getFluxoCaixa);

// ================================
// ROTAS DE COMPATIBILIDADE (LEGADO)
// ================================

/**
 * @route   GET /api/financeiro/movimentacoes
 * @desc    Listar movimentações (compatibilidade)
 * @access  Private
 */
router.get('/movimentacoes', getMovimentacoes);

/**
 * @route   POST /api/financeiro/movimentacoes
 * @desc    Criar nova movimentação (compatibilidade)
 * @access  Private (Gerente+)
 */
router.post('/movimentacoes', requireManager, createMovimentacao);

/**
 * @route   PATCH /api/financeiro/movimentacoes/:id/pagar
 * @desc    Marcar movimentação como paga (compatibilidade)
 * @access  Private (Gerente+)
 */
router.patch('/movimentacoes/:id/pagar', requireManager, pagarMovimentacao);

export default router;
