"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHistoryService = void 0;
const database_1 = __importDefault(require("../config/database"));
class LoginHistoryService {
    static async recordLogin(loginData) {
        try {
            await database_1.default.historicoLogin.create({
                data: {
                    usuarioId: loginData.usuarioId,
                    ip: loginData.ip || null,
                    userAgent: loginData.userAgent || null,
                    dispositivo: this.extractDevice(loginData.userAgent),
                    localizacao: loginData.localizacao || null,
                    sucesso: loginData.sucesso,
                    motivo: loginData.motivo || null,
                },
            });
        }
        catch (error) {
            console.error('Erro ao registrar histórico de login:', error);
        }
    }
    static async recordLogout(usuarioId, sessionStartTime) {
        try {
            const now = new Date();
            const duracaoSessao = Math.floor((now.getTime() - sessionStartTime.getTime()) / (1000 * 60));
            const ultimoLogin = await database_1.default.historicoLogin.findFirst({
                where: {
                    usuarioId,
                    sucesso: true,
                    dataLogout: null,
                },
                orderBy: {
                    dataLogin: 'desc',
                },
            });
            if (ultimoLogin) {
                await database_1.default.historicoLogin.update({
                    where: {
                        id: ultimoLogin.id,
                    },
                    data: {
                        dataLogout: now,
                        duracaoSessao,
                    },
                });
            }
        }
        catch (error) {
            console.error('Erro ao registrar logout:', error);
        }
    }
    static async getLoginHistory(page = 1, limit = 10, usuarioId) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (usuarioId) {
                where.usuarioId = usuarioId;
            }
            const [history, total] = await Promise.all([
                database_1.default.historicoLogin.findMany({
                    where,
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                nome: true,
                                email: true,
                                perfil: true,
                            },
                        },
                    },
                    orderBy: {
                        dataLogin: 'desc',
                    },
                    skip,
                    take: limit,
                }),
                database_1.default.historicoLogin.count({ where }),
            ]);
            return {
                history: history.map(record => ({
                    id: record.id,
                    usuario: record.usuario.nome,
                    email: record.usuario.email,
                    perfil: record.usuario.perfil,
                    ip: record.ip,
                    dispositivo: record.dispositivo,
                    localizacao: record.localizacao,
                    dataLogin: record.dataLogin,
                    dataLogout: record.dataLogout,
                    duracaoSessao: record.duracaoSessao ? `${record.duracaoSessao}m` : null,
                    sucesso: record.sucesso,
                    motivo: record.motivo,
                    status: record.dataLogout ? 'Finalizada' : 'Ativa',
                })),
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.error('Erro ao buscar histórico de login:', error);
            throw error;
        }
    }
    static extractDevice(userAgent) {
        if (!userAgent)
            return 'Desconhecido';
        if (userAgent.includes('Mobile'))
            return 'Mobile';
        if (userAgent.includes('Tablet'))
            return 'Tablet';
        if (userAgent.includes('Windows'))
            return 'Windows';
        if (userAgent.includes('Mac'))
            return 'Mac';
        if (userAgent.includes('Linux'))
            return 'Linux';
        if (userAgent.includes('Android'))
            return 'Android';
        if (userAgent.includes('iPhone'))
            return 'iPhone';
        if (userAgent.includes('iPad'))
            return 'iPad';
        return 'Desktop';
    }
}
exports.LoginHistoryService = LoginHistoryService;
//# sourceMappingURL=loginHistoryService.js.map