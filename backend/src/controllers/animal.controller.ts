import { Request, Response } from 'express';
import { PrismaClient, SexoAnimal } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para criação de animal
interface CreateAnimalData {
  nome: string;
  especieId: number;
  raca?: string;
  sexo: SexoAnimal;
  idade?: string;
  peso?: number;
  cor?: string;
  observacoes?: string;
  clienteId: number;
}

// Listar animais com filtros
export const getAnimais = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      clienteId,
      especieId,
      ativo = true 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {
      ativo: ativo === 'true'
    };
    
    if (search) {
      where.OR = [
        { nome: { contains: search as string, mode: 'insensitive' } },
        { raca: { contains: search as string, mode: 'insensitive' } },
        { cliente: { nome: { contains: search as string, mode: 'insensitive' } } }
      ];
    }

    if (clienteId) {
      where.clienteId = Number(clienteId);
    }

    if (especieId) {
      where.especieId = Number(especieId);
    }

    const [animais, total] = await Promise.all([
      prisma.animal.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          cliente: {
            select: {
              id: true,
              nome: true,
              telefone: true,
              email: true
            }
          },
          especie: {
            select: {
              id: true,
              nome: true
            }
          },
          _count: {
            select: { pedidos: true }
          }
        },
        orderBy: { nome: 'asc' }
      }),
      prisma.animal.count({ where })
    ]);

    return res.json({
      data: animais,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Criar novo animal
export const createAnimal = async (req: Request, res: Response) => {
  try {
    const {
      nome,
      especieId,
      raca,
      sexo,
      idade,
      peso,
      cor,
      observacoes,
      clienteId
    }: CreateAnimalData = req.body;

    // Validações básicas
    if (!nome || !especieId || !sexo || !clienteId) {
      return res.status(400).json({ 
        error: 'Nome, espécie, sexo e cliente são obrigatórios' 
      });
    }

    // Converter clienteId para número se for string
    const clienteIdNumber = typeof clienteId === 'string' ? parseInt(clienteId, 10) : clienteId;

    // Verificar se cliente existe
    const clienteExiste = await prisma.cliente.findUnique({
      where: { id: clienteIdNumber }
    });

    if (!clienteExiste) {
      return res.status(400).json({ error: 'Cliente não encontrado' });
    }

    // Converter especieId para número se for string
    const especieIdNumber = typeof especieId === 'string' ? parseInt(especieId, 10) : especieId;

    // Verificar se espécie existe
    const especieExiste = await prisma.especie.findUnique({
      where: { id: especieIdNumber }
    });

    if (!especieExiste) {
      return res.status(400).json({ error: 'Espécie não encontrada' });
    }

    const animal = await prisma.animal.create({
      data: {
        nome,
        especieId: especieIdNumber,
        raca: raca || null,
        sexo,
        idade: idade || null,
        peso: peso || null,
        cor: cor || null,
        observacoes: observacoes || null,
        clienteId: clienteIdNumber
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            email: true
          }
        },
        especie: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });

    return res.status(201).json(animal);
  } catch (error) {
    console.error('Erro ao criar animal:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar animal por ID
export const getAnimalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do animal inválido' });
    }

    const animal = await prisma.animal.findUnique({
      where: { id: Number(id) },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            email: true,
            endereco: true,
            cidade: true,
            cep: true
          }
        },
        especie: {
          select: {
            id: true,
            nome: true
          }
        },
        pedidos: {
          select: {
            id: true,
            numero: true,
            dataColeta: true,
            status: true
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!animal) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    return res.json(animal);
  } catch (error) {
    console.error('Erro ao buscar animal:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar animal
export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do animal inválido' });
    }

    const animalExistente = await prisma.animal.findUnique({
      where: { id: Number(id) }
    });

    if (!animalExistente) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    // Validar campo sexo se estiver sendo atualizado
    if (updateData.sexo && !['MACHO', 'FEMEA', 'INDEFINIDO'].includes(updateData.sexo)) {
      return res.status(400).json({ error: 'Valor inválido para sexo. Use: MACHO, FEMEA ou INDEFINIDO' });
    }

    // Se está alterando a espécie, verificar se existe
    if (updateData.especieId) {
      const especieExiste = await prisma.especie.findUnique({
        where: { id: updateData.especieId }
      });

      if (!especieExiste) {
        return res.status(400).json({ error: 'Espécie não encontrada' });
      }
    }

    const animalAtualizado = await prisma.animal.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            email: true
          }
        },
        especie: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });

    return res.json(animalAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar animal:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Deletar animal (soft delete)
export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do animal inválido' });
    }

    const animal = await prisma.animal.findUnique({
      where: { id: Number(id) },
      include: {
        _count: {
          select: { pedidos: true }
        }
      }
    });

    if (!animal) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    // Verificar se há pedidos associados
    if (animal._count.pedidos > 0) {
      return res.status(400).json({ 
        error: 'Não é possível excluir animal que possui pedidos associados. Use a desativação.' 
      });
    }

    await prisma.animal.update({
      where: { id: Number(id) },
      data: { ativo: false }
    });

    return res.json({ message: 'Animal excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir animal:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar animais (search)
export const searchAnimais = async (req: Request, res: Response) => {
  try {
    const { q, clienteId, limit = 10 } = req.query;

    if (!q && !clienteId) {
      return res.json({ data: [] });
    }

    const where: any = {
      ativo: true
    };

    if (q) {
      where.OR = [
        { nome: { contains: q as string, mode: 'insensitive' } },
        { raca: { contains: q as string, mode: 'insensitive' } }
      ];
    }

    if (clienteId) {
      where.clienteId = Number(clienteId);
    }

    const animais = await prisma.animal.findMany({
      where,
      select: {
        id: true,
        nome: true,
        raca: true,
        sexo: true,
        idade: true,
        cliente: {
          select: {
            id: true,
            nome: true
          }
        },
        especie: {
          select: {
            id: true,
            nome: true
          }
        }
      },
      take: Number(limit),
      orderBy: { nome: 'asc' }
    });

    return res.json({ data: animais });
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar animais por cliente
export const getAnimaisByCliente = async (req: Request, res: Response) => {
  try {
    const clienteId = parseInt(req.params.clienteId || '0');
    
    if (!clienteId || clienteId <= 0) {
      return res.status(400).json({ 
        error: 'INVALID_CLIENT_ID',
        message: 'ID do cliente inválido' 
      });
    }

    const animais = await prisma.animal.findMany({
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
        }
      },
      orderBy: { nome: 'asc' }
    });
    
    return res.json(animais);
  } catch (error) {
    console.error('Erro ao buscar animais do cliente:', error);
    return res.status(500).json({ 
      error: 'INTERNAL_ERROR',
      message: 'Erro interno do servidor' 
    });
  }
};

// Reativar animal
export const reactivateAnimal = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    
    if (!id || id <= 0) {
      return res.status(400).json({ 
        error: 'INVALID_ID',
        message: 'ID do animal inválido' 
      });
    }

    const animal = await prisma.animal.update({
      where: { id },
      data: { ativo: true },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            email: true
          }
        },
        especie: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });
    
    return res.json(animal);
  } catch (error: any) {
    console.error('Erro ao reativar animal:', error);
    
    return res.status(500).json({ 
      error: 'INTERNAL_ERROR',
      message: 'Erro interno do servidor' 
    });
  }
};
