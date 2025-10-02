"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exame_controller_1 = require("../controllers/exame.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/search', exame_controller_1.searchExames);
router.get('/especies', exame_controller_1.getEspecies);
router.get('/', exame_controller_1.getExames);
router.get('/:id', exame_controller_1.getExameById);
router.post('/', auth_1.requireVeterinarian, exame_controller_1.createExame);
router.put('/:id', auth_1.requireVeterinarian, exame_controller_1.updateExame);
router.delete('/:id', auth_1.requireManager, exame_controller_1.deleteExame);
router.patch('/:id/reactivate', auth_1.requireManager, exame_controller_1.reactivateExame);
exports.default = router;
//# sourceMappingURL=exame.routes.js.map