import React from 'react';
import { Wrench, Clock, Mail, Phone, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Ícone de Manutenção */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
            <Wrench className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Sistema em Manutenção
        </h1>

        {/* Descrição */}
        <p className="text-gray-600 mb-6">
          Estamos realizando melhorias no sistema para oferecer uma melhor experiência. 
          Voltaremos em breve!
        </p>

        {/* Tempo estimado */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center text-orange-700">
            <Clock className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">
              Tempo estimado: Em breve
            </span>
          </div>
        </div>

        {/* Acesso para Administradores */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-700 mb-3 font-medium">
            🔑 Acesso para Administradores
          </p>
          <Link
            to="/auth/login"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Fazer Login
          </Link>
        </div>

        {/* Informações de contato */}
        <div className="border-t pt-6">
          <p className="text-sm text-gray-500 mb-4">
            Em caso de urgência, entre em contato:
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>suporte@labvet.com</span>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>(11) 9999-9999</span>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-lg font-semibold text-blue-600">LabVet</h2>
          <p className="text-xs text-gray-400">Sistema de Gestão Veterinária</p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;