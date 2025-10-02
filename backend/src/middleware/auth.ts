import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import prisma from '../config/database';

const JWT_SECRET = process.env.JWT_SECRET || 'labvet-secret-key-2024';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
    perfil: string;
  };
}

// Middleware de autenticação
export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token de acesso requerido' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Verificar se a sessão está ativa no banco de dados
    const activeSession = await prisma.sessaoAtiva.findFirst({
      where: {
        token: token,
        ativa: true,
        usuarioId: decoded.userId
      }
    });

    if (!activeSession) {
      res.status(401).json({ error: 'Sessão inválida ou expirada' });
      return;
    }

    // Atualizar última atividade da sessão
    await prisma.sessaoAtiva.update({
      where: {
        id: activeSession.id
      },
      data: {
        ultimaAtividade: new Date()
      }
    });
    
    console.log('🔍 Token decodificado:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido' });
    return;
  }
};

// Middleware para verificar se é admin
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.perfil?.toUpperCase() !== 'ADMIN') {
    res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    return;
  }
  
  next();
};

// Middleware para verificar se é veterinário ou admin
export const requireVeterinarian = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user || !['ADMIN', 'VETERINARIO'].includes(req.user.perfil.toUpperCase())) {
    res.status(403).json({ error: 'Acesso negado. Apenas veterinários e administradores.' });
    return;
  }
  next();
};

// Função para gerar token
export const generateToken = (userId: number, email: string, perfil: string) => {
  return jwt.sign(
    {
      userId,
      email,
      perfil
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Função para verificar token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Middleware para verificar se é gerente ou admin
export const requireManager = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || !['ADMIN', 'GERENTE', 'VETERINARIO'].includes(req.user.perfil.toUpperCase())) {
    return res.status(403).json({ error: 'Acesso negado. Apenas gerentes, veterinários e administradores.' });
  }
  return next();
};
