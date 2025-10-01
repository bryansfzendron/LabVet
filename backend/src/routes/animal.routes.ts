import { Router } from 'express';
import {
  createAnimal,
  getAnimais,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  reactivateAnimal,
  getAnimaisByCliente,
  searchAnimais,
} from '../controllers/animal.controller';
import { authenticateToken, requireVeterinarian } from '../middleware/auth';

const router = Router();

// Todas as rotas de animais requerem autenticação
router.use(authenticateToken);

// ================================
// ROTAS DE ANIMAIS
// ================================

/**
 * @route   GET /api/animais/search
 * @desc    Buscar animais por nome ou microchip (autocomplete)
 * @access  Private
 * @query   q: string (mínimo 2 caracteres), clienteId?: number
 */
router.get('/search', searchAnimais);

/**
 * @route   GET /api/animais/cliente/:clienteId
 * @desc    Buscar animais de um cliente específico
 * @access  Private
 * @params  clienteId: number
 */
router.get('/cliente/:clienteId', getAnimaisByCliente);

/**
 * @route   GET /api/animais
 * @desc    Listar animais com paginação e filtros
 * @access  Private
 * @query   page?, limit?, search?, clienteId?, especieId?, sexo?, ativo?, orderBy?, order?
 */
router.get('/', getAnimais);

/**
 * @route   POST /api/animais
 * @desc    Criar novo animal
 * @access  Private (Veterinário+)
 * @body    { nome, clienteId, especieId, raca?, sexo, dataNascimento?, peso?, cor?, microchip?, observacoes?, ativo? }
 */
router.post('/', requireVeterinarian, createAnimal);

/**
 * @route   GET /api/animais/:id
 * @desc    Buscar animal por ID com detalhes completos
 * @access  Private
 * @params  id: number
 */
router.get('/:id', getAnimalById);

/**
 * @route   PUT /api/animais/:id
 * @desc    Atualizar animal
 * @access  Private (Veterinário+)
 * @params  id: number
 * @body    Campos do animal para atualizar (exceto clienteId)
 */
router.put('/:id', requireVeterinarian, updateAnimal);

/**
 * @route   DELETE /api/animais/:id
 * @desc    Deletar animal (soft delete se tiver pedidos)
 * @access  Private (Veterinário+)
 * @params  id: number
 */
router.delete('/:id', requireVeterinarian, deleteAnimal);

/**
 * @route   PATCH /api/animais/:id/reactivate
 * @desc    Reativar animal desativado
 * @access  Private (Veterinário+)
 * @params  id: number
 */
router.patch('/:id/reactivate', requireVeterinarian, reactivateAnimal);

export default router;