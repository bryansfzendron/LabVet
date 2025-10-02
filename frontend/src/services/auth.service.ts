import { get, post, patch, put, del, setAuthToken, clearAuth } from './api';
import { User, LoginRequest, LoginResponse } from '@/types';

// ================================
// SERVIÇO DE AUTENTICAÇÃO
// ================================

export class AuthService {
  /**
   * Mapear perfil do backend para role do frontend
   */
  private static mapPerfilToRole(perfil: string): User['role'] {
    const mapping: Record<string, User['role']> = {
      'ADMIN': 'admin',
      'GERENTE': 'admin', // Gerente também tem privilégios de admin
      'VETERINARIO': 'veterinario',
      'TECNICO': 'atendente',
      'OPERADOR': 'user'
    };
    return mapping[perfil] || 'user';
  }

  /**
   * Fazer login do usuário
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await post<any>('/auth/login', credentials);
    
    // Mapear dados do usuário do backend para frontend
    const mappedUser: User = {
      id: response.user.id,
      nome: response.user.nome,
      email: response.user.email,
      perfil: response.user.perfil,
      role: this.mapPerfilToRole(response.user.perfil),
      ativo: response.user.ativo,
      ultimoLogin: response.user.ultimoLogin,
      createdAt: response.user.createdAt,
      updatedAt: response.user.updatedAt
    };
    
    const loginResponse: LoginResponse = {
      message: response.message,
      user: mappedUser,
      token: response.token
    };
    
    // Salvar token e dados do usuário
    setAuthToken(loginResponse.token);
    localStorage.setItem('labvet_user', JSON.stringify(loginResponse.user));
    
    return loginResponse;
  }

  /**
   * Fazer logout do usuário
   */
  static async logout(): Promise<void> {
    try {
      await post('/auth/logout');
    } catch (error) {
      // Mesmo se der erro no servidor, limpar dados locais
      console.warn('Erro ao fazer logout no servidor:', error);
    } finally {
      clearAuth();
    }
  }

  /**
   * Verificar se o token é válido
   */
  static async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Obter token do localStorage
   */
  static getToken(): string | null {
    return localStorage.getItem('labvet_token');
  }

  /**
   * Alterar senha do usuário
   */
  static async changePassword(data: {
    senhaAtual: string;
    novaSenha: string;
  }): Promise<void> {
    await patch('/auth/change-password', data);
  }

  /**
   * Registrar novo usuário (apenas admin)
   */
  static async register(userData: {
    nome: string;
    email: string;
    senha: string;
    perfilId: number;
  }): Promise<User> {
    return await post<User>('/auth/register', userData);
  }

  /**
   * Listar usuários (apenas admin)
   */
  static async listUsers(): Promise<User[]> {
    const response = await get<{users: User[], pagination: any}>('/auth/users');
    return response.users || [];
  }

  /**
   * Atualizar usuário (apenas admin)
   */
  static async updateUser(userId: string, userData: {
    nome?: string;
    email?: string;
    role?: string;
  }): Promise<User> {
    return await put<User>(`/auth/users/${userId}`, userData);
  }

  /**
   * Deletar usuário (apenas admin) - Soft delete
   */
  static async deleteUser(userId: string): Promise<void> {
    await del(`/auth/users/${userId}`);
  }

  /**
   * Obter usuário atual do localStorage
   */
  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem('labvet_user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Verificar se o usuário está logado
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('labvet_token');
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Verificar se o usuário tem permissão específica
   */
  static hasPermission(requiredRole: User['role']): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    // Hierarquia de permissões: admin > veterinario > atendente > user
    const roleHierarchy = {
      'admin': 4,
      'veterinario': 3,
      'atendente': 2,
      'user': 1
    };

    const userLevel = roleHierarchy[user.role];
    const requiredLevel = roleHierarchy[requiredRole];

    return userLevel >= requiredLevel;
  }

  /**
   * Verificar se o usuário é admin
   */
  static isAdmin(): boolean {
    return this.hasPermission('admin');
  }

  /**
   * Verificar se o usuário é veterinário ou superior
   */
  static isVeterinarian(): boolean {
    return this.hasPermission('veterinario');
  }

  /**
   * Verificar se o usuário é atendente ou superior
   */
  static isAtendente(): boolean {
    return this.hasPermission('atendente');
  }

  /**
   * Obter nome amigável do tipo de usuário
   */
  static getRoleDisplayName(role: User['role']): string {
    const names = {
      'admin': 'Administrador',
      'veterinario': 'Veterinário',
      'atendente': 'Atendente',
      'user': 'Usuário'
    };
    return names[role] || role;
  }

  /**
   * Atualizar dados do usuário no localStorage
   */
  static updateCurrentUser(user: User): void {
    localStorage.setItem('labvet_user', JSON.stringify(user));
  }

  /**
   * Verificar sessão atual
   */
  static async checkSession(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }

    try {
      const isValid = await this.verifyToken();
      return isValid;
    } catch {
      clearAuth();
      return false;
    }
  }

  /**
   * Renovar token automaticamente
   */
  static async refreshToken(): Promise<boolean> {
    try {
      const response = await post<LoginResponse>('/auth/refresh');
      setAuthToken(response.token);
      this.updateCurrentUser(response.user);
      return true;
    } catch {
      clearAuth();
      return false;
    }
  }
}

export const authService = AuthService;
export default AuthService;