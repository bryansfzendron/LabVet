"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUsers = exports.changePassword = exports.verifyToken = exports.register = exports.logout = exports.login = void 0;
const bcrypt = __importStar(require("bcrypt"));
const zod_1 = require("zod");
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
const auth_1 = require("../middleware/auth");
const sessionService_1 = require("../services/sessionService");
const loginHistoryService_1 = require("../services/loginHistoryService");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email inválido'),
    senha: zod_1.z.string().min(1, 'Senha é obrigatória'),
});
const registerSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: zod_1.z.string().email('Email inválido'),
    senha: zod_1.z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    perfilId: zod_1.z.number().int().positive('ID do perfil deve ser um número positivo'),
});
const changePasswordSchema = zod_1.z.object({
    senhaAtual: zod_1.z.string().min(1, 'Senha atual é obrigatória'),
    novaSenha: zod_1.z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
});
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
};
exports.login = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { email, senha } = loginSchema.parse(req.body);
    try {
        const user = await database_1.default.usuario.findUnique({
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
            await loginHistoryService_1.LoginHistoryService.recordLogin({
                usuarioId: 0,
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                sucesso: false,
                motivo: 'Usuário não encontrado',
            });
            throw (0, errorHandler_1.createUnauthorizedError)('Credenciais inválidas');
        }
        if (!user.ativo) {
            await loginHistoryService_1.LoginHistoryService.recordLogin({
                usuarioId: user.id,
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                sucesso: false,
                motivo: 'Usuário inativo',
            });
            throw (0, errorHandler_1.createUnauthorizedError)('Usuário inativo');
        }
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            await loginHistoryService_1.LoginHistoryService.recordLogin({
                usuarioId: user.id,
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                sucesso: false,
                motivo: 'Senha incorreta',
            });
            throw (0, errorHandler_1.createUnauthorizedError)('Credenciais inválidas');
        }
        const token = (0, auth_1.generateToken)(user.id, user.email, user.perfil.codigo);
        await sessionService_1.SessionService.createSession({
            usuarioId: user.id,
            token,
            ip: req.ip || undefined,
            userAgent: req.get('User-Agent') || undefined,
        });
        await loginHistoryService_1.LoginHistoryService.recordLogin({
            usuarioId: user.id,
            ip: req.ip || undefined,
            userAgent: req.get('User-Agent') || undefined,
            sucesso: true,
        });
        await database_1.default.usuario.update({
            where: { id: user.id },
            data: { ultimoLogin: new Date() },
        });
        const logData = {
            usuarioId: user.id,
            acao: 'LOGIN',
            tabela: 'usuarios',
            registroId: user.id,
        };
        if (req.ip)
            logData.ip = req.ip;
        if (req.get('User-Agent'))
            logData.userAgent = req.get('User-Agent');
        await database_1.default.logSistema.create({
            data: logData,
        });
        const { senha: _, ...userWithoutPassword } = user;
        res.json({
            message: 'Login realizado com sucesso',
            user: userWithoutPassword,
            token,
        });
    }
    catch (error) {
        if (!(error instanceof errorHandler_1.AppError)) {
            await loginHistoryService_1.LoginHistoryService.recordLogin({
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
exports.logout = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    if (req.user) {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            await sessionService_1.SessionService.endSession(token);
            await loginHistoryService_1.LoginHistoryService.recordLogout(req.user.userId, new Date());
        }
        const logData = {
            usuarioId: req.user.userId,
            acao: 'LOGOUT',
            tabela: 'usuarios',
            registroId: req.user.userId,
        };
        if (req.ip)
            logData.ip = req.ip;
        if (req.get('User-Agent'))
            logData.userAgent = req.get('User-Agent');
        await database_1.default.logSistema.create({
            data: logData,
        });
    }
    res.json({
        message: 'Logout realizado com sucesso',
    });
});
exports.register = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const validatedData = registerSchema.parse(req.body);
    const { nome, email, senha, perfilId } = validatedData;
    const existingUser = await database_1.default.usuario.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw (0, errorHandler_1.createValidationError)('Email já está em uso');
    }
    const perfil = await database_1.default.perfil.findUnique({
        where: { id: perfilId },
    });
    if (!perfil) {
        throw (0, errorHandler_1.createValidationError)('Perfil inválido');
    }
    const hashedPassword = await hashPassword(senha);
    const user = await database_1.default.usuario.create({
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
    const logData = {
        usuarioId: user.id,
        acao: 'REGISTRO',
        tabela: 'usuarios',
        registroId: user.id,
    };
    if (req.ip)
        logData.ip = req.ip;
    if (req.get('User-Agent'))
        logData.userAgent = req.get('User-Agent');
    await database_1.default.logSistema.create({
        data: logData,
    });
    res.status(201).json({
        message: 'Usuário registrado com sucesso',
        user,
    });
});
exports.verifyToken = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw (0, errorHandler_1.createUnauthorizedError)('Token inválido');
    }
    const user = await database_1.default.usuario.findUnique({
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
        throw (0, errorHandler_1.createUnauthorizedError)('Usuário não encontrado ou inativo');
    }
    res.json({
        message: 'Token válido',
        user,
    });
});
exports.changePassword = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw (0, errorHandler_1.createUnauthorizedError)('Usuário não autenticado');
    }
    const validatedData = changePasswordSchema.parse(req.body);
    const { senhaAtual, novaSenha } = validatedData;
    const user = await database_1.default.usuario.findUnique({
        where: { id: req.user.userId },
        select: {
            id: true,
            senha: true,
        },
    });
    if (!user) {
        throw (0, errorHandler_1.createUnauthorizedError)('Usuário não encontrado');
    }
    const isCurrentPasswordValid = await bcrypt.compare(senhaAtual, user.senha);
    if (!isCurrentPasswordValid) {
        throw (0, errorHandler_1.createUnauthorizedError)('Senha atual incorreta');
    }
    const hashedNewPassword = await hashPassword(novaSenha);
    await database_1.default.usuario.update({
        where: { id: user.id },
        data: { senha: hashedNewPassword },
    });
    const logData = {
        usuarioId: user.id,
        acao: 'ALTERACAO_SENHA',
        tabela: 'usuarios',
        registroId: user.id,
    };
    if (req.ip)
        logData.ip = req.ip;
    if (req.get('User-Agent'))
        logData.userAgent = req.get('User-Agent');
    await database_1.default.logSistema.create({
        data: logData,
    });
    res.json({
        message: 'Senha alterada com sucesso',
    });
});
exports.getUsers = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, search, perfil, ativo } = req.query;
    const where = {};
    if (search) {
        where.OR = [
            { nome: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
        ];
    }
    if (perfil) {
        where.perfil = perfil;
    }
    if (ativo !== undefined) {
        where.ativo = ativo === 'true';
    }
    const [users, total] = await Promise.all([
        database_1.default.usuario.findMany({
            where,
            select: {
                id: true,
                nome: true,
                email: true,
                perfilId: true,
                perfil: {
                    select: {
                        id: true,
                        nome: true,
                        codigo: true,
                        descricao: true,
                    }
                },
                ativo: true,
                ultimoLogin: true,
                createdAt: true,
            },
            orderBy: { nome: 'asc' },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
        }),
        database_1.default.usuario.count({ where }),
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
exports.deleteUser = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw (0, errorHandler_1.createValidationError)('ID de usuário é obrigatório');
    }
    const userId = parseInt(id);
    if (isNaN(userId)) {
        throw (0, errorHandler_1.createValidationError)('ID de usuário inválido');
    }
    const user = await database_1.default.usuario.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new errorHandler_1.AppError('Usuário não encontrado', 404);
    }
    if (req.user?.userId === userId) {
        throw new errorHandler_1.AppError('Não é possível deletar seu próprio usuário', 400);
    }
    await database_1.default.usuario.update({
        where: { id: userId },
        data: {
            ativo: false,
            updatedAt: new Date()
        },
    });
    const logData = {
        usuarioId: req.user?.userId,
        acao: 'DELETE_USER',
        tabela: 'usuarios',
        registroId: userId,
        dadosAntigos: JSON.stringify({ ativo: true }),
        dadosNovos: JSON.stringify({ ativo: false }),
    };
    if (req.ip)
        logData.ip = req.ip;
    if (req.get('User-Agent'))
        logData.userAgent = req.get('User-Agent');
    await database_1.default.logSistema.create({
        data: logData,
    });
    res.json({
        message: 'Usuário removido com sucesso',
    });
});
exports.updateUser = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw (0, errorHandler_1.createValidationError)('ID do usuário é obrigatório');
    }
    const userId = parseInt(id);
    if (isNaN(userId)) {
        throw (0, errorHandler_1.createValidationError)('ID do usuário deve ser um número válido');
    }
    const updateUserSchema = zod_1.z.object({
        nome: zod_1.z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
        email: zod_1.z.string().email('Email inválido').optional(),
        perfilId: zod_1.z.number().int().positive('ID do perfil deve ser um número positivo').optional(),
        ativo: zod_1.z.boolean().optional(),
        senha: zod_1.z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').optional(),
    });
    const validatedData = updateUserSchema.parse(req.body);
    const updateData = {
        nome: validatedData.nome,
        email: validatedData.email,
        perfilId: validatedData.perfilId,
        ativo: validatedData.ativo,
    };
    if (validatedData.senha) {
        updateData.senha = await hashPassword(validatedData.senha);
    }
    const existingUser = await database_1.default.usuario.findUnique({
        where: { id: userId },
        include: {
            perfil: true,
        },
    });
    if (!existingUser) {
        throw new errorHandler_1.AppError('Usuário não encontrado', 404);
    }
    if (updateData.email && updateData.email !== existingUser.email) {
        const emailExists = await database_1.default.usuario.findUnique({
            where: { email: updateData.email },
        });
        if (emailExists) {
            throw (0, errorHandler_1.createValidationError)('Este email já está em uso');
        }
    }
    if (updateData.perfilId) {
        const perfilExists = await database_1.default.perfil.findUnique({
            where: { id: updateData.perfilId },
        });
        if (!perfilExists) {
            throw (0, errorHandler_1.createValidationError)('Perfil não encontrado');
        }
    }
    if (req.user?.userId === userId && updateData.ativo === false) {
        throw new errorHandler_1.AppError('Não é possível desabilitar seu próprio usuário', 400);
    }
    const updatedUser = await database_1.default.usuario.update({
        where: { id: userId },
        data: updateData,
        include: {
            perfil: true,
        },
    });
    const { senha, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
});
//# sourceMappingURL=auth.controller.js.map