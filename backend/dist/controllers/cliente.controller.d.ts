import { Request, Response } from 'express';
export declare const getClientes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getClienteById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createCliente: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCliente: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCliente: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const searchClientes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const reactivateCliente: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=cliente.controller.d.ts.map