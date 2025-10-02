import { Request, Response } from 'express';
export declare const getAnimais: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createAnimal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAnimalById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateAnimal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteAnimal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const searchAnimais: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAnimaisByCliente: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const reactivateAnimal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=animal.controller.d.ts.map