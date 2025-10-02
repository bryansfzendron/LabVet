import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
export declare const requestLogger: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const addRequestStart: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=requestLogger.d.ts.map