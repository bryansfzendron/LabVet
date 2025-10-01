import { Router } from 'express';
import {
  createExame,
  getExames,
  getExameById,
  updateExame,
  deleteExame,
  reactivateExame,
  searchExames,
  getEspecies,
} from '../controllers/exame.controller';
import { authenticateToken, requireVeterinarian, requireManager } from '../middleware/auth';

const router = Router();

// Aplicar autenticação a todas as rotas
router.use(authenticateToken);

// Rotas públicas (para usuários autenticados)
router.get('/search', searchExames); // Busca para autocomplete
router.get('/especies', getEspecies); // Listar espécies
router.get('/', getExames); // Listar exames
router.get('/:id', getExameById); // Buscar exame por ID

// Rotas que requerem permissão de veterinário ou superior
router.post('/', requireVeterinarian, createExame); // Criar exame
router.put('/:id', requireVeterinarian, updateExame); // Atualizar exame
router.delete('/:id', requireManager, deleteExame); // Deletar exame (apenas gerente/admin)
router.patch('/:id/reactivate', requireManager, reactivateExame); // Reativar exame (apenas gerente/admin)

export default router;