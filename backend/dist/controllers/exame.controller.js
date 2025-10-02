"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEspecies = exports.searchExames = exports.reactivateExame = exports.deleteExame = exports.updateExame = exports.getExameById = exports.createExame = exports.getExames = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getExames = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, ativo = true } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {
            ativo: ativo === 'true'
        };
        if (search) {
            where.OR = [
                { nome: { contains: search, mode: 'insensitive' } },
                { codigo: { contains: search, mode: 'insensitive' } },
                { descricao: { contains: search, mode: 'insensitive' } }
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
    }
    catch (error) {
        console.error('Erro ao buscar exames:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getExames = getExames;
const createExame = async (req, res) => {
    try {
        const { codigo, nome, descricao, metodologia, material, valor, tempoResultado, parametros = [] } = req.body;
        if (!codigo || !nome) {
            return res.status(400).json({
                error: 'Código e nome são obrigatórios'
            });
        }
        const exameExistente = await prisma.exame.findUnique({
            where: { codigo }
        });
        if (exameExistente) {
            return res.status(400).json({ error: 'Código do exame já existe' });
        }
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
    }
    catch (error) {
        console.error('Erro ao criar exame:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createExame = createExame;
const getExameById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao buscar exame:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getExameById = getExameById;
const updateExame = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao atualizar exame:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateExame = updateExame;
const deleteExame = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao excluir exame:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.deleteExame = deleteExame;
const reactivateExame = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao reativar exame:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.reactivateExame = reactivateExame;
const searchExames = async (req, res) => {
    try {
        const { q, limit = 10 } = req.query;
        if (!q) {
            return res.json({ data: [] });
        }
        const exames = await prisma.exame.findMany({
            where: {
                ativo: true,
                OR: [
                    { nome: { contains: q, mode: 'insensitive' } },
                    { codigo: { contains: q, mode: 'insensitive' } }
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
    }
    catch (error) {
        console.error('Erro ao buscar exames:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.searchExames = searchExames;
const getEspecies = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao buscar espécies:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getEspecies = getEspecies;
//# sourceMappingURL=exame.controller.js.map