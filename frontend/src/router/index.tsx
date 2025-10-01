import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '@/components/layouts/AuthLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Auth Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Pages
import LoginPage from '@/pages/auth/LoginPage';
import TestLoginPage from '@/pages/TestLoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';

// Clientes
import ClientesPage from '@/pages/clientes/ClientesPage';
import ClienteDetalhePage from '@/pages/clientes/ClienteDetalhePage';

// Animais
import AnimaisPage from '@/pages/animais/AnimaisPage';
import AnimalDetalhePage from '@/pages/animais/AnimalDetalhePage';

// Profissionais
import ProfissionaisPage from '@/pages/profissionais/ProfissionaisPage';
import ProfissionalDetalhePage from '@/pages/profissionais/ProfissionalDetalhePage';

// Exames
import ExamesPage from '@/pages/exames/ExamesPage';
import ExameDetalhePage from '@/pages/exames/ExameDetalhePage';

// Pedidos
import PedidosPage from '@/pages/pedidos/PedidosPage';
import PedidoDetalhePage from '@/pages/pedidos/PedidoDetalhePage';
import NovoPedidoPage from '@/pages/pedidos/NovoPedidoPage';

// Relatórios
import RelatoriosPage from '@/pages/relatorios/RelatoriosPage';

// Financeiro
import FinanceiroPage from '@/pages/financeiro/FinanceiroPage';

// Configurações
import ConfiguracoesPage from '@/pages/configuracoes/ConfiguracoesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <TestLoginPage />,
      },
      {
        path: 'test',
        element: <TestLoginPage />,
      },
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      // Clientes
      {
        path: 'clientes',
        element: <ClientesPage />,
      },
      {
        path: 'clientes/:id',
        element: <ClienteDetalhePage />,
      },
      // Animais
      {
        path: 'animais',
        element: <AnimaisPage />,
      },
      {
        path: 'animais/:id',
        element: <AnimalDetalhePage />,
      },
      // Profissionais
      {
        path: 'profissionais',
        element: <ProfissionaisPage />,
      },
      {
        path: 'profissionais/:id',
        element: <ProfissionalDetalhePage />,
      },
      // Exames
      {
        path: 'exames',
        element: <ExamesPage />,
      },
      {
        path: 'exames/:id',
        element: <ExameDetalhePage />,
      },
      // Pedidos
      {
        path: 'pedidos',
        element: <PedidosPage />,
      },
      {
        path: 'pedidos/novo',
        element: <NovoPedidoPage />,
      },
      {
        path: 'pedidos/:id',
        element: <PedidoDetalhePage />,
      },
      // Relatórios
      {
        path: 'relatorios',
        element: <RelatoriosPage />,
      },
      // Financeiro
      {
        path: 'financeiro',
        element: <FinanceiroPage />,
      },
      // Configurações
      {
        path: 'configuracoes',
        element: <ConfiguracoesPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;



