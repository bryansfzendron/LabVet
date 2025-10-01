import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

// Interface para log de requisição
interface RequestLog {
  method: string;
  url: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  userId?: number;
  duration?: number;
  statusCode?: number;
}

// Middleware de logging de requisições
export const requestLogger = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  
  // Capturar informações da requisição
  const requestLog: RequestLog = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress || 'unknown',
    userAgent: req.get('User-Agent') || 'unknown',
    timestamp: new Date().toISOString(),
  };

  // Log da requisição recebida (apenas em desenvolvimento)
  if (process.env.NODE_ENV === 'development') {
    console.log(`📥 ${requestLog.method} ${requestLog.url} - ${requestLog.ip}`);
  }

  // Interceptar o final da resposta para calcular duração
  const originalSend = res.send;
  res.send = function(data) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    requestLog.duration = duration;
    requestLog.statusCode = res.statusCode;
    if (req.user?.id) {
      requestLog.userId = req.user.id;
    }

    // Log da resposta
    const statusEmoji = getStatusEmoji(res.statusCode);
    const durationColor = getDurationColor(duration);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `📤 ${statusEmoji} ${requestLog.method} ${requestLog.url} - ` +
        `${res.statusCode} - ${durationColor}${duration}ms\x1b[0m` +
        (requestLog.userId ? ` - User: ${requestLog.userId}` : '')
      );
    }

    // Log detalhado para requisições lentas (> 1000ms)
    if (duration > 1000) {
      console.warn(`🐌 Requisição lenta detectada:`, {
        ...requestLog,
        warning: 'SLOW_REQUEST',
      });
    }

    // Log para erros 4xx e 5xx
    if (res.statusCode >= 400) {
      const logLevel = res.statusCode >= 500 ? 'error' : 'warn';
      console[logLevel](`${statusEmoji} Erro na requisição:`, {
        ...requestLog,
        responseSize: data ? Buffer.byteLength(data, 'utf8') : 0,
      });
    }

    // Salvar log no banco de dados para requisições importantes (opcional)
    if (shouldLogToDatabase(req, res)) {
      saveRequestLog(requestLog).catch(error => {
        console.error('❌ Erro ao salvar log no banco:', error);
      });
    }

    return originalSend.call(this, data);
  };

  next();
};

// Função para obter emoji baseado no status code
function getStatusEmoji(statusCode: number): string {
  if (statusCode >= 200 && statusCode < 300) return '✅';
  if (statusCode >= 300 && statusCode < 400) return '🔄';
  if (statusCode >= 400 && statusCode < 500) return '⚠️';
  if (statusCode >= 500) return '❌';
  return '📝';
}

// Função para obter cor baseada na duração
function getDurationColor(duration: number): string {
  if (duration < 100) return '\x1b[32m'; // Verde
  if (duration < 500) return '\x1b[33m'; // Amarelo
  if (duration < 1000) return '\x1b[35m'; // Magenta
  return '\x1b[31m'; // Vermelho
}

// Função para determinar se deve salvar no banco
function shouldLogToDatabase(req: Request, res: Response): boolean {
  // Salvar logs para:
  // - Erros 5xx
  // - Requisições de autenticação
  // - Operações críticas (POST, PUT, DELETE)
  // - Requisições lentas (> 2000ms)
  
  const isError = res.statusCode >= 500;
  const isAuth = req.originalUrl.includes('/auth');
  const isCriticalOperation = ['POST', 'PUT', 'DELETE'].includes(req.method);
  const isSlow = Date.now() - parseInt(req.get('X-Request-Start') || '0') > 2000;
  
  return isError || isAuth || isCriticalOperation || isSlow;
}

// Função para salvar log no banco (implementação futura)
async function saveRequestLog(log: RequestLog): Promise<void> {
  try {
    // Implementar salvamento no banco usando Prisma
    // await prisma.logSistema.create({
    //   data: {
    //     tipo: 'REQUEST',
    //     descricao: `${log.method} ${log.url}`,
    //     detalhes: JSON.stringify(log),
    //     usuarioId: log.userId,
    //   },
    // });
  } catch (error) {
    console.error('❌ Erro ao salvar log de requisição:', error);
  }
}

// Middleware para adicionar timestamp de início
export const addRequestStart = (req: Request, res: Response, next: NextFunction): void => {
  req.headers['X-Request-Start'] = Date.now().toString();
  next();
};