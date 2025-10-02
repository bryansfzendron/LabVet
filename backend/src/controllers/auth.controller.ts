import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../config/database';
import { asyncHandler, AppError, createValidationError, createUnauthorizedError } from '../middleware/errorHandler';
import { AuthenticatedRequest, generateToken } from '../middleware/auth';
import { SessionService } from '../services/sessionService';
import { LoginHistoryService } from '../services/loginHistoryService';

// Schemas de validação
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

const registerSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  perfilId: z.number().int().positive('ID do perfil deve ser um número positivo'),
});

const changePasswordSchema = z.object({
  senhaAtual: z.string().min(1, 'Senha atual é obrigatória'),
  novaSenha: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
});

// Função para gerar token JWT


// Função para hash da senha
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, senha } = loginSchema.parse(req.body);

  try {
    // Buscar usuário com perfil
    const user = await prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        perfilId: true,
        ativo: true,
        ultimoLogin: true,
        createdAt: true,
        updatedAt: true,
        perfil: {
          select: {
            id: true,
            nome: true,
            codigo: true,
            descricao: true,
            permissoes: true,
          },
        },
      },
    });

    if (!user) {
      // Registrar tentativa de login falhada
      await LoginHistoryService.recordLogin({
        usuarioId: 0, // ID 0 para usuário não encontrado
        ip: req.ip || undefined,
        userAgent: req.get('User-Agent') || undefined,
        sucesso: false,
        motivo: 'Usuário não encontrado',
      });
      
      throw createUnauthorizedError('Credenciais inválidas');
    }

    if (!user.ativo) {
      // Registrar tentativa de login falhada
      await LoginHistoryService.recordLogin({
        usuarioId: user.id,
        ip: req.ip || undefined,
        userAgent: req.get('User-Agent') || undefined,
        sucesso: false,
        motivo: 'Usuário inativo',
      });
      
      throw createUnauthorizedError('Usuário inativo');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      // Registrar tentativa de login falhada
      await LoginHistoryService.recordLogin({
        usuarioId: user.id,
        ip: req.ip || undefined,
        userAgent: req.get('User-Agent') || undefined,
        sucesso: false,
        motivo: 'Senha incorreta',
      });
      
      throw createUnauthorizedError('Credenciais inválidas');
    }

    // Gerar token
    const token = generateToken(user.id, user.email, user.perfil.codigo);

    // Criar sessão ativa
    await SessionService.createSession({
      usuarioId: user.id,
      token,
      ip: req.ip || undefined,
      userAgent: req.get('User-Agent') || undefined,
    });

    // Registrar login bem-sucedido
    await LoginHistoryService.recordLogin({
      usuarioId: user.id,
      ip: req.ip || undefined,
      userAgent: req.get('User-Agent') || undefined,
      sucesso: true,
    });

    // Atualizar último login
    await prisma.usuario.update({
      where: { id: user.id },
      data: { ultimoLogin: new Date() },
    });

    // Log de login
    const logData: any = {
      usuarioId: user.id,
      acao: 'LOGIN',
      tabela: 'usuarios',
      registroId: user.id,
    };
    
    if (req.ip) logData.ip = req.ip;
    if (req.get('User-Agent')) logData.userAgent = req.get('User-Agent');
    
    await prisma.logSistema.create({
      data: logData,
    });

    // Retornar dados do usuário (sem senha)
    const { senha: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login realizado com sucesso',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    // Se não foi um erro conhecido, registrar como erro interno
    if (!(error instanceof AppError)) {
      await LoginHistoryService.recordLogin({
        usuarioId: 0,
        ip: req.ip || undefined,
        userAgent: req.get('User-Agent') || undefined,
        sucesso: false,
        motivo: 'Erro interno do servidor',
      });
    }
    throw error;
  }
});

// Logout
export const logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      // Encerrar sessão ativa
      await SessionService.endSession(token);
      
      // Registrar logout no histórico (usar data atual como aproximação)
      await LoginHistoryService.recordLogout(req.user.userId, new Date());
    }

    // Log de logout
    const logData: any = {
      usuarioId: req.user.userId,
      acao: 'LOGOUT',
      tabela: 'usuarios',
      registroId: req.user.userId,
    };
    
    if (req.ip) logData.ip = req.ip;
    if (req.get('User-Agent')) logData.userAgent = req.get('User-Agent');
    
    await prisma.logSistema.create({
      data: logData,
    });
  }

  res.json({
    message: 'Logout realizado com sucesso',
  });
});

