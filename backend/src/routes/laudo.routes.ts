import { Router } from 'express';
import {
  createLaudo,
  getLaudos,
  getLaudoById,
  updateLaudo,
  deleteLaudo,
  generateLaudoPDF,
  getLaudosByPedido,
  signLaudo,
  sendLaudo,
} from '../controllers/laudo.controller';
import { authenticateToken, requireVeterinarian, requireManager } from '../middleware/auth';

const router = Router();

// Aplicar autenticação a todas as rotas
router.use(authenticateToken);

// ================================
// ROTAS DE LAUDOS
// ================================

/**
 * @route   GET /api/laudos
 * @desc    Listar laudos com paginação e filtros
 * @access  Private
 * @query   page?, limit?, search?, assinado?, enviado?, profissionalId?, dataInicio?, dataFim?
 */
router.get('/', getLaudos);

/**
 * @route   GET /api/laudos/pedido/:pedidoId
 * @desc    Buscar laudos por pedido
 * @access  Private
 */
router.get('/pedido/:pedidoId', getLaudosByPedido);

/**
 * @route   GET /api/laudos/:id
 * @desc    Buscar laudo por ID com todos os relacionamentos
 * @access  Private
 */
router.get('/:id', getLaudoById);

/**
 * @route   GET /api/laudos/:id/pdf
 * @desc    Gerar e baixar PDF do laudo
 * @access  Private
 */
router.get('/:id/pdf', generateLaudoPDF);

/**
 * @route   POST /api/laudos
 * @desc    Criar novo laudo
 * @access  Private (Veterinário+)
 * @body    { pedidoId, profissionalId?, usuarioId?, conteudo, observacoes? }
 */
router.post('/', requireVeterinarian, createLaudo);

/**
 * @route   PUT /api/laudos/:id
 * @desc    Atualizar laudo (apenas se não foi assinado e enviado)
 * @access  Private (Veterinário+)
 */
router.put('/:id', requireVeterinarian, updateLaudo);

/**
 * @route   POST /api/laudos/:id/sign
 * @desc    Assinar laudo
 * @access  Private (Veterinário+)
 * @body    { profissionalId }
 */
router.post('/:id/sign', requireVeterinarian, signLaudo);

/**
 * @route   POST /api/laudos/:id/send
 * @desc    Enviar laudo (apenas se já foi assinado)
 * @access  Private (Veterinário+)
 */
router.post('/:id/send', requireVeterinarian, sendLaudo);

/**
 * @route   DELETE /api/laudos/:id
 * @desc    Excluir laudo (apenas se não foi assinado e enviado)
 * @access  Private (Gerente+)
 */
router.delete('/:id', requireManager, deleteLaudo);

export default router;