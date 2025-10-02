"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateCliente = exports.searchClientes = exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClienteById = exports.getClientes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getClientes = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, ativo = true } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {
            ativo: (ativo === true || ativo === 'true') ? 'S' : 'N'
        };
        if (search) {
            where.OR = [
                { nome: { contains: search, mode: 'insensitive' } },
                { telefone: { contains: search, mode: 'insensitive' } },
                { celular: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { cpfCnpj: { contains: search, mode: 'insensitive' } }
            ];
        }
        const [clientes, total] = await Promise.all([
            prisma.cliente.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    veterinarioResp: {
                        select: {
                            id: true,
                            nome: true,
                            telefone: true
                        }
                    },
                    _count: {
                        select: { animais: true }
                    }
                },
                orderBy: { nome: 'asc' }
            }),
            prisma.cliente.count({ where })
        ]);
        return res.json({
            data: clientes,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Erro ao buscar clientes:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getClientes = getClientes;
const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do cliente inválido' });
        }
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(id) },
            include: {
                veterinarioResp: {
                    select: {
                        id: true,
                        nome: true,
                        telefone: true,
                        email: true
                    }
                },
                animais: {
                    where: { ativo: true },
                    include: {
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
                }
            }
        });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        return res.json(cliente);
    }
    catch (error) {
        console.error('Erro ao buscar cliente:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getClienteById = getClienteById;
const createCliente = async (req, res) => {
    try {
        const { nome, endereco, numero, complemento, bairro, cep, cidade, uf, telefone, fax, celular, email, cpfCnpj, contato, restricao, codVetResp } = req.body;
        if (!nome) {
            return res.status(400).json({
                error: 'Nome é obrigatório'
            });
        }
        if (cpfCnpj) {
            const cpfCnpjExiste = await prisma.cliente.findFirst({
                where: {
                    cpfCnpj,
                    ativo: 'S'
                }
            });
            if (cpfCnpjExiste) {
                return res.status(400).json({ error: 'CPF/CNPJ já cadastrado' });
            }
        }
        if (email) {
            const emailExiste = await prisma.cliente.findFirst({
                where: {
                    email,
                    ativo: 'S'
                }
            });
            if (emailExiste) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }
        }
        if (codVetResp) {
            const veterinarioExiste = await prisma.profissional.findUnique({
                where: { id: codVetResp }
            });
            if (!veterinarioExiste) {
                return res.status(400).json({ error: 'Veterinário responsável não encontrado' });
            }
        }
        const cliente = await prisma.cliente.create({
            data: {
                nome,
                endereco: endereco || null,
                numero: numero || null,
                complemento: complemento || null,
                bairro: bairro || null,
                cep: cep || null,
                cidade: cidade || null,
                uf: uf || null,
                telefone: telefone || null,
                fax: fax || null,
                celular: celular || null,
                email: email || null,
                cpfCnpj: cpfCnpj || null,
                contato: contato || null,
                restricao: restricao || 'N',
                codVetResp: codVetResp || null
            },
            include: {
                veterinarioResp: {
                    select: {
                        id: true,
                        nome: true,
                        telefone: true
                    }
                }
            }
        });
        return res.status(201).json(cliente);
    }
    catch (error) {
        console.error('Erro ao criar cliente:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createCliente = createCliente;
const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do cliente inválido' });
        }
        const clienteExistente = await prisma.cliente.findUnique({
            where: { id: Number(id) }
        });
        if (!clienteExistente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        if (updateData.cpfCnpj && updateData.cpfCnpj !== clienteExistente.cpfCnpj) {
            const cpfCnpjExiste = await prisma.cliente.findFirst({
                where: {
                    cpfCnpj: updateData.cpfCnpj,
                    ativo: 'S',
                    id: { not: Number(id) }
                }
            });
            if (cpfCnpjExiste) {
                return res.status(400).json({ error: 'CPF/CNPJ já cadastrado para outro cliente' });
            }
        }
        if (updateData.email && updateData.email !== clienteExistente.email) {
            const emailExiste = await prisma.cliente.findFirst({
                where: {
                    email: updateData.email,
                    ativo: 'S',
                    id: { not: Number(id) }
                }
            });
            if (emailExiste) {
                return res.status(400).json({ error: 'Email já cadastrado para outro cliente' });
            }
        }
        if (updateData.codVetResp) {
            const veterinarioExiste = await prisma.profissional.findUnique({
                where: { id: updateData.codVetResp }
            });
            if (!veterinarioExiste) {
                return res.status(400).json({ error: 'Veterinário responsável não encontrado' });
            }
        }
        const clienteAtualizado = await prisma.cliente.update({
            where: { id: Number(id) },
            data: updateData,
            include: {
                veterinarioResp: {
                    select: {
                        id: true,
                        nome: true,
                        telefone: true
                    }
                }
            }
        });
        return res.json(clienteAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateCliente = updateCliente;
const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do cliente inválido' });
        }
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(id) },
            include: {
                _count: {
                    select: { animais: true }
                }
            }
        });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        if (cliente._count.animais > 0) {
            return res.status(400).json({
                error: 'Não é possível excluir cliente que possui animais cadastrados. Use a desativação.'
            });
        }
        await prisma.cliente.update({
            where: { id: Number(id) },
            data: { ativo: 'N' }
        });
        return res.json({ message: 'Cliente excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir cliente:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.deleteCliente = deleteCliente;
const searchClientes = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.length < 2) {
            return res.status(400).json({
                error: 'Query deve ter pelo menos 2 caracteres'
            });
        }
        const clientes = await prisma.cliente.findMany({
            where: {
                AND: [
                    { ativo: 'S' },
                    {
                        OR: [
                            { nome: { contains: q, mode: 'insensitive' } },
                            { telefone: { contains: q, mode: 'insensitive' } },
                            { celular: { contains: q, mode: 'insensitive' } },
                            { email: { contains: q, mode: 'insensitive' } },
                            { cpfCnpj: { contains: q, mode: 'insensitive' } }
                        ]
                    }
                ]
            },
            select: {
                id: true,
                nome: true,
                telefone: true,
                celular: true,
                email: true,
                cidade: true,
                uf: true
            },
            take: 10,
            orderBy: { nome: 'asc' }
        });
        return res.json(clientes);
    }
    catch (error) {
        console.error('Erro ao buscar clientes:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.searchClientes = searchClientes;
const reactivateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(id) }
        });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        if (cliente.ativo === 'S') {
            return res.status(400).json({ error: 'Cliente já está ativo' });
        }
        const clienteReativado = await prisma.cliente.update({
            where: { id: Number(id) },
            data: { ativo: 'S' }
        });
        return res.json({
            message: 'Cliente reativado com sucesso',
            cliente: clienteReativado
        });
    }
    catch (error) {
        console.error('Erro ao reativar cliente:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.reactivateCliente = reactivateCliente;
//# sourceMappingURL=cliente.controller.js.map