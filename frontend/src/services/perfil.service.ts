import { get } from './api';

// ================================
// TIPOS PARA PERFIS
// ================================

export interface Perfil {
  id: number;
  nome: string;
  codigo: string;
  descricao?: string;
  permissoes?: Record<string, any>;
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