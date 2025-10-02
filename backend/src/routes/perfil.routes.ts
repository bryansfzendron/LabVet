import { Router } from 'express';
import { getPerfis, getAllPerfis, getPerfilById, updatePerfilPermissoes, createPerfil, updatePerfil, deletePerfil } from '../controllers/perfil.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Todas as rotas de perfis requerem autenticação
router.use(authenticateToken);

// ================================
// ROTAS DE PERFIS
// ================================

/**
 * @route   GET /api/perfis/all
 * @desc    Listar todos os perfis (ativos e inativos) para gerenciamento
 * @access  Private (Admin only)
 */
router.get('/all', getAllPerfis);

/**
 * @route   GET /api/perfis
 * @desc    Listar todos os perfis ativos (para página de permissões)
 * @access  Private
 */
router.get('/', getPerfis);

/**
 * @route   GET /api/perfis/:id
 * @desc    Buscar perfil por ID
 * @access  Private
 * @params  id: number
 */
router.get('/:id', getPerfilById);

/**
 * @route   POST /api/perfis
 * @desc    Criar novo perfil
 * @access  Private (Admin only)
 */
router.post('/', createPerfil);

/**
 * @route   PUT /api/perfis/:id
 * @desc    Atualizar perfil
 * @access  Private (Admin only)
 * @params  id: number
 */
router.put('/:id', updatePerfil);

/**
 * @route   PUT /api/perfis/:id/permissoes
 * @desc    Atualizar permissões de um perfil
 * @access  Private (Admin only)
 * @params  id: number
 */
router.put('/:id/permissoes', updatePerfilPermissoes);

/**
 * @route   DELETE /api/perfis/:id
 * @desc    Deletar perfil (soft delete)
 * @access  Private (Admin only)
 * @params  id: number
 */
router.delete('/:id', deletePerfil);

export default router;