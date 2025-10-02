"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profissional_controller_1 = require("../controllers/profissional.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/search', profissional_controller_1.searchProfissionais);
router.get('/conselhos', profissional_controller_1.getConselhos);
router.get('/', profissional_controller_1.getProfissionais);
router.post('/', auth_1.requireManager, profissional_controller_1.createProfissional);
router.get('/:id', profissional_controller_1.getProfissionalById);
router.put('/:id', auth_1.requireManager, profissional_controller_1.updateProfissional);
router.delete('/:id', auth_1.requireManager, profissional_controller_1.deleteProfissional);
router.patch('/:id/reactivate', auth_1.requireManager, profissional_controller_1.reactivateProfissional);
exports.default = router;
//# sourceMappingURL=profissional.routes.js.map