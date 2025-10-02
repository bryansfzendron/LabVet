import { useState, useEffect } from 'react';
import { User } from '@/types';
import { authService } from '@/services/auth.service';
import { perfilService, Perfil } from '@/services/perfil.service';

// Tipos para criação e atualização de usuários
interface CreateUserData {
  nome: string;
  email: string;
  telefone?: string;
  perfilId: number;
  senha: string;
}

interface UpdateUserData {
  nome?: string;
  email?: string;
  telefone?: string;
  perfilId?: number;
  ativo?: boolean;
}

interface UseUsersConditionalOptions {
  enabled?: boolean;
}

export const useUsersConditional = (options: UseUsersConditionalOptions = {}) => {
  const { enabled = true } = options;
  
  const [users, setUsers] = useState<User[]>([]);
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar perfis disponíveis
  const loadPerfis = async () => {
    if (!enabled) return;
    
    try {
      const response = await perfilService.getPerfis();
      setPerfis(response);
    } catch (err) {
      console.error('Erro ao carregar perfis:', err);
      setError('Erro ao carregar perfis');
    }
  };

  // Carregar usuários
  const loadUsers = async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await authService.listUsers();
      setUsers(response);
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  // Criar usuário
  const createUser = async (userData: CreateUserData): Promise<User> => {
    if (!enabled) throw new Error('Operação não permitida');
    
    setLoading(true);
    setError(null);
    try {
      const newUser = await authService.register({
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        perfilId: userData.perfilId
      });
      
      await loadUsers(); // Recarregar lista
      return newUser;
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      setError('Erro ao criar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar usuário
  const updateUser = async (userId: number, userData: UpdateUserData): Promise<User> => {
    if (!enabled) throw new Error('Operação não permitida');
    
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updateUser(userId.toString(), userData);
      
      // Atualizar na lista local
      setUsers(prev => prev.map(user => 
        user.id === userId ? updatedUser : user
      ));
      
      return updatedUser;
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      setError('Erro ao atualizar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Ativar/desativar usuário
  const toggleUserStatus = async (userId: number): Promise<void> => {
    if (!enabled) throw new Error('Operação não permitida');
    
    const user = users.find(u => u.id === userId);
    if (!user) return;

    await updateUser(userId, { ativo: !user.ativo });
  };

  // Buscar usuário por ID
  const getUserById = (userId: number): User | undefined => {
    return users.find(user => user.id === userId);
  };

  // Buscar perfil por ID
  const getPerfilById = (perfilId: number): Perfil | undefined => {
    return perfis.find(perfil => perfil.id === perfilId);
  };

  // Verificar se usuário tem permissão específica
  const userHasPermission = (userId: number, permission: keyof User['perfil']['permissoes']): boolean => {
    const user = getUserById(userId);
    return user?.perfil?.permissoes?.[permission] || false;
  };

  // Filtrar usuários por perfil
  const getUsersByPerfil = (perfilId: number): User[] => {
    return users.filter(user => user.perfil.id === perfilId);
  };

  // Carregar dados iniciais apenas se habilitado
  useEffect(() => {
    if (enabled) {
      loadUsers();
      loadPerfis();
    }
  }, [enabled]);

  return {
    // Estado
    users,
    perfis,
    loading,
    error,
    
    // Ações
    loadUsers,
    loadPerfis,
    createUser,
    updateUser,
    toggleUserStatus,
    
    // Utilitários
    getUserById,
    getPerfilById,
    userHasPermission,
    getUsersByPerfil,
    
    // Computed
    activeUsers: users.filter(user => user.ativo),
    inactiveUsers: users.filter(user => !user.ativo),
    totalUsers: users.length,
  };
};