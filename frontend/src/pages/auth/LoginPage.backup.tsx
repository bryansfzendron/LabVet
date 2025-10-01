import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { LoginRequest } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// ================================
// INTERFACES
// ================================

interface LoginFormData extends LoginRequest {}

// ================================
// COMPONENTE
// ================================

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Página de destino após login
  const from = (location.state as any)?.from || '/dashboard';

  // ================================
  // HANDLERS
  // ================================

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data);
    
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ================================
  // RENDER
  // ================================

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Fazer Login
        </h2>
        <p className="text-gray-600">
          Entre com suas credenciais para acessar o sistema
        </p>
      </div>

      {/* Erro global */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-700 text-sm font-medium">
              {error}
            </span>
          </div>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`input-field ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="seu@email.com"
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Senha */}
        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className={`input-field pr-10 ${errors.senha ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="••••••••"
              {...register('senha', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter pelo menos 6 caracteres',
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.senha && (
            <p className="mt-1 text-sm text-red-600">
              {errors.senha.message}
            </p>
          )}
        </div>

        {/* Botão de submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary flex items-center justify-center"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" color="white" />
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Entrar
            </>
          )}
        </button>
      </form>

      {/* Links adicionais */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Esqueceu sua senha?{' '}
          <button
            type="button"
            className="text-primary-600 hover:text-primary-700 font-medium"
            onClick={() => {
              // TODO: Implementar recuperação de senha
              alert('Funcionalidade em desenvolvimento');
            }}
          >
            Recuperar senha
          </button>
        </p>
      </div>

      {/* Informações de desenvolvimento */}
      {import.meta.env.DEV && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Credenciais de Teste:
          </h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Admin:</strong> admin@labvet.com / admin123</p>
            <p><strong>Gerente:</strong> gerente@labvet.com / gerente123</p>
            <p><strong>Veterinário:</strong> vet@labvet.com / vet123</p>
            <p><strong>Atendente:</strong> atendente@labvet.com / atendente123</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;