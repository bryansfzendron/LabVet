"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfil_controller_1 = require("../controllers/perfil.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/all', perfil_controller_1.getAllPerfis);
router.get('/', perfil_controller_1.getPerfis);
router.get('/:id', perfil_controller_1.getPerfilById);
router.post('/', perfil_controller_1.createPerfil);
router.put('/:id', perfil_controller_1.updatePerfil);
router.put('/:id/permissoes', perfil_controller_1.updatePerfilPermissoes);
router.delete('/:id', perfil_controller_1.deletePerfil);
exports.default = router;
//# sourceMappingURL=perfil.routes.js.map