import { Cliente, CreateClienteRequest, UpdateClienteRequest, ClienteFilters, PaginatedResponse } from '@/types';
import { useState, useEffect } from 'react';

// Mock data para desenvolvimento
const mockClientes: Cliente[] = [
  {
    id: 1,
    nome: 'Dr. João Silva',
    email: 'joao.silva@veterinaria.com',
    telefone: '(11) 99999-1111',
    cpfCnpj: '123.456.789-00',
    endereco: 'Rua das Flores, 123',
    numero: '123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01234-567',
    ativo: true,
    criadoEm: '2024-01-15T10:00:00Z',
    atualizadoEm: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    nome: 'Clínica Veterinária Pet Care',
    email: 'contato@petcare.com.br',
    telefone: '(11) 3333-4444',
    cpfCnpj: '12.345.678/0001-90',
    endereco: 'Av. Paulista, 1000',
    numero: '1000',
    complemento: 'Sala 501',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01310-100',
    celular: '(11) 99999-2222',
    contato: 'Maria Santos',
    ativo: true,
    criadoEm: '2024-02-10T10:00:00Z',
    atualizadoEm: '2024-02-10T10:00:00Z',
  },
  {
    id: 3,
    nome: 'Hospital Veterinário Animal Life',
    email: 'admin@animallife.vet',
    telefone: '(11) 5555-6666',
    cpfCnpj: '98.765.432/0001-10',
    endereco: 'Rua dos Animais, 456',
    numero: '456',
    bairro: 'Vila Madalena',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '05433-000',
    observacoes: 'Cliente VIP - atendimento prioritário',
    ativo: true,
    criadoEm: '2024-03-05T10:00:00Z',
    atualizadoEm: '2024-03-05T10:00:00Z',
  },
  {
    id: 4,
    nome: 'Dr. Ana Costa',
    email: 'ana.costa@gmail.com',
    telefone: '(11) 7777-8888',
    cpfCnpj: '987.654.321-00',
    endereco: 'Rua da Consolação, 789',
    numero: '789',
    bairro: 'Consolação',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01302-000',
    restricao: 'Pagamento apenas à vista',
    ativo: false,
    criadoEm: '2024-01-20T10:00:00Z',
    atualizadoEm: '2024-04-01T10:00:00Z',
  },
];

let nextId = 5;

class ClienteService {
  private baseURL = 'http://localhost:3001/api';
  private useMock = true; // Usar mock por padrão em desenvolvimento

  async listar(filters: ClienteFilters = {}): Promise<PaginatedResponse<Cliente>> {
    if (this.useMock) {
      return this.listarMock(filters);
    }

    try {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.ativo !== undefined) params.append('ativo', filters.ativo.toString());
      if (filters.cidade) params.append('cidade', filters.cidade);
      if (filters.uf) params.append('uf', filters.uf);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());

      const response = await fetch(`${this.baseURL}/clientes?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Erro na API, usando dados mock:', error);
      this.useMock = true;
      return this.listarMock(filters);
    }
  }

  private listarMock(filters: ClienteFilters = {}): PaginatedResponse<Cliente> {
    let filteredClientes = [...mockClientes];

    // Aplicar filtros
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredClientes = filteredClientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(search) ||
        cliente.email?.toLowerCase().includes(search) ||
        cliente.telefone?.includes(search) ||
        cliente.cpfCnpj?.includes(search)
      );
    }

    if (filters.ativo !== undefined) {
      filteredClientes = filteredClientes.filter(cliente => cliente.ativo === filters.ativo);
    }

    if (filters.cidade) {
      filteredClientes = filteredClientes.filter(cliente => 
        cliente.cidade?.toLowerCase().includes(filters.cidade!.toLowerCase())
      );
    }

    if (filters.uf) {
      filteredClientes = filteredClientes.filter(cliente => 
        cliente.uf?.toLowerCase() === filters.uf!.toLowerCase()
      );
    }

    // Paginação
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedClientes = filteredClientes.slice(startIndex, endIndex);

    return {
      data: paginatedClientes,
      pagination: {
        page: page,
        totalPages: Math.ceil(filteredClientes.length / limit),
        total: filteredClientes.length,
        limit: limit,
      },
    };
  }

  async buscar(termo: string): Promise<Cliente[]> {
    if (this.useMock) {
      const search = termo.toLowerCase();
      return mockClientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(search) ||
        cliente.email?.toLowerCase().includes(search) ||
        cliente.telefone?.includes(search) ||
        cliente.cpfCnpj?.includes(search)
      );
    }

    try {
      const response = await fetch(`${this.baseURL}/clientes/buscar?q=${encodeURIComponent(termo)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Erro na API, usando dados mock:', error);
      this.useMock = true;
      return this.buscar(termo);
    }
  }

