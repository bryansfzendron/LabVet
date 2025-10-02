"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfil_controller_1 = require("../controllers/perfil.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/', perfil_controller_1.getPerfis);
router.get('/:id', perfil_controller_1.getPerfilById);
router.put('/:id/permissoes', perfil_controller_1.updatePerfilPermissoes);
exports.default = router;
//# sourceMappingURL=perfil.routes.js.map