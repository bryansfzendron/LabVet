import React from 'react';
import { DollarSign } from 'lucide-react';

const FinanceiroPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
        <p className="text-gray-600 mt-1">Gerencie as finanças do laboratório</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Página em Desenvolvimento</h3>
          <p className="text-gray-600">O módulo financeiro será implementado em breve.</p>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroPage;