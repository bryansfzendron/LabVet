"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConflictError = exports.createForbiddenError = exports.createUnauthorizedError = exports.createValidationError = exports.createNotFoundError = exports.AppError = exports.asyncHandler = exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const errorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Erro interno do servidor';
    let code = error.code || 'INTERNAL_ERROR';
    console.error('❌ Erro capturado:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
    });
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = 'Dados de entrada inválidos.';
        code = 'VALIDATION_ERROR';
    }
    if (error instanceof client_1.Prisma.PrismaClientInitializationError) {
        statusCode = 503;
        message = 'Erro de conexão com o banco de dados.';
        code = 'DATABASE_CONNECTION_ERROR';
    }
    if (error instanceof client_1.Prisma.PrismaClientRustPanicError) {
        statusCode = 500;
        message = 'Erro interno do banco de dados.';
        code = 'DATABASE_INTERNAL_ERROR';
    }
    if (process.env.NODE_ENV === 'production') {
        if (statusCode === 500) {
            message = 'Erro interno do servidor';
        }
    }
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
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
class AppError extends Error {
    statusCode;
    code;
    isOperational;
    constructor(message, statusCode = 500, code = 'APP_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const createNotFoundError = (resource) => {
    return new AppError(`${resource} não encontrado`, 404, 'NOT_FOUND');
};
exports.createNotFoundError = createNotFoundError;
const createValidationError = (message) => {
    return new AppError(message, 400, 'VALIDATION_ERROR');
};
exports.createValidationError = createValidationError;
const createUnauthorizedError = (message = 'Não autorizado') => {
    return new AppError(message, 401, 'UNAUTHORIZED');
};
exports.createUnauthorizedError = createUnauthorizedError;
const createForbiddenError = (message = 'Acesso negado') => {
    return new AppError(message, 403, 'FORBIDDEN');
};
exports.createForbiddenError = createForbiddenError;
const createConflictError = (message) => {
    return new AppError(message, 409, 'CONFLICT');
};
exports.createConflictError = createConflictError;
//# sourceMappingURL=errorHandler.js.map