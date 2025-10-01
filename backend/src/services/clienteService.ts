import { PrismaClient, Cliente, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateClienteRequest {
  nome: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  telefone?: string;
  fax?: string;
  celular?: string;
  email?: string;
  cpfCnpj?: string;
  contato?: string;
  restricao?: string;
  codVetResp?: number;
  ativo?: string;
}

export interface UpdateClienteRequest extends Partial<CreateClienteRequest> {
  id: number;
}

export interface ClienteFilters {
  search?: string | undefined;
  ativo?: string | undefined;
  cidade?: string | undefined;
  uf?: string | undefined;
  codVetResp?: number | undefined;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface ClienteWithDetails extends Cliente {
  veterinarioResp?: {
    id: number;
    nome: string;
    registro?: string | null;
    telefone?: string | null;
    email?: string | null;
  } | null;
  _count?: {
    animais: number;
    pedidos: number;
  };
}

class ClienteService {
  
  /**
   * Buscar clientes com paginação e filtros
   */
  async getClientes(
    filters: ClienteFilters = {},
    pagination: PaginationOptions
  ) {
    const { page, limit, orderBy = 'nome', order = 'asc' } = pagination;
    const { search, ativo = 'S', cidade, uf, codVetResp } = filters;

    const skip = (page - 1) * limit;

    // Construir filtros dinâmicos
    const where: Prisma.ClienteWhereInput = {
      ativo: ativo,
      ...(search && {
        OR: [
          { nome: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { cpfCnpj: { contains: search, mode: 'insensitive' } },
          { telefone: { contains: search } },
          { celular: { contains: search } }
        ]
      }),
      ...(cidade && { cidade: { contains: cidade, mode: 'insensitive' } }),
      ...(uf && { uf }),
      ...(codVetResp && { codVetResp })
    };

    // Buscar clientes com contagem
    const [clientes, total] = await Promise.all([
      prisma.cliente.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          veterinarioResp: {
            select: {
              id: true,
              nome: true,
              registro: true
            }
          },
          _count: {
            select: {
              animais: true,
              pedidos: true
            }
          }
        }
      }),
      prisma.cliente.count({ where })
    ]);

    return {
      data: clientes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  }

  /**
   * Buscar cliente por ID com detalhes completos
   */
  async getClienteById(id: number): Promise<ClienteWithDetails | null> {
    return await prisma.cliente.findUnique({
      where: { id },
      include: {
        veterinarioResp: {
          select: {
            id: true,
            nome: true,
            registro: true,
            telefone: true,
            email: true
          }
        },
        _count: {
          select: {
            animais: true,
            pedidos: true
          }
        }
      }
    });
  }

  /**
   * Criar novo cliente
   */
  async createCliente(data: CreateClienteRequest): Promise<Cliente> {
    // Validar se CPF/CNPJ já existe (se fornecido)
    if (data.cpfCnpj) {
      const existingCliente = await prisma.cliente.findFirst({
        where: { 
          cpfCnpj: data.cpfCnpj,
          ativo: 'S'
        }
      });

      if (existingCliente) {
        throw new Error('CPF/CNPJ já cadastrado para outro cliente ativo');
      }
    }

    // Validar se email já existe (se fornecido)
    if (data.email) {
      const existingEmail = await prisma.cliente.findFirst({
        where: { 
          email: data.email,
          ativo: 'S'
        }
      });

      if (existingEmail) {
        throw new Error('Email já cadastrado para outro cliente ativo');
      }
    }

    return await prisma.cliente.create({
      data: {
        ...data,
        dataCadastro: new Date(),
        ativo: data.ativo || 'S'
      }
    });
  }

  /**
   * Atualizar cliente
   */
  async updateCliente(id: number, data: Partial<CreateClienteRequest>): Promise<Cliente | null> {
    // Verificar se cliente existe
    const existingCliente = await prisma.cliente.findUnique({
      where: { id }
    });

    if (!existingCliente) {
      throw new Error('Cliente não encontrado');
    }

    // Validar CPF/CNPJ único (se alterado)
    if (data.cpfCnpj && data.cpfCnpj !== existingCliente.cpfCnpj) {
      const duplicateCpf = await prisma.cliente.findFirst({
        where: { 
          cpfCnpj: data.cpfCnpj,
          ativo: 'S',
          id: { not: id }
        }
      });

      if (duplicateCpf) {
        throw new Error('CPF/CNPJ já cadastrado para outro cliente ativo');
      }
    }

    // Validar email único (se alterado)
    if (data.email && data.email !== existingCliente.email) {
      const duplicateEmail = await prisma.cliente.findFirst({
        where: { 
          email: data.email,
          ativo: 'S',
          id: { not: id }
        }
      });

      if (duplicateEmail) {
        throw new Error('Email já cadastrado para outro cliente ativo');
      }
    }

    return await prisma.cliente.update({
      where: { id },
      data: {
        ...data,
        dataAtualizacao: new Date()
      }
    });
  }

  /**
   * Deletar cliente (soft delete se tiver dependências)
   */
  async deleteCliente(id: number): Promise<{ deleted: boolean; message: string }> {
    // Verificar se cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            animais: true,
            pedidos: true
          }
        }
      }
    });

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    // Se tem dependências, fazer soft delete
    if (cliente._count.animais > 0 || cliente._count.pedidos > 0) {
      await prisma.cliente.update({
        where: { id },
        data: { 
          ativo: 'N',
          dataAtualizacao: new Date()
        }
      });

      return {
        deleted: false,
        message: `Cliente desativado. Possui ${cliente._count.animais} animais e ${cliente._count.pedidos} pedidos vinculados.`
      };
    }

    // Se não tem dependências, deletar fisicamente
    await prisma.cliente.delete({
      where: { id }
    });

    return {
      deleted: true,
      message: 'Cliente removido permanentemente'
    };
  }

  /**
   * Reativar cliente
   */
  async reactivateCliente(id: number): Promise<Cliente | null> {
    const cliente = await prisma.cliente.findUnique({
      where: { id }
    });

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    if (cliente.ativo === 'S') {
      throw new Error('Cliente já está ativo');
    }

    return await prisma.cliente.update({
      where: { id },
      data: { 
        ativo: 'S',
        dataAtualizacao: new Date()
      }
    });
  }

  /**
   * Buscar clientes para autocomplete
   */
  async searchClientes(query: string, limit: number = 10) {
    if (query.length < 2) {
      return [];
    }

    return await prisma.cliente.findMany({
      where: {
        ativo: 'S',
        OR: [
          { nome: { contains: query, mode: 'insensitive' } },
          { cpfCnpj: { contains: query } },
          { telefone: { contains: query } },
          { celular: { contains: query } }
        ]
      },
      select: {
        id: true,
        nome: true,
        cpfCnpj: true,
        telefone: true,
        celular: true,
        email: true,
        cidade: true,
        uf: true
      },
      take: limit,
      orderBy: { nome: 'asc' }
    });
  }

  /**
   * Obter estatísticas de clientes
   */
  async getClienteStats() {
    const [total, ativos, inativos, comAnimais, comPedidos] = await Promise.all([
      prisma.cliente.count(),
      prisma.cliente.count({ where: { ativo: 'S' } }),
      prisma.cliente.count({ where: { ativo: 'N' } }),
      prisma.cliente.count({
        where: {
          ativo: 'S',
          animais: { some: {} }
        }
      }),
      prisma.cliente.count({
        where: {
          ativo: 'S',
          pedidos: { some: {} }
        }
      })
    ]);

    return {
      total,
      ativos,
      inativos,
      comAnimais,
      comPedidos,
      semAnimais: ativos - comAnimais
    };
  }
}

export const clienteService = new ClienteService();