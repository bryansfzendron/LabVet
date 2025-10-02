import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

// Middleware para verificar se é gerente ou admin
export const requireManager = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || !['ADMIN', 'GERENTE'].includes(req.user.perfil.toUpperCase())) {
    return res.status(403).json({ error: 'Acesso negado. Apenas gerentes e administradores.' });
  }
  return next();
};
