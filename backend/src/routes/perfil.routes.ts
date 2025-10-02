import { Router } from 'express';
import { getPerfis, getPerfilById } from '../controllers/perfil.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Todas as rotas de perfis requerem autenticação
router.use(authenticateToken);

// ================================
// ROTAS DE PERFIS
// ================================

/**
 * @route   GET /api/perfis
 * @desc    Listar todos os perfis ativos
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

export default router;