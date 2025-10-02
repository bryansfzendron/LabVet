import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { 
  Profissional, 
  CreateProfissionalData, 
  UpdateProfissionalData, 
  ProfissionalFilters, 
  ProfissionalListResponse,
  TipoProfissional,
  Conselho 
} from '@/types/profissional';
import { profissionalService } from '@/services/profissional.service';

// ================================
// HOOK PRINCIPAL - LISTAGEM DE PROFISSIONAIS
// ================================

interface UseProfissionaisOptions {
  initialFilters?: ProfissionalFilters;
  initialPage?: number;
  initialLimit?: number;
  autoFetch?: boolean;
}

export function useProfissionais(options: UseProfissionaisOptions = {}) {
  const {
    initialFilters = {},
    initialPage = 1,
    initialLimit = 10,
    autoFetch = true
  } = options;

  const [filters, setFilters] = useState<ProfissionalFilters>(initialFilters);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const queryClient = useQueryClient();

  // Query para listar profissionais
  const {
    data: response,
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['profissionais', filters, page, limit],
    queryFn: () => profissionalService.listar(filters, page, limit),
    enabled: autoFetch,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
  });

  // Funções para manipular filtros e paginação
  const updateFilters = useCallback((newFilters: Partial<ProfissionalFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1); // Reset para primeira página ao filtrar
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset para primeira página ao mudar limite
  }, []);

  // Função para buscar dados manualmente
  const fetchData = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    // Dados
    profissionais: response?.profissionais || [],
    total: response?.total || 0,
    totalPages: response?.totalPages || 0,
    currentPage: page,
    limit,
    
    // Estados
    isLoading,
    isFetching,
    error,
    
    // Filtros
    filters,
    updateFilters,
    clearFilters,
    
    // Paginação
    goToPage,
    changeLimit,
    
    // Ações
    refetch: fetchData,
  };
}

// ================================
// HOOK PARA BUSCAR PROFISSIONAL POR ID
// ================================

export function useProfissional(id: number | null) {
  return useQuery({
    queryKey: ['profissional', id],
    queryFn: () => profissionalService.buscarPorId(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}

// ================================
// HOOK PARA CRIAR PROFISSIONAL
// ================================

export function useCreateProfissional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfissionalData) => profissionalService.criar(data),
    onSuccess: (novoProfissional) => {
      // Invalidar cache da listagem
      queryClient.invalidateQueries({ queryKey: ['profissionais'] });
      
      // Adicionar ao cache individual
      queryClient.setQueryData(['profissional', novoProfissional.id], novoProfissional);
      
      toast.success('Profissional criado com sucesso!');
    },
    onError: (error: any) => {
      const message = error?.message || 'Erro ao criar profissional';
      toast.error(message);
      console.error('Erro ao criar profissional:', error);
    },
  });
}

// ================================
// HOOK PARA ATUALIZAR PROFISSIONAL
// ================================

export function useUpdateProfissional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfissionalData) => profissionalService.atualizar(data),
    onSuccess: (profissionalAtualizado) => {
      // Invalidar cache da listagem
      queryClient.invalidateQueries({ queryKey: ['profissionais'] });
      
      // Atualizar cache individual
      queryClient.setQueryData(['profissional', profissionalAtualizado.id], profissionalAtualizado);
      
      toast.success('Profissional atualizado com sucesso!');
    },
    onError: (error: any) => {
      const message = error?.message || 'Erro ao atualizar profissional';
      toast.error(message);
      console.error('Erro ao atualizar profissional:', error);
    },
  });
}

// ================================
// HOOK PARA EXCLUIR PROFISSIONAL
// ================================

export function useDeleteProfissional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => profissionalService.excluir(id),
    onSuccess: (_, id) => {
      // Invalidar cache da listagem
      queryClient.invalidateQueries({ queryKey: ['profissionais'] });
      
      // Remover do cache individual
      queryClient.removeQueries({ queryKey: ['profissional', id] });
      
      toast.success('Profissional excluído com sucesso!');
    },
    onError: (error: any) => {
      const message = error?.message || 'Erro ao excluir profissional';
      toast.error(message);
      console.error('Erro ao excluir profissional:', error);
    },
  });
}

// ================================
// HOOK PARA ALTERAR STATUS DO PROFISSIONAL
// ================================

export function useToggleProfissionalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ativo }: { id: number; ativo: boolean }) => 
      profissionalService.alterarStatus(id, ativo),
    onSuccess: (profissionalAtualizado) => {
      // Invalidar cache da listagem
      queryClient.invalidateQueries({ queryKey: ['profissionais'] });
      
      // Atualizar cache individual
      queryClient.setQueryData(['profissional', profissionalAtualizado.id], profissionalAtualizado);
      
      const status = profissionalAtualizado.ativo ? 'ativado' : 'desativado';
      toast.success(`Profissional ${status} com sucesso!`);
    },
    onError: (error: any) => {
      const message = error?.message || 'Erro ao alterar status do profissional';
      toast.error(message);
      console.error('Erro ao alterar status do profissional:', error);
    },
  });
}

