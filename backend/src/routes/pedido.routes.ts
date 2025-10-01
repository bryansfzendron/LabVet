import { Router } from 'express';
import {
  createPedido,
  getPedidos,
  getPedidoById,
  updatePedido,
  cancelPedido,
  addResultados,
  getPedidosByAnimal,
} from '../controllers/pedido.controller';
import { authenticateToken, requireVeterinarian, requireManager } from '../middleware/auth';

const router = Router();

// Aplicar autenticação a todas as rotas
router.use(authenticateToken);

// Rotas públicas (para usuários autenticados)
router.get('/', getPedidos); // Listar pedidos
router.get('/:id', getPedidoById); // Buscar pedido por ID
router.get('/animal/:animalId', getPedidosByAnimal); // Buscar pedidos por animal

// Rotas que requerem permissão de veterinário ou superior
router.post('/', requireVeterinarian, createPedido); // Criar pedido
router.put('/:id', requireVeterinarian, updatePedido); // Atualizar pedido
router.post('/resultados', requireVeterinarian, addResultados); // Adicionar resultados
router.patch('/:id/cancel', requireManager, cancelPedido); // Cancelar pedido (apenas gerente/admin)

export default router;