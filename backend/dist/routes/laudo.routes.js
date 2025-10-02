"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const laudo_controller_1 = require("../controllers/laudo.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/', laudo_controller_1.getLaudos);
router.get('/pedido/:pedidoId', laudo_controller_1.getLaudosByPedido);
router.get('/:id', laudo_controller_1.getLaudoById);
router.get('/:id/pdf', laudo_controller_1.generateLaudoPDF);
router.post('/', auth_1.requireVeterinarian, laudo_controller_1.createLaudo);
router.put('/:id', auth_1.requireVeterinarian, laudo_controller_1.updateLaudo);
router.post('/:id/sign', auth_1.requireVeterinarian, laudo_controller_1.signLaudo);
router.post('/:id/send', auth_1.requireVeterinarian, laudo_controller_1.sendLaudo);
router.delete('/:id', auth_1.requireManager, laudo_controller_1.deleteLaudo);
exports.default = router;
//# sourceMappingURL=laudo.routes.js.map