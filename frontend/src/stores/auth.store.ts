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
    tipo: 'ADMIN' | 'GERENTE' | 'VETERINARIO' | 'ATENDENTE';
  }) => Promise<boolean>;
  changePassword: (data: {
    senhaAtual: string;
    novaSenha: string;
  }) => Promise<boolean>;
  checkSession: () => Promise<void>;
  clearError: () => void;
  
  // Getters
  hasPermission: (requiredRole: User['tipo']) => boolean;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isVeterinarian: () => boolean;
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
          const user = await AuthService.verifyToken();
          
          set({
            user,
            isAuthenticated: true,
            error: null,
          });
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
      hasPermission: (requiredRole: User['tipo']): boolean => {
        const { user } = get();
        if (!user) return false;

        const roleHierarchy: Record<User['tipo'], number> = {
          ADMIN: 4,
          GERENTE: 3,
          VETERINARIO: 2,
          ATENDENTE: 1,
        };

        return roleHierarchy[user.tipo] >= roleHierarchy[requiredRole];
      },

      /**
       * Verificar se é admin
       */
      isAdmin: (): boolean => {
        return get().hasPermission('ADMIN');
      },

      /**
       * Verificar se é gerente ou superior
       */
      isManager: (): boolean => {
        return get().hasPermission('GERENTE');
      },

      /**
       * Verificar se é veterinário ou superior
       */
      isVeterinarian: (): boolean => {
        return get().hasPermission('VETERINARIO');
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