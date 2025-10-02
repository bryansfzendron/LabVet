"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestStart = exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    const requestLog = {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        timestamp: new Date().toISOString(),
    };
    if (process.env.NODE_ENV === 'development') {
        console.log(`📥 ${requestLog.method} ${requestLog.url} - ${requestLog.ip}`);
    }
    const originalSend = res.send;
    res.send = function (data) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        requestLog.duration = duration;
        requestLog.statusCode = res.statusCode;
        if (req.user?.userId) {
            requestLog.userId = req.user.userId;
        }
        const statusEmoji = getStatusEmoji(res.statusCode);
        const durationColor = getDurationColor(duration);
        if (process.env.NODE_ENV === 'development') {
            console.log(`📤 ${statusEmoji} ${requestLog.method} ${requestLog.url} - ` +
                `${res.statusCode} - ${durationColor}${duration}ms\x1b[0m` +
                (requestLog.userId ? ` - User: ${requestLog.userId}` : ''));
        }
        if (duration > 1000) {
            console.warn(`🐌 Requisição lenta detectada:`, {
                ...requestLog,
                warning: 'SLOW_REQUEST',
            });
        }
        if (res.statusCode >= 400) {
            const logLevel = res.statusCode >= 500 ? 'error' : 'warn';
            console[logLevel](`${statusEmoji} Erro na requisição:`, {
                ...requestLog,
                responseSize: data ? Buffer.byteLength(data, 'utf8') : 0,
            });
        }
        if (shouldLogToDatabase(req, res)) {
            saveRequestLog(requestLog).catch(error => {
                console.error('❌ Erro ao salvar log no banco:', error);
            });
        }
        return originalSend.call(this, data);
    };
    next();
};
exports.requestLogger = requestLogger;
function getStatusEmoji(statusCode) {
    if (statusCode >= 200 && statusCode < 300)
        return '✅';
    if (statusCode >= 300 && statusCode < 400)
        return '🔄';
    if (statusCode >= 400 && statusCode < 500)
        return '⚠️';
    if (statusCode >= 500)
        return '❌';
    return '📝';
}
function getDurationColor(duration) {
    if (duration < 100)
        return '\x1b[32m';
    if (duration < 500)
        return '\x1b[33m';
    if (duration < 1000)
        return '\x1b[35m';
    return '\x1b[31m';
}
function shouldLogToDatabase(req, res) {
    const isError = res.statusCode >= 500;
    const isAuth = req.originalUrl.includes('/auth');
    const isCriticalOperation = ['POST', 'PUT', 'DELETE'].includes(req.method);
    const isSlow = Date.now() - parseInt(req.get('X-Request-Start') || '0') > 2000;
    return isError || isAuth || isCriticalOperation || isSlow;
}
async function saveRequestLog(log) {
    try {
    }
    catch (error) {
        console.error('❌ Erro ao salvar log de requisição:', error);
    }
}
const addRequestStart = (req, res, next) => {
    req.headers['X-Request-Start'] = Date.now().toString();
    next();
};
exports.addRequestStart = addRequestStart;
//# sourceMappingURL=requestLogger.js.map