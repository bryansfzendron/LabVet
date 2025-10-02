import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Profissional, 
  CreateProfissionalData, 
  TipoProfissional, 
  ESTADOS_BRASIL, 
  TIPO_PROFISSIONAL_OPTIONS 
} from '@/types/profissional';
import { useProfissionalForm, useProfissionalValidation } from '@/hooks/useProfissionais';
import CpfCnpjInput from '../ui/CpfCnpjInput';
import { Save, X, User, Mail, Phone, MapPin, FileText, Building, Hash } from 'lucide-react';

// Schema de validação com Zod
const profissionalSchema = z.object({
  nome: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  documento: z.string().optional(),
  registro: z.string().optional(),
  conselhoId: z.number().optional(),
  telefone: z.string().optional(),
  email: z.string()
    .optional()
    .refine((email) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: 'Email inválido'
    }),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  cep: z.string()
    .optional()
    .refine((cep) => !cep || /^\d{5}-?\d{3}$/.test(cep), {
      message: 'CEP inválido'
    }),
  tipo: z.nativeEnum(TipoProfissional),
  ativo: z.boolean().default(true),
});

type ProfissionalFormData = z.infer<typeof profissionalSchema>;

interface ProfissionalFormProps {
  profissional?: Profissional;
  onSave: (profissional: Profissional) => void;
  onCancel: () => void;
}

const ProfissionalForm: React.FC<ProfissionalFormProps> = ({ 
  profissional, 
  onSave, 
  onCancel 
}) => {
  const [cpfCnpjValid, setCpfCnpjValid] = useState(true);

  // Hook personalizado para o formulário
  const {
    conselhos,
    isLoading: isLoadingData,
    isSaving,
    isEditing,
    handleSubmit: submitForm,
  } = useProfissionalForm({
    profissionalId: profissional?.id,
    onSuccess: onSave,
  });

  // Hook de validação
  const { validateDocumento } = useProfissionalValidation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProfissionalFormData>({
    resolver: zodResolver(profissionalSchema),
    defaultValues: {
      nome: '',
      documento: '',
      registro: '',
      conselhoId: undefined,
      telefone: '',
      email: '',
      endereco: '',
      cidade: '',
      uf: '',
      cep: '',
      tipo: TipoProfissional.SOLICITANTE,
      ativo: true,
    },
  });

  // Preencher formulário quando profissional for carregado
  useEffect(() => {
    if (profissional) {
      reset({
        nome: profissional.nome || '',
        documento: profissional.documento || '',
        registro: profissional.registro || '',
        conselhoId: profissional.conselhoId || undefined,
        telefone: profissional.telefone || '',
        email: profissional.email || '',
        endereco: profissional.endereco || '',
        cidade: profissional.cidade || '',
        uf: profissional.uf || '',
        cep: profissional.cep || '',
        tipo: profissional.tipo,
        ativo: profissional.ativo,
      });
    }
  }, [profissional, reset]);

  // Validar documento quando mudar
  const documentoValue = watch('documento');
  useEffect(() => {
    if (documentoValue) {
      const isValid = validateDocumento(documentoValue);
      setCpfCnpjValid(isValid === null);
    } else {
      setCpfCnpjValid(true);
    }
  }, [documentoValue, validateDocumento]);

  const onSubmit = async (data: ProfissionalFormData) => {
    // Validação adicional do documento
    if (data.documento && !cpfCnpjValid) {
      return;
    }

    const submitData: CreateProfissionalData = {
      nome: data.nome.trim(),
      documento: data.documento?.trim() || undefined,
      registro: data.registro?.trim() || undefined,
      conselhoId: data.conselhoId || undefined,
      telefone: data.telefone?.trim() || undefined,
      email: data.email?.trim() || undefined,
      endereco: data.endereco?.trim() || undefined,
      cidade: data.cidade?.trim() || undefined,
      uf: data.uf || undefined,
      cep: data.cep?.trim() || undefined,
      tipo: data.tipo,
      ativo: data.ativo,
    };

    await submitForm(submitData);
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <User className="mr-2" />
          {isEditing ? 'Editar Profissional' : 'Novo Profissional'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Nome *
            </label>
            <input
              type="text"
              {...register('nome')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.nome ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nome completo do profissional"
            />
            {errors.nome && (
              <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
            )}
          </div>

          {/* Documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline w-4 h-4 mr-1" />
              CPF/CNPJ
            </label>
            <CpfCnpjInput
              value={watch('documento') || ''}
              onChange={(value, isValid) => {
                setValue('documento', value);
                setCpfCnpjValid(isValid);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
              showValidationIcon={true}
              showValidationMessage={true}
            />
          </div>

          {/* Registro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="inline w-4 h-4 mr-1" />
              Registro Profissional
            </label>
            <input
              type="text"
              {...register('registro')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: CRMV-SP 12345"
            />
          </div>

          {/* Conselho */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="inline w-4 h-4 mr-1" />
              Conselho
            </label>
            <select
              {...register('conselhoId', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um conselho</option>
              {conselhos.map((conselho) => (
                <option key={conselho.id} value={conselho.id}>
                  {conselho.sigla} - {conselho.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Profissional *
            </label>
            <select
              {...register('tipo')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.tipo ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {TIPO_PROFISSIONAL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.tipo && (
              <p className="mt-1 text-sm text-red-600">{errors.tipo.message}</p>
            )}
          </div>
        </div>

        {/* Contato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-1" />
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="email@exemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Telefone
            </label>
            <input
              type="tel"
              {...register('telefone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <MapPin className="mr-2" />
            Endereço
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Endereço */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logradouro
              </label>
              <input
                type="text"
                {...register('endereco')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rua, Avenida, etc."
              />
            </div>

            {/* CEP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                {...register('cep')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cep ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="00000-000"
                maxLength={9}
              />
              {errors.cep && (
                <p className="mt-1 text-sm text-red-600">{errors.cep.message}</p>
              )}
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                {...register('cidade')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome da cidade"
              />
            </div>

            {/* UF */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado (UF)
              </label>
              <select
                {...register('uf')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione</option>
                {ESTADOS_BRASIL.map((estado) => (
                  <option key={estado.value} value={estado.value}>
                    {estado.value} - {estado.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('ativo')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Profissional ativo
          </label>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
            disabled={isSaving}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Atualizar' : 'Salvar'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfissionalForm;