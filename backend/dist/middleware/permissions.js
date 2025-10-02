"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireManager = void 0;
const requireManager = (req, res, next) => {
    if (!req.user || !['ADMIN', 'GERENTE'].includes(req.user.perfil.toUpperCase())) {
        return res.status(403).json({ error: 'Acesso negado. Apenas gerentes e administradores.' });
    }
    return next();
};
exports.requireManager = requireManager;
//# sourceMappingURL=permissions.js.map