import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'labvet-secret-key-2024';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
    perfil: string;
  };
}

// Middleware de autenticação
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token de acesso requerido' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(401).json({ error: 'Token inválido' });
      return;
    }
    req.user = user;
    next();
  });
};

// Middleware para verificar se é admin
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.perfil.toUpperCase() !== 'ADMIN') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  return next();
};

// Middleware para verificar se é veterinário ou admin
export const requireVeterinarian = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || !['ADMIN', 'VETERINARIO'].includes(req.user.perfil.toUpperCase())) {
    return res.status(403).json({ error: 'Acesso negado. Apenas veterinários e administradores.' });
  }
  return next();
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
