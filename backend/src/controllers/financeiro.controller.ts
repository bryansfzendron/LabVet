import { Request, Response } from 'express';
import { PrismaClient, TipoConta, StatusConta } from '@prisma/client';
import { z } from 'zod';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// ================================
// SCHEMAS DE VALIDAÇÃO
// ================================

const createBancoSchema = z.object({
  codigo: z.string().optional(),
  nome: z.string().min(1, 'Nome do banco é obrigatório'),
  agencia: z.string().optional(),
  nomeAgencia: z.string().optional(),
  conta: z.string().optional(),
});

const createContaSchema = z.object({
  pedidoId: z.number().optional(),
  bancoId: z.number().optional(),
  tipo: z.enum(['RECEBER', 'PAGAR']),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  valor: z.number().positive('Valor deve ser positivo'),
  dataVencimento: z.string().transform((str) => new Date(str)),
  observacoes: z.string().optional(),
});

const updateContaSchema = z.object({
  bancoId: z.number().optional(),
  tipo: z.enum(['RECEBER', 'PAGAR']).optional(),
  descricao: z.string().min(1).optional(),
  valor: z.number().positive().optional(),
  dataVencimento: z.string().transform((str) => new Date(str)).optional(),
  observacoes: z.string().optional(),
});

const pagarContaSchema = z.object({
  dataPagamento: z.string().transform((str) => new Date(str)),
  bancoId: z.number().optional(),
});

// ================================
// INTERFACES
// ================================

interface CreateBancoData {
  codigo?: string | undefined;
  nome: string;
  agencia?: string | undefined;
  nomeAgencia?: string | undefined;
  conta?: string | undefined;
}

interface CreateContaData {
  pedidoId?: number | undefined;
  bancoId?: number | undefined;
  tipo: TipoConta;
  descricao: string;
  valor: number;
  dataVencimento?: Date | undefined;
  observacoes?: string | undefined;
}

// ================================
// CONTROLADORES DE BANCOS
// ================================

/**
 * Listar bancos com paginação e filtros
 */
