"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const database_1 = __importDefault(require("../config/database"));
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 20, acao, usuarioId, dataInicio, dataFim } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (acao) {
            where.acao = { contains: acao, mode: 'insensitive' };
        }
        if (usuarioId) {
            where.usuarioId = Number(usuarioId);
        }
        if (dataInicio || dataFim) {
            where.createdAt = {};
            if (dataInicio) {
                where.createdAt.gte = new Date(dataInicio);
            }
            if (dataFim) {
                where.createdAt.lte = new Date(dataFim);
            }
        }
        const [logs, total] = await Promise.all([
            database_1.default.logSistema.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit)
            }),
            database_1.default.logSistema.count({ where })
        ]);
        const usuarioIds = [...new Set(logs.map(log => log.usuarioId).filter((id) => id !== null))];
        const usuarios = await database_1.default.usuario.findMany({
            where: { id: { in: usuarioIds } },
            select: { id: true, nome: true, email: true }
        });
        const usuariosMap = new Map(usuarios.map(u => [u.id, u]));
        const logsComUsuario = logs.map(log => ({
            ...log,
            usuario: log.usuarioId ? usuariosMap.get(log.usuarioId) || null : null
        }));
        res.json({
            logs: logsComUsuario,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit))
        });
    }
    catch (error) {
        console.error('Erro ao buscar logs:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
router.get('/stats', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const semanaAtras = new Date();
        semanaAtras.setDate(semanaAtras.getDate() - 7);
        semanaAtras.setHours(0, 0, 0, 0);
        const [totalLogs, logsHoje, logsSemana, acoesFrequentes] = await Promise.all([
            database_1.default.logSistema.count(),
            database_1.default.logSistema.count({
                where: { createdAt: { gte: hoje } }
            }),
            database_1.default.logSistema.count({
                where: { createdAt: { gte: semanaAtras } }
            }),
            database_1.default.logSistema.groupBy({
                by: ['acao'],
                _count: { acao: true },
                orderBy: { _count: { acao: 'desc' } },
                take: 5
            })
        ]);
        const acoesFormatadas = acoesFrequentes.map(item => ({
            acao: item.acao,
            count: item._count.acao
        }));
        res.json({
            totalLogs,
            logsHoje,
            logsSemana,
            acoesFrequentes: acoesFormatadas
        });
    }
    catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.default = router;
//# sourceMappingURL=logs.js.map