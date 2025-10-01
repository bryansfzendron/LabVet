import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

// Interface para erros customizados
interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

// Middleware de tratamento de erros
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Erro interno do servidor';
  let code = error.code || 'INTERNAL_ERROR';

  // Log do erro
  console.error('❌ Erro capturado:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Tratamento específico para erros do Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        statusCode = 409;
        message = 'Registro já existe. Verifique os dados únicos.';
        code = 'DUPLICATE_ENTRY';
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Registro não encontrado.';
        code = 'RECORD_NOT_FOUND';
        break;
      case 'P2003':
        statusCode = 400;
        message = 'Violação de chave estrangeira. Verifique as referências.';
        code = 'FOREIGN_KEY_CONSTRAINT';
        break;
      case 'P2014':
        statusCode = 400;
        message = 'Dados inválidos para a operação.';
        code = 'INVALID_DATA';
        break;
      default:
        statusCode = 400;
        message = 'Erro de banco de dados.';
        code = 'DATABASE_ERROR';
    }
  }

  // Tratamento para erros de validação do Prisma
  if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Dados de entrada inválidos.';
    code = 'VALIDATION_ERROR';
  }

  // Tratamento para erros de conexão do Prisma
  if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 503;
    message = 'Erro de conexão com o banco de dados.';
    code = 'DATABASE_CONNECTION_ERROR';
  }

  // Tratamento para erros de timeout do Prisma
  if (error instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = 'Erro interno do banco de dados.';
    code = 'DATABASE_INTERNAL_ERROR';
  }

  // Não expor detalhes em produção
  if (process.env.NODE_ENV === 'production') {
    if (statusCode === 500) {
      message = 'Erro interno do servidor';
    }
  }

  // Resposta de erro padronizada
  res.status(statusCode).json({
    error: message,
    code,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      details: error,
    }),
  });
};

// Middleware para capturar erros assíncronos
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Classe para erros customizados
export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, code: string = 'APP_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Funções utilitárias para criar erros específicos
export const createNotFoundError = (resource: string) => {
  return new AppError(`${resource} não encontrado`, 404, 'NOT_FOUND');
};

export const createValidationError = (message: string) => {
  return new AppError(message, 400, 'VALIDATION_ERROR');
};

export const createUnauthorizedError = (message: string = 'Não autorizado') => {
  return new AppError(message, 401, 'UNAUTHORIZED');
};

export const createForbiddenError = (message: string = 'Acesso negado') => {
  return new AppError(message, 403, 'FORBIDDEN');
};

export const createConflictError = (message: string) => {
  return new AppError(message, 409, 'CONFLICT');
};