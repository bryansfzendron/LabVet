import React, { useState, useEffect } from 'react';
import { Cliente, CreateClienteRequest, UpdateClienteRequest } from '../../types/cliente';
import { clienteService } from '../../services/cliente.service';
import CpfCnpjInput from '../ui/CpfCnpjInput';
import { Save, X, User, Building, Mail, Phone, MapPin, FileText } from 'lucide-react';

interface ClienteFormProps {
  cliente?: Cliente;
  onSave: (cliente: Cliente) => void;
  onCancel: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpfCnpj: '',
    endereco: '',
    observacoes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [cpfCnpjValid, setCpfCnpjValid] = useState(false);

  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome || '',
        email: cliente.email || '',
        telefone: cliente.telefone || '',
        cpfCnpj: cliente.cpfCnpj || '',
        endereco: cliente.endereco || '',
        observacoes: cliente.observacoes || ''
      });
    }
  }, [cliente]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.cpfCnpj.trim()) {
      newErrors.cpfCnpj = 'CPF/CNPJ é obrigatório';
    } else if (!cpfCnpjValid) {
      newErrors.cpfCnpj = 'CPF/CNPJ inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      let savedCliente: Cliente;
      
      if (cliente?.id) {
        const updateData: UpdateClienteRequest = {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cpfCnpj: formData.cpfCnpj,
          endereco: formData.endereco,
          observacoes: formData.observacoes
        };
        savedCliente = await clienteService.update(cliente.id, updateData);
      } else {
        const createData: CreateClienteRequest = {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cpfCnpj: formData.cpfCnpj,
          endereco: formData.endereco,
          observacoes: formData.observacoes
        };
        savedCliente = await clienteService.create(createData);
      }
      
      onSave(savedCliente);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setErrors({ submit: 'Erro ao salvar cliente. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Remove erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCpfCnpjChange = (value: string, isValid: boolean) => {
    handleInputChange('cpfCnpj', value);
    setCpfCnpjValid(isValid);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          {cliente?.id ? (
            <>
              <User className="mr-2" size={24} />
              Editar Cliente
            </>
          ) : (
            <>
              <User className="mr-2" size={24} />
              Novo Cliente
            </>
          )}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User size={16} className="inline mr-1" />
            Nome Completo *
          </label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.nome ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Digite o nome completo"
            disabled={isLoading}
          />
          {errors.nome && <p className="text-xs text-red-600 mt-1">{errors.nome}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Mail size={16} className="inline mr-1" />
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="exemplo@email.com"
            disabled={isLoading}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* CPF/CNPJ com validação avançada */}
        <div>
          <CpfCnpjInput
            label={
              <span className="flex items-center">
                <Building size={16} className="mr-1" />
                CPF/CNPJ *
              </span>
            }
            value={formData.cpfCnpj}
            onChange={handleCpfCnpjChange}
            error={errors.cpfCnpj}
            disabled={isLoading}
            showGenerateButton={!cliente?.id} // Só mostra botão gerar em novos clientes
            required
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone size={16} className="inline mr-1" />
            Telefone *
          </label>
          <input
            type="tel"
            value={formData.telefone}
            onChange={(e) => handleInputChange('telefone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.telefone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="(11) 99999-9999"
            disabled={isLoading}
          />
          {errors.telefone && <p className="text-xs text-red-600 mt-1">{errors.telefone}</p>}
        </div>

        {/* Endereço */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin size={16} className="inline mr-1" />
            Endereço
          </label>
          <input
            type="text"
            value={formData.endereco}
            onChange={(e) => handleInputChange('endereco', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rua, número, bairro, cidade"
            disabled={isLoading}
          />
        </div>

        {/* Observações */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText size={16} className="inline mr-1" />
            Observações
          </label>
          <textarea
            value={formData.observacoes}
            onChange={(e) => handleInputChange('observacoes', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Informações adicionais sobre o cliente"
            disabled={isLoading}
          />
        </div>

        {/* Erro geral */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <X size={16} className="mr-1" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading || !cpfCnpjValid}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Save size={16} className="mr-1" />
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
