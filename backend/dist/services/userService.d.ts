export interface User {
    id: string;
    nome: string;
    email: string;
    senha_hash: string;
    role: 'admin' | 'veterinario' | 'atendente' | 'user';
    ativo: boolean;
    ultimo_login?: Date;
    created_at: Date;
    updated_at: Date;
}
export interface LoginRequest {
    email: string;
    senha: string;
}
export interface LoginResponse {
    user: Omit<User, 'senha_hash'>;
    token: string;
}
export interface CreateUserRequest {
    nome: string;
    email: string;
    senha: string;
    role?: 'admin' | 'veterinario' | 'atendente' | 'user';
}
declare class UserService {
    login(loginData: LoginRequest): Promise<LoginResponse | null>;
    createUser(userData: CreateUserRequest): Promise<Omit<User, 'senha_hash'> | null>;
    getUserById(id: string): Promise<Omit<User, 'senha_hash'> | null>;
    getAllUsers(): Promise<Omit<User, 'senha_hash'>[]>;
    updateUser(id: string, updateData: Partial<CreateUserRequest & {
        ativo?: boolean;
    }>): Promise<Omit<User, 'senha_hash'> | null>;
    deleteUser(id: string): Promise<boolean>;
}
export declare const userService: UserService;
export {};
//# sourceMappingURL=userService.d.ts.map