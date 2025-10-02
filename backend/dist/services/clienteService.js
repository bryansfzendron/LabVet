"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ClienteService {
    async getClientes(filters = {}, pagination) {
        const { page, limit, orderBy = 'nome', order = 'asc' } = pagination;
        const { search, ativo = 'S', cidade, uf, codVetResp } = filters;
        const skip = (page - 1) * limit;
        const where = {
            ativo: ativo,
            ...(search && {
                OR: [
                    { nome: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { cpfCnpj: { contains: search, mode: 'insensitive' } },
                    { telefone: { contains: search } },
                    { celular: { contains: search } }
                ]
            }),
            ...(cidade && { cidade: { contains: cidade, mode: 'insensitive' } }),
            ...(uf && { uf }),
            ...(codVetResp && { codVetResp })
        };
        const [clientes, total] = await Promise.all([
            prisma.cliente.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderBy]: order },
                include: {
                    veterinarioResp: {
                        select: {
                            id: true,
                            nome: true,
                            registro: true
                        }
                    },
                    _count: {
                        select: {
                            animais: true,
                            pedidos: true
                        }
                    }
                }
            }),
            prisma.cliente.count({ where })
        ]);
        return {
            data: clientes,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1
            }
        };
    }
    async getClienteById(id) {
        return await prisma.cliente.findUnique({
            where: { id },
            include: {
                veterinarioResp: {
                    select: {
                        id: true,
                        nome: true,
                        registro: true,
                        telefone: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        animais: true,
                        pedidos: true
                    }
                }
            }
        });
    }
    async createCliente(data) {
        if (data.cpfCnpj) {
            const existingCliente = await prisma.cliente.findFirst({
                where: {
                    cpfCnpj: data.cpfCnpj,
                    ativo: 'S'
                }
            });
            if (existingCliente) {
                throw new Error('CPF/CNPJ já cadastrado para outro cliente ativo');
            }
        }
        if (data.email) {
            const existingEmail = await prisma.cliente.findFirst({
                where: {
                    email: data.email,
                    ativo: 'S'
                }
            });
            if (existingEmail) {
                throw new Error('Email já cadastrado para outro cliente ativo');
            }
        }
        return await prisma.cliente.create({
            data: {
                ...data,
                dataCadastro: new Date(),
                ativo: data.ativo || 'S'
            }
        });
    }
    async updateCliente(id, data) {
        const existingCliente = await prisma.cliente.findUnique({
            where: { id }
        });
        if (!existingCliente) {
            throw new Error('Cliente não encontrado');
        }
        if (data.cpfCnpj && data.cpfCnpj !== existingCliente.cpfCnpj) {
            const duplicateCpf = await prisma.cliente.findFirst({
                where: {
                    cpfCnpj: data.cpfCnpj,
                    ativo: 'S',
                    id: { not: id }
                }
            });
            if (duplicateCpf) {
                throw new Error('CPF/CNPJ já cadastrado para outro cliente ativo');
            }
        }
        if (data.email && data.email !== existingCliente.email) {
            const duplicateEmail = await prisma.cliente.findFirst({
                where: {
                    email: data.email,
                    ativo: 'S',
                    id: { not: id }
                }
            });
            if (duplicateEmail) {
                throw new Error('Email já cadastrado para outro cliente ativo');
            }
        }
        return await prisma.cliente.update({
            where: { id },
            data: {
                ...data,
                dataAtualizacao: new Date()
            }
        });
    }
    async deleteCliente(id) {
        const cliente = await prisma.cliente.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        animais: true,
                        pedidos: true
                    }
                }
            }
        });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        if (cliente._count.animais > 0 || cliente._count.pedidos > 0) {
            await prisma.cliente.update({
                where: { id },
                data: {
                    ativo: 'N',
                    dataAtualizacao: new Date()
                }
            });
            return {
                deleted: false,
                message: `Cliente desativado. Possui ${cliente._count.animais} animais e ${cliente._count.pedidos} pedidos vinculados.`
            };
        }
        await prisma.cliente.delete({
            where: { id }
        });
        return {
            deleted: true,
            message: 'Cliente removido permanentemente'
        };
    }
    async reactivateCliente(id) {
        const cliente = await prisma.cliente.findUnique({
            where: { id }
        });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        if (cliente.ativo === 'S') {
            throw new Error('Cliente já está ativo');
        }
        return await prisma.cliente.update({
            where: { id },
            data: {
                ativo: 'S',
                dataAtualizacao: new Date()
            }
        });
    }
    async searchClientes(query, limit = 10) {
        if (query.length < 2) {
            return [];
        }
        return await prisma.cliente.findMany({
            where: {
                ativo: 'S',
                OR: [
                    { nome: { contains: query, mode: 'insensitive' } },
                    { cpfCnpj: { contains: query } },
                    { telefone: { contains: query } },
                    { celular: { contains: query } }
                ]
            },
            select: {
                id: true,
                nome: true,
                cpfCnpj: true,
                telefone: true,
                celular: true,
                email: true,
                cidade: true,
                uf: true
            },
            take: limit,
            orderBy: { nome: 'asc' }
        });
    }
    async getClienteStats() {
        const [total, ativos, inativos, comAnimais, comPedidos] = await Promise.all([
            prisma.cliente.count(),
            prisma.cliente.count({ where: { ativo: 'S' } }),
            prisma.cliente.count({ where: { ativo: 'N' } }),
            prisma.cliente.count({
                where: {
                    ativo: 'S',
                    animais: { some: {} }
                }
            }),
            prisma.cliente.count({
                where: {
                    ativo: 'S',
                    pedidos: { some: {} }
                }
            })
        ]);
        return {
            total,
            ativos,
            inativos,
            comAnimais,
            comPedidos,
            semAnimais: ativos - comAnimais
        };
    }
}
exports.clienteService = new ClienteService();
//# sourceMappingURL=clienteService.js.map