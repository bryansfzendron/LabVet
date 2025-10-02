"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const sessionService_1 = require("../services/sessionService");
const loginHistoryService_1 = require("../services/loginHistoryService");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.login);
router.post('/register', auth_1.authenticateToken, auth_1.requireAdmin, auth_controller_1.register);
router.get('/verify', auth_1.authenticateToken, auth_controller_1.verifyToken);
router.post('/change-password', auth_1.authenticateToken, auth_controller_1.changePassword);
router.post('/logout', auth_1.authenticateToken, auth_controller_1.logout);
router.get('/users', auth_1.authenticateToken, auth_1.requireAdmin, auth_controller_1.getUsers);
router.put('/users/:id', auth_1.authenticateToken, auth_1.requireAdmin, auth_controller_1.updateUser);
router.delete('/users/:id', auth_1.authenticateToken, auth_1.requireAdmin, auth_controller_1.deleteUser);
router.get('/sessions', auth_1.authenticateToken, auth_1.requireAdmin, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const sessions = await sessionService_1.SessionService.getActiveSessions(Number(page), Number(limit));
    res.json(sessions);
}));
router.post('/sessions/:id/terminate', auth_1.authenticateToken, auth_1.requireAdmin, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: 'ID da sessão é obrigatório' });
        return;
    }
    await sessionService_1.SessionService.endSessionById(id);
    res.json({
        message: 'Sessão terminada com sucesso',
    });
}));
router.get('/login-history', auth_1.authenticateToken, auth_1.requireAdmin, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, usuarioId } = req.query;
    const history = await loginHistoryService_1.LoginHistoryService.getLoginHistory(Number(page), Number(limit), usuarioId ? Number(usuarioId) : undefined);
    res.json(history);
}));
router.post('/cleanup-sessions', auth_1.authenticateToken, auth_1.requireAdmin, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    await sessionService_1.SessionService.cleanExpiredSessions();
    res.json({
        message: 'Sessões expiradas removidas com sucesso',
    });
}));
exports.default = router;
//# sourceMappingURL=auth.js.map