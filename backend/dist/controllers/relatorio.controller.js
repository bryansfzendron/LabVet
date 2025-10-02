"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatorioById = exports.deleteRelatorio = exports.updateRelatorio = exports.createRelatorio = exports.getRelatorio = exports.getRelatorioExamesLiberados = exports.getRelatorioProdutividade = exports.getRelatorioFinanceiro = exports.getExamesPorMes = exports.getDashboardStats = exports.getRelatorioCompleto = exports.getPerformanceProfissionais = exports.getExamesPorTipo = exports.getTopClientes = exports.getReceitaPorMes = exports.getPedidosPorMes = exports.getDashboardMetrics = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const relatorioFilterSchema = zod_1.z.object({
    dataInicio: zod_1.z.string().optional(),
    dataFim: zod_1.z.string().optional(),
    clienteId: zod_1.z.string().optional(),
    profissionalId: zod_1.z.string().optional(),
    status: zod_1.z.string().optional()
});
const getDashboardMetrics = async (req, res) => {
    try {
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        const fimHoje = new Date(inicioHoje.getTime() + 24 * 60 * 60 * 1000);
        const [totalClientes, totalAnimais, totalPedidos, totalLaudos, pedidosHoje, laudosPendentes, receitaTotal, receitaMes] = await Promise.all([
            prisma.cliente.count({
                where: { ativo: 'S' }
            }),
            prisma.animal.count({
                where: { ativo: true }
            }),
            prisma.pedido.count(),
            prisma.laudo.count(),
            prisma.pedido.count({
                where: {
                    dataColeta: {
                        gte: inicioHoje,
                        lt: fimHoje
                    }
                }
            }),
            prisma.laudo.count({
                where: {
                    assinado: false
                }
            }),
            prisma.conta.aggregate({
                where: {
                    tipo: 'RECEBER',
                    status: 'PAGO'
                },
                _sum: {
                    valor: true
                }
            }),
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
        const metrics = {
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
    }
    catch (error) {
        console.error('Erro ao obter métricas do dashboard:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getDashboardMetrics = getDashboardMetrics;
const getPedidosPorMes = async (req, res) => {
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
        const meses = [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];
        const dadosPorMes = new Array(12).fill(0);
        pedidosPorMes.forEach(pedido => {
            const mes = new Date(pedido.dataColeta).getMonth();
            dadosPorMes[mes]++;
        });
        const chartData = {
            labels: meses,
            datasets: [{
                    label: 'Pedidos Realizados',
                    data: dadosPorMes,
                    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(54, 162, 235, 1)']
                }]
        };
        return res.json(chartData);
    }
    catch (error) {
        console.error('Erro ao obter dados de pedidos por mês:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getPedidosPorMes = getPedidosPorMes;
const getReceitaPorMes = async (req, res) => {
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
        const chartData = {
            labels: meses,
            datasets: [{
                    label: 'Receita (R$)',
                    data: dadosPorMes,
                    backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)']
                }]
        };
        return res.json(chartData);
    }
    catch (error) {
        console.error('Erro ao obter dados de receita por mês:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getReceitaPorMes = getReceitaPorMes;
const getTopClientes = async (req, res) => {
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
        clientesComPedidos.sort((a, b) => b.totalPedidos - a.totalPedidos);
        return res.json(clientesComPedidos.slice(0, Number(limit)));
    }
    catch (error) {
        console.error('Erro ao obter top clientes:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getTopClientes = getTopClientes;
const getExamesPorTipo = async (req, res) => {
    try {
        const { dataInicio, dataFim } = req.query;
        const where = {};
        if (dataInicio && dataFim) {
            where.pedido = {
                dataColeta: {
                    gte: new Date(dataInicio),
                    lte: new Date(dataFim)
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
        const labels = [];
        const data = [];
        const backgroundColor = [];
        const cores = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ];
        examesPorTipo.forEach((item, index) => {
            const exame = exames.find(e => e.id === item.exameId);
            if (exame && exame.nome) {
                labels.push(exame.nome);
                data.push(item._count.id);
                backgroundColor.push(cores[index % cores.length] || '#FF6384');
            }
        });
        const chartData = {
            labels,
            datasets: [{
                    label: 'Quantidade de Exames',
                    data,
                    backgroundColor
                }]
        };
        return res.json(chartData);
    }
    catch (error) {
        console.error('Erro ao obter exames por tipo:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getExamesPorTipo = getExamesPorTipo;
const getPerformanceProfissionais = async (req, res) => {
    try {
        const { dataInicio, dataFim } = req.query;
        const where = {};
        if (dataInicio && dataFim) {
            where.dataLiberacao = {
                gte: new Date(dataInicio),
                lte: new Date(dataFim)
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
        const profissionaisIds = laudosPorProfissional
            .map(item => item.profissionalId)
            .filter((id) => id !== null);
        const profissionais = await prisma.profissional.findMany({
            where: {
                id: { in: profissionaisIds }
            },
            select: {
                id: true,
                nome: true
            }
        });
        const performance = laudosPorProfissional.map(item => {
            const profissional = profissionais.find(p => p.id === item.profissionalId);
            return {
                profissionalId: item.profissionalId,
                nome: profissional?.nome || 'Profissional não encontrado',
                totalLaudos: item._count.id
            };
        });
        return res.json(performance);
    }
    catch (error) {
        console.error('Erro ao obter performance dos profissionais:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getPerformanceProfissionais = getPerformanceProfissionais;
const getRelatorioCompleto = async (req, res) => {
    try {
        const validation = relatorioFilterSchema.safeParse(req.query);
        if (!validation.success) {
            return res.status(400).json({
                error: 'Parâmetros inválidos',
                details: validation.error.issues
            });
        }
        const { dataInicio, dataFim, clienteId, profissionalId, status } = validation.data;
        const wherePedidos = {};
        const whereLaudos = {};
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
    }
    catch (error) {
        console.error('Erro ao gerar relatório completo:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getRelatorioCompleto = getRelatorioCompleto;
exports.getDashboardStats = exports.getDashboardMetrics;
exports.getExamesPorMes = exports.getPedidosPorMes;
const getRelatorioFinanceiro = async (req, res) => {
    return res.json({
        message: 'Use as rotas específicas: /api/financeiro/contas-receber, /api/financeiro/contas-pagar, /api/financeiro/fluxo-caixa'
    });
};
exports.getRelatorioFinanceiro = getRelatorioFinanceiro;
exports.getRelatorioProdutividade = exports.getPerformanceProfissionais;
exports.getRelatorioExamesLiberados = exports.getRelatorioCompleto;
exports.getRelatorio = exports.getRelatorioCompleto;
const createRelatorio = async (req, res) => {
    return res.status(501).json({ message: 'Funcionalidade não implementada' });
};
exports.createRelatorio = createRelatorio;
const updateRelatorio = async (req, res) => {
    return res.status(501).json({ message: 'Funcionalidade não implementada' });
};
exports.updateRelatorio = updateRelatorio;
const deleteRelatorio = async (req, res) => {
    return res.status(501).json({ message: 'Funcionalidade não implementada' });
};
exports.deleteRelatorio = deleteRelatorio;
const getRelatorioById = async (req, res) => {
    return res.status(501).json({ message: 'Funcionalidade não implementada' });
};
exports.getRelatorioById = getRelatorioById;
//# sourceMappingURL=relatorio.controller.js.map