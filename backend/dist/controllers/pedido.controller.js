"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePedido = exports.getPedidosByAnimal = exports.addResultados = exports.cancelPedido = exports.updatePedido = exports.getPedidoById = exports.createPedido = exports.getPedidos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPedidos = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, clienteId, animalId, dataInicio, dataFim, profissionalId } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (status)
            where.status = status;
        if (clienteId)
            where.clienteId = Number(clienteId);
        if (animalId)
            where.animalId = Number(animalId);
        if (profissionalId)
            where.profissionalId = Number(profissionalId);
        if (dataInicio || dataFim) {
            where.dataColeta = {};
            if (dataInicio)
                where.dataColeta.gte = new Date(dataInicio);
            if (dataFim)
                where.dataColeta.lte = new Date(dataFim);
        }
        const [pedidos, total] = await Promise.all([
            prisma.pedido.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    cliente: {
                        select: { id: true, nome: true, email: true, telefone: true }
                    },
                    animal: {
                        select: { id: true, nome: true, raca: true }
                    },
                    profissional: {
                        select: { id: true, nome: true, registro: true }
                    },
                    usuario: {
                        select: { id: true, nome: true }
                    },
                    exames: {
                        include: {
                            exame: {
                                select: { id: true, nome: true, codigo: true, metodologia: true, material: true }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.pedido.count({ where })
        ]);
        return res.json({
            data: pedidos,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getPedidos = getPedidos;
const createPedido = async (req, res) => {
    try {
        const { clienteId, animalId, profissionalId, usuarioId, dataColeta, observacoes, exames } = req.body;
        if (!clienteId || !animalId || !usuarioId || !dataColeta || !exames?.length) {
            return res.status(400).json({
                error: 'Dados obrigatórios: clienteId, animalId, usuarioId, dataColeta e exames'
            });
        }
        const [cliente, animal, usuario] = await Promise.all([
            prisma.cliente.findUnique({ where: { id: clienteId } }),
            prisma.animal.findUnique({ where: { id: animalId } }),
            prisma.usuario.findUnique({ where: { id: usuarioId } })
        ]);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        if (!animal) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        if (animal.clienteId !== clienteId) {
            return res.status(400).json({ error: 'Animal não pertence ao cliente informado' });
        }
        const ultimoPedido = await prisma.pedido.findFirst({
            orderBy: { id: 'desc' },
            select: { id: true }
        });
        const numero = `LAB${String(Date.now()).slice(-6)}${String((ultimoPedido?.id || 0) + 1).padStart(4, '0')}`;
        const examesIds = exames.map(e => e.exameId);
        const examesData = await prisma.exame.findMany({
            where: { id: { in: examesIds } },
            select: { id: true, valor: true }
        });
        const valorTotal = exames.reduce((total, examePedido) => {
            const exameData = examesData.find(e => e.id === examePedido.exameId);
            const valor = examePedido.valor || Number(exameData?.valor || 0);
            return total + valor;
        }, 0);
        const pedido = await prisma.$transaction(async (tx) => {
            const novoPedido = await tx.pedido.create({
                data: {
                    numero,
                    clienteId,
                    animalId,
                    profissionalId: profissionalId || null,
                    usuarioId,
                    dataColeta: new Date(dataColeta),
                    observacoes: observacoes || null,
                    status: client_1.StatusPedido.PENDENTE,
                    valorTotal
                }
            });
            await tx.pedidoExame.createMany({
                data: exames.map(exame => ({
                    pedidoId: novoPedido.id,
                    exameId: exame.exameId,
                    valor: exame.valor || null,
                    observacoes: exame.observacoes || null,
                    status: client_1.StatusExame.PENDENTE
                }))
            });
            return novoPedido;
        });
        const pedidoCompleto = await prisma.pedido.findUnique({
            where: { id: pedido.id },
            include: {
                cliente: { select: { id: true, nome: true, email: true } },
                animal: { select: { id: true, nome: true } },
                profissional: { select: { id: true, nome: true } },
                usuario: { select: { id: true, nome: true } },
                exames: {
                    include: {
                        exame: { select: { id: true, nome: true, codigo: true } }
                    }
                }
            }
        });
        return res.status(201).json(pedidoCompleto);
    }
    catch (error) {
        console.error('Erro ao criar pedido:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createPedido = createPedido;
const getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do pedido inválido' });
        }
        const pedido = await prisma.pedido.findUnique({
            where: { id: Number(id) },
            include: {
                cliente: true,
                animal: true,
                profissional: true,
                usuario: { select: { id: true, nome: true } },
                exames: {
                    include: {
                        exame: true,
                        resultados: {
                            include: {
                                parametro: true
                            }
                        }
                    }
                }
            }
        });
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        return res.json(pedido);
    }
    catch (error) {
        console.error('Erro ao buscar pedido:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getPedidoById = getPedidoById;
const updatePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do pedido inválido' });
        }
        const pedidoExistente = await prisma.pedido.findUnique({
            where: { id: Number(id) }
        });
        if (!pedidoExistente) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        if (pedidoExistente.status === client_1.StatusPedido.LIBERADO) {
            return res.status(400).json({ error: 'Não é possível alterar pedidos já liberados' });
        }
        const pedidoAtualizado = await prisma.pedido.update({
            where: { id: Number(id) },
            data: updateData,
            include: {
                cliente: { select: { id: true, nome: true } },
                animal: { select: { id: true, nome: true } },
                profissional: { select: { id: true, nome: true } }
            }
        });
        return res.json(pedidoAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updatePedido = updatePedido;
const cancelPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { motivo } = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do pedido inválido' });
        }
        const pedido = await prisma.pedido.findUnique({
            where: { id: Number(id) }
        });
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        if (pedido.status === client_1.StatusPedido.CANCELADO) {
            return res.status(400).json({ error: 'Pedido já está cancelado' });
        }
        if (pedido.status === client_1.StatusPedido.LIBERADO) {
            return res.status(400).json({ error: 'Não é possível cancelar pedidos já liberados' });
        }
        const pedidoCancelado = await prisma.pedido.update({
            where: { id: Number(id) },
            data: {
                status: client_1.StatusPedido.CANCELADO,
                observacoes: motivo ? `${pedido.observacoes || ''}\n\nCANCELADO: ${motivo}` : pedido.observacoes
            }
        });
        return res.json({ message: 'Pedido cancelado com sucesso', pedido: pedidoCancelado });
    }
    catch (error) {
        console.error('Erro ao cancelar pedido:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.cancelPedido = cancelPedido;
const addResultados = async (req, res) => {
    try {
        const { id } = req.params;
        const { exameId, resultados } = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do pedido inválido' });
        }
        if (!exameId || !resultados || !Array.isArray(resultados)) {
            return res.status(400).json({ error: 'exameId e resultados são obrigatórios' });
        }
        const pedidoExame = await prisma.pedidoExame.findFirst({
            where: {
                pedidoId: Number(id),
                exameId: Number(exameId)
            }
        });
        if (!pedidoExame) {
            return res.status(404).json({ error: 'Exame não encontrado neste pedido' });
        }
        await prisma.$transaction(async (tx) => {
            await tx.resultadoExame.deleteMany({
                where: { pedidoExameId: pedidoExame.id }
            });
            await tx.resultadoExame.createMany({
                data: resultados.map((resultado) => ({
                    pedidoExameId: pedidoExame.id,
                    parametroId: resultado.parametroId,
                    valor: resultado.valor,
                    observacao: resultado.observacao
                }))
            });
            await tx.pedidoExame.update({
                where: { id: pedidoExame.id },
                data: {
                    status: client_1.StatusExame.LIBERADO
                }
            });
        });
        return res.json({ message: 'Resultados adicionados com sucesso' });
    }
    catch (error) {
        console.error('Erro ao adicionar resultados:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.addResultados = addResultados;
const getPedidosByAnimal = async (req, res) => {
    try {
        const { animalId } = req.params;
        if (!animalId || isNaN(Number(animalId))) {
            return res.status(400).json({ error: 'ID do animal inválido' });
        }
        const pedidos = await prisma.pedido.findMany({
            where: { animalId: Number(animalId) },
            include: {
                cliente: { select: { id: true, nome: true } },
                profissional: { select: { id: true, nome: true } },
                exames: {
                    include: {
                        exame: { select: { id: true, nome: true, codigo: true } }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return res.json({ data: pedidos });
    }
    catch (error) {
        console.error('Erro ao buscar pedidos do animal:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getPedidosByAnimal = getPedidosByAnimal;
const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do pedido inválido' });
        }
        const pedido = await prisma.pedido.findUnique({
            where: { id: Number(id) }
        });
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        if (pedido.status === client_1.StatusPedido.LIBERADO) {
            return res.status(400).json({ error: 'Não é possível excluir pedidos já liberados' });
        }
        await prisma.pedido.update({
            where: { id: Number(id) },
            data: {
                status: client_1.StatusPedido.CANCELADO,
                observacoes: `${pedido.observacoes || ''}\n\nEXCLUÍDO EM: ${new Date().toISOString()}`
            }
        });
        return res.json({ message: 'Pedido excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir pedido:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.deletePedido = deletePedido;
//# sourceMappingURL=pedido.controller.js.map