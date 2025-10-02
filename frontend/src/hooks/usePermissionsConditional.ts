import { useState, useEffect } from 'react';
import { get, put } from '@/services/api';

interface PerfilPermissoes {
  admin?: boolean;
  configuracoes?: boolean;
  usuarios?: boolean;
  relatorios?: boolean;
  pedidos?: boolean;
  laudos?: boolean;
  clientes?: boolean;
  animais?: boolean;
  exames?: boolean;
  financeiro?: boolean;
  agenda?: boolean;
  dashboard?: boolean;
}

interface Perfil {
  id: number;
  nome: string;
  codigo: string;
  descricao?: string;
  permissoes: PerfilPermissoes;
  ativo: boolean;
}

interface UsePermissionsConditionalProps {
  enabled: boolean;
}

interface UsePermissionsConditionalReturn {
  perfis: Perfil[];
  loading: boolean;
  saving: boolean;
  error: string | null;
  success: string | null;
  loadPerfis: () => Promise<void>;
  updatePermissoes: (perfilId: number, permissoes: PerfilPermissoes) => Promise<void>;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

export const usePermissionsConditional = ({ 
  enabled 
}: UsePermissionsConditionalProps): UsePermissionsConditionalReturn => {
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadPerfis = async () => {
    if (!enabled) {
      console.log('PermissionsManagement: Chamadas de API desabilitadas - usuário sem permissão');
      return;
    }

    try {
      setLoading(true);
      const response = await get('/perfis') as Perfil[];
      setPerfis(response);
    } catch (error) {
      console.error('Erro ao carregar perfis:', error);
      setError('Erro ao carregar perfis');
    } finally {
      setLoading(false);
    }
  };

  const updatePermissoes = async (perfilId: number, permissoes: PerfilPermissoes) => {
    if (!enabled) {
      console.log('PermissionsManagement: Chamadas de API para update desabilitadas - usuário sem permissão');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      const response = await put(`/perfis/${perfilId}/permissoes`, permissoes) as { perfil: Perfil };
      
      // Atualizar o perfil na lista
      setPerfis(prev => prev.map(p => 
        p.id === perfilId 
          ? { ...p, permissoes: response.perfil.permissoes }
          : p
      ));
      
      setSuccess('Permissões atualizadas com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (error: any) {
      console.error('Erro ao salvar permissões:', error);
      setError(error.response?.data?.error || 'Erro ao salvar permissões');
    } finally {
      setSaving(false);
    }
  };

  // Carregar perfis automaticamente apenas se habilitado
  useEffect(() => {
    if (enabled) {
      loadPerfis();
    }
  }, [enabled]);

  return {
    perfis,
    loading,
    saving,
    error,
    success,
    loadPerfis,
    updatePermissoes,
    setError,
    setSuccess
  };
};