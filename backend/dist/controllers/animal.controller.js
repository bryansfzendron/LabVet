"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateAnimal = exports.getAnimaisByCliente = exports.searchAnimais = exports.deleteAnimal = exports.updateAnimal = exports.getAnimalById = exports.createAnimal = exports.getAnimais = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAnimais = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, clienteId, especieId, ativo = true } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {
            ativo: ativo === 'true'
        };
        if (search) {
            where.OR = [
                { nome: { contains: search, mode: 'insensitive' } },
                { raca: { contains: search, mode: 'insensitive' } },
                { cliente: { nome: { contains: search, mode: 'insensitive' } } }
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
    }
    catch (error) {
        console.error('Erro ao buscar animais:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getAnimais = getAnimais;
const createAnimal = async (req, res) => {
    try {
        const { nome, especieId, raca, sexo, idade, peso, cor, observacoes, clienteId } = req.body;
        if (!nome || !especieId || !sexo || !clienteId) {
            return res.status(400).json({
                error: 'Nome, espécie, sexo e cliente são obrigatórios'
            });
        }
        const clienteExiste = await prisma.cliente.findUnique({
            where: { id: clienteId }
        });
        if (!clienteExiste) {
            return res.status(400).json({ error: 'Cliente não encontrado' });
        }
        const especieExiste = await prisma.especie.findUnique({
            where: { id: especieId }
        });
        if (!especieExiste) {
            return res.status(400).json({ error: 'Espécie não encontrada' });
        }
        const animal = await prisma.animal.create({
            data: {
                nome,
                especieId,
                raca: raca || null,
                sexo,
                idade: idade || null,
                peso: peso || null,
                cor: cor || null,
                observacoes: observacoes || null,
                clienteId
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
    }
    catch (error) {
        console.error('Erro ao criar animal:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createAnimal = createAnimal;
const getAnimalById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao buscar animal:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getAnimalById = getAnimalById;
const updateAnimal = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao atualizar animal:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateAnimal = updateAnimal;
const deleteAnimal = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao excluir animal:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.deleteAnimal = deleteAnimal;
const searchAnimais = async (req, res) => {
    try {
        const { q, clienteId, limit = 10 } = req.query;
        if (!q && !clienteId) {
            return res.json({ data: [] });
        }
        const where = {
            ativo: true
        };
        if (q) {
            where.OR = [
                { nome: { contains: q, mode: 'insensitive' } },
                { raca: { contains: q, mode: 'insensitive' } }
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
    }
    catch (error) {
        console.error('Erro ao buscar animais:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.searchAnimais = searchAnimais;
const getAnimaisByCliente = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao buscar animais do cliente:', error);
        return res.status(500).json({
            error: 'INTERNAL_ERROR',
            message: 'Erro interno do servidor'
        });
    }
};
exports.getAnimaisByCliente = getAnimaisByCliente;
const reactivateAnimal = async (req, res) => {
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
    }
    catch (error) {
        console.error('Erro ao reativar animal:', error);
        return res.status(500).json({
            error: 'INTERNAL_ERROR',
            message: 'Erro interno do servidor'
        });
    }
};
exports.reactivateAnimal = reactivateAnimal;
//# sourceMappingURL=animal.controller.js.map