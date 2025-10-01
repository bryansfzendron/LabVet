import { useState, useEffect } from 'react';
import { User, UserRole, Permission, CreateUserData, UpdateUserData } from '@/types/user';

// Mock data - substituir por chamadas reais da API
const mockRoles: UserRole[] = [
  {
    id: '1',
    nome: 'Administrador',
    descricao: 'Acesso total ao sistema',
    nivel: 1,
    cor: 'red',
    permissoes: [] // Todas as permissões
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
    permissões: []
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Admin Sistema',
    email: 'admin@vidalab.com.br',
    telefone: '(11) 99999-9999',
    role: mockRoles[0],
    status: 'ativo',
    criadoEm: '2024-01-15T10:00:00Z',
    ultimoLogin: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    nome: 'Dr. João Silva',
    email: 'joao@vidalab.com.br',
    telefone: '(11) 98888-8888',
    role: mockRoles[2],
    status: 'ativo',
    criadoEm: '2024-01-16T09:00:00Z',
    ultimoLogin: '2024-01-20T13:15:00Z'
  },
  {
    id: '3',
    nome: 'Maria Santos',
    email: 'maria@vidalab.com.br',
    telefone: '(11) 97777-7777',
    role: mockRoles[3],
    status: 'ativo',
    criadoEm: '2024-01-17T11:00:00Z',
    ultimoLogin: '2024-01-20T12:45:00Z'
  },
  {
    id: '4',
    nome: 'Carlos Oliveira',
    email: 'carlos@vidalab.com.br',
    telefone: '(11) 96666-6666',
    role: mockRoles[1],
    status: 'inativo',
    criadoEm: '2024-01-18T08:00:00Z',
    ultimoLogin: '2024-01-19T16:20:00Z'
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
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<UserRole[]>(mockRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simular carregamento inicial
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const createUser = async (userData: CreateUserData): Promise<User> => {
    setLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const role = roles.find(r => r.id === userData.roleId);
      if (!role) throw new Error('Role não encontrada');

      const newUser: User = {
        id: Date.now().toString(),
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        role,
        status: 'ativo',
        criadoEm: new Date().toISOString(),
      };

      setUsers(prev => [...prev, newUser]);
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
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUsers(prev => prev.map(user => {
        if (user.id === userId) {
          const updatedUser = { ...user, ...userData };
          if (userData.roleId) {
            const role = roles.find(r => r.id === userData.roleId);
            if (role) updatedUser.role = role;
          }
          return updatedUser;
        }
        return user;
      }));

      const updatedUser = users.find(u => u.id === userId);
      if (!updatedUser) throw new Error('Usuário não encontrado');
      
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
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (userId: string): Promise<string> => {
    setLoading(true);
    try {
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