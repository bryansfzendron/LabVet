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
    role: 'admin' | 'veterinario' | 'atendente' | 'user';
  }) => Promise<boolean>;
  changePassword: (data: {
    senhaAtual: string;
    novaSenha: string;
  }) => Promise<boolean>;
  checkSession: () => Promise<void>;
  clearError: () => void;
  
  // Getters
  hasPermission: (requiredRole: User['role']) => boolean;
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
          
          // Mapear perfil do backend para role do frontend
          const perfilToRoleMap: Record<string, User['role']> = {
            'ADMIN': 'admin',
            'GERENTE': 'veterinario',
            'VETERINARIO': 'veterinario',
            'TECNICO': 'atendente',
            'OPERADOR': 'user'
          };

          const mappedRole = perfilToRoleMap[response.user.perfil.codigo] || 'user';

          const userWithRole = {
            ...response.user,
            role: mappedRole
          };
          
          set({
            user: userWithRole,
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
          // Mapear role para perfil
          const roleToPerfilMap = {
            'admin': 'ADMIN',
            'veterinario': 'VETERINARIO',
            'atendente': 'TECNICO',
            'user': 'OPERADOR'
          } as const;

          const registerData = {
            nome: userData.nome,
            email: userData.email,
            senha: userData.senha,
            perfil: roleToPerfilMap[userData.role] as 'ADMIN' | 'GERENTE' | 'VETERINARIO' | 'TECNICO' | 'OPERADOR'
          };

          await AuthService.register(registerData);
          
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
            // Mapear perfil do backend para role do frontend
            const perfilToRoleMap: Record<string, User['role']> = {
              'ADMIN': 'admin',
              'GERENTE': 'admin',
              'VETERINARIO': 'veterinario',
              'TECNICO': 'atendente',
              'OPERADOR': 'user'
            };

            const userWithRole = {
              ...currentUser,
              role: perfilToRoleMap[currentUser.perfil.codigo] || 'user'
            };

            set({
              user: userWithRole,
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
      hasPermission: (requiredRole: User['role']): boolean => {
        const { user } = get();
        if (!user) return false;

        const roleHierarchy: Record<User['role'], number> = {
          admin: 4,
          veterinario: 3,
          atendente: 2,
          user: 1,
        };

        return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
      },

      /**
       * Verificar se é admin
       */
      isAdmin: (): boolean => {
        return get().hasPermission('admin');
      },

      /**
       * Verificar se é gerente ou superior
       */
      isManager: (): boolean => {
        return get().hasPermission('veterinario');
      },

      /**
       * Verificar se é veterinário ou superior
       */
      isVeterinarian: (): boolean => {
        return get().hasPermission('veterinario');
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