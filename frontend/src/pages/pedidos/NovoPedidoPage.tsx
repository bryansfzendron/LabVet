import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

const NovoPedidoPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Pedido</h1>
          <p className="text-gray-600 mt-1">Criar um novo pedido de exame</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Página em Desenvolvimento</h3>
          <p className="text-gray-600">O formulário de novo pedido será implementado em breve.</p>
        </div>
      </div>
    </div>
  );
};

export default NovoPedidoPage;