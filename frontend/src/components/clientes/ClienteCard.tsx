import React from 'react';
import { Cliente } from '../../types/cliente';
import { CpfCnpjValidator } from '../../utils/cpfCnpjValidator';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  FileText
} from 'lucide-react';

interface ClienteCardProps {
  cliente: Cliente;
  onEdit?: (cliente: Cliente) => void;
  onDelete?: (cliente: Cliente) => void;
  onView?: (cliente: Cliente) => void;
  showActions?: boolean;
}

const ClienteCard: React.FC<ClienteCardProps> = ({
  cliente,
  onEdit,
  onDelete,
  onView,
  showActions = true
}) => {
  const getDocumentType = () => {
    return CpfCnpjValidator.detectDocumentType(cliente.cpfCnpj);
  };

  const getStatusBadge = () => {
    const isActive = cliente.ativo;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? (
          <>
            <CheckCircle size={12} className="mr-1" />
            Ativo
          </>
        ) : (
          <>
            <XCircle size={12} className="mr-1" />
            Inativo
          </>
        )}
      </span>
    );
  };

  const getDocumentTypeBadge = () => {
    const type = getDocumentType();
    if (!type) return null;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
        type === 'CPF' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-purple-100 text-purple-800'
      }`}>
        {type === 'CPF' ? (
          <>
            <User size={12} className="mr-1" />
            Pessoa Física
          </>
        ) : (
          <>
            <Building size={12} className="mr-1" />
            Pessoa Jurídica
          </>
        )}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      {/* Header do Card */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {cliente.nome}
            </h3>
            <div className="flex items-center space-x-2">
              {getStatusBadge()}
              {getDocumentTypeBadge()}
            </div>
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-1 ml-4">
              {onView && (
                <button
                  onClick={() => onView(cliente)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Visualizar detalhes"
                >
                  <FileText size={16} />
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(cliente)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                  title="Editar cliente"
                >
                  <Edit size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(cliente)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Excluir cliente"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 space-y-3">
        {/* Informações de Contato */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Mail size={14} className="mr-2 text-gray-400" />
            <span className="truncate">{cliente.email}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Phone size={14} className="mr-2 text-gray-400" />
            <span>{cliente.telefone}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Building size={14} className="mr-2 text-gray-400" />
            <span className="font-mono">{cliente.cpfCnpj}</span>
          </div>

          {cliente.endereco && (
            <div className="flex items-start text-sm text-gray-600">
              <MapPin size={14} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="truncate">{truncateText(cliente.endereco, 50)}</span>
            </div>
          )}
        </div>

        {/* Observações */}
        {cliente.observacoes && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Observações:</span>{' '}
              {truncateText(cliente.observacoes, 100)}
            </p>
          </div>
        )}

        {/* Footer com datas */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            Criado em {formatDate(cliente.createdAt)}
          </div>
          
          {cliente.updatedAt !== cliente.createdAt && (
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              Atualizado em {formatDate(cliente.updatedAt)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClienteCard;
