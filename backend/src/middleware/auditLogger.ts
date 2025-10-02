import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import prisma from '../config/database';

interface AuditLogData {
  usuarioId?: number | undefined;
  acao: string;
  tabela?: string | undefined;
  registroId?: number | undefined;
  dadosAntigos?: any;
  dadosNovos?: any;
  ip?: string | undefined;
  userAgent?: string | undefined;
}

// Middleware para logging automático de ações
export const auditLogger = (acao: string, tabela?: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Só fazer log se a operação foi bem-sucedida (status 2xx)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const logData: AuditLogData = {
          usuarioId: req.user?.userId,
          acao,
          tabela,
          ip: req.ip,
          userAgent: req.get('User-Agent'),
        };

        // Tentar extrair ID do registro da resposta ou parâmetros
        if (req.params.id) {
          logData.registroId = parseInt(req.params.id);
        }

        // Para operações de criação, tentar extrair ID da resposta
        if (acao.includes('CREATE') && data) {
          try {
            const responseData = JSON.parse(data);
            if (responseData.id) {
              logData.registroId = responseData.id;
            }
          } catch (e) {
            // Ignorar erro de parsing
          }
        }

        // Para operações de atualização, salvar dados antigos e novos
        if (acao.includes('UPDATE')) {
          if (req.body) {
            logData.dadosNovos = req.body;
          }
        }

        // Salvar log de forma assíncrona
        saveAuditLog(logData).catch(error => {
          console.error('Erro ao salvar log de auditoria:', error);
        });
      }

      return originalSend.call(this, data);
    };

    next();
  };
};

// Função para salvar log de auditoria
async function saveAuditLog(logData: AuditLogData): Promise<void> {
  try {
    await prisma.logSistema.create({
      data: {
        usuarioId: logData.usuarioId,
        acao: logData.acao,
        tabela: logData.tabela,
        registroId: logData.registroId,
        dadosAntigos: logData.dadosAntigos,
        dadosNovos: logData.dadosNovos,
        ip: logData.ip,
        userAgent: logData.userAgent,
      },
    });
  } catch (error) {
    console.error('Erro ao criar log de auditoria:', error);
  }
}

// Função utilitária para criar logs manuais
export async function createAuditLog(logData: AuditLogData): Promise<void> {
  return saveAuditLog(logData);
}