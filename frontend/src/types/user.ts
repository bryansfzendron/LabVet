export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  criadoEm: string;
  ultimoLogin?: string;
  permissoes?: Permission[];
}

export interface UserRole {
  id: string;
  nome: string;
  descricao: string;
  nivel: number; // 1=Admin, 2=Gerente, 3=Veterinário, 4=Atendente
  cor: string;
  permissoes: Permission[];
}

export interface Permission {
  id: string;
  nome: string;
  descricao: string;
  modulo: string;
  acao: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export type UserStatus = 'ativo' | 'inativo' | 'bloqueado' | 'pendente';

export interface CreateUserData {
  nome: string;
  email: string;
  telefone?: string;
  roleId: string;
  senha: string;
  confirmarSenha: string;
}

export interface UpdateUserData {
  nome?: string;
  email?: string;
  telefone?: string;
  roleId?: string;
  status?: UserStatus;
}