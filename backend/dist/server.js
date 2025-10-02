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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv = __importStar(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const cliente_routes_1 = __importDefault(require("./routes/cliente.routes"));
const animal_routes_1 = __importDefault(require("./routes/animal.routes"));
const profissional_routes_1 = __importDefault(require("./routes/profissional.routes"));
const perfil_routes_1 = __importDefault(require("./routes/perfil.routes"));
const exame_routes_1 = __importDefault(require("./routes/exame.routes"));
const pedido_routes_1 = __importDefault(require("./routes/pedido.routes"));
const laudo_routes_1 = __importDefault(require("./routes/laudo.routes"));
const financeiro_routes_1 = __importDefault(require("./routes/financeiro.routes"));
const relatorio_routes_1 = __importDefault(require("./routes/relatorio.routes"));
const logs_1 = __importDefault(require("./routes/logs"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const requestLogger_1 = require("./middleware/requestLogger");
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: 'Muitas tentativas. Tente novamente em 15 minutos.',
    },
});
app.use(limiter);
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use((0, cors_1.default)({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'http://localhost:5173',
        'http://localhost:5178',
        'http://192.168.15.225:5178',
        'http://192.168.15.225:3001',
        'https://labvet.bryanzendron.com.br',
        'http://labvet.bryanzendron.com.br'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger_1.requestLogger);
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
    });
});
app.use('/api/auth', auth_1.default);
app.use('/api/clientes', cliente_routes_1.default);
app.use('/api/animais', animal_routes_1.default);
app.use('/api/profissionais', profissional_routes_1.default);
app.use('/api/perfis', perfil_routes_1.default);
app.use('/api/exames', exame_routes_1.default);
app.use('/api/pedidos', pedido_routes_1.default);
app.use('/api/laudos', laudo_routes_1.default);
app.use('/api/financeiro', financeiro_routes_1.default);
app.use('/api/relatorios', relatorio_routes_1.default);
app.use('/api/logs', logs_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
const server = app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Servidor LabVet rodando na porta ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 Health check (IP): http://192.168.15.225:${PORT}/health`);
    console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
    console.log(`📚 API Base URL (IP): http://192.168.15.225:${PORT}/api`);
});
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM recebido. Encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado com sucesso.');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('🛑 SIGINT recebido. Encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado com sucesso.');
        process.exit(0);
    });
});
exports.default = app;
//# sourceMappingURL=server.js.map