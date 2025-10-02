import React from 'react';
import { useLocation } from 'react-router-dom';
import { useConfigStore } from '@/stores/configStore';
import { useAuthStore } from '@/stores/auth.store';
import MaintenancePage from '@/pages/maintenance/MaintenancePage';

interface MaintenanceCheckerProps {
  children: React.ReactNode;
}

const MaintenanceChecker: React.FC<MaintenanceCheckerProps> = ({ children }) => {
  const location = useLocation();
  const { config } = useConfigStore();
  const { user } = useAuthStore();

  // Rotas que sempre devem ser acessíveis, mesmo em manutenção
  const allowedRoutes = [
    '/login',
    '/auth/login',
    '/maintenance',
    '/manutencao'
  ];

  const isAllowedRoute = allowedRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  // Se o sistema não está em manutenção, permitir acesso normal
  if (!config.sistema.manutencao) {
    return <>{children}</>;
  }

  // Se está em manutenção
  if (config.sistema.manutencao) {
    // Sempre permitir rotas de autenticação
    if (isAllowedRoute) {
      return <>{children}</>;
    }
    
    // Para outras rotas, permitir acesso apenas para administradores
    const isAdmin = user && user.perfil?.permissoes?.admin;
    
    if (!isAdmin) {
      return <MaintenancePage />;
    }
  }

  return <>{children}</>;
};

export default MaintenanceChecker;