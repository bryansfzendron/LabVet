import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
export declare const requireManager: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=permissions.d.ts.map