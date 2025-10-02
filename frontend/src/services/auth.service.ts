import { get, post, patch, put, setAuthToken, clearAuth } from './api';
import { User, LoginRequest, LoginResponse } from '@/types';

// ================================
// SERVIÇO DE AUTENTICAÇÃO
// ================================

export class AuthService {

  /**
   * Fazer login
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await post<LoginResponse>('/auth/login', credentials);
    
    // Salvar dados no localStorage (sem modificar o usuário)
    localStorage.setItem('labvet_token', response.token);
    localStorage.setItem('labvet_user', JSON.stringify(response.user));
    
    // Configurar token para próximas requisições
    setAuthToken(response.token);
    
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
    perfilId?: number;
    ativo?: boolean;
  }): Promise<User> {
    return await put<User>(`/auth/users/${userId}`, userData);
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
  static hasPermission(permission: keyof User['perfil']['permissoes']): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    return !!user.perfil.permissoes[permission];
  }

  /**
   * Verificar se o usuário é admin
   */
  static isAdmin(): boolean {
    return this.hasPermission('admin');
  }

  /**
   * Verificar se o usuário pode gerenciar usuários
   */
  static canManageUsers(): boolean {
    return this.hasPermission('usuarios');
  }

  /**
   * Verificar se o usuário pode acessar relatórios
   */
  static canAccessReports(): boolean {
    return this.hasPermission('relatorios');
  }

  /**
   * Verificar se o usuário pode gerenciar pedidos
   */
  static canManageOrders(): boolean {
    return this.hasPermission('pedidos');
  }

  /**
   * Verificar se o usuário pode gerenciar laudos
   */
  static canManageReports(): boolean {
    return this.hasPermission('laudos');
  }

  /**
   * Verificar se o usuário pode gerenciar clientes
   */
  static canManageClients(): boolean {
    return this.hasPermission('clientes');
  }

  /**
   * Verificar se o usuário pode gerenciar animais
   */
  static canManageAnimals(): boolean {
    return this.hasPermission('animais');
  }

  /**
   * Verificar se o usuário pode gerenciar exames
   */
  static canManageExams(): boolean {
    return this.hasPermission('exames');
  }

  /**
   * Verificar se o usuário pode acessar financeiro
   */
  static canAccessFinancial(): boolean {
    return this.hasPermission('financeiro');
  }

  /**
   * Verificar se o usuário pode gerenciar agenda
   */
  static canManageSchedule(): boolean {
    return this.hasPermission('agenda');
  }

  /**
   * Verificar se o usuário pode acessar configurações
   */
  static canAccessSettings(): boolean {
    return this.hasPermission('configuracoes');
  }

  /**
   * Obter nome amigável do perfil
   */
  static getPerfilDisplayName(perfil: User['perfil']): string {
    return perfil.nome;
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