import { useState, useEffect } from 'react';
import { User, UserRole, Permission, CreateUserData, UpdateUserData } from '@/types/user';
import { User as BackendUserType } from '@/types';
import { authService } from '@/services/auth.service';

// Tipo para dados que vêm do backend via HTTP (datas como strings)
interface BackendUser extends Omit<BackendUserType, 'created_at' | 'ultimo_login'> {
  created_at: string;
  ultimo_login?: string;
}

// Mock data para roles - isso pode vir do backend depois
const mockRoles: UserRole[] = [
  {
    id: '1',
    nome: 'Administrador',
    descricao: 'Acesso total ao sistema',
    nivel: 1,
    cor: 'red',
    permissoes: []
  },
  {
    id: '2',
    nome: 'Gerente',
    descricao: 'Gerenciamento geral exceto configurações críticas',
    nivel: 2,
    cor: 'blue',
    permissoes: []
  },
  {
    id: '3',
    nome: 'Veterinário',
    descricao: 'Acesso a exames e laudos',
    nivel: 3,
    cor: 'green',
    permissoes: []
  },
  {
    id: '4',
    nome: 'Atendente',
    descricao: 'Atendimento e cadastros básicos',
    nivel: 4,
    cor: 'yellow',
    permissoes: []
  }
];

