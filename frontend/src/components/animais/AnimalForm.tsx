import React, { useState, useEffect } from 'react';
import { X, Save, Heart, User, Calendar, Weight, FileText } from 'lucide-react';
import { Animal, CreateAnimalRequest, Cliente } from '@/types';
import { animalService } from '@/services/animal.service';
import { clienteService } from '@/services/cliente.service';
import { toast } from 'react-hot-toast';
import SearchableDropdown from '@/components/ui/SearchableDropdown';

interface AnimalFormProps {
  animal?: Animal;
  onSave: (animal: Animal) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const AnimalForm: React.FC<AnimalFormProps> = ({
  animal,
  onSave,
  onCancel,
  isOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const [especies, setEspecies] = useState<Array<{ id: number; nome: string }>>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  interface FormData {
    nome: string;
    especieId: number;
    clienteId: number;
    raca: string;
    sexo: string;
    dataNascimento: string;
    peso: string;
    observacoes: string;
  }

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    especieId: 0,
    clienteId: 0,
    raca: '',
    sexo: '',
    dataNascimento: '',
    peso: '',
    observacoes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Carregar dados iniciais
  useEffect(() => {
    if (isOpen) {
      loadEspecies();
      loadClientes();
      
      if (animal) {
        setFormData({
          nome: animal.nome,
          especieId: animal.especie.id,
          clienteId: animal.cliente.id,
          raca: animal.raca || '',
          sexo: animal.sexo || '',
          dataNascimento: animal.dataNascimento ? animal.dataNascimento.split('T')[0] : '',
          peso: animal.peso?.toString() || '',
          observacoes: animal.observacoes || '',
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, animal]);

  const loadEspecies = async () => {
    try {
      const especiesData = await animalService.getEspecies();
      setEspecies(especiesData);
    } catch (error) {
      console.error('Erro ao carregar espécies:', error);
      toast.error('Erro ao carregar espécies');
    }
  };

  const loadClientes = async () => {
    try {
      const response = await clienteService.listar({ ativo: true, limit: 100 });
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      toast.error('Erro ao carregar clientes');
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      especieId: 0,
      clienteId: 0,
      raca: '',
      sexo: '',
      dataNascimento: '',
      peso: '',
      observacoes: '',
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.especieId || formData.especieId === 0) {
      newErrors.especieId = 'Espécie é obrigatória';
    }

    if (!formData.clienteId || formData.clienteId === 0) {
      newErrors.clienteId = 'Cliente é obrigatório';
    }

    if (!formData.sexo.trim()) {
      newErrors.sexo = 'Sexo é obrigatório';
    }

    if (formData.peso && isNaN(Number(formData.peso))) {
      newErrors.peso = 'Peso deve ser um número válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const dataToSend: CreateAnimalRequest = {
        nome: formData.nome,
        especieId: formData.especieId,
        clienteId: formData.clienteId,
        raca: formData.raca || undefined,
        sexo: formData.sexo as 'MACHO' | 'FEMEA' | 'INDEFINIDO',
        dataNascimento: formData.dataNascimento || undefined,
        peso: formData.peso ? Number(formData.peso) : undefined,
        observacoes: formData.observacoes || undefined,
      };

      let savedAnimal: Animal;
      if (animal) {
        savedAnimal = await animalService.updateAnimal(animal.id, dataToSend);
        toast.success('Animal atualizado com sucesso!');
      } else {
        savedAnimal = await animalService.createAnimal(dataToSend);
        toast.success('Animal cadastrado com sucesso!');
      }

      onSave(savedAnimal);
    } catch (error: any) {
      console.error('Erro ao salvar animal:', error);
      toast.error(error.message || 'Erro ao salvar animal');
    } finally {
      setLoading(false);
    }
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Heart className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              {animal ? 'Editar Animal' : 'Novo Animal'}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nome e Espécie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Animal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.nome ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Digite o nome do animal"
              />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Espécie <span className="text-red-500">*</span>
              </label>
              <SearchableDropdown
                options={especies}
                value={formData.especieId}
                onChange={(value) => setFormData(prev => ({ ...prev, especieId: value }))}
                placeholder="Selecione uma espécie"
                searchPlaceholder="Pesquisar espécie..."
                error={errors.especieId}
              />
            </div>
          </div>

          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Cliente (Tutor) <span className="text-red-500">*</span>
            </label>
            <SearchableDropdown
              options={clientes}
              value={formData.clienteId}
              onChange={(value) => setFormData(prev => ({ ...prev, clienteId: value }))}
              placeholder="Selecione um cliente"
              searchPlaceholder="Pesquisar cliente..."
              error={errors.clienteId}
              formatOption={(cliente) => `${cliente.nome}${cliente.email ? ` - ${cliente.email}` : ''}`}
            />
          </div>

          {/* Raça e Sexo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raça
              </label>
              <input
                type="text"
                value={formData.raca}
                onChange={(e) => setFormData(prev => ({ ...prev, raca: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite a raça"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sexo <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sexo}
                onChange={(e) => setFormData(prev => ({ ...prev, sexo: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.sexo ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione o sexo</option>
                <option value="MACHO">Macho</option>
                <option value="FEMEA">Fêmea</option>
                <option value="INDEFINIDO">Indefinido</option>
              </select>
              {errors.sexo && (
                <p className="text-red-500 text-sm mt-1">{errors.sexo}</p>
              )}
            </div>
          </div>

          {/* Data de Nascimento e Peso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Data de Nascimento
              </label>
              <input
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => setFormData(prev => ({ ...prev, dataNascimento: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Weight className="w-4 h-4 inline mr-1" />
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.peso}
                onChange={(e) => setFormData(prev => ({ ...prev, peso: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.peso ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.0"
              />
              {errors.peso && (
                <p className="text-red-500 text-sm mt-1">{errors.peso}</p>
              )}
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Observações
            </label>
            <textarea
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Observações sobre o animal..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-colors flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalForm;