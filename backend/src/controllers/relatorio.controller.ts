import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schema para filtros de relatórios
const relatorioFilterSchema = z.object({
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  clienteId: z.string().optional(),
  profissionalId: z.string().optional(),
  status: z.string().optional()
});

// Interface para métricas do dashboard
interface DashboardMetrics {
  totalClientes: number;
  totalAnimais: number;
  totalPedidos: number;
  totalLaudos: number;
  pedidosHoje: number;
  laudosPendentes: number;
  receitaTotal: number;
  receitaMes: number;
}

// Interface para dados de gráficos
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}

/**
 * @route   GET /api/relatorios/dashboard
 * @desc    Obter métricas principais do dashboard
 * @access  Private
 */
export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const fimHoje = new Date(inicioHoje.getTime() + 24 * 60 * 60 * 1000);

    // Executar todas as consultas em paralelo
    const [
      totalClientes,
      totalAnimais,
      totalPedidos,
      totalLaudos,
      pedidosHoje,
      laudosPendentes,
      receitaTotal,
      receitaMes
    ] = await Promise.all([
      // Total de clientes ativos
      prisma.cliente.count({
        where: { ativo: 'S' }
      }),

      // Total de animais ativos
      prisma.animal.count({
        where: { ativo: true }
      }),

      // Total de pedidos
      prisma.pedido.count(),

      // Total de laudos
      prisma.laudo.count(),

      // Pedidos de hoje
      prisma.pedido.count({
        where: {
          dataColeta: {
            gte: inicioHoje,
            lt: fimHoje
          }
        }
      }),

      // Laudos não assinados (pendentes)
      prisma.laudo.count({
        where: {
          assinado: false
        }
      }),

      // Receita total (contas recebidas)
      prisma.conta.aggregate({
        where: {
          tipo: 'RECEBER',
          status: 'PAGO'
        },
        _sum: {
          valor: true
        }
      }),

      // Receita do mês atual
      prisma.conta.aggregate({
        where: {
          tipo: 'RECEBER',
          status: 'PAGO',
          dataPagamento: {
            gte: inicioMes
          }
        },
        _sum: {
          valor: true
        }
      })
    ]);

    const metrics: DashboardMetrics = {
      totalClientes,
      totalAnimais,
      totalPedidos,
      totalLaudos,
      pedidosHoje,
      laudosPendentes,
      receitaTotal: Number(receitaTotal._sum.valor || 0),
      receitaMes: Number(receitaMes._sum.valor || 0)
    };

    return res.json(metrics);
  } catch (error) {
    console.error('Erro ao obter métricas do dashboard:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * @route   GET /api/relatorios/pedidos-por-mes
 * @desc    Obter dados de pedidos por mês para gráfico
 * @access  Private
 */
export const getPedidosPorMes = async (req: Request, res: Response) => {
  try {
    const { ano = new Date().getFullYear() } = req.query;

    const pedidosPorMes = await prisma.pedido.findMany({
      where: {
        dataColeta: {
          gte: new Date(`${ano}-01-01`),
          lt: new Date(`${Number(ano) + 1}-01-01`)
        }
      },
      select: {
        dataColeta: true
      }
    });

    // Processar dados para o gráfico
    const meses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const dadosPorMes = new Array(12).fill(0);

    pedidosPorMes.forEach(pedido => {
      const mes = new Date(pedido.dataColeta).getMonth();
      dadosPorMes[mes]++;
    });

    const chartData: ChartData = {
      labels: meses,
      datasets: [{
        label: 'Pedidos Realizados',
        data: dadosPorMes,
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)']
      }]
    };

    return res.json(chartData);
  } catch (error) {
    console.error('Erro ao obter dados de pedidos por mês:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * @route   GET /api/relatorios/receita-por-mes
 * @desc    Obter dados de receita por mês para gráfico
 * @access  Private
 */
export const getReceitaPorMes = async (req: Request, res: Response) => {
  try {
    const { ano = new Date().getFullYear() } = req.query;

    const receitaPorMes = await prisma.conta.findMany({
      where: {
        tipo: 'RECEBER',
        status: 'PAGO',
        dataPagamento: {
          gte: new Date(`${ano}-01-01`),
          lt: new Date(`${Number(ano) + 1}-01-01`)
        }
      },
      select: {
        dataPagamento: true,
        valor: true
      }
    });

    // Processar dados para o gráfico
    const meses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const dadosPorMes = new Array(12).fill(0);

    receitaPorMes.forEach(conta => {
      if (conta.dataPagamento) {
        const mes = new Date(conta.dataPagamento).getMonth();
        dadosPorMes[mes] += Number(conta.valor);
      }
    });

    const chartData: ChartData = {
      labels: meses,
      datasets: [{
        label: 'Receita (R$)',
        data: dadosPorMes,
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)']
      }]
    };

    return res.json(chartData);
  } catch (error) {
    console.error('Erro ao obter dados de receita por mês:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * @route   GET /api/relatorios/top-clientes
 * @desc    Obter top clientes por número de pedidos
 * @access  Private
 */
export const getTopClientes = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;

    const topClientes = await prisma.cliente.findMany({
      where: { ativo: 'S' },
      include: {
        animais: {
          include: {
            pedidos: {
              select: { id: true }
            }
          }
        }
      },
      take: Number(limit)
    });

    // Calcular número de pedidos por cliente
    const clientesComPedidos = topClientes.map(cliente => {
      const totalPedidos = cliente.animais.reduce((total, animal) => {
        return total + animal.pedidos.length;
      }, 0);

      return {
        id: cliente.id,
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email,
        totalPedidos,
        totalAnimais: cliente.animais.length
      };
    });

    // Ordenar por número de pedidos
    clientesComPedidos.sort((a, b) => b.totalPedidos - a.totalPedidos);

    return res.json(clientesComPedidos.slice(0, Number(limit)));
  } catch (error) {
    console.error('Erro ao obter top clientes:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * @route   GET /api/relatorios/exames-por-tipo
 * @desc    Obter distribuição de exames por tipo
 * @access  Private
 */
export const getExamesPorTipo = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim } = req.query;

    const where: any = {};

    if (dataInicio && dataFim) {
      where.pedido = {
        dataColeta: {
          gte: new Date(dataInicio as string),
          lte: new Date(dataFim as string)
        }
      };
    }

    const examesPorTipo = await prisma.pedidoExame.groupBy({
      by: ['exameId'],
      where,
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });

    // Buscar nomes dos exames
    const examesIds = examesPorTipo.map(item => item.exameId);
    const exames = await prisma.exame.findMany({
      where: {
        id: { in: examesIds }
      },
      select: {
        id: true,
        nome: true
      }
    });

    // Mapear dados para o gráfico
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = [];

    const cores = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
    ];

    examesPorTipo.forEach((item, index) => {
      const exame = exames.find(e => e.id === item.exameId);
      if (exame && exame.nome) {
        labels.push(exame.nome);
        data.push(item._count.id);
        backgroundColor.push(cores[index % cores.length]);
      }
    });

    const chartData: ChartData = {
      labels,
      datasets: [{
        label: 'Quantidade de Exames',
        data,
        backgroundColor
      }]
    };

    return res.json(chartData);
  } catch (error) {
    console.error('Erro ao obter exames por tipo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * @route   GET /api/relatorios/performance-profissionais
 * @desc    Obter performance dos profissionais (laudos assinados)
 * @access  Private
 */
export const getPerformanceProfissionais = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim } = req.query;

    const where: any = {};

    if (dataInicio && dataFim) {
      where.dataLiberacao = {
        gte: new Date(dataInicio as string),
        lte: new Date(dataFim as string)
      };
    }

    const laudosPorProfissional = await prisma.laudo.groupBy({
      by: ['profissionalId'],
      where: {
        ...where,
        profissionalId: {
          not: null
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });

    // Buscar nomes dos profissionais
    const profissionaisIds = laudosPorProfissional
      .map(item => item.profissionalId)
      .filter((id): id is number => id !== null);
    
    const profissionais = await prisma.profissional.findMany({
      where: {
        id: { in: profissionaisIds }
      },
      select: {
        id: true,
        nome: true
      }
    });

    // Mapear dados
    const performance = laudosPorProfissional.map(item => {
      const profissional = profissionais.find(p => p.id === item.profissionalId);
      return {
        profissionalId: item.profissionalId,
        nome: profissional?.nome || 'Profissional não encontrado',
        totalLaudos: item._count.id
      };
    });

    return res.json(performance);
  } catch (error) {
    console.error('Erro ao obter performance dos profissionais:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * @route   GET /api/relatorios/relatorio-completo
 * @desc    Obter relatório completo com filtros
 * @access  Private
 */
export const getRelatorioCompleto = async (req: Request, res: Response) => {
  try {
    const validation = relatorioFilterSchema.safeParse(req.query);
    
    if (!validation.success) {
      return res.status(400).json({
        error: 'Parâmetros inválidos',
        details: validation.error.issues
      });
    }

    const { dataInicio, dataFim, clienteId, profissionalId, status } = validation.data;

    // Construir filtros
    const wherePedidos: any = {};
    const whereLaudos: any = {};

    if (dataInicio && dataFim) {
      wherePedidos.dataColeta = {
        gte: new Date(dataInicio),
        lte: new Date(dataFim)
      };
      whereLaudos.dataLiberacao = {
        gte: new Date(dataInicio),
        lte: new Date(dataFim)
      };
    }

    if (clienteId) {
      wherePedidos.clienteId = Number(clienteId);
    }

    if (profissionalId) {
      whereLaudos.profissionalId = Number(profissionalId);
    }

    if (status) {
      wherePedidos.status = status;
    }

    // Buscar dados
    const [pedidos, laudos] = await Promise.all([
      prisma.pedido.findMany({
        where: wherePedidos,
        include: {
          animal: {
            include: {
              cliente: {
                select: {
                  id: true,
                  nome: true
                }
              }
            }
          },
          exames: {
            include: {
              exame: {
                select: {
                  id: true,
                  nome: true
                }
              }
            }
          },
          laudos: {
            select: {
              id: true,
              assinado: true,
              dataLiberacao: true,
              profissional: {
                select: {
                  id: true,
                  nome: true
                }
              }
            }
          }
        },
        orderBy: {
          dataColeta: 'desc'
        }
      }),

      prisma.laudo.findMany({
        where: whereLaudos,
        include: {
          pedido: {
            include: {
              animal: {
                include: {
                  cliente: {
                    select: {
                      id: true,
                      nome: true
                    }
                  }
                }
              },
              exames: {
                include: {
                  exame: {
                    select: {
                      id: true,
                      nome: true
                    }
                  }
                }
              }
            }
          },
          profissional: {
            select: {
              id: true,
              nome: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]);

    return res.json({
      pedidos,
      laudos,
      resumo: {
        totalPedidos: pedidos.length,
        totalLaudos: laudos.length,
        laudosPendentes: laudos.filter(l => !l.assinado).length,
        laudosAssinados: laudos.filter(l => l.assinado).length
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório completo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Funções de compatibilidade com rotas existentes
export const getDashboardStats = getDashboardMetrics;
export const getExamesPorMes = getPedidosPorMes; // Alias para compatibilidade
export const getRelatorioFinanceiro = async (req: Request, res: Response) => {
  // Redirecionar para as rotas financeiras específicas
  return res.json({ 
    message: 'Use as rotas específicas: /api/financeiro/contas-receber, /api/financeiro/contas-pagar, /api/financeiro/fluxo-caixa' 
  });
};
export const getRelatorioProdutividade = getPerformanceProfissionais;
export const getRelatorioExamesLiberados = getRelatorioCompleto;

// Funções básicas CRUD para compatibilidade
export const getRelatorio = getRelatorioCompleto;
export const createRelatorio = async (req: Request, res: Response) => {
  return res.status(501).json({ message: 'Funcionalidade não implementada' });
};
export const updateRelatorio = async (req: Request, res: Response) => {
  return res.status(501).json({ message: 'Funcionalidade não implementada' });
};
export const deleteRelatorio = async (req: Request, res: Response) => {
  return res.status(501).json({ message: 'Funcionalidade não implementada' });
};
export const getRelatorioById = async (req: Request, res: Response) => {
  return res.status(501).json({ message: 'Funcionalidade não implementada' });
};
