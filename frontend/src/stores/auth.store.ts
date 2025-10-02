import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginRequest } from '@/types';
import { AuthService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';

// ================================
// INTERFACE DO STORE DE AUTH
// ================================

interface AuthState {
  // Estado
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Ações
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: {
    nome: string;
    email: string;
    senha: string;
    perfilId: number;
  }) => Promise<boolean>;
  changePassword: (data: {
    senhaAtual: string;
    novaSenha: string;
  }) => Promise<boolean>;
  checkSession: () => Promise<void>;
  clearError: () => void;
  
  // Getters
  hasPermission: (permission: keyof User['perfil']['permissoes']) => boolean;
  isAdmin: () => boolean;
  canManageUsers: () => boolean;
  canAccessReports: () => boolean;
  canManageOrders: () => boolean;
  canManageClients: () => boolean;
  canManageAnimals: () => boolean;
  canManageExams: () => boolean;
  canAccessFinancial: () => boolean;
  canManageSchedule: () => boolean;
  canAccessSettings: () => boolean;
}

// ================================
// STORE DE AUTENTICAÇÃO
// ================================

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ================================
      // AÇÕES
      // ================================

      /**
       * Fazer login
       */
      login: async (credentials: LoginRequest): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          const response = await AuthService.login(credentials);
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success(`Bem-vindo, ${response.user.nome}!`);
          return true;
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.error || 'Erro ao fazer login',
          });

          return false;
        }
      },

      /**
       * Fazer logout
       */
      logout: async (): Promise<void> => {
        set({ isLoading: true });

        try {
          await AuthService.logout();
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          toast.success('Logout realizado com sucesso');
        } catch (error: any) {
          // Mesmo com erro, limpar estado local
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          console.error('Erro ao fazer logout:', error);
        }
      },

      /**
       * Registrar novo usuário
       */
      register: async (userData): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          await AuthService.register(userData);
          
          set({
            isLoading: false,
            error: null,
          });

          toast.success('Usuário registrado com sucesso!');
          return true;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.error || 'Erro ao registrar usuário',
          });

          return false;
        }
      },

      /**
       * Alterar senha
       */
      changePassword: async (data): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          await AuthService.changePassword(data);
          
          set({
            isLoading: false,
            error: null,
          });

          toast.success('Senha alterada com sucesso!');
          return true;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.error || 'Erro ao alterar senha',
          });

          return false;
        }
      },

      /**
       * Verificar sessão
       */
      checkSession: async (): Promise<void> => {
        // Não mostrar loading para verificação de sessão
        const currentUser = AuthService.getCurrentUser();
        
        if (!currentUser || !AuthService.isAuthenticated()) {
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
          return;
        }

        try {
          const isValid = await AuthService.verifyToken();
          
          if (isValid) {
            set({
              user: currentUser,
              isAuthenticated: true,
              error: null,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              error: null,
            });
          }
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      /**
       * Limpar erro
       */
      clearError: (): void => {
        set({ error: null });
      },

      // ================================
      // GETTERS
      // ================================

      /**
       * Verificar permissão
       */
      hasPermission: (permission: keyof User['perfil']['permissoes']): boolean => {
        const { user } = get();
        if (!user || !user.perfil || !user.perfil.permissoes) return false;

        return !!user.perfil.permissoes[permission];
      },

      /**
       * Verificar se é admin
       */
      isAdmin: (): boolean => {
        return get().hasPermission('admin');
      },

      /**
       * Verificar se pode gerenciar usuários
       */
      canManageUsers: (): boolean => {
        return get().hasPermission('usuarios');
      },

      /**
       * Verificar se pode acessar relatórios
       */
      canAccessReports: (): boolean => {
        return get().hasPermission('relatorios');
      },

      /**
       * Verificar se pode gerenciar pedidos
       */
      canManageOrders: (): boolean => {
        return get().hasPermission('pedidos');
      },

      /**
       * Verificar se pode gerenciar clientes
       */
      canManageClients: (): boolean => {
        return get().hasPermission('clientes');
      },

      /**
       * Verificar se pode gerenciar animais
       */
      canManageAnimals: (): boolean => {
        return get().hasPermission('animais');
      },

      /**
       * Verificar se pode gerenciar exames
       */
      canManageExams: (): boolean => {
        return get().hasPermission('exames');
      },

      /**
       * Verificar se pode acessar financeiro
       */
      canAccessFinancial: (): boolean => {
        return get().hasPermission('financeiro');
      },

      /**
       * Verificar se pode gerenciar agenda
       */
      canManageSchedule: (): boolean => {
        return get().hasPermission('agenda');
      },

      /**
       * Verificar se pode acessar configurações
       */
      canAccessSettings: (): boolean => {
        return get().hasPermission('configuracoes');
      },
    }),
    {
      name: 'labvet-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;