import { Request, Response } from 'express';
import prisma from '../config/database';
import { asyncHandler } from '../middleware/errorHandler';

/**
 * @route   GET /api/perfis
 * @desc    Listar todos os perfis ativos
 * @access  Private
 */
export const getPerfis = asyncHandler(async (req: Request, res: Response) => {
  try {
    const perfis = await prisma.perfil.findMany({
      where: {
        ativo: true
      },
      select: {
        id: true,
        nome: true,
        codigo: true,
        descricao: true,
        permissoes: true
      },
      orderBy: {
        nome: 'asc'
      }
    });

    return res.json(perfis);
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @route   GET /api/perfis/:id
 * @desc    Buscar perfil por ID
 * @access  Private
 */
export const getPerfilById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const perfil = await prisma.perfil.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        nome: true,
        codigo: true,
        descricao: true,
        permissoes: true,
        ativo: true
      }
    });

    if (!perfil) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    return res.json(perfil);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});