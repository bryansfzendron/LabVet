"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateProfissional = exports.getConselhos = exports.searchProfissionais = exports.deleteProfissional = exports.updateProfissional = exports.createProfissional = exports.getProfissionalById = exports.getProfissionais = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProfissionais = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, ativo = true, conselhoId, tipo } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {
            ativo: ativo === 'true'
        };
        if (search) {
            where.OR = [
                { nome: { contains: search, mode: 'insensitive' } },
                { telefone: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { documento: { contains: search, mode: 'insensitive' } },
                { registro: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (conselhoId) {
            where.conselhoId = Number(conselhoId);
        }
        if (tipo) {
            where.tipo = tipo;
        }
        const [profissionais, total] = await Promise.all([
            prisma.profissional.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    conselho: {
                        select: {
                            id: true,
                            nome: true,
                            sigla: true
                        }
                    },
                    _count: {
                        select: {
                            clientesResponsavel: true,
                            pedidosSolicitados: true,
                            laudosAssinados: true
                        }
                    }
                },
                orderBy: { nome: 'asc' }
            }),
            prisma.profissional.count({ where })
        ]);
        return res.json({
            data: profissionais,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Erro ao buscar profissionais:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getProfissionais = getProfissionais;
const getProfissionalById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do profissional inválido' });
        }
        const profissional = await prisma.profissional.findUnique({
            where: { id: Number(id) },
            include: {
                conselho: {
                    select: {
                        id: true,
                        nome: true,
                        sigla: true
                    }
                },
                clientesResponsavel: {
                    where: { ativo: 'S' },
                    select: {
                        id: true,
                        nome: true,
                        telefone: true,
                        cidade: true
                    },
                    take: 10,
                    orderBy: { nome: 'asc' }
                },
                _count: {
                    select: {
                        clientesResponsavel: true,
                        pedidosSolicitados: true,
                        laudosAssinados: true
                    }
                }
            }
        });
        if (!profissional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }
        return res.json(profissional);
    }
    catch (error) {
        console.error('Erro ao buscar profissional:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getProfissionalById = getProfissionalById;
const createProfissional = async (req, res) => {
    try {
        const { nome, documento, registro, conselhoId, telefone, email, endereco, cidade, uf, cep, tipo } = req.body;
        if (!nome) {
            return res.status(400).json({
                error: 'Nome é obrigatório'
            });
        }
        if (!tipo) {
            return res.status(400).json({
                error: 'Tipo do profissional é obrigatório'
            });
        }
        if (documento) {
            const documentoExiste = await prisma.profissional.findFirst({
                where: {
                    documento,
                    ativo: true
                }
            });
            if (documentoExiste) {
                return res.status(400).json({ error: 'Documento já cadastrado' });
            }
        }
        if (email) {
            const emailExiste = await prisma.profissional.findFirst({
                where: {
                    email,
                    ativo: true
                }
            });
            if (emailExiste) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }
        }
        if (conselhoId) {
            const conselhoExiste = await prisma.conselho.findUnique({
                where: { id: conselhoId }
            });
            if (!conselhoExiste) {
                return res.status(400).json({ error: 'Conselho não encontrado' });
            }
        }
        if (registro && conselhoId) {
            const registroExiste = await prisma.profissional.findFirst({
                where: {
                    registro,
                    conselhoId,
                    ativo: true
                }
            });
            if (registroExiste) {
                return res.status(400).json({ error: 'Registro já cadastrado para este conselho' });
            }
        }
        const profissional = await prisma.profissional.create({
            data: {
                nome,
                documento: documento || null,
                registro: registro || null,
                conselhoId: conselhoId || null,
                telefone: telefone || null,
                email: email || null,
                endereco: endereco || null,
                cidade: cidade || null,
                uf: uf || null,
                cep: cep || null,
                tipo
            },
            include: {
                conselho: {
                    select: {
                        id: true,
                        nome: true,
                        sigla: true
                    }
                }
            }
        });
        return res.status(201).json(profissional);
    }
    catch (error) {
        console.error('Erro ao criar profissional:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createProfissional = createProfissional;
const updateProfissional = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do profissional inválido' });
        }
        const profissionalExistente = await prisma.profissional.findUnique({
            where: { id: Number(id) }
        });
        if (!profissionalExistente) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }
        if (updateData.documento && updateData.documento !== profissionalExistente.documento) {
            const documentoExiste = await prisma.profissional.findFirst({
                where: {
                    documento: updateData.documento,
                    ativo: true,
                    id: { not: Number(id) }
                }
            });
            if (documentoExiste) {
                return res.status(400).json({ error: 'Documento já cadastrado para outro profissional' });
            }
        }
        if (updateData.email && updateData.email !== profissionalExistente.email) {
            const emailExiste = await prisma.profissional.findFirst({
                where: {
                    email: updateData.email,
                    ativo: true,
                    id: { not: Number(id) }
                }
            });
            if (emailExiste) {
                return res.status(400).json({ error: 'Email já cadastrado para outro profissional' });
            }
        }
        if (updateData.conselhoId) {
            const conselhoExiste = await prisma.conselho.findUnique({
                where: { id: updateData.conselhoId }
            });
            if (!conselhoExiste) {
                return res.status(400).json({ error: 'Conselho não encontrado' });
            }
        }
        if (updateData.registro && updateData.conselhoId) {
            const registroExiste = await prisma.profissional.findFirst({
                where: {
                    registro: updateData.registro,
                    conselhoId: updateData.conselhoId,
                    ativo: true,
                    id: { not: Number(id) }
                }
            });
            if (registroExiste) {
                return res.status(400).json({ error: 'Registro já cadastrado para outro profissional neste conselho' });
            }
        }
        const profissionalAtualizado = await prisma.profissional.update({
            where: { id: Number(id) },
            data: updateData,
            include: {
                conselho: {
                    select: {
                        id: true,
                        nome: true,
                        sigla: true
                    }
                }
            }
        });
        return res.json(profissionalAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar profissional:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateProfissional = updateProfissional;
const deleteProfissional = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do profissional inválido' });
        }
        const profissional = await prisma.profissional.findUnique({
            where: { id: Number(id) },
            include: {
                _count: {
                    select: {
                        clientesResponsavel: true,
                        pedidosSolicitados: true,
                        laudosAssinados: true
                    }
                }
            }
        });
        if (!profissional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }
        if (profissional._count.clientesResponsavel > 0 ||
            profissional._count.pedidosSolicitados > 0 ||
            profissional._count.laudosAssinados > 0) {
            return res.status(400).json({
                error: 'Não é possível excluir profissional que possui clientes, pedidos ou laudos associados. Use a desativação.'
            });
        }
        await prisma.profissional.update({
            where: { id: Number(id) },
            data: { ativo: false }
        });
        return res.json({ message: 'Profissional excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir profissional:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.deleteProfissional = deleteProfissional;
const searchProfissionais = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.length < 2) {
            return res.status(400).json({
                error: 'Query deve ter pelo menos 2 caracteres'
            });
        }
        const profissionais = await prisma.profissional.findMany({
            where: {
                AND: [
                    { ativo: true },
                    {
                        OR: [
                            { nome: { contains: q, mode: 'insensitive' } },
                            { telefone: { contains: q, mode: 'insensitive' } },
                            { email: { contains: q, mode: 'insensitive' } },
                            { documento: { contains: q, mode: 'insensitive' } },
                            { registro: { contains: q, mode: 'insensitive' } }
                        ]
                    }
                ]
            },
            select: {
                id: true,
                nome: true,
                telefone: true,
                email: true,
                documento: true,
                registro: true,
                tipo: true,
                conselho: {
                    select: {
                        id: true,
                        nome: true,
                        sigla: true
                    }
                }
            },
            take: 10,
            orderBy: { nome: 'asc' }
        });
        return res.json(profissionais);
    }
    catch (error) {
        console.error('Erro ao buscar profissionais:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.searchProfissionais = searchProfissionais;
const getConselhos = async (req, res) => {
    try {
        const conselhos = await prisma.conselho.findMany({
            where: { ativo: true },
            select: {
                id: true,
                nome: true,
                sigla: true
            },
            orderBy: { nome: 'asc' }
        });
        return res.json(conselhos);
    }
    catch (error) {
        console.error('Erro ao buscar conselhos:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getConselhos = getConselhos;
const reactivateProfissional = async (req, res) => {
    try {
        const { id } = req.params;
        const profissional = await prisma.profissional.findUnique({
            where: { id: Number(id) }
        });
        if (!profissional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }
        if (profissional.ativo) {
            return res.status(400).json({ error: 'Profissional já está ativo' });
        }
        const profissionalReativado = await prisma.profissional.update({
            where: { id: Number(id) },
            data: { ativo: true }
        });
        return res.json({
            message: 'Profissional reativado com sucesso',
            profissional: profissionalReativado
        });
    }
    catch (error) {
        console.error('Erro ao reativar profissional:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.reactivateProfissional = reactivateProfissional;
//# sourceMappingURL=profissional.controller.js.map