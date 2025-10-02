interface LoginHistoryData {
    usuarioId: number;
    ip?: string;
    userAgent?: string;
    dispositivo?: string;
    localizacao?: string;
    sucesso: boolean;
    motivo?: string;
}
export declare class LoginHistoryService {
    static recordLogin(loginData: LoginHistoryData): Promise<void>;
    static recordLogout(usuarioId: number, sessionStartTime: Date): Promise<void>;
    static getLoginHistory(page?: number, limit?: number, usuarioId?: number): Promise<{
        history: {
            id: number;
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
            dataLogin: Date;
            dataLogout: Date | null;
            duracaoSessao: string | null;
            sucesso: boolean;
            motivo: string | null;
            status: string;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    private static extractDevice;
}
export {};
//# sourceMappingURL=loginHistoryService.d.ts.map