"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateConta = exports.deactivateConta = exports.pagarMovimentacao = exports.getMovimentacoes = exports.createMovimentacao = exports.getFinanceiroById = exports.deleteFinanceiro = exports.updateFinanceiro = exports.createFinanceiro = exports.getFinanceiro = exports.getFluxoCaixa = exports.getContasPagar = exports.getContasReceber = exports.deleteConta = exports.cancelarConta = exports.pagarConta = exports.updateConta = exports.createConta = exports.getContaById = exports.getContas = exports.reactivateBanco = exports.deactivateBanco = exports.updateBanco = exports.createBanco = exports.getBancoById = exports.getBancos = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
const createBancoSchema = zod_1.z.object({
    codigo: zod_1.z.string().optional(),
    nome: zod_1.z.string().min(1, 'Nome do banco é obrigatório'),
    agencia: zod_1.z.string().optional(),
    nomeAgencia: zod_1.z.string().optional(),
    conta: zod_1.z.string().optional(),
});
const createContaSchema = zod_1.z.object({
    pedidoId: zod_1.z.number().optional(),
    bancoId: zod_1.z.number().optional(),
    tipo: zod_1.z.enum(['RECEBER', 'PAGAR']),
    descricao: zod_1.z.string().min(1, 'Descrição é obrigatória'),
    valor: zod_1.z.number().positive('Valor deve ser positivo'),
    dataVencimento: zod_1.z.string().transform((str) => new Date(str)),
    observacoes: zod_1.z.string().optional(),
});
const updateContaSchema = zod_1.z.object({
    bancoId: zod_1.z.number().optional(),
    tipo: zod_1.z.enum(['RECEBER', 'PAGAR']).optional(),
    descricao: zod_1.z.string().min(1).optional(),
    valor: zod_1.z.number().positive().optional(),
    dataVencimento: zod_1.z.string().transform((str) => new Date(str)).optional(),
    observacoes: zod_1.z.string().optional(),
});
const pagarContaSchema = zod_1.z.object({
    dataPagamento: zod_1.z.string().transform((str) => new Date(str)),
    bancoId: zod_1.z.number().optional(),
});
const getBancos = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, ativo } = req.query;
        const where = {};
        if (search) {
            where.OR = [
                { nome: { contains: search, mode: 'insensitive' } },
                { codigo: { contains: search, mode: 'insensitive' } },
                { agencia: { contains: search, mode: 'insensitive' } },
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
    }
    catch (error) {
        console.error('Erro ao listar bancos:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getBancos = getBancos;
const getBancoById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao buscar banco:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getBancoById = getBancoById;
const createBanco = async (req, res) => {
    try {
        const validatedData = createBancoSchema.parse(req.body);
        const { codigo, nome, agencia, nomeAgencia, conta } = validatedData;
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                error: 'Dados inválidos',
                details: error.issues
            });
        }
        console.error('Erro ao criar banco:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createBanco = createBanco;
const updateBanco = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao atualizar banco:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateBanco = updateBanco;
const deactivateBanco = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do banco inválido' });
        }
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
    }
    catch (error) {
        console.error('Erro ao desativar banco:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.deactivateBanco = deactivateBanco;
const reactivateBanco = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao reativar banco:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.reactivateBanco = reactivateBanco;
const getContas = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, tipo, status, bancoId, dataInicio, dataFim, vencimentoInicio, vencimentoFim } = req.query;
        const where = {};
        if (search) {
            where.OR = [
                { descricao: { contains: search, mode: 'insensitive' } },
                {
                    pedido: {
                        OR: [
                            { numero: { contains: search, mode: 'insensitive' } },
                            { cliente: { nome: { contains: search, mode: 'insensitive' } } }
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
            if (dataInicio)
                where.createdAt.gte = new Date(dataInicio);
            if (dataFim)
                where.createdAt.lte = new Date(dataFim);
        }
        if (vencimentoInicio || vencimentoFim) {
            where.dataVencimento = {};
            if (vencimentoInicio)
                where.dataVencimento.gte = new Date(vencimentoInicio);
            if (vencimentoFim)
                where.dataVencimento.lte = new Date(vencimentoFim);
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
    }
    catch (error) {
        console.error('Erro ao listar contas:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getContas = getContas;
const getContaById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao buscar conta:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getContaById = getContaById;
const createConta = async (req, res) => {
    try {
        const validatedData = createContaSchema.parse(req.body);
        const { pedidoId, bancoId, tipo, descricao, valor, dataVencimento, observacoes } = validatedData;
        if (pedidoId) {
            const pedidoExiste = await prisma.pedido.findUnique({
                where: { id: pedidoId }
            });
            if (!pedidoExiste) {
                return res.status(400).json({ error: 'Pedido não encontrado' });
            }
        }
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
                valor: new library_1.Decimal(valor),
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                error: 'Dados inválidos',
                details: error.issues
            });
        }
        console.error('Erro ao criar conta:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createConta = createConta;
const updateConta = async (req, res) => {
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
        if (contaExistente.status === 'PAGO') {
            return res.status(400).json({ error: 'Não é possível alterar conta já paga' });
        }
        if (validatedData.bancoId) {
            const bancoExiste = await prisma.banco.findUnique({
                where: { id: validatedData.bancoId, ativo: true }
            });
            if (!bancoExiste) {
                return res.status(400).json({ error: 'Banco não encontrado ou inativo' });
            }
        }
        const updateData = { ...validatedData };
        if (updateData.valor) {
            updateData.valor = new library_1.Decimal(updateData.valor);
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                error: 'Dados inválidos',
                details: error.issues
            });
        }
        console.error('Erro ao atualizar conta:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateConta = updateConta;
const pagarConta = async (req, res) => {
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
        if (bancoId) {
            const bancoExiste = await prisma.banco.findUnique({
                where: { id: bancoId, ativo: true }
            });
            if (!bancoExiste) {
                return res.status(400).json({ error: 'Banco não encontrado ou inativo' });
            }
        }
        const updateData = {
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                error: 'Dados inválidos',
                details: error.issues
            });
        }
        console.error('Erro ao pagar conta:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.pagarConta = pagarConta;
const cancelarConta = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao cancelar conta:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.cancelarConta = cancelarConta;
const deleteConta = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao excluir conta:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.deleteConta = deleteConta;
const getContasReceber = async (req, res) => {
    try {
        const { dataInicio, dataFim, status, bancoId } = req.query;
        const where = {
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
            if (dataInicio)
                where.dataVencimento.gte = new Date(dataInicio);
            if (dataFim)
                where.dataVencimento.lte = new Date(dataFim);
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
    }
    catch (error) {
        console.error('Erro ao gerar relatório de contas a receber:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getContasReceber = getContasReceber;
const getContasPagar = async (req, res) => {
    try {
        const { dataInicio, dataFim, status, bancoId } = req.query;
        const where = {
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
            if (dataInicio)
                where.dataVencimento.gte = new Date(dataInicio);
            if (dataFim)
                where.dataVencimento.lte = new Date(dataFim);
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
    }
    catch (error) {
        console.error('Erro ao gerar relatório de contas a pagar:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getContasPagar = getContasPagar;
const getFluxoCaixa = async (req, res) => {
    try {
        const { dataInicio, dataFim } = req.query;
        const where = {};
        if (dataInicio || dataFim) {
            where.dataVencimento = {};
            if (dataInicio)
                where.dataVencimento.gte = new Date(dataInicio);
            if (dataFim)
                where.dataVencimento.lte = new Date(dataFim);
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
        const totalReceber = contasReceber.reduce((acc, item) => acc + Number(item._sum.valor || 0), 0);
        const totalPagar = contasPagar.reduce((acc, item) => acc + Number(item._sum.valor || 0), 0);
        const saldoProjetado = totalReceber - totalPagar;
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
    }
    catch (error) {
        console.error('Erro ao gerar fluxo de caixa:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getFluxoCaixa = getFluxoCaixa;
const getFinanceiro = async (req, res) => {
    return (0, exports.getContas)(req, res);
};
exports.getFinanceiro = getFinanceiro;
const createFinanceiro = async (req, res) => {
    return (0, exports.createConta)(req, res);
};
exports.createFinanceiro = createFinanceiro;
const updateFinanceiro = async (req, res) => {
    return (0, exports.updateConta)(req, res);
};
exports.updateFinanceiro = updateFinanceiro;
const deleteFinanceiro = async (req, res) => {
    return (0, exports.deleteConta)(req, res);
};
exports.deleteFinanceiro = deleteFinanceiro;
const getFinanceiroById = async (req, res) => {
    return (0, exports.getContaById)(req, res);
};
exports.getFinanceiroById = getFinanceiroById;
const createMovimentacao = async (req, res) => {
    return (0, exports.createConta)(req, res);
};
exports.createMovimentacao = createMovimentacao;
const getMovimentacoes = async (req, res) => {
    return (0, exports.getContas)(req, res);
};
exports.getMovimentacoes = getMovimentacoes;
const pagarMovimentacao = async (req, res) => {
    return (0, exports.pagarConta)(req, res);
};
exports.pagarMovimentacao = pagarMovimentacao;
exports.deactivateConta = exports.deactivateBanco;
exports.reactivateConta = exports.reactivateBanco;
//# sourceMappingURL=financeiro.controller.js.map