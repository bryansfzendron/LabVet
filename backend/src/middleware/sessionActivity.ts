import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import { SessionService } from '../services/sessionService';

// Middleware para atualizar atividade da sessão
export const updateSessionActivity = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  if (req.user) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      // Atualizar última atividade de forma assíncrona
      SessionService.updateLastActivity(token).catch(error => {
        console.error('Erro ao atualizar atividade da sessão:', error);
      });
    }
  }
  
  next();
};