"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AnimalService {
    async getAnimais(filters = {}, pagination) {
        const { page, limit, orderBy = 'nome', order = 'asc' } = pagination;
        const { search, clienteId, especieId, sexo, ativo = true } = filters;
        const skip = (page - 1) * limit;
        const where = {
            ativo: ativo,
            ...(search && {
                OR: [
                    { nome: { contains: search, mode: 'insensitive' } },
                    { raca: { contains: search, mode: 'insensitive' } },
                    { cor: { contains: search, mode: 'insensitive' } },
                    { cliente: { nome: { contains: search, mode: 'insensitive' } } }
                ]
            }),
            ...(clienteId && { clienteId }),
            ...(especieId && { especieId }),
            ...(sexo && { sexo })
        };
        const [animais, total] = await Promise.all([
            prisma.animal.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderBy]: order },
                include: {
                    especie: {
                        select: {
                            id: true,
                            nome: true
                        }
                    },
                    cliente: {
                        select: {
                            id: true,
                            nome: true,
                            telefone: true,
                            celular: true
                        }
                    },
                    _count: {
                        select: {
                            pedidos: true
                        }
                    }
                }
            }),
            prisma.animal.count({ where })
        ]);
        return {
            data: animais,
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
    async getAnimalById(id) {
        return await prisma.animal.findUnique({
            where: { id },
            include: {
                especie: {
                    select: {
                        id: true,
                        nome: true
                    }
                },
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        telefone: true,
                        celular: true,
                        email: true,
                        endereco: true,
                        cidade: true,
                        uf: true
                    }
                },
                _count: {
                    select: {
                        pedidos: true
                    }
                }
            }
        });
    }
    async getAnimaisByCliente(clienteId) {
        return await prisma.animal.findMany({
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
                },
                _count: {
                    select: {
                        pedidos: true
                    }
                }
            },
            orderBy: { nome: 'asc' }
        });
    }
    async createAnimal(data) {
        const cliente = await prisma.cliente.findUnique({
            where: { id: data.clienteId }
        });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        if (cliente.ativo !== 'S') {
            throw new Error('Cliente está inativo');
        }
        const especie = await prisma.especie.findUnique({
            where: { id: data.especieId }
        });
        if (!especie) {
            throw new Error('Espécie não encontrada');
        }
        if (!especie.ativo) {
            throw new Error('Espécie está inativa');
        }
        const existingAnimal = await prisma.animal.findFirst({
            where: {
                nome: data.nome,
                clienteId: data.clienteId,
                ativo: true
            }
        });
        if (existingAnimal) {
            throw new Error('Já existe um animal com este nome para este cliente');
        }
        return await prisma.animal.create({
            data: {
                ...data,
                peso: data.peso ? new client_1.Prisma.Decimal(data.peso) : null,
                ativo: data.ativo !== undefined ? data.ativo : true
            }
        });
    }
    async updateAnimal(id, data) {
        const existingAnimal = await prisma.animal.findUnique({
            where: { id }
        });
        if (!existingAnimal) {
            throw new Error('Animal não encontrado');
        }
        if (data.clienteId && data.clienteId !== existingAnimal.clienteId) {
            const cliente = await prisma.cliente.findUnique({
                where: { id: data.clienteId }
            });
            if (!cliente || cliente.ativo !== 'S') {
                throw new Error('Cliente não encontrado ou inativo');
            }
        }
        if (data.especieId && data.especieId !== existingAnimal.especieId) {
            const especie = await prisma.especie.findUnique({
                where: { id: data.especieId }
            });
            if (!especie || !especie.ativo) {
                throw new Error('Espécie não encontrada ou inativa');
            }
        }
        if (data.nome && data.nome !== existingAnimal.nome) {
            const clienteId = data.clienteId || existingAnimal.clienteId;
            const duplicateName = await prisma.animal.findFirst({
                where: {
                    nome: data.nome,
                    clienteId: clienteId,
                    ativo: true,
                    id: { not: id }
                }
            });
            if (duplicateName) {
                throw new Error('Já existe um animal com este nome para este cliente');
            }
        }
        const updateData = { ...data };
        if (data.peso !== undefined) {
            updateData.peso = data.peso ? new client_1.Prisma.Decimal(data.peso) : null;
        }
        return await prisma.animal.update({
            where: { id },
            data: updateData
        });
    }
    async deleteAnimal(id) {
        const animal = await prisma.animal.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        pedidos: true
                    }
                }
            }
        });
        if (!animal) {
            throw new Error('Animal não encontrado');
        }
        if (animal._count.pedidos > 0) {
            await prisma.animal.update({
                where: { id },
                data: { ativo: false }
            });
            return {
                deleted: false,
                message: `Animal desativado. Possui ${animal._count.pedidos} pedidos vinculados.`
            };
        }
        await prisma.animal.delete({
            where: { id }
        });
        return {
            deleted: true,
            message: 'Animal removido permanentemente'
        };
    }
    async reactivateAnimal(id) {
        const animal = await prisma.animal.findUnique({
            where: { id }
        });
        if (!animal) {
            throw new Error('Animal não encontrado');
        }
        if (animal.ativo) {
            throw new Error('Animal já está ativo');
        }
        return await prisma.animal.update({
            where: { id },
            data: { ativo: true }
        });
    }
    async searchAnimais(query, clienteId, limit = 10) {
        if (query.length < 2) {
            return [];
        }
        return await prisma.animal.findMany({
            where: {
                ativo: true,
                ...(clienteId && { clienteId }),
                OR: [
                    { nome: { contains: query, mode: 'insensitive' } },
                    { raca: { contains: query, mode: 'insensitive' } },
                    { cliente: { nome: { contains: query, mode: 'insensitive' } } }
                ]
            },
            select: {
                id: true,
                nome: true,
                raca: true,
                sexo: true,
                idade: true,
                peso: true,
                especie: {
                    select: {
                        id: true,
                        nome: true
                    }
                },
                cliente: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            },
            take: limit,
            orderBy: { nome: 'asc' }
        });
    }
    async getAnimalStats() {
        const [total, ativos, inativos, porEspecie, porSexo] = await Promise.all([
            prisma.animal.count(),
            prisma.animal.count({ where: { ativo: true } }),
            prisma.animal.count({ where: { ativo: false } }),
            prisma.animal.groupBy({
                by: ['especieId'],
                where: { ativo: true },
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } }
            }),
            prisma.animal.groupBy({
                by: ['sexo'],
                where: { ativo: true },
                _count: { id: true }
            })
        ]);
        return {
            total,
            ativos,
            inativos,
            porEspecie,
            porSexo
        };
    }
}
exports.animalService = new AnimalService();
//# sourceMappingURL=animalService.js.map