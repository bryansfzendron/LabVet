import { useState, useEffect } from 'react';

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  ativo: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Mock para desenvolvimento - simular usuário logado
    setUser({
      id: 1,
      nome: 'Usuário Teste',
      email: 'teste@labvet.com',
      tipo: 'admin',
      ativo: true
    });
    setIsAuthenticated(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock para desenvolvimento
    if (email === 'admin@labvet.com' && password === 'admin') {
      setUser({
        id: 1,
        nome: 'Administrador',
        email: 'admin@labvet.com',
        tipo: 'admin',
        ativo: true
      });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (requiredRole: string): boolean => {
    if (!user) return false;
    
    const roleHierarchy: { [key: string]: number } = {
      'user': 1,
      'veterinario': 2,
      'admin': 3,
      'super_admin': 4
    };

    const userLevel = roleHierarchy[user.tipo] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    return userLevel >= requiredLevel;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    hasPermission
  };
};