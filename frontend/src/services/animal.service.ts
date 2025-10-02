import { get, post, put, patch, del } from './api';
import { Animal, CreateAnimalRequest, AnimalFilters, PaginatedResponse } from '@/types';

// ================================
// SERVIÇO DE ANIMAIS
// ================================

export class AnimalService {
  private static baseUrl = '/animais';

  /**
   * Listar animais com filtros e paginação
   */
  static async getAnimais(filters: AnimalFilters = {}): Promise<PaginatedResponse<Animal>> {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.especieId) params.append('especieId', filters.especieId.toString());
    if (filters.clienteId) params.append('clienteId', filters.clienteId.toString());
    if (filters.ativo !== undefined) params.append('ativo', filters.ativo.toString());
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const query = params.toString();
    return await get<PaginatedResponse<Animal>>(`${this.baseUrl}${query ? `?${query}` : ''}`);
  }

  /**
   * Buscar animal por ID
   */
  static async getAnimalById(id: number): Promise<Animal> {
    return await get<Animal>(`${this.baseUrl}/${id}`);
  }

  /**
   * Buscar animais por cliente
   */
  static async getAnimaisByCliente(clienteId: number): Promise<Animal[]> {
    return await get<Animal[]>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  /**
   * Buscar animais para autocomplete
   */
  static async searchAnimais(query: string): Promise<Animal[]> {
    const params = new URLSearchParams({ q: query });
    return await get<Animal[]>(`${this.baseUrl}/search?${params}`);
  }

  /**
   * Criar novo animal
   */
  static async createAnimal(data: CreateAnimalRequest): Promise<Animal> {
    return await post<Animal, CreateAnimalRequest>(this.baseUrl, data);
  }

  /**
   * Atualizar animal
   */
  static async updateAnimal(id: number, data: Partial<CreateAnimalRequest>): Promise<Animal> {
    return await put<Animal, Partial<CreateAnimalRequest>>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Desativar animal (soft delete)
   */
  static async deleteAnimal(id: number): Promise<void> {
    await del<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Reativar animal
   */
  static async reactivateAnimal(id: number): Promise<Animal> {
    return await patch<Animal>(`${this.baseUrl}/${id}/reactivate`);
  }

  /**
   * Buscar espécies disponíveis
   */
  static async getEspecies(): Promise<Array<{ id: number; nome: string }>> {
    const response = await get<{ data: Array<{ id: number; nome: string }> }>('/exames/especies');
    return response.data;
  }
}

export const animalService = AnimalService;
export default AnimalService;