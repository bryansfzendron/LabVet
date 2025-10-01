import React from 'react';
import {
  Users,
  Heart,
  TestTube,
  FileText,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

// ================================
// COMPONENTE
// ================================

const DashboardPage: React.FC = () => {
  // TODO: Implementar hooks para buscar dados reais
  const stats = {
    clientes: 1247,
    animais: 2156,
    examesPendentes: 23,
    pedidosHoje: 15,
    faturamentoMes: 45780.50,
    crescimentoMes: 12.5,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'pedido',
      message: 'Novo pedido de exame para Rex (Golden Retriever)',
      time: '5 min atrás',
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      id: 2,
      type: 'resultado',
      message: 'Resultado liberado para Mimi (Gato Persa)',
      time: '15 min atrás',
      icon: TestTube,
      color: 'text-green-600',
    },
    {
      id: 3,
      type: 'cliente',
      message: 'Novo cliente cadastrado: Dr. João Silva',
      time: '1 hora atrás',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      id: 4,
      type: 'urgente',
      message: 'Exame urgente aguardando coleta',
      time: '2 horas atrás',
      icon: AlertCircle,
      color: 'text-red-600',
    },
  ];

  const upcomingExams = [
    {
      id: 1,
      animal: 'Buddy',
      cliente: 'Maria Santos',
      exame: 'Hemograma Completo',
      horario: '09:30',
      status: 'agendado',
    },
    {
      id: 2,
      animal: 'Luna',
      cliente: 'Carlos Oliveira',
      exame: 'Bioquímica Sérica',
      horario: '10:15',
      status: 'confirmado',
    },
    {
      id: 3,
      animal: 'Max',
      cliente: 'Ana Costa',
      exame: 'Urinálise',
      horario: '11:00',
      status: 'agendado',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Visão geral do sistema de laboratório veterinário
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Clientes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clientes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.clientes.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+8.2%</span>
            <span className="text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </div>

        {/* Animais */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Animais</p>
              <p className="text-3xl font-bold text-gray-900">{stats.animais.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12.1%</span>
            <span className="text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </div>

        {/* Exames Pendentes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Exames Pendentes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.examesPendentes}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TestTube className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-yellow-600 font-medium">3 urgentes</span>
          </div>
        </div>

        {/* Faturamento */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Faturamento (Mês)</p>
              <p className="text-3xl font-bold text-gray-900">
                R$ {stats.faturamentoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+{stats.crescimentoMes}%</span>
            <span className="text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Atividades Recentes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.color === 'text-blue-600' ? 'bg-blue-100' :
                    activity.color === 'text-green-600' ? 'bg-green-100' :
                    activity.color === 'text-purple-600' ? 'bg-purple-100' :
                    'bg-red-100'
                  }`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Próximos Exames */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Próximos Exames</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{exam.animal}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        exam.status === 'confirmado' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {exam.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{exam.cliente}</p>
                    <p className="text-sm text-gray-500">{exam.exame}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{exam.horario}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                Ver todos os agendamentos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Novo Pedido</span>
          </button>
          
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Novo Cliente</span>
          </button>
          
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Novo Animal</span>
          </button>
          
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TestTube className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Liberar Resultado</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;