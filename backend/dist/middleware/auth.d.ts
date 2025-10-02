import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        email: string;
        perfil: string;
    };
}
export declare const authenticateToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const requireAdmin: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const requireVeterinarian: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const generateToken: (userId: number, email: string, perfil: string) => string;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload | null;
export declare const requireManager: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.d.ts.map