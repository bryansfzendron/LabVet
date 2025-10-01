import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

// ================================
// COMPONENTE
// ================================

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4">
            <Logo size="lg" showText={false} className="justify-center" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LabVet
          </h1>
          
          <p className="text-gray-600">
            Sistema de Laboratório Veterinário
          </p>
        </div>

        {/* Card de autenticação */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} LabVet. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;