import { Router, Request, Response } from 'express';
import { userService, LoginRequest, CreateUserRequest } from '../services/userService';
import { authenticateToken, requireAdmin, AuthenticatedRequest } from '../middleware/auth';
import { SessionService } from '../services/sessionService';
import { LoginHistoryService } from '../services/loginHistoryService';
import { asyncHandler } from '../middleware/errorHandler';
import { 
  login, 
  register, 
  verifyToken, 
  changePassword, 
  logout, 
  getUsers, 
  deleteUser 
} from '../controllers/auth.controller';

const router = Router();

// Rotas existentes
router.post('/login', login);
router.post('/register', authenticateToken, requireAdmin, register);
router.get('/verify', authenticateToken, verifyToken);
router.post('/change-password', authenticateToken, changePassword);
router.post('/logout', authenticateToken, logout);
router.get('/users', authenticateToken, requireAdmin, getUsers);
router.delete('/users/:id', authenticateToken, requireAdmin, deleteUser);

// Novas rotas para dados reais
// Sessões ativas
router.get('/sessions', authenticateToken, requireAdmin, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  
  const sessions = await SessionService.getActiveSessions(Number(page), Number(limit));
  
  res.json(sessions);
}));

// Terminar sessão específica
router.post('/sessions/:id/terminate', authenticateToken, requireAdmin, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  
  await SessionService.endSessionById(id);
  
  res.json({
    message: 'Sessão terminada com sucesso',
  });
}));

// Histórico de login
router.get('/login-history', authenticateToken, requireAdmin, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 10, usuarioId } = req.query;
  
  const history = await LoginHistoryService.getLoginHistory(
    Number(page), 
    Number(limit), 
    usuarioId ? Number(usuarioId) : undefined
  );
  
  res.json(history);
}));

// Limpeza de sessões expiradas
router.post('/cleanup-sessions', authenticateToken, requireAdmin, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await SessionService.cleanExpiredSessions();
  
  res.json({
    message: 'Sessões expiradas removidas com sucesso',
  });
}));

export default router;
