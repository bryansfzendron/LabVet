import { get, post, patch, setAuthToken, clearAuth } from './api';
import { User, LoginRequest, LoginResponse } from '@/types';

// ================================
// SERVIÇO DE AUTENTICAÇÃO
// ================================

export class AuthService {
  /**
   * Fazer login do usuário
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await post<LoginResponse>('/auth/login', credentials);
    
    // Salvar token e dados do usuário
    setAuthToken(response.token);
    localStorage.setItem('labvet_user', JSON.stringify(response.user));
    
    return response;
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
    tipo: 'ADMIN' | 'GERENTE' | 'VETERINARIO' | 'ATENDENTE';
  }): Promise<User> {
    return await post<User>('/auth/register', userData);
  }

  /**
   * Listar usuários (apenas admin)
   */
  static async listUsers(): Promise<User[]> {
    return await get<User[]>('/auth/users');
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