"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const database_1 = __importDefault(require("../config/database"));
const JWT_SECRET = process.env.JWT_SECRET || 'labvet-secret-key-2024';
class SessionService {
    static async createSession(sessionData) {
        try {
            const session = await database_1.default.sessaoAtiva.create({
                data: {
                    usuarioId: sessionData.usuarioId,
                    token: sessionData.token,
                    ip: sessionData.ip || null,
                    userAgent: sessionData.userAgent || null,
                    dispositivo: this.extractDevice(sessionData.userAgent),
                    localizacao: sessionData.localizacao || null,
                },
            });
            return session.id;
        }
        catch (error) {
            console.error('Erro ao criar sessão:', error);
            throw error;
        }
    }
    static async updateLastActivity(token) {
        try {
            await database_1.default.sessaoAtiva.updateMany({
                where: {
                    token,
                    ativa: true,
                },
                data: {
                    ultimaAtividade: new Date(),
                },
            });
        }
        catch (error) {
            console.error('Erro ao atualizar atividade da sessão:', error);
        }
    }
    static async endSession(token) {
        try {
            await database_1.default.sessaoAtiva.updateMany({
                where: {
                    token,
                    ativa: true,
                },
                data: {
                    ativa: false,
                },
            });
        }
        catch (error) {
            console.error('Erro ao encerrar sessão:', error);
            throw error;
        }
    }
    static async endSessionById(sessionId) {
        try {
            await database_1.default.sessaoAtiva.update({
                where: {
                    id: sessionId,
                },
                data: {
                    ativa: false,
                },
            });
        }
        catch (error) {
            console.error('Erro ao encerrar sessão por ID:', error);
            throw error;
        }
    }
    static async getActiveSessions(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [sessions, total] = await Promise.all([
                database_1.default.sessaoAtiva.findMany({
                    where: {
                        ativa: true,
                    },
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
                        ultimaAtividade: 'desc',
                    },
                    skip,
                    take: limit,
                }),
                database_1.default.sessaoAtiva.count({
                    where: {
                        ativa: true,
                    },
                }),
            ]);
            return {
                sessions: sessions.map(session => ({
                    id: session.id,
                    usuario: session.usuario.nome,
                    email: session.usuario.email,
                    perfil: session.usuario.perfil,
                    ip: session.ip,
                    dispositivo: session.dispositivo,
                    localizacao: session.localizacao,
                    inicioSessao: session.inicioSessao,
                    ultimaAtividade: session.ultimaAtividade,
                    duracao: this.calculateDuration(session.inicioSessao),
                })),
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.error('Erro ao buscar sessões ativas:', error);
            throw error;
        }
    }
    static async cleanExpiredSessions() {
        try {
            const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() - 24);
            await database_1.default.sessaoAtiva.updateMany({
                where: {
                    ultimaAtividade: {
                        lt: expirationTime,
                    },
                    ativa: true,
                },
                data: {
                    ativa: false,
                },
            });
        }
        catch (error) {
            console.error('Erro ao limpar sessões expiradas:', error);
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
    static calculateDuration(startTime) {
        const now = new Date();
        const diffMs = now.getTime() - startTime.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        if (diffHours > 0) {
            return `${diffHours}h ${diffMinutes}m`;
        }
        return `${diffMinutes}m`;
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=sessionService.js.map