  async obterPorId(id: number): Promise<Cliente> {
    if (this.useMock) {
      const cliente = mockClientes.find(c => c.id === id);
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }
      return cliente;
    }

    try {
      const response = await fetch(`${this.baseURL}/clientes/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Erro na API, usando dados mock:', error);
      this.useMock = true;
      return this.obterPorId(id);
    }
  }

  async criar(data: CreateClienteRequest): Promise<Cliente> {
    if (this.useMock) {
      const novoCliente: Cliente = {
        ...data,
        id: nextId++,
        ativo: true,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      };
      mockClientes.push(novoCliente);
      return novoCliente;
    }

    try {
      const response = await fetch(`${this.baseURL}/clientes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Erro na API, usando dados mock:', error);
      this.useMock = true;
      return this.criar(data);
    }
  }

  async atualizar(id: number, data: UpdateClienteRequest): Promise<Cliente> {
    if (this.useMock) {
      const index = mockClientes.findIndex(c => c.id === id);
      if (index === -1) {
        throw new Error('Cliente não encontrado');
      }
      
      mockClientes[index] = {
        ...mockClientes[index],
        ...data,
        atualizadoEm: new Date().toISOString(),
      };
      
      return mockClientes[index];
    }

    try {
      const response = await fetch(`${this.baseURL}/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Erro na API, usando dados mock:', error);
      this.useMock = true;
      return this.atualizar(id, data);
    }
  }

  async desativar(id: number): Promise<void> {
    if (this.useMock) {
      const cliente = mockClientes.find(c => c.id === id);
      if (cliente) {
        cliente.ativo = false;
        cliente.atualizadoEm = new Date().toISOString();
      }
      return;
    }

    try {
      const response = await fetch(`${this.baseURL}/clientes/${id}/desativar`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.warn('Erro na API, usando dados mock:', error);
      this.useMock = true;
      return this.desativar(id);
    }
  }

  async reativar(id: number): Promise<void> {
    if (this.useMock) {
      const cliente = mockClientes.find(c => c.id === id);
      if (cliente) {
        cliente.ativo = true;
        cliente.atualizadoEm = new Date().toISOString();
      }
      return;
    }

    try {
      const response = await fetch(`${this.baseURL}/clientes/${id}/reativar`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.warn('Erro na API, usando dados mock:', error);
      this.useMock = true;
      return this.reativar(id);
    }
  }

  async validarCpfCnpj(cpfCnpj: string): Promise<{ valido: boolean; tipo: 'CPF' | 'CNPJ' | null }> {
    // Implementação básica de validação
    const numeros = cpfCnpj.replace(/\D/g, '');
    
    if (numeros.length === 11) {
      return { valido: this.validarCPF(numeros), tipo: 'CPF' };
    } else if (numeros.length === 14) {
      return { valido: this.validarCNPJ(numeros), tipo: 'CNPJ' };
    }
    
    return { valido: false, tipo: null };
  }

  private validarCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  }

  private validarCNPJ(cnpj: string): boolean {
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    const tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  }
}

export const clienteService = new ClienteService();

// Hook personalizado para usar clientes
export const useClientes = (filters: ClienteFilters = {}) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await clienteService.listar(filters);
      setClientes(response.data);
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [JSON.stringify(filters)]);

  return {
    clientes,
    loading,
    error,
    pagination,
    refetch: fetchClientes,
  };
};

// Hook para um cliente específico
export const useCliente = (id: number | null) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCliente(null);
      return;
    }

    const fetchCliente = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await clienteService.obterPorId(id);
        setCliente(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  return { cliente, loading, error };
};
