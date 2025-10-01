import { Router } from 'express';
import {
  createProfissional,
  getProfissionais,
  getProfissionalById,
  updateProfissional,
  deleteProfissional,
  reactivateProfissional,
  searchProfissionais,
  getConselhos,
} from '../controllers/profissional.controller';
import { authenticateToken, requireManager } from '../middleware/auth';

const router = Router();

// Todas as rotas de profissionais requerem autenticação
router.use(authenticateToken);

// ================================
// ROTAS DE PROFISSIONAIS
// ================================

/**
 * @route   GET /api/profissionais/search
 * @desc    Buscar profissionais por nome, CRV ou especialidade (autocomplete)
 * @access  Private
 * @query   q: string (mínimo 2 caracteres)
 */
router.get('/search', searchProfissionais);

/**
 * @route   GET /api/profissionais/conselhos
 * @desc    Listar conselhos disponíveis
 * @access  Private
 */
router.get('/conselhos', getConselhos);

/**
 * @route   GET /api/profissionais
 * @desc    Listar profissionais com paginação e filtros
 * @access  Private
 * @query   page?, limit?, search?, conselhoId?, especialidade?, ativo?, orderBy?, order?
 */
router.get('/', getProfissionais);

/**
 * @route   POST /api/profissionais
 * @desc    Criar novo profissional
 * @access  Private (Gerente+)
 * @body    { nome, crv, conselhoId, cpf?, telefone?, email?, endereco?, cidade?, estado?, cep?, especialidade?, observacoes?, ativo? }
 */
router.post('/', requireManager, createProfissional);

/**
 * @route   GET /api/profissionais/:id
 * @desc    Buscar profissional por ID com detalhes completos
 * @access  Private
 * @params  id: number
 */
router.get('/:id', getProfissionalById);

/**
 * @route   PUT /api/profissionais/:id
 * @desc    Atualizar profissional
 * @access  Private (Gerente+)
 * @params  id: number
 * @body    Campos do profissional para atualizar
 */
router.put('/:id', requireManager, updateProfissional);

/**
 * @route   DELETE /api/profissionais/:id
 * @desc    Deletar profissional (soft delete se tiver laudos)
 * @access  Private (Gerente+)
 * @params  id: number
 */
router.delete('/:id', requireManager, deleteProfissional);

/**
 * @route   PATCH /api/profissionais/:id/reactivate
 * @desc    Reativar profissional desativado
 * @access  Private (Gerente+)
 * @params  id: number
 */
router.patch('/:id/reactivate', requireManager, reactivateProfissional);

export default router;