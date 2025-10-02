import { Router } from 'express';
import { Request, Response } from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthenticatedRequest } from '../middleware/auth';
import prisma from '../config/database';

const router = Router();

// GET /api/logs - Listar logs do sistema
router.get('/', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      acao, 
      usuarioId, 
      dataInicio, 
      dataFim 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {};
    
    if (acao) {
      where.acao = { contains: acao as string, mode: 'insensitive' };
    }
    
    if (usuarioId) {
      where.usuarioId = Number(usuarioId);
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

    const [logs, total] = await Promise.all([
      prisma.logSistema.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit)
      }),
      prisma.logSistema.count({ where })
    ]);

    // Buscar dados dos usuários para os logs
    const usuarioIds = [...new Set(logs.map(log => log.usuarioId).filter((id): id is number => id !== null))];
    const usuarios = await prisma.usuario.findMany({
      where: { id: { in: usuarioIds } },
      select: { id: true, nome: true, email: true }
    });

    // Mapear usuários por ID para facilitar a busca
    const usuariosMap = new Map(usuarios.map(u => [u.id, u]));

    // Adicionar dados do usuário aos logs
    const logsComUsuario = logs.map(log => ({
      ...log,
      usuario: log.usuarioId ? usuariosMap.get(log.usuarioId) || null : null
    }));

    res.json({
      logs: logsComUsuario,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/logs/stats - Estatísticas de logs
router.get('/stats', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const semanaAtras = new Date();
    semanaAtras.setDate(semanaAtras.getDate() - 7);
    semanaAtras.setHours(0, 0, 0, 0);

    const [totalLogs, logsHoje, logsSemana, acoesFrequentes] = await Promise.all([
      prisma.logSistema.count(),
      prisma.logSistema.count({
        where: { createdAt: { gte: hoje } }
      }),
      prisma.logSistema.count({
        where: { createdAt: { gte: semanaAtras } }
      }),
      prisma.logSistema.groupBy({
        by: ['acao'],
        _count: { acao: true },
        orderBy: { _count: { acao: 'desc' } },
        take: 5
      })
    ]);

    const acoesFormatadas = acoesFrequentes.map(item => ({
      acao: item.acao,
      count: item._count.acao
    }));

    res.json({
      totalLogs,
      logsHoje,
      logsSemana,
      acoesFrequentes: acoesFormatadas
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;