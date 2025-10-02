import React from 'react';
import { Profissional, TipoProfissional } from '@/types/profissional';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Building, 
  Hash,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface ProfissionalCardProps {
  profissional: Profissional;
  onEdit?: (profissional: Profissional) => void;
  onDelete?: (profissional: Profissional) => void;
  onToggleStatus?: (profissional: Profissional) => void;
  showActions?: boolean;
}

const ProfissionalCard: React.FC<ProfissionalCardProps> = ({
  profissional,
  onEdit,
  onDelete,
  onToggleStatus,
  showActions = true,
}) => {
  const getTipoLabel = (tipo: TipoProfissional): string => {
    switch (tipo) {
      case TipoProfissional.SOLICITANTE:
        return 'Solicitante';
      case TipoProfissional.INTERNO:
        return 'Interno';
      case TipoProfissional.AMBOS:
        return 'Ambos';
      default:
        return tipo;
    }
  };

  const getTipoColor = (tipo: TipoProfissional): string => {
    switch (tipo) {
      case TipoProfissional.SOLICITANTE:
        return 'bg-blue-100 text-blue-800';
      case TipoProfissional.INTERNO:
        return 'bg-green-100 text-green-800';
      case TipoProfissional.AMBOS:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDocument = (documento: string | null): string => {
    if (!documento) return '';
    
    const cleanDoc = documento.replace(/\D/g, '');
    
    if (cleanDoc.length === 11) {
      // CPF
      return cleanDoc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cleanDoc.length === 14) {
      // CNPJ
      return cleanDoc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    
    return documento;
  };

  const formatPhone = (telefone: string | null): string => {
    if (!telefone) return '';
    
    const cleanPhone = telefone.replace(/\D/g, '');
    
    if (cleanPhone.length === 11) {
      return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleanPhone.length === 10) {
      return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 p-6 hover:shadow-lg transition-shadow ${
      profissional.ativo ? 'border-l-green-500' : 'border-l-red-500'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <User className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              {profissional.nome}
            </h3>
            <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getTipoColor(profissional.tipo)}`}>
              {getTipoLabel(profissional.tipo)}
            </span>
          </div>
          
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
              profissional.ativo 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {profissional.ativo ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(profissional)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Editar profissional"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            
            {onToggleStatus && (
              <button
                onClick={() => onToggleStatus(profissional)}
                className={`p-2 rounded-md transition-colors ${
                  profissional.ativo
                    ? 'text-orange-600 hover:bg-orange-50'
                    : 'text-green-600 hover:bg-green-50'
                }`}
                title={profissional.ativo ? 'Desativar profissional' : 'Ativar profissional'}
              >
                {profissional.ativo ? (
                  <ToggleRight className="w-4 h-4" />
                ) : (
                  <ToggleLeft className="w-4 h-4" />
                )}
              </button>
            )}
            
            {onDelete && (
              <button
                onClick={() => onDelete(profissional)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Excluir profissional"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Documento e Registro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profissional.documento && (
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              <span>{formatDocument(profissional.documento)}</span>
            </div>
          )}
          
          {profissional.registro && (
            <div className="flex items-center text-sm text-gray-600">
              <Hash className="w-4 h-4 mr-2" />
              <span>{profissional.registro}</span>
            </div>
          )}
        </div>

        {/* Conselho */}
        {profissional.conselho && (
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            <span>{profissional.conselho.sigla} - {profissional.conselho.nome}</span>
          </div>
        )}

        {/* Contato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profissional.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <a 
                href={`mailto:${profissional.email}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {profissional.email}
              </a>
            </div>
          )}
          
          {profissional.telefone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <a 
                href={`tel:${profissional.telefone}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {formatPhone(profissional.telefone)}
              </a>
            </div>
          )}
        </div>

        {/* Endereço */}
        {(profissional.endereco || profissional.cidade || profissional.uf) && (
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              {profissional.endereco && (
                <div>{profissional.endereco}</div>
              )}
              {(profissional.cidade || profissional.uf) && (
                <div>
                  {profissional.cidade}
                  {profissional.cidade && profissional.uf && ', '}
                  {profissional.uf}
                  {profissional.cep && ` - ${profissional.cep}`}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            Criado em: {new Date(profissional.createdAt).toLocaleDateString('pt-BR')}
          </span>
          {profissional.updatedAt !== profissional.createdAt && (
            <span>
              Atualizado em: {new Date(profissional.updatedAt).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfissionalCard;