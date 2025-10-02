import prisma from '../config/database';

interface LoginHistoryData {
  usuarioId: number;
  ip?: string;
  userAgent?: string;
  dispositivo?: string;
  localizacao?: string;
  sucesso: boolean;
  motivo?: string;
}

export class LoginHistoryService {
  // Registrar tentativa de login
  static async recordLogin(loginData: LoginHistoryData): Promise<void> {
    try {
      await prisma.historicoLogin.create({
        data: {
          usuarioId: loginData.usuarioId,
          ip: loginData.ip || null,
          userAgent: loginData.userAgent || null,
          dispositivo: this.extractDevice(loginData.userAgent),
          localizacao: loginData.localizacao || null,
          sucesso: loginData.sucesso,
          motivo: loginData.motivo || null,
        },
      });
    } catch (error) {
      console.error('Erro ao registrar histórico de login:', error);
    }
  }

  // Registrar logout
  static async recordLogout(usuarioId: number, sessionStartTime: Date): Promise<void> {
    try {
      const now = new Date();
      const duracaoSessao = Math.floor((now.getTime() - sessionStartTime.getTime()) / (1000 * 60));

      // Atualizar o último registro de login do usuário
      const ultimoLogin = await prisma.historicoLogin.findFirst({
        where: {
          usuarioId,
          sucesso: true,
          dataLogout: null,
        },
        orderBy: {
          dataLogin: 'desc',
        },
      });

      if (ultimoLogin) {
        await prisma.historicoLogin.update({
          where: {
            id: ultimoLogin.id,
          },
          data: {
            dataLogout: now,
            duracaoSessao,
          },
        });
      }
    } catch (error) {
      console.error('Erro ao registrar logout:', error);
    }
  }

  // Listar histórico de login
  static async getLoginHistory(page: number = 1, limit: number = 10, usuarioId?: number) {
    try {
      const skip = (page - 1) * limit;
      const where: any = {};

      if (usuarioId) {
        where.usuarioId = usuarioId;
      }

      const [history, total] = await Promise.all([
        prisma.historicoLogin.findMany({
          where,
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
            dataLogin: 'desc',
          },
          skip,
          take: limit,
        }),
        prisma.historicoLogin.count({ where }),
      ]);

      return {
        history: history.map(record => ({
          id: record.id,
          usuario: record.usuario.nome,
          email: record.usuario.email,
          perfil: record.usuario.perfil,
          ip: record.ip,
          dispositivo: record.dispositivo,
          localizacao: record.localizacao,
          dataLogin: record.dataLogin,
          dataLogout: record.dataLogout,
          duracaoSessao: record.duracaoSessao ? `${record.duracaoSessao}m` : null,
          sucesso: record.sucesso,
          motivo: record.motivo,
          status: record.dataLogout ? 'Finalizada' : 'Ativa',
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error('Erro ao buscar histórico de login:', error);
      throw error;
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
}