export const getBancos = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, ativo } = req.query;

    const where: any = {};

    if (search) {
      where.OR = [
        { nome: { contains: search as string, mode: 'insensitive' } },
        { codigo: { contains: search as string, mode: 'insensitive' } },
        { agencia: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (ativo !== undefined) {
      where.ativo = ativo === 'true';
    }

    const [bancos, total] = await Promise.all([
      prisma.banco.findMany({
        where,
        include: {
          _count: {
            select: { contas: true }
          }
        },
        orderBy: { nome: 'asc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.banco.count({ where }),
    ]);

    return res.json({
      data: bancos,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Erro ao listar bancos:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Buscar banco por ID
 */
export const getBancoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do banco inválido' });
    }

    const banco = await prisma.banco.findUnique({
      where: { id: Number(id) },
      include: {
        contas: {
          include: {
            pedido: {
              select: {
                id: true,
                numero: true,
                cliente: { select: { id: true, nome: true } }
              }
            }
          },
          orderBy: { dataVencimento: 'desc' },
          take: 10
        },
        _count: {
          select: { contas: true }
        }
      },
    });

    if (!banco) {
      return res.status(404).json({ error: 'Banco não encontrado' });
    }

    return res.json(banco);
  } catch (error) {
    console.error('Erro ao buscar banco:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Criar novo banco
 */
export const createBanco = async (req: Request, res: Response) => {
  try {
    const validatedData = createBancoSchema.parse(req.body);
    const { codigo, nome, agencia, nomeAgencia, conta }: CreateBancoData = validatedData;

    // Verificar se já existe banco com o mesmo código (se fornecido)
    if (codigo) {
      const codigoExiste = await prisma.banco.findFirst({
        where: { codigo }
      });

      if (codigoExiste) {
        return res.status(400).json({ error: 'Código do banco já existe' });
      }
    }

    const banco = await prisma.banco.create({
      data: {
        ...(codigo && { codigo }),
        nome,
        ...(agencia && { agencia }),
        ...(nomeAgencia && { nomeAgencia }),
        ...(conta && { conta }),
        ativo: true,
      },
    });

    return res.status(201).json(banco);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.issues 
      });
    }
    console.error('Erro ao criar banco:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Atualizar banco
 */
export const updateBanco = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do banco inválido' });
    }

    const bancoExistente = await prisma.banco.findUnique({
      where: { id: Number(id) }
    });

    if (!bancoExistente) {
      return res.status(404).json({ error: 'Banco não encontrado' });
    }

    // Se está alterando o código, verificar se não existe outro com o mesmo
    if (updateData.codigo && updateData.codigo !== bancoExistente.codigo) {
      const codigoExiste = await prisma.banco.findFirst({
        where: { 
          codigo: updateData.codigo,
          id: { not: Number(id) }
        }
      });

      if (codigoExiste) {
        return res.status(400).json({ error: 'Código já existe para outro banco' });
      }
    }

    const bancoAtualizado = await prisma.banco.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res.json(bancoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar banco:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Desativar banco
 */
export const deactivateBanco = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do banco inválido' });
    }

    // Verificar se existem contas pendentes associadas
    const contasPendentes = await prisma.conta.count({
      where: {
        bancoId: Number(id),
        status: { in: ['PENDENTE', 'VENCIDO'] }
      }
    });

    if (contasPendentes > 0) {
      return res.status(400).json({ 
        error: `Não é possível desativar o banco. Existem ${contasPendentes} conta(s) pendente(s) associada(s).` 
      });
    }

    const banco = await prisma.banco.update({
      where: { id: Number(id) },
      data: { ativo: false },
    });

    return res.json({ message: 'Banco desativado com sucesso', banco });
  } catch (error) {
    console.error('Erro ao desativar banco:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Reativar banco
 */
export const reactivateBanco = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do banco inválido' });
    }

    const banco = await prisma.banco.update({
      where: { id: Number(id) },
      data: { ativo: true },
    });

    return res.json({ message: 'Banco reativado com sucesso', banco });
  } catch (error) {
    console.error('Erro ao reativar banco:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// ================================
// CONTROLADORES DE CONTAS
// ================================

/**
 * Listar contas com paginação e filtros
 */
export const getContas = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      tipo, 
      status, 
      bancoId,
      dataInicio,
      dataFim,
      vencimentoInicio,
      vencimentoFim
    } = req.query;

    const where: any = {};

    if (search) {
      where.OR = [
        { descricao: { contains: search as string, mode: 'insensitive' } },
        { 
          pedido: {
            OR: [
              { numero: { contains: search as string, mode: 'insensitive' } },
              { cliente: { nome: { contains: search as string, mode: 'insensitive' } } }
            ]
          }
        }
      ];
    }

    if (tipo) {
      where.tipo = tipo;
    }

    if (status) {
      where.status = status;
    }

    if (bancoId) {
      where.bancoId = Number(bancoId);
    }

    if (dataInicio || dataFim) {
      where.createdAt = {};
      if (dataInicio) where.createdAt.gte = new Date(dataInicio as string);
      if (dataFim) where.createdAt.lte = new Date(dataFim as string);
    }

    if (vencimentoInicio || vencimentoFim) {
      where.dataVencimento = {};
      if (vencimentoInicio) where.dataVencimento.gte = new Date(vencimentoInicio as string);
      if (vencimentoFim) where.dataVencimento.lte = new Date(vencimentoFim as string);
    }

    const [contas, total] = await Promise.all([
      prisma.conta.findMany({
        where,
        include: {
          pedido: {
            select: {
              id: true,
              numero: true,
              cliente: { select: { id: true, nome: true } }
            }
          },
          banco: {
            select: {
              id: true,
              nome: true,
              codigo: true
            }
          }
        },
        orderBy: { dataVencimento: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.conta.count({ where }),
    ]);

    // Calcular totais por tipo e status
    const totais = await prisma.conta.groupBy({
      by: ['tipo', 'status'],
      where,
      _sum: {
        valor: true
      }
    });

    return res.json({
      data: contas,
      totais,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Erro ao listar contas:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Buscar conta por ID
 */
export const getContaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID da conta inválido' });
    }

    const conta = await prisma.conta.findUnique({
      where: { id: Number(id) },
      include: {
        pedido: {
          include: {
            cliente: { select: { id: true, nome: true, email: true, telefone: true } },
            animal: { select: { id: true, nome: true } },
            profissional: { select: { id: true, nome: true } },
            exames: {
              include: {
                exame: { select: { id: true, nome: true, codigo: true } }
              }
            }
          }
        },
        banco: true
      },
    });

    if (!conta) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    return res.json(conta);
  } catch (error) {
    console.error('Erro ao buscar conta:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Criar nova conta
 */
export const createConta = async (req: Request, res: Response) => {
  try {
    const validatedData = createContaSchema.parse(req.body);
    const { pedidoId, bancoId, tipo, descricao, valor, dataVencimento, observacoes }: CreateContaData = validatedData;

    // Verificar se o pedido existe (se fornecido)
    if (pedidoId) {
      const pedidoExiste = await prisma.pedido.findUnique({
        where: { id: pedidoId }
      });

      if (!pedidoExiste) {
        return res.status(400).json({ error: 'Pedido não encontrado' });
      }
    }

    // Verificar se o banco existe (se fornecido)
    if (bancoId) {
      const bancoExiste = await prisma.banco.findUnique({
        where: { id: bancoId, ativo: true }
      });

      if (!bancoExiste) {
        return res.status(400).json({ error: 'Banco não encontrado ou inativo' });
      }
    }

    const conta = await prisma.conta.create({
      data: {
        ...(pedidoId && { pedidoId }),
        ...(bancoId && { bancoId }),
        tipo,
        descricao,
        valor: new Decimal(valor),
        ...(dataVencimento && { dataVencimento }),
        ...(observacoes && { observacoes }),
        status: 'PENDENTE',
      },
      include: {
        pedido: {
          select: {
            id: true,
            numero: true,
            cliente: { select: { id: true, nome: true } }
          }
        },
        banco: {
          select: {
            id: true,
            nome: true,
            codigo: true
          }
        }
      },
    });

    return res.status(201).json(conta);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.issues 
      });
    }
    console.error('Erro ao criar conta:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Atualizar conta
 */
export const updateConta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateContaSchema.parse(req.body);

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID da conta inválido' });
    }

    const contaExistente = await prisma.conta.findUnique({
      where: { id: Number(id) }
    });

    if (!contaExistente) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    // Não permitir alteração de contas já pagas
    if (contaExistente.status === 'PAGO') {
      return res.status(400).json({ error: 'Não é possível alterar conta já paga' });
    }

    // Verificar se o banco existe (se fornecido)
    if (validatedData.bancoId) {
      const bancoExiste = await prisma.banco.findUnique({
        where: { id: validatedData.bancoId, ativo: true }
      });

      if (!bancoExiste) {
        return res.status(400).json({ error: 'Banco não encontrado ou inativo' });
      }
    }

    // Converter valor para Decimal se fornecido
    const updateData: any = { ...validatedData };
    if (updateData.valor) {
      updateData.valor = new Decimal(updateData.valor);
    }

    const contaAtualizada = await prisma.conta.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        pedido: {
          select: {
            id: true,
            numero: true,
            cliente: { select: { id: true, nome: true } }
          }
        },
        banco: {
          select: {
            id: true,
            nome: true,
            codigo: true
          }
        }
      },
    });

    return res.json(contaAtualizada);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.issues 
      });
    }
    console.error('Erro ao atualizar conta:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Pagar conta
 */
export const pagarConta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = pagarContaSchema.parse(req.body);
    const { dataPagamento, bancoId } = validatedData;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID da conta inválido' });
    }

    const contaExistente = await prisma.conta.findUnique({
      where: { id: Number(id) }
    });

    if (!contaExistente) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    if (contaExistente.status === 'PAGO') {
      return res.status(400).json({ error: 'Conta já foi paga' });
    }

    if (contaExistente.status === 'CANCELADO') {
      return res.status(400).json({ error: 'Não é possível pagar conta cancelada' });
    }

    // Verificar se o banco existe (se fornecido)
    if (bancoId) {
      const bancoExiste = await prisma.banco.findUnique({
        where: { id: bancoId, ativo: true }
      });

      if (!bancoExiste) {
        return res.status(400).json({ error: 'Banco não encontrado ou inativo' });
      }
    }

    const updateData: any = {
      status: 'PAGO',
      dataPagamento,
    };

    if (bancoId) {
      updateData.bancoId = bancoId;
    }

    const contaPaga = await prisma.conta.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        pedido: {
          select: {
            id: true,
            numero: true,
            cliente: { select: { id: true, nome: true } }
          }
        },
        banco: {
          select: {
            id: true,
            nome: true,
            codigo: true
          }
        }
      },
    });

    return res.json({ message: 'Conta paga com sucesso', conta: contaPaga });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.issues 
      });
    }
    console.error('Erro ao pagar conta:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Cancelar conta
 */
export const cancelarConta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID da conta inválido' });
    }

    const contaExistente = await prisma.conta.findUnique({
      where: { id: Number(id) }
    });

    if (!contaExistente) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    if (contaExistente.status === 'PAGO') {
      return res.status(400).json({ error: 'Não é possível cancelar conta já paga' });
    }

    const contaCancelada = await prisma.conta.update({
      where: { id: Number(id) },
      data: { status: 'CANCELADO' },
      include: {
        pedido: {
          select: {
            id: true,
            numero: true,
            cliente: { select: { id: true, nome: true } }
          }
        },
        banco: {
          select: {
            id: true,
            nome: true,
            codigo: true
          }
        }
      },
    });

    return res.json({ message: 'Conta cancelada com sucesso', conta: contaCancelada });
  } catch (error) {
    console.error('Erro ao cancelar conta:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Excluir conta
 */
export const deleteConta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID da conta inválido' });
    }

    const contaExistente = await prisma.conta.findUnique({
      where: { id: Number(id) }
    });

    if (!contaExistente) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    if (contaExistente.status === 'PAGO') {
      return res.status(400).json({ error: 'Não é possível excluir conta já paga' });
    }

    await prisma.conta.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: 'Conta excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir conta:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// ================================
// RELATÓRIOS FINANCEIROS
// ================================

/**
 * Relatório de contas a receber
 */
export const getContasReceber = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim, status, bancoId } = req.query;

    const where: any = {
      tipo: 'RECEBER'
    };

    if (status) {
      where.status = status;
    }

    if (bancoId) {
      where.bancoId = Number(bancoId);
    }

    if (dataInicio || dataFim) {
      where.dataVencimento = {};
      if (dataInicio) where.dataVencimento.gte = new Date(dataInicio as string);
      if (dataFim) where.dataVencimento.lte = new Date(dataFim as string);
    }

    const [contas, totais] = await Promise.all([
      prisma.conta.findMany({
        where,
        include: {
          pedido: {
            select: {
              id: true,
              numero: true,
              cliente: { select: { id: true, nome: true } }
            }
          },
          banco: {
            select: {
              id: true,
              nome: true
            }
          }
        },
        orderBy: { dataVencimento: 'asc' },
      }),
      prisma.conta.groupBy({
        by: ['status'],
        where,
        _sum: {
          valor: true
        },
        _count: true
      })
    ]);

    return res.json({
      contas,
      totais,
      resumo: {
        totalContas: contas.length,
        valorTotal: contas.reduce((acc, conta) => acc + Number(conta.valor), 0),
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório de contas a receber:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Relatório de contas a pagar
 */
export const getContasPagar = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim, status, bancoId } = req.query;

    const where: any = {
      tipo: 'PAGAR'
    };

    if (status) {
      where.status = status;
    }

    if (bancoId) {
      where.bancoId = Number(bancoId);
    }

    if (dataInicio || dataFim) {
      where.dataVencimento = {};
      if (dataInicio) where.dataVencimento.gte = new Date(dataInicio as string);
      if (dataFim) where.dataVencimento.lte = new Date(dataFim as string);
    }

    const [contas, totais] = await Promise.all([
      prisma.conta.findMany({
        where,
        include: {
          banco: {
            select: {
              id: true,
              nome: true
            }
          }
        },
        orderBy: { dataVencimento: 'asc' },
      }),
      prisma.conta.groupBy({
        by: ['status'],
        where,
        _sum: {
          valor: true
        },
        _count: true
      })
    ]);

    return res.json({
      contas,
      totais,
      resumo: {
        totalContas: contas.length,
        valorTotal: contas.reduce((acc, conta) => acc + Number(conta.valor), 0),
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório de contas a pagar:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Fluxo de caixa
 */
export const getFluxoCaixa = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim } = req.query;

    const where: any = {};

    if (dataInicio || dataFim) {
      where.dataVencimento = {};
      if (dataInicio) where.dataVencimento.gte = new Date(dataInicio as string);
      if (dataFim) where.dataVencimento.lte = new Date(dataFim as string);
    }

    const [contasReceber, contasPagar] = await Promise.all([
      prisma.conta.groupBy({
        by: ['status'],
        where: { ...where, tipo: 'RECEBER' },
        _sum: { valor: true },
        _count: true
      }),
      prisma.conta.groupBy({
        by: ['status'],
        where: { ...where, tipo: 'PAGAR' },
        _sum: { valor: true },
        _count: true
      })
    ]);

    // Calcular totais
    const totalReceber = contasReceber.reduce((acc, item) => acc + Number(item._sum.valor || 0), 0);
    const totalPagar = contasPagar.reduce((acc, item) => acc + Number(item._sum.valor || 0), 0);
    const saldoProjetado = totalReceber - totalPagar;

    // Contas pagas (entradas e saídas efetivas)
    const receberPago = contasReceber.find(item => item.status === 'PAGO')?._sum.valor || 0;
    const pagarPago = contasPagar.find(item => item.status === 'PAGO')?._sum.valor || 0;
    const saldoRealizado = Number(receberPago) - Number(pagarPago);

    return res.json({
      contasReceber,
      contasPagar,
      resumo: {
        totalReceber,
        totalPagar,
        saldoProjetado,
        saldoRealizado,
        receberPago: Number(receberPago),
        pagarPago: Number(pagarPago),
      }
    });
  } catch (error) {
    console.error('Erro ao gerar fluxo de caixa:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// ================================
// FUNÇÕES LEGADAS (COMPATIBILIDADE)
// ================================

export const getFinanceiro = async (req: Request, res: Response) => {
  return getContas(req, res);
};

export const createFinanceiro = async (req: Request, res: Response) => {
  return createConta(req, res);
};

export const updateFinanceiro = async (req: Request, res: Response) => {
  return updateConta(req, res);
};

export const deleteFinanceiro = async (req: Request, res: Response) => {
  return deleteConta(req, res);
};

export const getFinanceiroById = async (req: Request, res: Response) => {
  return getContaById(req, res);
};

export const createMovimentacao = async (req: Request, res: Response) => {
  return createConta(req, res);
};

export const getMovimentacoes = async (req: Request, res: Response) => {
  return getContas(req, res);
};

export const pagarMovimentacao = async (req: Request, res: Response) => {
  return pagarConta(req, res);
};

// Manter compatibilidade com nomes antigos
export const deactivateConta = deactivateBanco;
export const reactivateConta = reactivateBanco;
