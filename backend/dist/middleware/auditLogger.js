"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = void 0;
exports.createAuditLog = createAuditLog;
const database_1 = __importDefault(require("../config/database"));
const auditLogger = (acao, tabela) => {
    return (req, res, next) => {
        const originalSend = res.send;
        res.send = function (data) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const logData = {
                    usuarioId: req.user?.userId,
                    acao,
                    tabela,
                    ip: req.ip,
                    userAgent: req.get('User-Agent'),
                };
                if (req.params.id) {
                    logData.registroId = parseInt(req.params.id);
                }
                if (acao.includes('CREATE') && data) {
                    try {
                        const responseData = JSON.parse(data);
                        if (responseData.id) {
                            logData.registroId = responseData.id;
                        }
                    }
                    catch (e) {
                    }
                }
                if (acao.includes('UPDATE')) {
                    if (req.body) {
                        logData.dadosNovos = req.body;
                    }
                }
                saveAuditLog(logData).catch(error => {
                    console.error('Erro ao salvar log de auditoria:', error);
                });
            }
            return originalSend.call(this, data);
        };
        next();
    };
};
exports.auditLogger = auditLogger;
async function saveAuditLog(logData) {
    try {
        await database_1.default.logSistema.create({
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
    }
    catch (error) {
        console.error('Erro ao criar log de auditoria:', error);
    }
}
async function createAuditLog(logData) {
    return saveAuditLog(logData);
}
//# sourceMappingURL=auditLogger.js.map