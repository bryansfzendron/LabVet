import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Interface para criação de laudo
interface CreateLaudoData {
  pedidoId: number;
  profissionalId?: number;
  usuarioId?: number;
  conteudo: string;
  observacoes?: string;
}

// Listar laudos com filtros
export const getLaudos = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      assinado,
      enviado,
      profissionalId,
      dataInicio,
      dataFim
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { 
          pedido: {
            animal: {
              nome: { contains: search as string, mode: 'insensitive' }
            }
          }
        },
        { 
          pedido: {
            cliente: {
              nome: { contains: search as string, mode: 'insensitive' }
            }
          }
        },
        { observacoes: { contains: search as string, mode: 'insensitive' } }
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
        where.createdAt.gte = new Date(dataInicio as string);
      }
      if (dataFim) {
        where.createdAt.lte = new Date(dataFim as string);
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
  } catch (error) {
    console.error('Erro ao buscar laudos:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar laudo por ID
export const getLaudoById = async (req: Request, res: Response) => {
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
      return res.status(404).json({ error: 'Laudo não encontrado' });
    }

    return res.json(laudo);
  } catch (error) {
    console.error('Erro ao buscar laudo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar laudos por pedido
export const getLaudosByPedido = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error('Erro ao buscar laudos do pedido:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Criar novo laudo
export const createLaudo = async (req: Request, res: Response) => {
  try {
    const {
      pedidoId,
      profissionalId,
      usuarioId,
      conteudo,
      observacoes
    }: CreateLaudoData = req.body;

    // Validações básicas
    if (!pedidoId) {
      return res.status(400).json({ error: 'ID do pedido é obrigatório' });
    }

    if (!conteudo) {
      return res.status(400).json({ error: 'Conteúdo do laudo é obrigatório' });
    }

    // Verificar se o pedido existe
    const pedidoExiste = await prisma.pedido.findUnique({
      where: { id: pedidoId }
    });

    if (!pedidoExiste) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Verificar se o profissional existe (se fornecido)
    if (profissionalId) {
      const profissionalExiste = await prisma.profissional.findUnique({
        where: { id: profissionalId }
      });

      if (!profissionalExiste) {
        return res.status(404).json({ error: 'Profissional não encontrado' });
      }
    }

    // Verificar se o usuário existe (se fornecido)
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
  } catch (error) {
    console.error('Erro ao criar laudo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar laudo
export const updateLaudo = async (req: Request, res: Response) => {
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

    // Não permitir alteração se já foi assinado e enviado
    if (laudoExistente.assinado && laudoExistente.enviado) {
      return res.status(400).json({ 
        error: 'Não é possível alterar laudo que já foi assinado e enviado' 
      });
    }

    // Verificar se o profissional existe (se fornecido)
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
  } catch (error) {
    console.error('Erro ao atualizar laudo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Assinar laudo
export const signLaudo = async (req: Request, res: Response) => {
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
      return res.status(404).json({ error: 'Laudo não encontrado' });
    }

    if (laudo.assinado) {
      return res.status(400).json({ error: 'Laudo já foi assinado' });
    }

    // Verificar se o profissional existe
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
  } catch (error) {
    console.error('Erro ao assinar laudo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Enviar laudo
export const sendLaudo = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error('Erro ao enviar laudo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Gerar PDF do laudo
export const generateLaudoPDF = async (req: Request, res: Response) => {
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
        }
      }
    });

    if (!laudo) {
      return res.status(404).json({ error: 'Laudo não encontrado' });
    }

    // Criar PDF
    const doc = new (PDFDocument as any)({ margin: 50 });
    
    // Configurar headers para download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=laudo-${laudo.id}.pdf`);
    
    // Pipe do PDF para a resposta
    doc.pipe(res);

    // Cabeçalho
    doc.fontSize(20).text('LAUDO LABORATORIAL', { align: 'center' });
    doc.moveDown();

    // Informações do laboratório (você pode personalizar)
    doc.fontSize(12)
       .text('LabVet - Laboratório Veterinário', { align: 'center' })
       .text('Endereço do laboratório', { align: 'center' })
       .text('Telefone: (XX) XXXX-XXXX', { align: 'center' });
    
    doc.moveDown(2);

    // Informações do cliente e animal
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

    // Profissional solicitante
    if (laudo.pedido.profissional) {
      doc.fontSize(14).text('PROFISSIONAL SOLICITANTE:', { underline: true });
      doc.fontSize(12)
         .text(`Nome: ${laudo.pedido.profissional.nome}`)
         .text(`Registro: ${laudo.pedido.profissional.registro || 'Não informado'}`);
      doc.moveDown();
    }

    // Resultados dos exames
    if (laudo.pedido.exames.length > 0) {
      doc.fontSize(14).text('RESULTADOS DOS EXAMES:', { underline: true });
      doc.moveDown();

      laudo.pedido.exames.forEach((exame: any) => {
        doc.fontSize(13).text(`${exame.exame.nome}:`, { underline: true });
        
        if (exame.resultados && exame.resultados.length > 0) {
          exame.resultados.forEach((resultado: any) => {
            doc.fontSize(11)
               .text(`  ${resultado.parametro.nome}: ${resultado.valor || 'Não informado'}`)
               .text(`    Referência: ${resultado.parametro.valorReferencia || 'Não informado'}`);
            
            if (resultado.observacao) {
              doc.text(`    Obs: ${resultado.observacao}`);
            }
          });
        } else {
          doc.fontSize(11).text('  Resultados não disponíveis');
        }
        
        doc.moveDown();
      });
    }

    // Conteúdo do laudo
    doc.fontSize(14).text('LAUDO:', { underline: true });
    doc.fontSize(12).text(laudo.conteudo, { align: 'justify' });
    
    if (laudo.observacoes) {
      doc.moveDown();
      doc.fontSize(14).text('OBSERVAÇÕES:', { underline: true });
      doc.fontSize(12).text(laudo.observacoes, { align: 'justify' });
    }

    doc.moveDown(2);

    // Assinatura
    if (laudo.profissional && laudo.assinado) {
      doc.fontSize(12)
         .text(`Data de liberação: ${laudo.dataLiberacao?.toLocaleDateString('pt-BR') || 'Não informada'}`)
         .moveDown()
         .text('_'.repeat(50), { align: 'center' })
         .text(`${laudo.profissional.nome}`, { align: 'center' })
         .text(`${laudo.profissional.conselho?.sigla || ''} ${laudo.profissional.registro || ''}`, { align: 'center' });
    }

    // Finalizar PDF
    doc.end();

  } catch (error) {
    console.error('Erro ao gerar PDF do laudo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Deletar laudo
export const deleteLaudo = async (req: Request, res: Response) => {
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

    // Não permitir exclusão se já foi assinado e enviado
    if (laudo.assinado && laudo.enviado) {
      return res.status(400).json({ 
        error: 'Não é possível excluir laudo que já foi assinado e enviado' 
      });
    }

    await prisma.laudo.delete({
      where: { id: Number(id) }
    });

    return res.json({ message: 'Laudo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir laudo:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
