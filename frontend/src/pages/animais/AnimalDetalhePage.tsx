import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

const AnimalDetalhePage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detalhes do Animal</h1>
          <p className="text-gray-600 mt-1">ID: {id}</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Página em Desenvolvimento
          </h3>
          <p className="text-gray-600">
            Os detalhes do animal serão implementados em breve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetalhePage;