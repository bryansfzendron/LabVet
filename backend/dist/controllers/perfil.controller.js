"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePerfilPermissoes = exports.getPerfilById = exports.getPerfis = void 0;
const zod_1 = require("zod");
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
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
                permissoes: true
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
        where: { id: perfilId },
    });
    if (!existingPerfil) {
        throw new errorHandler_1.AppError('Perfil não encontrado', 404);
    }
    if (existingPerfil.codigo === 'ADMIN') {
        throw new errorHandler_1.AppError('Não é possível alterar permissões do perfil Administrador', 400);
    }
    const updatedPerfil = await database_1.default.perfil.update({
        where: { id: perfilId },
        data: {
            permissoes: permissoes,
            updatedAt: new Date(),
        },
        select: {
            id: true,
            nome: true,
            codigo: true,
            descricao: true,
            permissoes: true,
            ativo: true,
        },
    });
    res.json({
        message: 'Permissões atualizadas com sucesso',
        perfil: updatedPerfil,
    });
});
//# sourceMappingURL=perfil.controller.js.map