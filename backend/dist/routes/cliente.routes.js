"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = require("../controllers/cliente.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/search', cliente_controller_1.searchClientes);
router.get('/', cliente_controller_1.getClientes);
router.post('/', auth_1.requireVeterinarian, cliente_controller_1.createCliente);
router.get('/:id', cliente_controller_1.getClienteById);
router.put('/:id', auth_1.requireVeterinarian, cliente_controller_1.updateCliente);
router.delete('/:id', auth_1.requireVeterinarian, cliente_controller_1.deleteCliente);
router.patch('/:id/reactivate', auth_1.requireVeterinarian, cliente_controller_1.reactivateCliente);
exports.default = router;
//# sourceMappingURL=cliente.routes.js.map