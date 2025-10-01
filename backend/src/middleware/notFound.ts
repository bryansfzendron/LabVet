import { Request, Response, NextFunction } from 'express';

// Middleware para rotas não encontradas
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
  
  console.warn(`⚠️  404 - Rota não encontrada: ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  res.status(404).json({
    error: 'Rota não encontrada',
    code: 'ROUTE_NOT_FOUND',
    message: `A rota ${req.method} ${req.originalUrl} não existe`,
    timestamp: new Date().toISOString(),
    availableRoutes: [
      'GET /health',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'GET /api/clientes',
      'GET /api/animais',
      'GET /api/profissionais',
      'GET /api/exames',
      'GET /api/pedidos',
      'GET /api/laudos',
      'GET /api/financeiro',
      'GET /api/relatorios',
      'GET /api/ftp',
    ],
  });
};