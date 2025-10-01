import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para criação de exame
interface CreateExameData {
  codigo: string;
  nome: string;
  descricao?: string;
  metodologia?: string;
  material?: string;
  valor?: number;
  tempoResultado?: number;
  parametros?: {
    nome: string;
    unidade?: string;
    valorReferencia?: string;
    ordem?: number;
  }[];
}

// Listar exames com filtros
export const getExames = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      ativo = true 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {
      ativo: ativo === 'true'
    };
    
    if (search) {
      where.OR = [
        { nome: { contains: search as string, mode: 'insensitive' } },
        { codigo: { contains: search as string, mode: 'insensitive' } },
        { descricao: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [exames, total] = await Promise.all([
      prisma.exame.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          parametros: {
            where: { ativo: true },
            orderBy: { ordem: 'asc' }
          },
          _count: {
            select: { pedidoExames: true }
          }
        },
        orderBy: { nome: 'asc' }
      }),
      prisma.exame.count({ where })
    ]);

    return res.json({
      data: exames,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Erro ao buscar exames:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Criar novo exame
export const createExame = async (req: Request, res: Response) => {
  try {
    const {
      codigo,
      nome,
      descricao,
      metodologia,
      material,
      valor,
      tempoResultado,
      parametros = []
    }: CreateExameData = req.body;

    // Validações básicas
    if (!codigo || !nome) {
      return res.status(400).json({ 
        error: 'Código e nome são obrigatórios' 
      });
    }

    // Verificar se código já existe
    const exameExistente = await prisma.exame.findUnique({
      where: { codigo }
    });

    if (exameExistente) {
      return res.status(400).json({ error: 'Código do exame já existe' });
    }

    // Criar exame com transação
    const exame = await prisma.$transaction(async (tx) => {
      const novoExame = await tx.exame.create({
        data: {
          codigo,
          nome,
          descricao: descricao || null,
          metodologia: metodologia || null,
          material: material || null,
          valor: valor || null,
          tempoResultado: tempoResultado || null
        }
      });

      // Criar parâmetros se fornecidos
      if (parametros.length > 0) {
        await tx.parametroExame.createMany({
          data: parametros.map((param, index) => ({
            exameId: novoExame.id,
            nome: param.nome,
            unidade: param.unidade || null,
            valorReferencia: param.valorReferencia || null,
            ordem: param.ordem || index + 1
          }))
        });
      }

      return novoExame;
    });

    // Buscar exame completo para retorno
    const exameCompleto = await prisma.exame.findUnique({
      where: { id: exame.id },
      include: {
        parametros: {
          where: { ativo: true },
          orderBy: { ordem: 'asc' }
        }
      }
    });

    return res.status(201).json(exameCompleto);
  } catch (error) {
    console.error('Erro ao criar exame:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar exame por ID
export const getExameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do exame inválido' });
    }

    const exame = await prisma.exame.findUnique({
      where: { id: Number(id) },
      include: {
        parametros: {
          where: { ativo: true },
          orderBy: { ordem: 'asc' }
        },
        pedidoExames: {
          include: {
            pedido: {
              select: { id: true, numero: true, dataColeta: true, status: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!exame) {
      return res.status(404).json({ error: 'Exame não encontrado' });
    }

    return res.json(exame);
  } catch (error) {
    console.error('Erro ao buscar exame:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar exame
export const updateExame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do exame inválido' });
    }

    const exameExistente = await prisma.exame.findUnique({
      where: { id: Number(id) }
    });

    if (!exameExistente) {
      return res.status(404).json({ error: 'Exame não encontrado' });
    }

    // Se está alterando o código, verificar se não existe outro com o mesmo código
    if (updateData.codigo && updateData.codigo !== exameExistente.codigo) {
      const codigoExiste = await prisma.exame.findUnique({
        where: { codigo: updateData.codigo }
      });

      if (codigoExiste) {
        return res.status(400).json({ error: 'Código do exame já existe' });
      }
    }

    const exameAtualizado = await prisma.exame.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        parametros: {
          where: { ativo: true },
          orderBy: { ordem: 'asc' }
        }
      }
    });

    return res.json(exameAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar exame:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Deletar exame (soft delete)
export const deleteExame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do exame inválido' });
    }

    const exame = await prisma.exame.findUnique({
      where: { id: Number(id) },
      include: {
        _count: {
          select: { pedidoExames: true }
        }
      }
    });

    if (!exame) {
      return res.status(404).json({ error: 'Exame não encontrado' });
    }

    // Verificar se há pedidos associados
    if (exame._count.pedidoExames > 0) {
      return res.status(400).json({ 
        error: 'Não é possível excluir exame que possui pedidos associados. Use a desativação.' 
      });
    }

    await prisma.exame.update({
      where: { id: Number(id) },
      data: { ativo: false }
    });

    return res.json({ message: 'Exame excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir exame:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Reativar exame
export const reactivateExame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do exame inválido' });
    }

    const exame = await prisma.exame.findUnique({
      where: { id: Number(id) }
    });

    if (!exame) {
      return res.status(404).json({ error: 'Exame não encontrado' });
    }

    if (exame.ativo) {
      return res.status(400).json({ error: 'Exame já está ativo' });
    }

    const exameReativado = await prisma.exame.update({
      where: { id: Number(id) },
      data: { ativo: true }
    });

    return res.json({ message: 'Exame reativado com sucesso', exame: exameReativado });
  } catch (error) {
    console.error('Erro ao reativar exame:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar exames (search)
export const searchExames = async (req: Request, res: Response) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.json({ data: [] });
    }

    const exames = await prisma.exame.findMany({
      where: {
        ativo: true,
        OR: [
          { nome: { contains: q as string, mode: 'insensitive' } },
          { codigo: { contains: q as string, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        codigo: true,
        nome: true,
        valor: true,
        material: true
      },
      take: Number(limit),
      orderBy: { nome: 'asc' }
    });

    return res.json({ data: exames });
  } catch (error) {
    console.error('Erro ao buscar exames:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar espécies (para compatibilidade)
export const getEspecies = async (req: Request, res: Response) => {
  try {
    const especies = await prisma.especie.findMany({
      where: { ativo: true },
      select: {
        id: true,
        nome: true
      },
      orderBy: { nome: 'asc' }
    });

    return res.json({ data: especies });
  } catch (error) {
    console.error('Erro ao buscar espécies:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
