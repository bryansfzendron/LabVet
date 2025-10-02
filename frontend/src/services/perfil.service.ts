import { get, post, put, del } from './api';

// ================================
// TIPOS PARA PERFIS
// ================================

export interface Perfil {
  id: number;
  nome: string;
  codigo: string;
  descricao?: string;
  permissoes?: Record<string, any>;
  ativo: boolean;
}

export interface CreatePerfilData {
  nome: string;
  codigo: string;
  descricao?: string;
  permissoes?: {
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
  };
}

export interface UpdatePerfilData {
  nome?: string;
  codigo?: string;
  descricao?: string;
  ativo?: boolean;
  permissoes?: {
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
  };
}

// ================================
// SERVIÇO DE PERFIS
// ================================

export class PerfilService {
  /**
   * Buscar todos os perfis ativos
   */
  static async getPerfis(): Promise<Perfil[]> {
    try {
      const response = await get<Perfil[]>('/perfis');
      return response;
    } catch (error) {
      console.error('Erro ao buscar perfis:', error);
      throw new Error('Falha ao carregar perfis');
    }
  }

  /**
   * Buscar todos os perfis (ativos e inativos) para gerenciamento
   */
  static async getAllPerfis(): Promise<Perfil[]> {
    try {
      const response = await get<Perfil[]>('/perfis/all');
      return response;
    } catch (error) {
      console.error('Erro ao buscar todos os perfis:', error);
      throw new Error('Falha ao carregar todos os perfis');
    }
  }

  /**
   * Buscar perfil por ID
   */
  static async getPerfilById(id: number): Promise<Perfil> {
    try {
      const response = await get<Perfil>(`/perfis/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw new Error('Falha ao carregar perfil');
    }
  }

  /**
   * Criar novo perfil
   */
  static async createPerfil(data: CreatePerfilData): Promise<Perfil> {
    try {
      const response = await post<{ perfil: Perfil }>('/perfis', data);
      return response.perfil;
    } catch (error: any) {
      console.error('Erro ao criar perfil:', error);
      
      // Capturar a mensagem de erro do backend de diferentes formas possíveis
      let errorMessage = 'Falha ao criar perfil';
      
      if (error.error) {
        errorMessage = error.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.log('Mensagem de erro capturada:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  /**
   * Atualizar perfil
   */
  static async updatePerfil(id: number, data: UpdatePerfilData): Promise<Perfil> {
    try {
      const response = await put<{ perfil: Perfil }>(`/perfis/${id}`, data);
      return response.perfil;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw new Error('Falha ao atualizar perfil');
    }
  }

  /**
   * Deletar perfil
   */
  static async deletePerfil(id: number): Promise<void> {
    try {
      await del(`/perfis/${id}`);
    } catch (error) {
      console.error('Erro ao deletar perfil:', error);
      throw new Error('Falha ao deletar perfil');
    }
  }

  /**
   * Mapear código do perfil para role do frontend (para compatibilidade)
   */
  static mapPerfilToRole(codigo: string): string {
    const mapping: Record<string, string> = {
      'ADMIN': 'admin',
      'GERENTE': 'admin', // Gerente também tem privilégios de admin
      'VETERINARIO': 'veterinario',
      'TECNICO': 'atendente',
      'OPERADOR': 'user'
    };
    return mapping[codigo] || 'user';
  }

  /**
   * Obter nome de exibição do perfil
   */
  static getPerfilDisplayName(codigo: string): string {
    const mapping: Record<string, string> = {
      'ADMIN': 'Administrador',
      'GERENTE': 'Gerente',
      'VETERINARIO': 'Veterinário',
      'TECNICO': 'Técnico',
      'OPERADOR': 'Operador'
    };
    return mapping[codigo] || codigo;
  }
}

export const perfilService = PerfilService;
export default PerfilService;