// ================================
// HOOK PARA LISTAR CONSELHOS
// ================================

export function useConselhos() {
  return useQuery({
    queryKey: ['conselhos'],
    queryFn: () => profissionalService.listarConselhos(),
    staleTime: 30 * 60 * 1000, // 30 minutos (dados mais estáveis)
    cacheTime: 60 * 60 * 1000, // 1 hora
  });
}

// ================================
// HOOK PARA BUSCAR PROFISSIONAIS POR TIPO
// ================================

export function useProfissionaisPorTipo(tipo: TipoProfissional | null) {
  return useQuery({
    queryKey: ['profissionais-por-tipo', tipo],
    queryFn: () => profissionalService.buscarPorTipo(tipo!),
    enabled: !!tipo,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}

// ================================
// HOOK PARA FORMULÁRIO DE PROFISSIONAL
// ================================

interface UseProfissionalFormOptions {
  profissionalId?: number | null;
  onSuccess?: (profissional: Profissional) => void;
  onError?: (error: any) => void;
}

export function useProfissionalForm(options: UseProfissionalFormOptions = {}) {
  const { profissionalId, onSuccess, onError } = options;

  // Buscar dados do profissional se estiver editando
  const { data: profissional, isLoading: isLoadingProfissional } = useProfissional(profissionalId || null);
  
  // Buscar lista de conselhos
  const { data: conselhos = [], isLoading: isLoadingConselhos } = useConselhos();

  // Mutations
  const createMutation = useCreateProfissional();
  const updateMutation = useUpdateProfissional();

  const isEditing = !!profissionalId;
  const isLoading = isLoadingProfissional || isLoadingConselhos;
  const isSaving = createMutation.isLoading || updateMutation.isLoading;

  const handleSubmit = useCallback(async (data: CreateProfissionalData) => {
    try {
      let result: Profissional;

      if (isEditing && profissionalId) {
        result = await updateMutation.mutateAsync({ ...data, id: profissionalId });
      } else {
        result = await createMutation.mutateAsync(data);
      }

      onSuccess?.(result);
      return result;
    } catch (error) {
      onError?.(error);
      throw error;
    }
  }, [isEditing, profissionalId, createMutation, updateMutation, onSuccess, onError]);

  return {
    // Dados
    profissional,
    conselhos,
    
    // Estados
    isLoading,
    isSaving,
    isEditing,
    
    // Ações
    handleSubmit,
    
    // Erros
    createError: createMutation.error,
    updateError: updateMutation.error,
  };
}

// ================================
// HOOK PARA VALIDAÇÃO DE FORMULÁRIO
// ================================

export function useProfissionalValidation() {
  const validateNome = useCallback((nome: string): string | null => {
    if (!nome?.trim()) {
      return 'Nome é obrigatório';
    }
    if (nome.trim().length < 2) {
      return 'Nome deve ter pelo menos 2 caracteres';
    }
    if (nome.trim().length > 100) {
      return 'Nome deve ter no máximo 100 caracteres';
    }
    return null;
  }, []);

  const validateEmail = useCallback((email: string): string | null => {
    if (!email) return null; // Email é opcional
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email inválido';
    }
    return null;
  }, []);

  const validateTelefone = useCallback((telefone: string): string | null => {
    if (!telefone) return null; // Telefone é opcional
    
    const cleanPhone = telefone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return 'Telefone deve ter 10 ou 11 dígitos';
    }
    return null;
  }, []);

  const validateDocumento = useCallback((documento: string): string | null => {
    if (!documento) return null; // Documento é opcional
    
    if (!profissionalService.validateDocumento(documento)) {
      return 'CPF ou CNPJ inválido';
    }
    return null;
  }, []);

  const validateCEP = useCallback((cep: string): string | null => {
    if (!cep) return null; // CEP é opcional
    
    const cleanCEP = cep.replace(/\D/g, '');
    if (cleanCEP.length !== 8) {
      return 'CEP deve ter 8 dígitos';
    }
    return null;
  }, []);

  return {
    validateNome,
    validateEmail,
    validateTelefone,
    validateDocumento,
    validateCEP,
  };
}

// Hook para deletar profissional
export function useProfissionalDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => profissionalService.excluir(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['profissionais']);
    },
  });
}

// Hook para alterar status do profissional
export function useProfissionalChangeStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ativo }: { id: number; ativo: boolean }) => 
      profissionalService.alterarStatus(id, ativo),
    onSuccess: () => {
      queryClient.invalidateQueries(['profissionais']);
    },
  });
}