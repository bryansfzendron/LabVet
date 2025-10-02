"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_controller_1 = require("../controllers/pedido.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/', pedido_controller_1.getPedidos);
router.get('/:id', pedido_controller_1.getPedidoById);
router.get('/animal/:animalId', pedido_controller_1.getPedidosByAnimal);
router.post('/', auth_1.requireVeterinarian, pedido_controller_1.createPedido);
router.put('/:id', auth_1.requireVeterinarian, pedido_controller_1.updatePedido);
router.post('/resultados', auth_1.requireVeterinarian, pedido_controller_1.addResultados);
router.patch('/:id/cancel', auth_1.requireManager, pedido_controller_1.cancelPedido);
exports.default = router;
//# sourceMappingURL=pedido.routes.js.map