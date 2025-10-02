import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: keyof import('@/types').PerfilPermissoes;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  fallbackPath = '/dashboard'
}) => {
  const { user, isAuthenticated, hasPermission } = useAuthStore();
  const location = useLocation();

  // Se não estiver autenticado, redirecionar para login
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Verificar se o usuário tem a permissão necessária
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Acesso Negado
          </h1>

          <p className="text-gray-600 mb-6">
            Você não tem permissão para acessar esta página.
            <br />
            <span className="text-sm">
              Permissão necessária: <strong>{requiredPermission}</strong>
              <br />
              Seu perfil: <strong>{user?.perfil?.nome}</strong>
            </span>
          </p>

          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full btn-secondary"
            >
              Voltar
            </button>

            <button
              onClick={() => window.location.href = fallbackPath}
              className="w-full btn-primary"
            >
              Ir para Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar children se tudo estiver ok
  return <>{children}</>;
};

export default ProtectedRoute;
