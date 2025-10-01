import { Router } from 'express';
import {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
  reactivateCliente,
  searchClientes,
} from '../controllers/cliente.controller';
import { authenticateToken, requireVeterinarian } from '../middleware/auth';

const router = Router();

// Todas as rotas de clientes requerem autenticação
router.use(authenticateToken);

// ================================
// ROTAS DE CLIENTES
// ================================

/**
 * @route   GET /api/clientes/search
 * @desc    Buscar clientes por nome (autocomplete)
 * @access  Private
 * @query   q: string (mínimo 2 caracteres)
 */
router.get('/search', searchClientes);

/**
 * @route   GET /api/clientes
 * @desc    Listar clientes com paginação e filtros
 * @access  Private
 * @query   page?, limit?, search?, ativo?, orderBy?, order?
 */
router.get('/', getClientes);

/**
 * @route   POST /api/clientes
 * @desc    Criar novo cliente
 * @access  Private (Veterinário+)
 * @body    { nome, cpfCnpj?, telefone, email?, endereco?, cidade?, estado?, cep?, observacoes?, ativo? }
 */
router.post('/', requireVeterinarian, createCliente);

/**
 * @route   GET /api/clientes/:id
 * @desc    Buscar cliente por ID com detalhes completos
 * @access  Private
 * @params  id: number
 */
router.get('/:id', getClienteById);

/**
 * @route   PUT /api/clientes/:id
 * @desc    Atualizar cliente
 * @access  Private (Veterinário+)
 * @params  id: number
 * @body    Campos do cliente para atualizar
 */
router.put('/:id', requireVeterinarian, updateCliente);

/**
 * @route   DELETE /api/clientes/:id
 * @desc    Deletar cliente (soft delete se tiver pedidos/animais)
 * @access  Private (Veterinário+)
 * @params  id: number
 */
router.delete('/:id', requireVeterinarian, deleteCliente);

/**
 * @route   PATCH /api/clientes/:id/reactivate
 * @desc    Reativar cliente desativado
 * @access  Private (Veterinário+)
 * @params  id: number
 */
router.patch('/:id/reactivate', requireVeterinarian, reactivateCliente);

export default router;