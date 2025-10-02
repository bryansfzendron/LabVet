import { useState, useEffect } from 'react';
import { User, UserRole, Permission, CreateUserData, UpdateUserData } from '@/types/user';
import { User as BackendUserType } from '@/types';
import { authService } from '@/services/auth.service';
import { perfilService, Perfil } from '@/services/perfil.service';

// Tipo para dados que vêm do backend via HTTP (datas como strings)
interface BackendUser {
  id: number;
  nome: string;
  email: string;
  perfilId: number;
  perfil: {
    id: number;
    nome: string;
    codigo: string;
    descricao: string;
  };
  ativo: boolean;
  ultimoLogin?: string;
  createdAt: string;
}

// Mock data para roles - isso pode vir do backend depois
// Permissões padrão do sistema (mantidas para compatibilidade)
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

/**
 * Converter perfil do backend para UserRole do frontend
 */
const convertPerfilToUserRole = (perfil: Perfil): UserRole => {
  // Mapear cores baseado no código do perfil
  const colorMapping: Record<string, string> = {
    'ADMIN': 'red',
    'GERENTE': 'blue', 
    'VETERINARIO': 'green',
    'TECNICO': 'yellow',
    'OPERADOR': 'gray'
  };

  // Mapear nível baseado no código do perfil
  const levelMapping: Record<string, number> = {
    'ADMIN': 1,
    'GERENTE': 2,
    'VETERINARIO': 3,
    'TECNICO': 4,
    'OPERADOR': 5
  };

  return {
    id: perfil.id.toString(),
    nome: perfil.nome,
    descricao: perfil.descricao || '',
    nivel: levelMapping[perfil.codigo] || 5,
    cor: colorMapping[perfil.codigo] || 'gray',
    permissoes: [] // As permissões podem ser extraídas do campo permissoes do perfil se necessário
  };
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar perfis do backend
  const loadRoles = async () => {
    try {
      const perfis = await perfilService.getPerfis();
      const userRoles = perfis.map(convertPerfilToUserRole);
      setRoles(userRoles);
    } catch (err) {
      console.error('Erro ao carregar perfis:', err);
      setError('Falha ao carregar perfis');
    }
  };

  // Função para mapear perfil do backend para role do frontend
  const getRoleFromBackendPerfil = (perfilCodigo: string): UserRole | null => {
    const role = roles.find(r => {
      // Mapear códigos do backend para nomes dos roles
      const codeMapping: Record<string, string> = {
        'ADMIN': 'Administrador',
        'GERENTE': 'Gerente', 
        'VETERINARIO': 'Veterinário',
        'TECNICO': 'Técnico',
        'OPERADOR': 'Operador'
      };
      return r.nome === codeMapping[perfilCodigo];
    });
    return role || null;
  };



  // Carregar usuários do backend
  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await authService.listUsers();
      // Converter User[] do backend para User[] do frontend (tipos compatíveis)
      const frontendUsers: User[] = usersData.map(backendUser => ({
        id: backendUser.id.toString(),
        nome: backendUser.nome,
        email: backendUser.email,
        telefone: '', // Backend não tem telefone ainda
        role: getRoleFromBackendPerfil(backendUser.perfil.codigo) || {
          id: backendUser.perfil.id.toString(),
          nome: backendUser.perfil.nome,
          descricao: backendUser.perfil.descricao,
          nivel: 4,
          cor: 'gray',
          permissoes: []
        },
        status: backendUser.ativo ? 'ativo' : 'inativo' as const,
        criadoEm: backendUser.createdAt,
        ultimoLogin: backendUser.ultimoLogin
      }));
      setUsers(frontendUsers);
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
    loadRoles();
  }, []);

  const createUser = async (userData: CreateUserData): Promise<User> => {
    setLoading(true);
    try {
      // Encontrar o perfil pelo roleId
      const selectedRole = roles.find(r => r.id === userData.roleId);
      if (!selectedRole) {
        throw new Error('Perfil não encontrado');
      }

      // Buscar o perfil no backend pelo nome para obter o ID
      const perfis = await perfilService.getPerfis();
      const perfilBackend = perfis.find((p: Perfil) => p.nome === selectedRole.nome);
      
      if (!perfilBackend) {
        throw new Error('Perfil não encontrado no backend');
      }

      const backendUserData = {
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        perfilId: perfilBackend.id
      };

      await authService.register(backendUserData);
      
      // Recarregar lista de usuários para garantir sincronização
      await loadUsers();
      
      // Retornar o usuário criado da lista atualizada
      const createdUser = users.find(u => u.email === userData.email);
      if (!createdUser) {
        throw new Error('Usuário criado mas não encontrado na lista');
      }
      
      return createdUser;
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
      await authService.updateUser(userId, backendUserData);
      
      // Recarregar lista de usuários para garantir sincronização
      await loadUsers();
      
      // Retornar o usuário atualizado da lista
      const updatedUser = users.find(u => u.id === userId);
      if (!updatedUser) {
        throw new Error('Usuário atualizado mas não encontrado na lista');
      }

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