import { 
  Profissional, 
  CreateProfissionalData, 
  UpdateProfissionalData, 
  ProfissionalFilters, 
  ProfissionalListResponse,
  TipoProfissional,
  Conselho 
} from '@/types/profissional';
import { api } from './api';

// Mock data para desenvolvimento
const mockConselhos: Conselho[] = [
  {
    id: 1,
    nome: 'Conselho Regional de Medicina Veterinária',
    sigla: 'CRMV',
    ativo: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    nome: 'Conselho Federal de Medicina Veterinária',
    sigla: 'CFMV',
    ativo: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    nome: 'Conselho Regional de Biologia',
    sigla: 'CRBio',
    ativo: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockProfissionais: Profissional[] = [
  {
    id: 1,
    nome: 'Dr. João Silva Santos',
    documento: '123.456.789-00',
    registro: 'CRMV-SP 12345',
    conselhoId: 1,
    telefone: '(11) 99999-1111',
    email: 'joao.silva@veterinaria.com',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01234-567',
    tipo: TipoProfissional.SOLICITANTE,
    ativo: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    conselho: mockConselhos[0],
  },
  {
    id: 2,
    nome: 'Dra. Maria Oliveira Costa',
    documento: '987.654.321-00',
    registro: 'CRMV-RJ 67890',
    conselhoId: 1,
    telefone: '(21) 88888-2222',
    email: 'maria.costa@labvet.com.br',
    endereco: 'Av. Copacabana, 456',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    cep: '22070-000',
    tipo: TipoProfissional.INTERNO,
    ativo: true,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
    conselho: mockConselhos[0],
  },
  {
    id: 3,
    nome: 'Dr. Carlos Eduardo Ferreira',
    documento: '456.789.123-00',
    registro: 'CRMV-MG 11111',
    conselhoId: 1,
    telefone: '(31) 77777-3333',
    email: 'carlos.ferreira@clinicapet.com',
    endereco: 'Rua da Liberdade, 789',
    cidade: 'Belo Horizonte',
    uf: 'MG',
    cep: '30112-000',
    tipo: TipoProfissional.AMBOS,
    ativo: true,
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-03-05T10:00:00Z',
    conselho: mockConselhos[0],
  },
  {
    id: 4,
    nome: 'Dra. Ana Paula Rodrigues',
    documento: '789.123.456-00',
    registro: 'CRBio-SP 22222',
    conselhoId: 3,
    telefone: '(11) 66666-4444',
    email: 'ana.rodrigues@biolab.com.br',
    endereco: 'Rua dos Cientistas, 321',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13025-000',
    tipo: TipoProfissional.INTERNO,
    ativo: false,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-04-01T10:00:00Z',
    conselho: mockConselhos[2],
  },
  {
    id: 5,
    nome: 'Dr. Roberto Lima Souza',
    documento: '321.654.987-00',
    registro: 'CRMV-RS 33333',
    conselhoId: 1,
    telefone: '(51) 55555-5555',
    email: 'roberto.souza@vetpoa.com.br',
    endereco: 'Av. Ipiranga, 654',
    cidade: 'Porto Alegre',
    uf: 'RS',
    cep: '90610-000',
    tipo: TipoProfissional.SOLICITANTE,
    ativo: true,
    createdAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-02-25T10:00:00Z',
    conselho: mockConselhos[0],
  },
];

let nextId = 6;

class ProfissionalService {
  private baseURL = '/profissionais';

  // ================================
  // MÉTODOS CRUD PRINCIPAIS
  // ================================

  async listar(filters?: ProfissionalFilters, page = 1, limit = 10): Promise<ProfissionalListResponse> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProfissionais = [...mockProfissionais];

      // Aplicar filtros
      if (filters) {
        if (filters.nome) {
          filteredProfissionais = filteredProfissionais.filter(prof =>
            prof.nome.toLowerCase().includes(filters.nome!.toLowerCase())
          );
        }

        if (filters.tipo) {
          filteredProfissionais = filteredProfissionais.filter(prof =>
            prof.tipo === filters.tipo
          );
        }

        if (filters.conselhoId) {
          filteredProfissionais = filteredProfissionais.filter(prof =>
            prof.conselhoId === filters.conselhoId
          );
        }

        if (filters.ativo !== undefined) {
          filteredProfissionais = filteredProfissionais.filter(prof =>
            prof.ativo === filters.ativo
          );
        }

        if (filters.cidade) {
          filteredProfissionais = filteredProfissionais.filter(prof =>
            prof.cidade?.toLowerCase().includes(filters.cidade!.toLowerCase())
          );
        }

        if (filters.uf) {
          filteredProfissionais = filteredProfissionais.filter(prof =>
            prof.uf === filters.uf
          );
        }
      }

      // Paginação
      const total = filteredProfissionais.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const profissionais = filteredProfissionais.slice(startIndex, endIndex);

      return {
        profissionais,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      console.error('Erro ao listar profissionais:', error);
      throw new Error('Falha ao carregar lista de profissionais');
    }
  }

  async buscarPorId(id: number): Promise<Profissional> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 300));

      const profissional = mockProfissionais.find(prof => prof.id === id);
      
      if (!profissional) {
        throw new Error('Profissional não encontrado');
      }

      return profissional;
    } catch (error) {
      console.error('Erro ao buscar profissional:', error);
      throw error;
    }
  }

  async criar(data: CreateProfissionalData): Promise<Profissional> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));

      // Validações básicas
      if (!data.nome?.trim()) {
        throw new Error('Nome é obrigatório');
      }

      if (data.email && !this.isValidEmail(data.email)) {
        throw new Error('Email inválido');
      }

      // Verificar se já existe profissional com mesmo documento
      if (data.documento) {
        const existente = mockProfissionais.find(prof => 
          prof.documento === data.documento && prof.ativo
        );
        if (existente) {
          throw new Error('Já existe um profissional ativo com este documento');
        }
      }

      // Verificar se já existe profissional com mesmo registro
      if (data.registro) {
        const existente = mockProfissionais.find(prof => 
          prof.registro === data.registro && prof.ativo
        );
        if (existente) {
          throw new Error('Já existe um profissional ativo com este registro');
        }
      }

      const conselho = data.conselhoId ? 
        mockConselhos.find(c => c.id === data.conselhoId) : null;

      const novoProfissional: Profissional = {
        id: nextId++,
        nome: data.nome.trim(),
        documento: data.documento?.trim() || null,
        registro: data.registro?.trim() || null,
        conselhoId: data.conselhoId || null,
        telefone: data.telefone?.trim() || null,
        email: data.email?.trim() || null,
        endereco: data.endereco?.trim() || null,
        cidade: data.cidade?.trim() || null,
        uf: data.uf || null,
        cep: data.cep?.trim() || null,
        tipo: data.tipo,
        ativo: data.ativo ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        conselho,
      };

      mockProfissionais.push(novoProfissional);
      return novoProfissional;
    } catch (error) {
      console.error('Erro ao criar profissional:', error);
      throw error;
    }
  }

  async atualizar(data: UpdateProfissionalData): Promise<Profissional> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));

      const index = mockProfissionais.findIndex(prof => prof.id === data.id);
      
      if (index === -1) {
        throw new Error('Profissional não encontrado');
      }

      // Validações básicas
      if (data.nome !== undefined && !data.nome?.trim()) {
        throw new Error('Nome é obrigatório');
      }

      if (data.email && !this.isValidEmail(data.email)) {
        throw new Error('Email inválido');
      }

      // Verificar se já existe profissional com mesmo documento (exceto o atual)
      if (data.documento) {
        const existente = mockProfissionais.find(prof => 
          prof.documento === data.documento && prof.id !== data.id && prof.ativo
        );
        if (existente) {
          throw new Error('Já existe um profissional ativo com este documento');
        }
      }

      // Verificar se já existe profissional com mesmo registro (exceto o atual)
      if (data.registro) {
        const existente = mockProfissionais.find(prof => 
          prof.registro === data.registro && prof.id !== data.id && prof.ativo
        );
        if (existente) {
          throw new Error('Já existe um profissional ativo com este registro');
        }
      }

      const profissionalAtual = mockProfissionais[index];
      const conselho = data.conselhoId ? 
        mockConselhos.find(c => c.id === data.conselhoId) : 
        profissionalAtual.conselho;

      const profissionalAtualizado: Profissional = {
        ...profissionalAtual,
        nome: data.nome?.trim() ?? profissionalAtual.nome,
        documento: data.documento?.trim() ?? profissionalAtual.documento,
        registro: data.registro?.trim() ?? profissionalAtual.registro,
        conselhoId: data.conselhoId ?? profissionalAtual.conselhoId,
        telefone: data.telefone?.trim() ?? profissionalAtual.telefone,
        email: data.email?.trim() ?? profissionalAtual.email,
        endereco: data.endereco?.trim() ?? profissionalAtual.endereco,
        cidade: data.cidade?.trim() ?? profissionalAtual.cidade,
        uf: data.uf ?? profissionalAtual.uf,
        cep: data.cep?.trim() ?? profissionalAtual.cep,
        tipo: data.tipo ?? profissionalAtual.tipo,
        ativo: data.ativo ?? profissionalAtual.ativo,
        updatedAt: new Date().toISOString(),
        conselho,
      };

      mockProfissionais[index] = profissionalAtualizado;
      return profissionalAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar profissional:', error);
      throw error;
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));

      const index = mockProfissionais.findIndex(prof => prof.id === id);
      
      if (index === -1) {
        throw new Error('Profissional não encontrado');
      }

      // Verificar se o profissional pode ser excluído
      // (aqui você pode adicionar validações de negócio, como verificar se tem pedidos associados)
      
      mockProfissionais.splice(index, 1);
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
      throw error;
    }
  }

  async alterarStatus(id: number, ativo: boolean): Promise<Profissional> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 400));

      const index = mockProfissionais.findIndex(prof => prof.id === id);
      
      if (index === -1) {
        throw new Error('Profissional não encontrado');
      }

      mockProfissionais[index] = {
        ...mockProfissionais[index],
        ativo,
        updatedAt: new Date().toISOString(),
      };

      return mockProfissionais[index];
    } catch (error) {
      console.error('Erro ao alterar status do profissional:', error);
      throw error;
    }
  }

  // ================================
  // MÉTODOS AUXILIARES
  // ================================

  async listarConselhos(): Promise<Conselho[]> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 200));

      return mockConselhos.filter(conselho => conselho.ativo);
    } catch (error) {
      console.error('Erro ao listar conselhos:', error);
      throw new Error('Falha ao carregar lista de conselhos');
    }
  }

  async buscarPorTipo(tipo: TipoProfissional): Promise<Profissional[]> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 300));

      return mockProfissionais.filter(prof => 
        prof.ativo && (prof.tipo === tipo || prof.tipo === TipoProfissional.AMBOS)
      );
    } catch (error) {
      console.error('Erro ao buscar profissionais por tipo:', error);
      throw error;
    }
  }

  // ================================
  // MÉTODOS DE VALIDAÇÃO
  // ================================

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  }

  private isValidCNPJ(cnpj: string): boolean {
    // Remove caracteres não numéricos
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    // Verifica se tem 14 dígitos
    if (cleanCNPJ.length !== 14) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
    
    // Validação dos dígitos verificadores
    let length = cleanCNPJ.length - 2;
    let numbers = cleanCNPJ.substring(0, length);
    const digits = cleanCNPJ.substring(length);
    let sum = 0;
    let pos = length - 7;
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) return false;
    
    length = length + 1;
    numbers = cleanCNPJ.substring(0, length);
    sum = 0;
    pos = length - 7;
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(1))) return false;
    
    return true;
  }

  validateDocumento(documento: string): boolean {
    if (!documento) return true; // Documento é opcional
    
    const cleanDoc = documento.replace(/\D/g, '');
    
    if (cleanDoc.length === 11) {
      return this.isValidCPF(documento);
    } else if (cleanDoc.length === 14) {
      return this.isValidCNPJ(documento);
    }
    
    return false;
  }
}

// Exportar instância única do serviço
export const profissionalService = new ProfissionalService();