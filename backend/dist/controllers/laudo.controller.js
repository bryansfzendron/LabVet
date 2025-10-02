"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLaudo = exports.generateLaudoPDF = exports.sendLaudo = exports.signLaudo = exports.updateLaudo = exports.createLaudo = exports.getLaudosByPedido = exports.getLaudoById = exports.getLaudos = void 0;
const client_1 = require("@prisma/client");
const PDFDocument = __importStar(require("pdfkit"));
const prisma = new client_1.PrismaClient();
const getLaudos = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, assinado, enviado, profissionalId, dataInicio, dataFim } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (search) {
            where.OR = [
                {
                    pedido: {
                        animal: {
                            nome: { contains: search, mode: 'insensitive' }
                        }
                    }
                },
                {
                    pedido: {
                        cliente: {
                            nome: { contains: search, mode: 'insensitive' }
                        }
                    }
                },
                { observacoes: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (assinado !== undefined) {
            where.assinado = assinado === 'true';
        }
        if (enviado !== undefined) {
            where.enviado = enviado === 'true';
        }
        if (profissionalId) {
            where.profissionalId = Number(profissionalId);
        }
        if (dataInicio || dataFim) {
            where.createdAt = {};
            if (dataInicio) {
                where.createdAt.gte = new Date(dataInicio);
            }
            if (dataFim) {
                where.createdAt.lte = new Date(dataFim);
            }
        }
        const [laudos, total] = await Promise.all([
            prisma.laudo.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    pedido: {
                        include: {
                            animal: {
                                select: {
                                    id: true,
                                    nome: true,
                                    idade: true,
                                    sexo: true,
                                    especie: {
                                        select: { nome: true }
                                    }
                                }
                            },
                            cliente: {
                                select: {
                                    id: true,
                                    nome: true,
                                    telefone: true,
                                    cidade: true
                                }
                            },
                            profissional: {
                                select: {
                                    id: true,
                                    nome: true,
                                    registro: true
                                }
                            }
                        }
                    },
                    profissional: {
                        select: {
                            id: true,
                            nome: true,
                            registro: true,
                            conselho: {
                                select: { sigla: true }
                            }
                        }
                    },
                    usuario: {
                        select: {
                            id: true,
                            nome: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.laudo.count({ where })
        ]);
        return res.json({
            data: laudos,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Erro ao buscar laudos:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getLaudos = getLaudos;
const getLaudoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do laudo inválido' });
        }
        const laudo = await prisma.laudo.findUnique({
            where: { id: Number(id) },
            include: {
                pedido: {
                    include: {
                        animal: {
                            include: {
                                especie: true,
                                cliente: true
                            }
                        },
                        cliente: true,
                        profissional: {
                            include: {
                                conselho: true
                            }
                        },
                        exames: {
                            include: {
                                exame: {
                                    include: {
                                        parametros: true
                                    }
                                },
                                resultados: {
                                    include: {
                                        parametro: true
                                    }
                                }
                            }
                        }
                    }
                },
                profissional: {
                    include: {
                        conselho: true
                    }
                },
                usuario: true
            }
        });
        if (!laudo) {
            res.status(404).json({ error: 'Laudo não encontrado' });
            return;
        }
        return res.json(laudo);
    }
    catch (error) {
        console.error('Erro ao buscar laudo:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getLaudoById = getLaudoById;
const getLaudosByPedido = async (req, res) => {
    try {
        const { pedidoId } = req.params;
        if (!pedidoId || isNaN(Number(pedidoId))) {
            return res.status(400).json({ error: 'ID do pedido inválido' });
        }
        const laudos = await prisma.laudo.findMany({
            where: { pedidoId: Number(pedidoId) },
            include: {
                profissional: {
                    select: {
                        id: true,
                        nome: true,
                        registro: true,
                        conselho: {
                            select: { sigla: true }
                        }
                    }
                },
                usuario: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return res.json({ data: laudos });
    }
    catch (error) {
        console.error('Erro ao buscar laudos do pedido:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getLaudosByPedido = getLaudosByPedido;
const createLaudo = async (req, res) => {
    try {
        const { pedidoId, profissionalId, usuarioId, conteudo, observacoes } = req.body;
        if (!pedidoId) {
            return res.status(400).json({ error: 'ID do pedido é obrigatório' });
        }
        if (!conteudo) {
            return res.status(400).json({ error: 'Conteúdo do laudo é obrigatório' });
        }
        const pedidoExiste = await prisma.pedido.findUnique({
            where: { id: pedidoId }
        });
        if (!pedidoExiste) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        if (profissionalId) {
            const profissionalExiste = await prisma.profissional.findUnique({
                where: { id: profissionalId }
            });
            if (!profissionalExiste) {
                return res.status(404).json({ error: 'Profissional não encontrado' });
            }
        }
        if (usuarioId) {
            const usuarioExiste = await prisma.usuario.findUnique({
                where: { id: usuarioId }
            });
            if (!usuarioExiste) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
        }
        const laudo = await prisma.laudo.create({
            data: {
                pedidoId,
                profissionalId: profissionalId || null,
                usuarioId: usuarioId || null,
                conteudo,
                observacoes: observacoes || null
            },
            include: {
                pedido: {
                    include: {
                        animal: {
                            include: {
                                especie: true,
                                cliente: true
                            }
                        },
                        cliente: true
                    }
                },
                profissional: {
                    include: {
                        conselho: true
                    }
                },
                usuario: true
            }
        });
        return res.status(201).json(laudo);
    }
    catch (error) {
        console.error('Erro ao criar laudo:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createLaudo = createLaudo;
const updateLaudo = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do laudo inválido' });
        }
        const laudoExistente = await prisma.laudo.findUnique({
            where: { id: Number(id) }
        });
        if (!laudoExistente) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        if (laudoExistente.assinado && laudoExistente.enviado) {
            return res.status(400).json({
                error: 'Não é possível alterar laudo que já foi assinado e enviado'
            });
        }
        if (updateData.profissionalId) {
            const profissionalExiste = await prisma.profissional.findUnique({
                where: { id: updateData.profissionalId }
            });
            if (!profissionalExiste) {
                return res.status(404).json({ error: 'Profissional não encontrado' });
            }
        }
        const laudoAtualizado = await prisma.laudo.update({
            where: { id: Number(id) },
            data: updateData,
            include: {
                pedido: {
                    include: {
                        animal: {
                            include: {
                                especie: true,
                                cliente: true
                            }
                        },
                        cliente: true
                    }
                },
                profissional: {
                    include: {
                        conselho: true
                    }
                },
                usuario: true
            }
        });
        return res.json(laudoAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar laudo:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateLaudo = updateLaudo;
const signLaudo = async (req, res) => {
    try {
        const { id } = req.params;
        const { profissionalId } = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do laudo inválido' });
        }
        if (!profissionalId) {
            return res.status(400).json({ error: 'ID do profissional é obrigatório' });
        }
        const laudo = await prisma.laudo.findUnique({
            where: { id: Number(id) }
        });
        if (!laudo) {
            res.status(404).json({ error: 'Laudo não encontrado' });
            return;
        }
        if (laudo.assinado) {
            return res.status(400).json({ error: 'Laudo já foi assinado' });
        }
        const profissional = await prisma.profissional.findUnique({
            where: { id: profissionalId }
        });
        if (!profissional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }
        const laudoAssinado = await prisma.laudo.update({
            where: { id: Number(id) },
            data: {
                assinado: true,
                profissionalId,
                dataLiberacao: new Date()
            },
            include: {
                pedido: {
                    include: {
                        animal: {
                            include: {
                                especie: true,
                                cliente: true
                            }
                        },
                        cliente: true
                    }
                },
                profissional: {
                    include: {
                        conselho: true
                    }
                }
            }
        });
        return res.json(laudoAssinado);
    }
    catch (error) {
        console.error('Erro ao assinar laudo:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.signLaudo = signLaudo;
const sendLaudo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do laudo inválido' });
        }
        const laudo = await prisma.laudo.findUnique({
            where: { id: Number(id) }
        });
        if (!laudo) {
            res.status(404).json({ error: 'Laudo não encontrado' });
            return;
        }
        if (!laudo.assinado) {
            return res.status(400).json({ error: 'Laudo deve estar assinado antes de ser enviado' });
        }
        if (laudo.enviado) {
            return res.status(400).json({ error: 'Laudo já foi enviado' });
        }
        const laudoEnviado = await prisma.laudo.update({
            where: { id: Number(id) },
            data: {
                enviado: true,
                dataEnvio: new Date()
            }
        });
        return res.json(laudoEnviado);
    }
    catch (error) {
        console.error('Erro ao enviar laudo:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.sendLaudo = sendLaudo;
const generateLaudoPDF = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ error: 'ID do laudo inválido' });
            return;
        }
        const laudo = await prisma.laudo.findUnique({
            where: { id: Number(id) },
            include: {
                pedido: {
                    include: {
                        animal: {
                            include: {
                                especie: true,
                                cliente: true
                            }
                        },
                        cliente: true,
                        profissional: {
                            include: {
                                conselho: true
                            }
                        },
                        exames: {
                            include: {
                                exame: {
                                    include: {
                                        parametros: true
                                    }
                                },
                                resultados: {
                                    include: {
                                        parametro: true
                                    }
                                }
                            }
                        }
                    }
                },
                profissional: {
                    include: {
                        conselho: true
                    }
                }
            }
        });
        if (!laudo) {
            res.status(404).json({ error: 'Laudo não encontrado' });
            return;
        }
        const doc = new PDFDocument({ margin: 50 });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=laudo-${laudo.id}.pdf`);
        doc.pipe(res);
        doc.fontSize(20).text('LAUDO LABORATORIAL', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12)
            .text('LabVet - Laboratório Veterinário', { align: 'center' })
            .text('Endereço do laboratório', { align: 'center' })
            .text('Telefone: (XX) XXXX-XXXX', { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(14).text('DADOS DO CLIENTE:', { underline: true });
        doc.fontSize(12)
            .text(`Nome: ${laudo.pedido.cliente.nome}`)
            .text(`Telefone: ${laudo.pedido.cliente.telefone || 'Não informado'}`)
            .text(`Cidade: ${laudo.pedido.cliente.cidade || 'Não informada'}`);
        doc.moveDown();
        doc.fontSize(14).text('DADOS DO ANIMAL:', { underline: true });
        doc.fontSize(12)
            .text(`Nome: ${laudo.pedido.animal.nome}`)
            .text(`Espécie: ${laudo.pedido.animal.especie.nome}`)
            .text(`Idade: ${laudo.pedido.animal.idade || 'Não informada'}`)
            .text(`Sexo: ${laudo.pedido.animal.sexo}`);
        doc.moveDown();
        if (laudo.pedido.profissional) {
            doc.fontSize(14).text('PROFISSIONAL SOLICITANTE:', { underline: true });
            doc.fontSize(12)
                .text(`Nome: ${laudo.pedido.profissional.nome}`)
                .text(`Registro: ${laudo.pedido.profissional.registro || 'Não informado'}`);
            doc.moveDown();
        }
        if (laudo.pedido.exames.length > 0) {
            doc.fontSize(14).text('RESULTADOS DOS EXAMES:', { underline: true });
            doc.moveDown();
            laudo.pedido.exames.forEach((exame) => {
                doc.fontSize(13).text(`${exame.exame.nome}:`, { underline: true });
                if (exame.resultados && exame.resultados.length > 0) {
                    exame.resultados.forEach((resultado) => {
                        doc.fontSize(11)
                            .text(`  ${resultado.parametro.nome}: ${resultado.valor || 'Não informado'}`)
                            .text(`    Referência: ${resultado.parametro.valorReferencia || 'Não informado'}`);
                        if (resultado.observacao) {
                            doc.text(`    Obs: ${resultado.observacao}`);
                        }
                    });
                }
                else {
                    doc.fontSize(11).text('  Resultados não disponíveis');
                }
                doc.moveDown();
            });
        }
        doc.fontSize(14).text('LAUDO:', { underline: true });
        doc.fontSize(12).text(laudo.conteudo, { align: 'justify' });
        if (laudo.observacoes) {
            doc.moveDown();
            doc.fontSize(14).text('OBSERVAÇÕES:', { underline: true });
            doc.fontSize(12).text(laudo.observacoes, { align: 'justify' });
        }
        doc.moveDown(2);
        if (laudo.profissional && laudo.assinado) {
            doc.fontSize(12)
                .text(`Data de liberação: ${laudo.dataLiberacao?.toLocaleDateString('pt-BR') || 'Não informada'}`)
                .moveDown()
                .text('_'.repeat(50), { align: 'center' })
                .text(`${laudo.profissional.nome}`, { align: 'center' })
                .text(`${laudo.profissional.conselho?.sigla || ''} ${laudo.profissional.registro || ''}`, { align: 'center' });
        }
        doc.end();
    }
    catch (error) {
        console.error('Erro ao gerar PDF do laudo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
    }
};
exports.generateLaudoPDF = generateLaudoPDF;
const deleteLaudo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do laudo inválido' });
        }
        const laudo = await prisma.laudo.findUnique({
            where: { id: Number(id) }
        });
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        if (laudo.assinado && laudo.enviado) {
            return res.status(400).json({
                error: 'Não é possível excluir laudo que já foi assinado e enviado'
            });
        }
        await prisma.laudo.delete({
            where: { id: Number(id) }
        });
        return res.json({ message: 'Laudo excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir laudo:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.deleteLaudo = deleteLaudo;
//# sourceMappingURL=laudo.controller.js.map