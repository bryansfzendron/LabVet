import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Store
import { useAuthStore } from '@/stores/authStore';
import { useConfigStore } from '@/stores/configStore';

// Layouts
import AuthLayout from '@/components/layouts/AuthLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Pages - Auth
import LoginPage from '@/pages/auth/LoginPage';

// Pages - Dashboard
import DashboardPage from '@/pages/dashboard/DashboardPage';

// Pages - Clientes
import ClientesPage from '@/pages/clientes/ClientesPage';
import ClienteDetalhePage from '@/pages/clientes/ClienteDetalhePage';

// Pages - Animais
import AnimaisPage from '@/pages/animais/AnimaisPage';
import AnimalDetalhePage from '@/pages/animais/AnimalDetalhePage';

// Pages - Profissionais
import ProfissionaisPage from '@/pages/profissionais/ProfissionaisPage';
import ProfissionalDetalhePage from '@/pages/profissionais/ProfissionalDetalhePage';

// Pages - Exames
import ExamesPage from '@/pages/exames/ExamesPage';
import ExameDetalhePage from '@/pages/exames/ExameDetalhePage';

// Pages - Pedidos
import PedidosPage from '@/pages/pedidos/PedidosPage';
import PedidoDetalhePage from '@/pages/pedidos/PedidoDetalhePage';
import NovoPedidoPage from '@/pages/pedidos/NovoPedidoPage';

// Pages - Relatórios
import RelatoriosPage from '@/pages/relatorios/RelatoriosPage';

// Pages - Financeiro
import FinanceiroPage from '@/pages/financeiro/FinanceiroPage';

// Pages - Configurações
import ConfiguracoesPage from '@/pages/configuracoes/ConfiguracoesPage';

// Pages - Test
import ConfigTest from '@/pages/test/ConfigTest';

// Components
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// ================================
// QUERY CLIENT
// ================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// ================================
// COMPONENTE PRINCIPAL
// ================================
const App: React.FC = () => {
  const { checkAuth } = useAuthStore();
  const { loadConfig } = useConfigStore();
  
  // Inicializar configurações e tema
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Carregar configurações
        await loadConfig();
        
        // Verificar autenticação
        await checkAuth();
      } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
      }
    };

    initializeApp();
  }, [checkAuth, loadConfig]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Test route - accessible without auth for testing */}
          <Route path="/test/config" element={<ConfigTest />} />
          
          {/* Direct login route for backward compatibility */}
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          
          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route index element={<Navigate to="/auth/login" replace />} />
          </Route>

          {/* Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            
            {/* Clientes */}
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="clientes/:id" element={<ClienteDetalhePage />} />
            
            {/* Animais */}
            <Route path="animais" element={<AnimaisPage />} />
            <Route path="animais/:id" element={<AnimalDetalhePage />} />
            
            {/* Profissionais */}
            <Route path="profissionais" element={<ProfissionaisPage />} />
            <Route path="profissionais/:id" element={<ProfissionalDetalhePage />} />
            
            {/* Exames */}
            <Route path="exames" element={<ExamesPage />} />
            <Route path="exames/:id" element={<ExameDetalhePage />} />
            
            {/* Pedidos */}
            <Route path="pedidos" element={<PedidosPage />} />
            <Route path="pedidos/novo" element={<NovoPedidoPage />} />
            <Route path="pedidos/:id" element={<PedidoDetalhePage />} />
            
            {/* Relatórios */}
            <Route path="relatorios" element={<RelatoriosPage />} />
            
            {/* Financeiro */}
            <Route path="financeiro" element={<FinanceiroPage />} />
            
            {/* Configurações */}
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
};

export default App;
