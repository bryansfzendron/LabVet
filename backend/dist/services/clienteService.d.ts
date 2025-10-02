import { Cliente } from '@prisma/client';
export interface CreateClienteRequest {
    nome: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    uf?: string;
    telefone?: string;
    fax?: string;
    celular?: string;
    email?: string;
    cpfCnpj?: string;
    contato?: string;
    restricao?: string;
    codVetResp?: number;
    ativo?: string;
}
export interface UpdateClienteRequest extends Partial<CreateClienteRequest> {
    id: number;
}
export interface ClienteFilters {
    search?: string | undefined;
    ativo?: string | undefined;
    cidade?: string | undefined;
    uf?: string | undefined;
    codVetResp?: number | undefined;
}
export interface PaginationOptions {
    page: number;
    limit: number;
    orderBy?: string;
    order?: 'asc' | 'desc';
}
export interface ClienteWithDetails extends Cliente {
    veterinarioResp?: {
        id: number;
        nome: string;
        registro?: string | null;
        telefone?: string | null;
        email?: string | null;
    } | null;
    _count?: {
        animais: number;
        pedidos: number;
    };
}
declare class ClienteService {
    getClientes(filters: ClienteFilters | undefined, pagination: PaginationOptions): Promise<{
        data: ({
            _count: {
                animais: number;
                pedidos: number;
            };
            veterinarioResp: {
                id: number;
                nome: string;
                registro: string | null;
            } | null;
        } & {
            email: string | null;
            id: number;
            nome: string;
            ativo: string;
            createdAt: Date;
            updatedAt: Date;
            endereco: string | null;
            numero: string | null;
            complemento: string | null;
            bairro: string | null;
            cep: string | null;
            cidade: string | null;
            uf: string | null;
            telefone: string | null;
            fax: string | null;
            celular: string | null;
            cpfCnpj: string | null;
            contato: string | null;
            dataCadastro: Date;
            restricao: string | null;
            dataAtualizacao: Date | null;
            codVetResp: number | null;
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
    getClienteById(id: number): Promise<ClienteWithDetails | null>;
    createCliente(data: CreateClienteRequest): Promise<Cliente>;
    updateCliente(id: number, data: Partial<CreateClienteRequest>): Promise<Cliente | null>;
    deleteCliente(id: number): Promise<{
        deleted: boolean;
        message: string;
    }>;
    reactivateCliente(id: number): Promise<Cliente | null>;
    searchClientes(query: string, limit?: number): Promise<{
        email: string | null;
        id: number;
        nome: string;
        cidade: string | null;
        uf: string | null;
        telefone: string | null;
        celular: string | null;
        cpfCnpj: string | null;
    }[]>;
    getClienteStats(): Promise<{
        total: number;
        ativos: number;
        inativos: number;
        comAnimais: number;
        comPedidos: number;
        semAnimais: number;
    }>;
}
export declare const clienteService: ClienteService;
export {};
//# sourceMappingURL=clienteService.d.ts.map