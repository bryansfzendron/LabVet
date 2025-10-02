interface SessionData {
    usuarioId: number;
    token: string;
    ip?: string;
    userAgent?: string;
    dispositivo?: string;
    localizacao?: string;
}
export declare class SessionService {
    static createSession(sessionData: SessionData): Promise<string>;
    static updateLastActivity(token: string): Promise<void>;
    static endSession(token: string): Promise<void>;
    static endSessionById(sessionId: string): Promise<void>;
    static getActiveSessions(page?: number, limit?: number): Promise<{
        sessions: {
            id: string;
            usuario: string;
            email: string;
            perfil: {
                id: number;
                nome: string;
                ativo: boolean;
                createdAt: Date;
                updatedAt: Date;
                codigo: string;
                descricao: string | null;
                permissoes: import("@prisma/client/runtime/library").JsonValue | null;
            };
            ip: string | null;
            dispositivo: string | null;
            localizacao: string | null;
            inicioSessao: Date;
            ultimaAtividade: Date;
            duracao: string;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    static cleanExpiredSessions(): Promise<void>;
    private static extractDevice;
    private static calculateDuration;
}
export {};
//# sourceMappingURL=sessionService.d.ts.map