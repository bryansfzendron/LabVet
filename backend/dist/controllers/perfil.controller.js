"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerfil = exports.updatePerfil = exports.createPerfil = exports.updatePerfilPermissoes = exports.getPerfilById = exports.getAllPerfis = exports.getPerfis = void 0;
const zod_1 = require("zod");
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
const CRITICAL_PROFILE_CODES = ['ADMIN'];
exports.getPerfis = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    try {
        const perfis = await database_1.default.perfil.findMany({
            where: {
                ativo: true
            },
            select: {
                id: true,
                nome: true,
                codigo: true,
                descricao: true,
                permissoes: true,
                ativo: true
            },
            orderBy: {
                nome: 'asc'
            }
        });
        return res.json(perfis);
    }
    catch (error) {
        console.error('Erro ao buscar perfis:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.getAllPerfis = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    try {
        if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
            return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem visualizar todos os perfis' });
        }
        const perfis = await database_1.default.perfil.findMany({
            select: {
                id: true,
                nome: true,
                codigo: true,
                descricao: true,
                permissoes: true,
                ativo: true
            },
            orderBy: {
                nome: 'asc'
            }
        });
        return res.json(perfis);
    }
    catch (error) {
        console.error('Erro ao buscar todos os perfis:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.getPerfilById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    try {
        const { id } = req.params;
        const perfil = await database_1.default.perfil.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                nome: true,
                codigo: true,
                descricao: true,
                permissoes: true,
                ativo: true
            }
        });
        if (!perfil) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }
        return res.json(perfil);
    }
    catch (error) {
        console.error('Erro ao buscar perfil:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.updatePerfilPermissoes = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw (0, errorHandler_1.createValidationError)('ID do perfil é obrigatório');
    }
    const perfilId = parseInt(id);
    if (isNaN(perfilId)) {
        throw (0, errorHandler_1.createValidationError)('ID do perfil deve ser um número válido');
    }
    if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
        throw new errorHandler_1.AppError('Acesso negado. Apenas administradores podem alterar permissões', 403);
    }
    const permissoesSchema = zod_1.z.object({
        admin: zod_1.z.boolean().optional(),
        configuracoes: zod_1.z.boolean().optional(),
        usuarios: zod_1.z.boolean().optional(),
        relatorios: zod_1.z.boolean().optional(),
        pedidos: zod_1.z.boolean().optional(),
        laudos: zod_1.z.boolean().optional(),
        clientes: zod_1.z.boolean().optional(),
        animais: zod_1.z.boolean().optional(),
        exames: zod_1.z.boolean().optional(),
        financeiro: zod_1.z.boolean().optional(),
        agenda: zod_1.z.boolean().optional(),
        dashboard: zod_1.z.boolean().optional(),
    });
    const permissoes = permissoesSchema.parse(req.body);
    const existingPerfil = await database_1.default.perfil.findUnique({
        where: { id: perfilId }
    });
    if (!existingPerfil) {
        throw new errorHandler_1.AppError('Perfil não encontrado', 404);
    }
    if (existingPerfil.codigo === 'ADMIN') {
        throw new errorHandler_1.AppError('Não é possível alterar as permissões do perfil Administrador', 400);
    }
    const updatedPerfil = await database_1.default.perfil.update({
        where: { id: perfilId },
        data: {
            permissoes,
            updatedAt: new Date()
        },
        select: {
            id: true,
            nome: true,
            codigo: true,
            descricao: true,
            permissoes: true,
            ativo: true
        }
    });
    res.json({
        message: 'Permissões atualizadas com sucesso',
        perfil: updatedPerfil
    });
});
exports.createPerfil = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
        throw new errorHandler_1.AppError('Acesso negado. Apenas administradores podem criar perfis', 403);
    }
    const createPerfilSchema = zod_1.z.object({
        nome: zod_1.z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
        codigo: zod_1.z.string().min(1, 'Código é obrigatório').max(50, 'Código deve ter no máximo 50 caracteres').regex(/^[A-Z_]+$/, 'Código deve conter apenas letras maiúsculas e underscore'),
        descricao: zod_1.z.string().optional(),
        permissoes: zod_1.z.object({
            admin: zod_1.z.boolean().optional(),
            configuracoes: zod_1.z.boolean().optional(),
            usuarios: zod_1.z.boolean().optional(),
            relatorios: zod_1.z.boolean().optional(),
            pedidos: zod_1.z.boolean().optional(),
            laudos: zod_1.z.boolean().optional(),
            clientes: zod_1.z.boolean().optional(),
            animais: zod_1.z.boolean().optional(),
            exames: zod_1.z.boolean().optional(),
            financeiro: zod_1.z.boolean().optional(),
            agenda: zod_1.z.boolean().optional(),
            dashboard: zod_1.z.boolean().optional(),
        }).optional()
    });
    const { nome, codigo, descricao, permissoes } = createPerfilSchema.parse(req.body);
    if (CRITICAL_PROFILE_CODES.includes(codigo)) {
        throw new errorHandler_1.AppError(`O código "${codigo}" é reservado pelo sistema e não pode ser usado para novos perfis`, 400);
    }
    const existingPerfil = await database_1.default.perfil.findUnique({
        where: { codigo }
    });
    if (existingPerfil) {
        throw new errorHandler_1.AppError('Já existe um perfil com este código', 400);
    }
    const novoPerfil = await database_1.default.perfil.create({
        data: {
            nome,
            codigo,
            descricao,
            permissoes: permissoes || {},
            ativo: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        select: {
            id: true,
            nome: true,
            codigo: true,
            descricao: true,
            permissoes: true,
            ativo: true
        }
    });
    res.status(201).json({
        message: 'Perfil criado com sucesso',
        perfil: novoPerfil
    });
});
exports.updatePerfil = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw (0, errorHandler_1.createValidationError)('ID do perfil é obrigatório');
    }
    const perfilId = parseInt(id);
    if (isNaN(perfilId)) {
        throw (0, errorHandler_1.createValidationError)('ID do perfil deve ser um número válido');
    }
    if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
        throw new errorHandler_1.AppError('Acesso negado. Apenas administradores podem atualizar perfis', 403);
    }
    const updatePerfilSchema = zod_1.z.object({
        nome: zod_1.z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres').optional(),
        codigo: zod_1.z.string().min(1, 'Código é obrigatório').max(50, 'Código deve ter no máximo 50 caracteres').regex(/^[A-Z_]+$/, 'Código deve conter apenas letras maiúsculas e underscore').optional(),
        descricao: zod_1.z.string().optional(),
        ativo: zod_1.z.boolean().optional(),
        permissoes: zod_1.z.object({
            admin: zod_1.z.boolean().optional(),
            configuracoes: zod_1.z.boolean().optional(),
            usuarios: zod_1.z.boolean().optional(),
            relatorios: zod_1.z.boolean().optional(),
            pedidos: zod_1.z.boolean().optional(),
            laudos: zod_1.z.boolean().optional(),
            clientes: zod_1.z.boolean().optional(),
            animais: zod_1.z.boolean().optional(),
            exames: zod_1.z.boolean().optional(),
            financeiro: zod_1.z.boolean().optional(),
            agenda: zod_1.z.boolean().optional(),
            dashboard: zod_1.z.boolean().optional(),
        }).optional()
    });
    const updateData = updatePerfilSchema.parse(req.body);
    const existingPerfil = await database_1.default.perfil.findUnique({
        where: { id: perfilId }
    });
    if (!existingPerfil) {
        throw new errorHandler_1.AppError('Perfil não encontrado', 404);
    }
    const isCriticalProfile = CRITICAL_PROFILE_CODES.includes(existingPerfil.codigo);
    if (isCriticalProfile) {
        throw new errorHandler_1.AppError(`Não é possível alterar o perfil "${existingPerfil.nome}" pois é um perfil crítico do sistema`, 400);
    }
    if (updateData.ativo === false && existingPerfil.ativo === true) {
        const usuariosAtivos = await database_1.default.usuario.count({
            where: {
                perfilId: perfilId,
                ativo: true
            }
        });
        if (usuariosAtivos > 0) {
            throw new errorHandler_1.AppError(`Não é possível desativar o perfil "${existingPerfil.nome}" pois existem ${usuariosAtivos} usuário(s) ativo(s) utilizando este perfil. Desative primeiro os usuários ou altere seus perfis.`, 400);
        }
    }
    if (updateData.codigo && updateData.codigo !== existingPerfil.codigo) {
        if (CRITICAL_PROFILE_CODES.includes(updateData.codigo)) {
            throw new errorHandler_1.AppError(`O código "${updateData.codigo}" é reservado pelo sistema e não pode ser usado`, 400);
        }
        const perfilWithSameCode = await database_1.default.perfil.findUnique({
            where: { codigo: updateData.codigo }
        });
        if (perfilWithSameCode) {
            throw new errorHandler_1.AppError('Já existe um perfil com este código', 400);
        }
    }
    const updatedPerfil = await database_1.default.perfil.update({
        where: { id: perfilId },
        data: {
            ...updateData,
            updatedAt: new Date()
        },
        select: {
            id: true,
            nome: true,
            codigo: true,
            descricao: true,
            permissoes: true,
            ativo: true
        }
    });
    res.json({
        message: 'Perfil atualizado com sucesso',
        perfil: updatedPerfil
    });
});
exports.deletePerfil = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw (0, errorHandler_1.createValidationError)('ID do perfil é obrigatório');
    }
    const perfilId = parseInt(id);
    if (isNaN(perfilId)) {
        throw (0, errorHandler_1.createValidationError)('ID do perfil deve ser um número válido');
    }
    if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
        throw new errorHandler_1.AppError('Acesso negado. Apenas administradores podem deletar perfis', 403);
    }
    const existingPerfil = await database_1.default.perfil.findUnique({
        where: { id: perfilId }
    });
    if (!existingPerfil) {
        throw new errorHandler_1.AppError('Perfil não encontrado', 404);
    }
    const isCriticalProfile = CRITICAL_PROFILE_CODES.includes(existingPerfil.codigo);
    if (isCriticalProfile) {
        throw new errorHandler_1.AppError(`Não é possível deletar o perfil "${existingPerfil.nome}" pois é um perfil crítico do sistema`, 400);
    }
    const usuariosComPerfil = await database_1.default.usuario.count({
        where: { perfilId: perfilId }
    });
    if (usuariosComPerfil > 0) {
        throw new errorHandler_1.AppError('Não é possível deletar este perfil pois existem usuários associados a ele', 400);
    }
    await database_1.default.perfil.update({
        where: { id: perfilId },
        data: {
            ativo: false,
            updatedAt: new Date()
        }
    });
    res.json({
        message: 'Perfil deletado com sucesso'
    });
});
//# sourceMappingURL=perfil.controller.js.map