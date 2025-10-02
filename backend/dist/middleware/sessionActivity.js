"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSessionActivity = void 0;
const sessionService_1 = require("../services/sessionService");
const updateSessionActivity = async (req, res, next) => {
    if (req.user) {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            sessionService_1.SessionService.updateLastActivity(token).catch(error => {
                console.error('Erro ao atualizar atividade da sessão:', error);
            });
        }
    }
    next();
};
exports.updateSessionActivity = updateSessionActivity;
//# sourceMappingURL=sessionActivity.js.map