// Registro de usuário
export const register = asyncHandler(async (req: Request, res: Response) => {
  // Validar dados de entrada
  const validatedData = registerSchema.parse(req.body);
  const { nome, email, senha, perfilId } = validatedData;

  // Verificar se email já existe
  const existingUser = await prisma.usuario.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createValidationError('Email já está em uso');
  }

  // Verificar se o perfil existe
  const perfil = await prisma.perfil.findUnique({
    where: { id: perfilId },
  });

  if (!perfil) {
    throw createValidationError('Perfil inválido');
  }

  // Hash da senha
  const hashedPassword = await hashPassword(senha);

  // Criar usuário
  const user = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: hashedPassword,
      perfilId,
      ativo: true,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      perfilId: true,
      createdAt: true,
      perfil: {
        select: {
          id: true,
          nome: true,
          codigo: true,
          descricao: true,
        },
      },
    },
  });

  // Log de registro
  const logData: any = {
    usuarioId: user.id,
    acao: 'REGISTRO',
    tabela: 'usuarios',
    registroId: user.id,
  };
  
  if (req.ip) logData.ip = req.ip;
  if (req.get('User-Agent')) logData.userAgent = req.get('User-Agent');
  
  await prisma.logSistema.create({
    data: logData,
  });

  res.status(201).json({
    message: 'Usuário registrado com sucesso',
    user,
  });
});

// Verificar token
export const verifyToken = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    throw createUnauthorizedError('Token inválido');
  }

  // Buscar dados atualizados do usuário
  const user = await prisma.usuario.findUnique({
    where: { id: req.user.userId },
    select: {
      id: true,
      nome: true,
      email: true,
      perfil: true,
      ativo: true,
      ultimoLogin: true,
    },
  });

  if (!user || !user.ativo) {
    throw createUnauthorizedError('Usuário não encontrado ou inativo');
  }

  res.json({
    message: 'Token válido',
    user,
  });
});

// Alterar senha
export const changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    throw createUnauthorizedError('Usuário não autenticado');
  }

  // Validar dados de entrada
  const validatedData = changePasswordSchema.parse(req.body);
  const { senhaAtual, novaSenha } = validatedData;

  // Buscar usuário com senha
  const user = await prisma.usuario.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      senha: true,
    },
  });

  if (!user) {
    throw createUnauthorizedError('Usuário não encontrado');
  }

  // Verificar senha atual
  const isCurrentPasswordValid = await bcrypt.compare(senhaAtual, user.senha);
  if (!isCurrentPasswordValid) {
    throw createUnauthorizedError('Senha atual incorreta');
  }

  // Hash da nova senha
  const hashedNewPassword = await hashPassword(novaSenha);

  // Atualizar senha
  await prisma.usuario.update({
    where: { id: user.id },
    data: { senha: hashedNewPassword },
  });

  // Log de alteração de senha
  const logData: any = {
    usuarioId: user.id,
    acao: 'ALTERACAO_SENHA',
    tabela: 'usuarios',
    registroId: user.id,
  };
  
  if (req.ip) logData.ip = req.ip;
  if (req.get('User-Agent')) logData.userAgent = req.get('User-Agent');
  
  await prisma.logSistema.create({
    data: logData,
  });

  res.json({
    message: 'Senha alterada com sucesso',
  });
});

// Listar usuários (apenas para admins)
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search, perfil, ativo } = req.query;

  const where: any = {};

  if (search) {
    where.OR = [
      { nome: { contains: search as string, mode: 'insensitive' } },
      { email: { contains: search as string, mode: 'insensitive' } },
    ];
  }

  if (perfil) {
    where.perfil = perfil;
  }

  if (ativo !== undefined) {
    where.ativo = ativo === 'true';
  }

  const [users, total] = await Promise.all([
    prisma.usuario.findMany({
      where,
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        ativo: true,
        ultimoLogin: true,
        createdAt: true,
      },
      orderBy: { nome: 'asc' },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    }),
    prisma.usuario.count({ where }),
  ]);

  res.json({
    users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

export const deleteUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    throw createValidationError('ID de usuário inválido');
  }

  // Verificar se o usuário existe
  const user = await prisma.usuario.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError('Usuário não encontrado', 404);
  }

  // Não permitir que o usuário delete a si mesmo
  if (req.user?.userId === userId) {
    throw new AppError('Não é possível deletar seu próprio usuário', 400);
  }

  // Soft delete - marcar como inativo
  await prisma.usuario.update({
    where: { id: userId },
    data: { 
      ativo: false,
      updatedAt: new Date()
    },
  });

  // Log da ação
  const logData: any = {
    usuarioId: req.user?.userId,
    acao: 'DELETE_USER',
    tabela: 'usuarios',
    registroId: userId,
    dadosAntigos: JSON.stringify({ ativo: true }),
    dadosNovos: JSON.stringify({ ativo: false }),
  };
  
  if (req.ip) logData.ip = req.ip;
  if (req.get('User-Agent')) logData.userAgent = req.get('User-Agent');
  
  await prisma.logSistema.create({
    data: logData,
  });

  res.json({
    message: 'Usuário removido com sucesso',
  });
});