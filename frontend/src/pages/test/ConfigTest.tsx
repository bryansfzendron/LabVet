import React, { useState } from 'react';
import { useConfigStore } from '@/stores/configStore';

const ConfigTest: React.FC = () => {
  const { 
    config, 
    isLoading, 
    error, 
    hasUnsavedChanges,
    updateEmpresa,
    saveConfig,
    resetConfig,
    clearError 
  } = useConfigStore();

  const [companyName, setCompanyName] = useState(config.empresa.nome);

  const handleSave = async () => {
    updateEmpresa({ nome: companyName });
    await saveConfig();
  };

  const handleReset = () => {
    resetConfig();
    setCompanyName('LabVet');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Teste de Configurações - Versão Simplificada
          </h1>

          {/* Status */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Status do Sistema</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Carregando:</strong> {isLoading ? 'Sim' : 'Não'}</p>
              <p><strong>Mudanças não salvas:</strong> {hasUnsavedChanges ? 'Sim' : 'Não'}</p>
              <p><strong>Erro:</strong> {error || 'Nenhum'}</p>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="text-red-800">{error}</p>
                <button
                  onClick={clearError}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Configuração da Empresa */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Configuração da Empresa
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o nome da empresa"
                />
              </div>
            </div>
          </div>

          {/* Configuração Atual */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Configuração Atual
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Salvando...' : 'Salvar Configurações'}
            </button>

            <button
              onClick={handleReset}
              disabled={isLoading}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resetar para Padrão
            </button>

            <a
              href="/dashboard"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
            >
              Ir para Dashboard
            </a>

            <a
              href="/auth/login"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-center"
            >
              Ir para Login
            </a>
          </div>

          {/* Informações */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              ℹ️ Informações do Teste
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Funcionalidades de tema e linguagem foram removidas temporariamente</li>
              <li>• Esta é uma versão simplificada para evitar conflitos</li>
              <li>• Apenas configurações básicas da empresa estão disponíveis</li>
              <li>• O sistema está funcionando sem as funcionalidades problemáticas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigTest;