"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const cliente_routes_1 = __importDefault(require("./cliente.routes"));
const animal_routes_1 = __importDefault(require("./animal.routes"));
const profissional_routes_1 = __importDefault(require("./profissional.routes"));
const exame_routes_1 = __importDefault(require("./exame.routes"));
const pedido_routes_1 = __importDefault(require("./pedido.routes"));
const laudo_routes_1 = __importDefault(require("./laudo.routes"));
const relatorio_routes_1 = __importDefault(require("./relatorio.routes"));
const financeiro_routes_1 = __importDefault(require("./financeiro.routes"));
const router = (0, express_1.Router)();
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        message: 'LabVet API funcionando com autenticação JWT'
    });
});
router.use('/auth', auth_1.default);
router.use('/clientes', cliente_routes_1.default);
router.use('/animais', animal_routes_1.default);
router.use('/profissionais', profissional_routes_1.default);
router.use('/exames', exame_routes_1.default);
router.use('/pedidos', pedido_routes_1.default);
router.use('/laudos', laudo_routes_1.default);
router.use('/relatorios', relatorio_routes_1.default);
router.use('/financeiro', financeiro_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map