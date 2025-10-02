import { Animal, SexoAnimal, Prisma } from '@prisma/client';
export interface CreateAnimalRequest {
    nome: string;
    especieId: number;
    raca?: string;
    sexo: SexoAnimal;
    idade?: string;
    peso?: number;
    cor?: string;
    clienteId: number;
    observacoes?: string;
    ativo?: boolean;
}
export interface UpdateAnimalRequest extends Partial<CreateAnimalRequest> {
    id: number;
}
export interface AnimalFilters {
    search?: string | undefined;
    clienteId?: number | undefined;
    especieId?: number | undefined;
    sexo?: SexoAnimal | undefined;
    ativo?: boolean | undefined;
}
export interface PaginationOptions {
    page: number;
    limit: number;
    orderBy?: string;
    order?: 'asc' | 'desc';
}
export interface AnimalWithDetails extends Animal {
    especie: {
        id: number;
        nome: string;
    };
    cliente: {
        id: number;
        nome: string;
        telefone?: string | null;
        celular?: string | null;
    };
    _count?: {
        pedidos: number;
    };
}
declare class AnimalService {
    getAnimais(filters: AnimalFilters | undefined, pagination: PaginationOptions): Promise<{
        data: ({
            _count: {
                pedidos: number;
            };
            cliente: {
                id: number;
                nome: string;
                telefone: string | null;
                celular: string | null;
            };
            especie: {
                id: number;
                nome: string;
            };
        } & {
            id: number;
            nome: string;
            ativo: boolean;
            createdAt: Date;
            updatedAt: Date;
            especieId: number;
            raca: string | null;
            sexo: import(".prisma/client").$Enums.SexoAnimal;
            idade: string | null;
            peso: Prisma.Decimal | null;
            cor: string | null;
            clienteId: number;
            observacoes: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    getAnimalById(id: number): Promise<AnimalWithDetails | null>;
    getAnimaisByCliente(clienteId: number): Promise<({
        _count: {
            pedidos: number;
        };
        especie: {
            id: number;
            nome: string;
        };
    } & {
        id: number;
        nome: string;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
        especieId: number;
        raca: string | null;
        sexo: import(".prisma/client").$Enums.SexoAnimal;
        idade: string | null;
        peso: Prisma.Decimal | null;
        cor: string | null;
        clienteId: number;
        observacoes: string | null;
    })[]>;
    createAnimal(data: CreateAnimalRequest): Promise<Animal>;
    updateAnimal(id: number, data: Partial<CreateAnimalRequest>): Promise<Animal | null>;
    deleteAnimal(id: number): Promise<{
        deleted: boolean;
        message: string;
    }>;
    reactivateAnimal(id: number): Promise<Animal | null>;
    searchAnimais(query: string, clienteId?: number, limit?: number): Promise<{
        id: number;
        nome: string;
        cliente: {
            id: number;
            nome: string;
        };
        especie: {
            id: number;
            nome: string;
        };
        raca: string | null;
        sexo: import(".prisma/client").$Enums.SexoAnimal;
        idade: string | null;
        peso: Prisma.Decimal | null;
    }[]>;
    getAnimalStats(): Promise<{
        total: number;
        ativos: number;
        inativos: number;
        porEspecie: (Prisma.PickEnumerable<Prisma.AnimalGroupByOutputType, "especieId"[]> & {
            _count: {
                id: number;
            };
        })[];
        porSexo: (Prisma.PickEnumerable<Prisma.AnimalGroupByOutputType, "sexo"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export declare const animalService: AnimalService;
export {};
//# sourceMappingURL=animalService.d.ts.map