const mockPermissions: Permission[] = [
  // Dashboard
  { id: 'dashboard_view', nome: 'Visualizar Dashboard', descricao: 'Acesso ao painel principal', modulo: 'dashboard', acao: 'read' },
  
  // Clientes
  { id: 'clientes_view', nome: 'Visualizar Clientes', descricao: 'Ver lista de clientes', modulo: 'clientes', acao: 'read' },
  { id: 'clientes_create', nome: 'Criar Clientes', descricao: 'Cadastrar novos clientes', modulo: 'clientes', acao: 'create' },
  { id: 'clientes_edit', nome: 'Editar Clientes', descricao: 'Modificar dados de clientes', modulo: 'clientes', acao: 'update' },
  { id: 'clientes_delete', nome: 'Excluir Clientes', descricao: 'Remover clientes do sistema', modulo: 'clientes', acao: 'delete' },
  
  // Animais
  { id: 'animais_view', nome: 'Visualizar Animais', descricao: 'Ver lista de animais', modulo: 'animais', acao: 'read' },
  { id: 'animais_create', nome: 'Cadastrar Animais', descricao: 'Registrar novos animais', modulo: 'animais', acao: 'create' },
  { id: 'animais_edit', nome: 'Editar Animais', descricao: 'Modificar dados de animais', modulo: 'animais', acao: 'update' },
  { id: 'animais_delete', nome: 'Excluir Animais', descricao: 'Remover animais do sistema', modulo: 'animais', acao: 'delete' },
  
  // Exames
  { id: 'exames_view', nome: 'Visualizar Exames', descricao: 'Ver tipos de exames', modulo: 'exames', acao: 'read' },
  { id: 'exames_create', nome: 'Criar Exames', descricao: 'Cadastrar novos tipos de exames', modulo: 'exames', acao: 'create' },
  { id: 'exames_edit', nome: 'Editar Exames', descricao: 'Modificar exames', modulo: 'exames', acao: 'update' },
  { id: 'exames_delete', nome: 'Excluir Exames', descricao: 'Remover exames', modulo: 'exames', acao: 'delete' },
  
  // Pedidos
  { id: 'pedidos_view', nome: 'Visualizar Pedidos', descricao: 'Ver pedidos de exames', modulo: 'pedidos', acao: 'read' },
  { id: 'pedidos_create', nome: 'Criar Pedidos', descricao: 'Fazer novos pedidos', modulo: 'pedidos', acao: 'create' },
  { id: 'pedidos_edit', nome: 'Editar Pedidos', descricao: 'Modificar pedidos', modulo: 'pedidos', acao: 'update' },
  { id: 'pedidos_delete', nome: 'Cancelar Pedidos', descricao: 'Cancelar pedidos', modulo: 'pedidos', acao: 'delete' },
  
  // Laudos
  { id: 'laudos_view', nome: 'Visualizar Laudos', descricao: 'Ver laudos de exames', modulo: 'laudos', acao: 'read' },
  { id: 'laudos_create', nome: 'Criar Laudos', descricao: 'Elaborar laudos', modulo: 'laudos', acao: 'create' },
  { id: 'laudos_edit', nome: 'Editar Laudos', descricao: 'Modificar laudos', modulo: 'laudos', acao: 'update' },
  { id: 'laudos_approve', nome: 'Aprovar Laudos', descricao: 'Aprovar e liberar laudos', modulo: 'laudos', acao: 'manage' },
  
  // Relatórios
  { id: 'relatorios_view', nome: 'Visualizar Relatórios', descricao: 'Acessar relatórios', modulo: 'relatorios', acao: 'read' },
  { id: 'relatorios_export', nome: 'Exportar Relatórios', descricao: 'Exportar dados', modulo: 'relatorios', acao: 'manage' },
  
  // Financeiro
  { id: 'financeiro_view', nome: 'Visualizar Financeiro', descricao: 'Ver dados financeiros', modulo: 'financeiro', acao: 'read' },
  { id: 'financeiro_manage', nome: 'Gerenciar Financeiro', descricao: 'Controle financeiro completo', modulo: 'financeiro', acao: 'manage' },
  
  // Configurações
  { id: 'config_view', nome: 'Visualizar Configurações', descricao: 'Ver configurações', modulo: 'configuracoes', acao: 'read' },
  { id: 'config_edit', nome: 'Editar Configurações', descricao: 'Modificar configurações', modulo: 'configuracoes', acao: 'update' },
  { id: 'config_users', nome: 'Gerenciar Usuários', descricao: 'Administrar usuários', modulo: 'configuracoes', acao: 'manage' },
];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles] = useState<UserRole[]>(mockRoles);
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para mapear perfil do backend para role do frontend
  const getRoleFromBackendType = (backendRole: string): UserRole => {
    const roleMapping: Record<string, UserRole> = {
      'admin': mockRoles[0],
      'veterinario': mockRoles[2],
      'atendente': mockRoles[3],
      'user': mockRoles[3] // user vira Atendente no frontend
    };
    return roleMapping[backendRole] || mockRoles[3];
  };

  // Converter usuário do backend para formato do frontend
  const convertBackendUser = (backendUser: BackendUser): User => ({
    id: backendUser.id,
    nome: backendUser.nome,
    email: backendUser.email,
    telefone: '', // Backend não tem telefone ainda
    role: getRoleFromBackendType(backendUser.role),
    status: backendUser.ativo ? 'ativo' : 'inativo' as const,
    criadoEm: backendUser.created_at,
    ultimoLogin: backendUser.ultimo_login
  });

  // Carregar usuários do backend
  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await authService.listUsers();
      const convertedUsers = usersData.map(convertBackendUser);
      setUsers(convertedUsers);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar usuários');
      console.error('Erro ao carregar usuários:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (userData: CreateUserData): Promise<User> => {
    setLoading(true);
    try {
      // Mapear roleId para role do backend
      const roleMapping: Record<string, 'admin' | 'veterinario' | 'atendente' | 'user'> = {
        '1': 'admin',
        '2': 'veterinario', // Gerente vira veterinario no backend
        '3': 'veterinario',
        '4': 'atendente'
      };

      const backendUserData = {
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        role: roleMapping[userData.roleId] || 'user'
      };

      const newBackendUser = await authService.register(backendUserData);
      const newUser = convertBackendUser(newBackendUser);
      
      // Recarregar lista de usuários para garantir sincronização
      await loadUsers();
      
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: string, userData: UpdateUserData): Promise<User> => {
    setLoading(true);
    try {
      // Mapear roleId para role do backend se fornecido
      const backendUserData: any = {
        nome: userData.nome,
        email: userData.email,
      };

      if (userData.roleId) {
        const roleMapping: Record<string, string> = {
          '1': 'admin',
          '2': 'veterinario', // Gerente vira veterinario no backend
          '3': 'veterinario',
          '4': 'atendente'
        };
        backendUserData.role = roleMapping[userData.roleId] || 'user';
      }

      // Mapear status para ativo (boolean) se fornecido
      if (userData.status) {
        backendUserData.ativo = userData.status === 'ativo';
      }

      // Chamar o endpoint real do backend
      const updatedBackendUser = await authService.updateUser(userId, backendUserData);
      const updatedUser = convertBackendUser(updatedBackendUser);
      
      // Atualizar a lista local
      setUsers(prev => prev.map(user => 
        user.id === userId ? updatedUser : user
      ));

      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    setLoading(true);
    try {
      // Usar o endpoint real de delete do backend
      await authService.deleteUser(userId);
      
      // Recarregar a lista para garantir sincronização
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao inativar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (userId: string): Promise<string> => {
    setLoading(true);
    try {
      // TODO: Implementar endpoint de reset de senha no backend
      await new Promise(resolve => setTimeout(resolve, 800));
      const newPassword = Math.random().toString(36).slice(-8);
      return newPassword;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao resetar senha');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    roles,
    permissions,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    resetPassword,
    clearError: () => setError(null)
  };
};