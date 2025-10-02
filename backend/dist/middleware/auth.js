"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireManager = exports.verifyToken = exports.generateToken = exports.requireVeterinarian = exports.requireAdmin = exports.authenticateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'labvet-secret-key-2024';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Token de acesso requerido' });
        return;
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'Token inválido' });
            return;
        }
        console.log('🔍 Token decodificado:', decoded);
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.perfil?.toUpperCase() !== 'ADMIN') {
        res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
        return;
    }
    next();
};
exports.requireAdmin = requireAdmin;
const requireVeterinarian = (req, res, next) => {
    if (!req.user || !['ADMIN', 'VETERINARIO'].includes(req.user.perfil.toUpperCase())) {
        res.status(403).json({ error: 'Acesso negado. Apenas veterinários e administradores.' });
        return;
    }
    next();
};
exports.requireVeterinarian = requireVeterinarian;
const generateToken = (userId, email, perfil) => {
    return jwt.sign({
        userId,
        email,
        perfil
    }, JWT_SECRET, { expiresIn: '24h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const requireManager = (req, res, next) => {
    if (!req.user || !['ADMIN', 'GERENTE', 'VETERINARIO'].includes(req.user.perfil.toUpperCase())) {
        return res.status(403).json({ error: 'Acesso negado. Apenas gerentes, veterinários e administradores.' });
    }
    return next();
};
exports.requireManager = requireManager;
//# sourceMappingURL=auth.js.map