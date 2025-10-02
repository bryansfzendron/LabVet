import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
interface AuditLogData {
    usuarioId?: number | undefined;
    acao: string;
    tabela?: string | undefined;
    registroId?: number | undefined;
    dadosAntigos?: any;
    dadosNovos?: any;
    ip?: string | undefined;
    userAgent?: string | undefined;
}
export declare const auditLogger: (acao: string, tabela?: string) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare function createAuditLog(logData: AuditLogData): Promise<void>;
export {};
//# sourceMappingURL=auditLogger.d.ts.map