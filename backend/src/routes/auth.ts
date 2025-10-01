import { Router, Request, Response } from 'express';
import { userService, LoginRequest, CreateUserRequest } from '../services/userService';
import { authenticateToken, requireAdmin, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// POST /api/auth/login - Login do usuário
router.post('/login', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const loginData: LoginRequest = req.body;
    
    // Validação básica
    if (!loginData.email || !loginData.senha) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios',
        code: 'MISSING_CREDENTIALS'
      });
    }
    
    const result = await userService.login(loginData);
    
    if (!result) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    return res.json({
      message: 'Login realizado com sucesso',
      data: result
    });
    
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/auth/register - Registro de novo usuário (apenas admins)
router.post('/register', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userData: CreateUserRequest = req.body;
    
    // Validação básica
    if (!userData.nome || !userData.email || !userData.senha) {
      return res.status(400).json({
        error: 'Nome, email e senha são obrigatórios',
        code: 'MISSING_FIELDS'
      });
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return res.status(400).json({
        error: 'Email inválido',
        code: 'INVALID_EMAIL'
      });
    }
    
    // Validação de senha
    if (userData.senha.length < 6) {
      return res.status(400).json({
        error: 'Senha deve ter pelo menos 6 caracteres',
        code: 'WEAK_PASSWORD'
      });
    }
    
    const newUser = await userService.createUser(userData);
    
    if (!newUser) {
      return res.status(409).json({
        error: 'Email já está em uso',
        code: 'EMAIL_EXISTS'
      });
    }
    
    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      data: newUser
    });
    
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/auth/me - Obter dados do usuário logado
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'NOT_AUTHENTICATED'
      });
    }
    
    const user = await userService.getUserById(req.user.id.toString());
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND'
      });
    }
    
    return res.json({
      message: 'Dados do usuário obtidos com sucesso',
      data: user
    });
    
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/auth/users - Listar todos os usuários (apenas admins)
router.get('/users', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    
    res.json({
      message: 'Usuários obtidos com sucesso',
      data: users
    });
    
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// PUT /api/auth/users/:id - Atualizar usuário (apenas admins)
router.put('/users/:id', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        error: 'ID do usuário é obrigatório',
        code: 'MISSING_USER_ID'
      });
    }
    
    const updateData: Partial<CreateUserRequest> = req.body;
    
    const updatedUser = await userService.updateUser(id, updateData);
    
    if (!updatedUser) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND'
      });
    }
    
    return res.json({
      message: 'Usuário atualizado com sucesso',
      data: updatedUser
    });
    
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// DELETE /api/auth/users/:id - Deletar usuário (apenas admins)
router.delete('/users/:id', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        error: 'ID do usuário é obrigatório',
        code: 'MISSING_USER_ID'
      });
    }
    
    const deleted = await userService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND'
      });
    }
    
    return res.json({
      message: 'Usuário deletado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

export default router;
