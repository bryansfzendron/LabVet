import React from 'react';
import { Heart, Calendar, User, Eye, Edit, Trash2, RotateCcw } from 'lucide-react';
import { Animal } from '@/types';

interface AnimalCardProps {
  animal: Animal;
  onView?: (animal: Animal) => void;
  onEdit?: (animal: Animal) => void;
  onDelete?: (animal: Animal) => void;
  onReactivate?: (animal: Animal) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  onView,
  onEdit,
  onDelete,
  onReactivate,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getIdadeDisplay = () => {
    if (!animal.dataNascimento) return 'Idade não informada';
    
    const hoje = new Date();
    const nascimento = new Date(animal.dataNascimento);
    const diffTime = Math.abs(hoje.getTime() - nascimento.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} dias`;
    } else if (diffDays < 365) {
      const meses = Math.floor(diffDays / 30);
      return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    } else {
      const anos = Math.floor(diffDays / 365);
      const mesesRestantes = Math.floor((diffDays % 365) / 30);
      if (mesesRestantes === 0) {
        return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
      }
      return `${anos}a ${mesesRestantes}m`;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
      animal.ativo ? 'border-gray-100' : 'border-red-200 bg-red-50'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              animal.ativo ? 'bg-primary-100' : 'bg-red-100'
            }`}>
              <Heart className={`w-6 h-6 ${
                animal.ativo ? 'text-primary-600' : 'text-red-600'
              }`} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {animal.nome}
              </h3>
              <p className="text-sm text-gray-600">
                {animal.especie?.nome || 'Espécie não informada'}
                {animal.raca && ` • ${animal.raca}`}
              </p>
            </div>
          </div>
          
          {!animal.ativo && (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              Inativo
            </span>
          )}
        </div>

        {/* Informações principais */}
        <div className="space-y-3">
          {/* Cliente */}
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">Tutor:</span>
            <span className="ml-1">{animal.cliente?.nome || 'Não informado'}</span>
          </div>

          {/* Idade */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">Idade:</span>
            <span className="ml-1">{getIdadeDisplay()}</span>
          </div>

          {/* Sexo e Peso */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium">Sexo:</span>
              <span className="ml-1">{animal.sexo || 'Não informado'}</span>
            </div>
            {animal.peso && (
              <div className="flex items-center">
                <span className="font-medium">Peso:</span>
                <span className="ml-1">{animal.peso}kg</span>
              </div>
            )}
          </div>

          {/* Observações */}
          {animal.observacoes && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Obs:</span>
              <span className="ml-1">{animal.observacoes}</span>
            </div>
          )}

          {/* Data de cadastro */}
          <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
            <Calendar className="w-3 h-3 mr-1" />
            Cadastrado em {formatDate(animal.criadoEm)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
          {onView && (
            <button
              onClick={() => onView(animal)}
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Visualizar"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          
          {animal.ativo ? (
            <>
              {onEdit && (
                <button
                  onClick={() => onEdit(animal)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={() => onDelete(animal)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Desativar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            onReactivate && (
              <button
                onClick={() => onReactivate(animal)}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Reativar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;