import { Request, Response } from 'express';
export declare const getLaudos: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getLaudoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getLaudosByPedido: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createLaudo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateLaudo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signLaudo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sendLaudo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const generateLaudoPDF: (req: Request, res: Response) => Promise<void>;
export declare const deleteLaudo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=laudo.controller.d.ts.map