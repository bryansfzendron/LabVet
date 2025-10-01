import { PrismaClient, Animal, SexoAnimal, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateAnimalRequest {
  nome: string;
  especieId: number;
  raca?: string;
  sexo: SexoAnimal;
  idade?: string;
  peso?: number;
  cor?: string;
  clienteId: number;
  observacoes?: string;
  ativo?: boolean;
}

export interface UpdateAnimalRequest extends Partial<CreateAnimalRequest> {
  id: number;
}

export interface AnimalFilters {
  search?: string | undefined;
  clienteId?: number | undefined;
  especieId?: number | undefined;
  sexo?: SexoAnimal | undefined;
  ativo?: boolean | undefined;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface AnimalWithDetails extends Animal {
  especie: {
    id: number;
    nome: string;
  };
  cliente: {
    id: number;
    nome: string;
    telefone?: string | null;
    celular?: string | null;
  };
  _count?: {
    pedidos: number;
  };
}

class AnimalService {
  
  /**
   * Buscar animais com paginação e filtros
   */
  async getAnimais(
    filters: AnimalFilters = {},
    pagination: PaginationOptions
  ) {
    const { page, limit, orderBy = 'nome', order = 'asc' } = pagination;
    const { search, clienteId, especieId, sexo, ativo = true } = filters;

    const skip = (page - 1) * limit;

    // Construir filtros dinâmicos
    const where: Prisma.AnimalWhereInput = {
      ativo: ativo,
      ...(search && {
        OR: [
          { nome: { contains: search, mode: 'insensitive' } },
          { raca: { contains: search, mode: 'insensitive' } },
          { cor: { contains: search, mode: 'insensitive' } },
          { cliente: { nome: { contains: search, mode: 'insensitive' } } }
        ]
      }),
      ...(clienteId && { clienteId }),
      ...(especieId && { especieId }),
      ...(sexo && { sexo })
    };

    // Buscar animais com contagem
    const [animais, total] = await Promise.all([
      prisma.animal.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          especie: {
            select: {
              id: true,
              nome: true
            }
          },
          cliente: {
            select: {
              id: true,
              nome: true,
              telefone: true,
              celular: true
            }
          },
          _count: {
            select: {
              pedidos: true
            }
          }
        }
      }),
      prisma.animal.count({ where })
    ]);

    return {
      data: animais,
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
   * Buscar animal por ID com detalhes completos
   */
  async getAnimalById(id: number): Promise<AnimalWithDetails | null> {
    return await prisma.animal.findUnique({
      where: { id },
      include: {
        especie: {
          select: {
            id: true,
            nome: true
          }
        },
        cliente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            celular: true,
            email: true,
            endereco: true,
            cidade: true,
            uf: true
          }
        },
        _count: {
          select: {
            pedidos: true
          }
        }
      }
    });
  }

  /**
   * Buscar animais por cliente
   */
  async getAnimaisByCliente(clienteId: number) {
    return await prisma.animal.findMany({
      where: { 
        clienteId,
        ativo: true
      },
      include: {
        especie: {
          select: {
            id: true,
            nome: true
          }
        },
        _count: {
          select: {
            pedidos: true
          }
        }
      },
      orderBy: { nome: 'asc' }
    });
  }

  /**
   * Criar novo animal
   */
  async createAnimal(data: CreateAnimalRequest): Promise<Animal> {
    // Verificar se cliente existe e está ativo
    const cliente = await prisma.cliente.findUnique({
      where: { id: data.clienteId }
    });

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    if (cliente.ativo !== 'S') {
      throw new Error('Cliente está inativo');
    }

    // Verificar se espécie existe e está ativa
    const especie = await prisma.especie.findUnique({
      where: { id: data.especieId }
    });

    if (!especie) {
      throw new Error('Espécie não encontrada');
    }

    if (!especie.ativo) {
      throw new Error('Espécie está inativa');
    }

    // Verificar se já existe animal com mesmo nome para o cliente
    const existingAnimal = await prisma.animal.findFirst({
      where: { 
        nome: data.nome,
        clienteId: data.clienteId,
        ativo: true
      }
    });

    if (existingAnimal) {
      throw new Error('Já existe um animal com este nome para este cliente');
    }

    return await prisma.animal.create({
      data: {
        ...data,
        peso: data.peso ? new Prisma.Decimal(data.peso) : null,
        ativo: data.ativo !== undefined ? data.ativo : true
      }
    });
  }

  /**
   * Atualizar animal
   */
  async updateAnimal(id: number, data: Partial<CreateAnimalRequest>): Promise<Animal | null> {
    // Verificar se animal existe
    const existingAnimal = await prisma.animal.findUnique({
      where: { id }
    });

    if (!existingAnimal) {
      throw new Error('Animal não encontrado');
    }

    // Verificar cliente se alterado
    if (data.clienteId && data.clienteId !== existingAnimal.clienteId) {
      const cliente = await prisma.cliente.findUnique({
        where: { id: data.clienteId }
      });

      if (!cliente || cliente.ativo !== 'S') {
        throw new Error('Cliente não encontrado ou inativo');
      }
    }

    // Verificar espécie se alterada
    if (data.especieId && data.especieId !== existingAnimal.especieId) {
      const especie = await prisma.especie.findUnique({
        where: { id: data.especieId }
      });

      if (!especie || !especie.ativo) {
        throw new Error('Espécie não encontrada ou inativa');
      }
    }

    // Verificar nome único para o cliente se alterado
    if (data.nome && data.nome !== existingAnimal.nome) {
      const clienteId = data.clienteId || existingAnimal.clienteId;
      const duplicateName = await prisma.animal.findFirst({
        where: { 
          nome: data.nome,
          clienteId: clienteId,
          ativo: true,
          id: { not: id }
        }
      });

      if (duplicateName) {
        throw new Error('Já existe um animal com este nome para este cliente');
      }
    }

    const updateData: any = { ...data };
    if (data.peso !== undefined) {
      updateData.peso = data.peso ? new Prisma.Decimal(data.peso) : null;
    }

    return await prisma.animal.update({
      where: { id },
      data: updateData
    });
  }

  /**
   * Deletar animal (soft delete se tiver dependências)
   */
  async deleteAnimal(id: number): Promise<{ deleted: boolean; message: string }> {
    // Verificar se animal existe
    const animal = await prisma.animal.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            pedidos: true
          }
        }
      }
    });

    if (!animal) {
      throw new Error('Animal não encontrado');
    }

    // Se tem dependências, fazer soft delete
    if (animal._count.pedidos > 0) {
      await prisma.animal.update({
        where: { id },
        data: { ativo: false }
      });

      return {
        deleted: false,
        message: `Animal desativado. Possui ${animal._count.pedidos} pedidos vinculados.`
      };
    }

    // Se não tem dependências, deletar fisicamente
    await prisma.animal.delete({
      where: { id }
    });

    return {
      deleted: true,
      message: 'Animal removido permanentemente'
    };
  }

  /**
   * Reativar animal
   */
  async reactivateAnimal(id: number): Promise<Animal | null> {
    const animal = await prisma.animal.findUnique({
      where: { id }
    });

    if (!animal) {
      throw new Error('Animal não encontrado');
    }

    if (animal.ativo) {
      throw new Error('Animal já está ativo');
    }

    return await prisma.animal.update({
      where: { id },
      data: { ativo: true }
    });
  }

  /**
   * Buscar animais para autocomplete
   */
  async searchAnimais(query: string, clienteId?: number, limit: number = 10) {
    if (query.length < 2) {
      return [];
    }

    return await prisma.animal.findMany({
      where: {
        ativo: true,
        ...(clienteId && { clienteId }),
        OR: [
          { nome: { contains: query, mode: 'insensitive' } },
          { raca: { contains: query, mode: 'insensitive' } },
          { cliente: { nome: { contains: query, mode: 'insensitive' } } }
        ]
      },
      select: {
        id: true,
        nome: true,
        raca: true,
        sexo: true,
        idade: true,
        peso: true,
        especie: {
          select: {
            id: true,
            nome: true
          }
        },
        cliente: {
          select: {
            id: true,
            nome: true
          }
        }
      },
      take: limit,
      orderBy: { nome: 'asc' }
    });
  }

  /**
   * Obter estatísticas de animais
   */
  async getAnimalStats() {
    const [total, ativos, inativos, porEspecie, porSexo] = await Promise.all([
      prisma.animal.count(),
      prisma.animal.count({ where: { ativo: true } }),
      prisma.animal.count({ where: { ativo: false } }),
      prisma.animal.groupBy({
        by: ['especieId'],
        where: { ativo: true },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } }
      }),
      prisma.animal.groupBy({
        by: ['sexo'],
        where: { ativo: true },
        _count: { id: true }
      })
    ]);

    return {
      total,
      ativos,
      inativos,
      porEspecie,
      porSexo
    };
  }
}

export const animalService = new AnimalService();