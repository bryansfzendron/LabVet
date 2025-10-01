import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../config/database';
import { asyncHandler, AppError, createValidationError, createUnauthorizedError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';

// Schemas de validação
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

const registerSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  perfil: z.enum(['ADMIN', 'GERENTE', 'VETERINARIO', 'TECNICO', 'OPERADOR']),
});

const changePasswordSchema = z.object({
  senhaAtual: z.string().min(1, 'Senha atual é obrigatória'),
  novaSenha: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
});

// Função para gerar JWT
const generateToken = (userId: number, email: string, perfil: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET não configurado');
  }

  return jwt.sign(
    { userId, email, perfil },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } as jwt.SignOptions
  );
};

// Função para hash da senha
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

// Login
export const login = asyncHandler(async (req: Request, res: Response) => {
  // Validar dados de entrada
  const validatedData = loginSchema.parse(req.body);
  const { email, senha } = validatedData;

  // Buscar usuário
  const user = await prisma.usuario.findUnique({
    where: { email },
    select: {
      id: true,
      nome: true,
      email: true,
      senha: true,
      perfil: true,
      ativo: true,
      ultimoLogin: true,
    },
  });

  if (!user) {
    throw createUnauthorizedError('Credenciais inválidas');
  }

  if (!user.ativo) {
    throw createUnauthorizedError('Usuário inativo');
  }

  // Verificar senha
  const isPasswordValid = await bcrypt.compare(senha, user.senha);
  if (!isPasswordValid) {
    throw createUnauthorizedError('Credenciais inválidas');
  }

  // Atualizar último login
  await prisma.usuario.update({
    where: { id: user.id },
    data: { ultimoLogin: new Date() },
  });

  // Gerar token
  const token = generateToken(user.id, user.email, user.perfil);

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

  res.json({
    message: 'Login realizado com sucesso',
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
      ultimoLogin: user.ultimoLogin,
    },
  });
});

// Registro de usuário
export const register = asyncHandler(async (req: Request, res: Response) => {
  // Validar dados de entrada
  const validatedData = registerSchema.parse(req.body);
  const { nome, email, senha, perfil } = validatedData;

  // Verificar se email já existe
  const existingUser = await prisma.usuario.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createValidationError('Email já está em uso');
  }

  // Hash da senha
  const hashedPassword = await hashPassword(senha);

  // Criar usuário
  const user = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: hashedPassword,
      perfil,
      ativo: true,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      perfil: true,
      createdAt: true,
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
    where: { id: req.user.id },
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

// Logout (opcional - para invalidar token no frontend)
export const logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    // Log de logout
    const logData: any = {
      usuarioId: req.user.id,
      acao: 'LOGOUT',
      tabela: 'usuarios',
      registroId: req.user.id,
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