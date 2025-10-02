import * as bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';

interface JWTPayload {
  userId: number;
  email: string;
  perfil: string;
}

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

// Dados mockados de usuários (em produção viria do banco)
const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Administrador',
    email: 'admin@labvet.com',
    senha_hash: '', // Será preenchido no init
    role: 'admin',
    ativo: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },
  {
    id: '2',
    nome: 'Dr. João Silva',
    email: 'joao@labvet.com',
    senha_hash: '', // Será preenchido no init
    role: 'veterinario',
    ativo: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },
  {
    id: '3',
    nome: 'Maria Santos',
    email: 'maria@labvet.com',
    senha_hash: '', // Será preenchido no init
    role: 'atendente',
    ativo: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  }
];

// Inicializar senhas hash (simula dados que viriam do banco)
const initializeUsers = async () => {
  const defaultPassword = 'labvet123';
  const saltRounds = 10;
  
  for (const user of mockUsers) {
    if (!user.senha_hash) {
      user.senha_hash = await bcrypt.hash(defaultPassword, saltRounds);
    }
  }
};

// Inicializar na primeira execução
initializeUsers();

class UserService {
  async login(loginData: LoginRequest): Promise<LoginResponse | null> {
    const { email, senha } = loginData;
    
    // Buscar usuário por email
    const user = mockUsers.find(u => u.email === email && u.ativo);
    
    if (!user) {
      return null;
    }
    
    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, user.senha_hash);
    
    if (!senhaValida) {
      return null;
    }
    
    // Atualizar último login
    user.ultimo_login = new Date();
    user.updated_at = new Date();
    
    // Gerar token JWT
    const token = generateToken(
      parseInt(user.id), // userId
      user.email,        // email
      user.role          // perfil
    );
    
    // Retornar dados sem a senha
    const { senha_hash, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  async createUser(userData: CreateUserRequest): Promise<Omit<User, 'senha_hash'> | null> {
    const { nome, email, senha, role = 'user' } = userData;
    
    // Verificar se email já existe
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return null;
    }
    
    // Hash da senha
    const saltRounds = 10;
    const senha_hash = await bcrypt.hash(senha, saltRounds);
    
    // Criar novo usuário
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      nome,
      email,
      senha_hash,
      role,
      ativo: true,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    mockUsers.push(newUser);
    
    // Retornar sem a senha
    const { senha_hash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  
  async getUserById(id: string): Promise<Omit<User, 'senha_hash'> | null> {
    const user = mockUsers.find(u => u.id === id && u.ativo);
    
    if (!user) {
      return null;
    }
    
    const { senha_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  async getAllUsers(): Promise<Omit<User, 'senha_hash'>[]> {
    return mockUsers
      .map(({ senha_hash, ...user }) => user);
  }
  
  async updateUser(id: string, updateData: Partial<CreateUserRequest & { ativo?: boolean }>): Promise<Omit<User, 'senha_hash'> | null> {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return null;
    }
    
    const user = mockUsers[userIndex];
    if (!user) {
      return null;
    }
    
    // Atualizar campos
    if (updateData.nome) user.nome = updateData.nome;
    if (updateData.email) user.email = updateData.email;
    if (updateData.role) user.role = updateData.role;
    if (typeof updateData.ativo === 'boolean') user.ativo = updateData.ativo;
    
    // Atualizar senha se fornecida
    if (updateData.senha) {
      const saltRounds = 10;
      user.senha_hash = await bcrypt.hash(updateData.senha, saltRounds);
    }
    
    user.updated_at = new Date();
    
    const { senha_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  async deleteUser(id: string): Promise<boolean> {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return false;
    }
    
    const user = mockUsers[userIndex];
    if (!user) {
      return false;
    }
    
    // Soft delete - marcar como inativo
    user.ativo = false;
    user.updated_at = new Date();
    
    return true;
  }
}

export const userService = new UserService();
