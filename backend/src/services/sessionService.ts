import prisma from '../config/database';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'labvet-secret-key-2024';

interface SessionData {
  usuarioId: number;
  token: string;
  ip?: string;
  userAgent?: string;
  dispositivo?: string;
  localizacao?: string;
}

export class SessionService {
  // Criar nova sessão
  static async createSession(sessionData: SessionData): Promise<string> {
    try {
      const session = await prisma.sessaoAtiva.create({
        data: {
          usuarioId: sessionData.usuarioId,
          token: sessionData.token,
          ip: sessionData.ip || null,
          userAgent: sessionData.userAgent || null,
          dispositivo: this.extractDevice(sessionData.userAgent),
          localizacao: sessionData.localizacao || null,
        },
      });

      return session.id;
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
      throw error;
    }
  }

  // Atualizar última atividade da sessão
  static async updateLastActivity(token: string): Promise<void> {
    try {
      await prisma.sessaoAtiva.updateMany({
        where: {
          token,
          ativa: true,
        },
        data: {
          ultimaAtividade: new Date(),
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar atividade da sessão:', error);
    }
  }

  // Encerrar sessão
  static async endSession(token: string): Promise<void> {
    try {
      await prisma.sessaoAtiva.updateMany({
        where: {
          token,
          ativa: true,
        },
        data: {
          ativa: false,
        },
      });
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error);
      throw error;
    }
  }

  // Encerrar sessão por ID
  static async endSessionById(sessionId: string): Promise<void> {
    try {
      await prisma.sessaoAtiva.update({
        where: {
          id: sessionId,
        },
        data: {
          ativa: false,
        },
      });
    } catch (error) {
      console.error('Erro ao encerrar sessão por ID:', error);
      throw error;
    }
  }

  // Listar sessões ativas
  static async getActiveSessions(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [sessions, total] = await Promise.all([
        prisma.sessaoAtiva.findMany({
          where: {
            ativa: true,
          },
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
                email: true,
                perfil: true,
              },
            },
          },
          orderBy: {
            ultimaAtividade: 'desc',
          },
          skip,
          take: limit,
        }),
        prisma.sessaoAtiva.count({
          where: {
            ativa: true,
          },
        }),
      ]);

      return {
        sessions: sessions.map(session => ({
          id: session.id,
          usuario: session.usuario.nome,
          email: session.usuario.email,
          perfil: session.usuario.perfil,
          ip: session.ip,
          dispositivo: session.dispositivo,
          localizacao: session.localizacao,
          inicioSessao: session.inicioSessao,
          ultimaAtividade: session.ultimaAtividade,
          duracao: this.calculateDuration(session.inicioSessao),
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error('Erro ao buscar sessões ativas:', error);
      throw error;
    }
  }

  // Limpar sessões expiradas (mais de 24 horas inativas)
  static async cleanExpiredSessions(): Promise<void> {
    try {
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() - 24);

      await prisma.sessaoAtiva.updateMany({
        where: {
          ultimaAtividade: {
            lt: expirationTime,
          },
          ativa: true,
        },
        data: {
          ativa: false,
        },
      });
    } catch (error) {
      console.error('Erro ao limpar sessões expiradas:', error);
    }
  }

  // Extrair informações do dispositivo do User-Agent
  private static extractDevice(userAgent?: string): string {
    if (!userAgent) return 'Desconhecido';

    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'Mac';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iPhone')) return 'iPhone';
    if (userAgent.includes('iPad')) return 'iPad';

    return 'Desktop';
  }

  // Calcular duração da sessão
  private static calculateDuration(startTime: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - startTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    return `${diffMinutes}m`;
  }
}