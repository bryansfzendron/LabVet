"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const animal_controller_1 = require("../controllers/animal.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/search', animal_controller_1.searchAnimais);
router.get('/cliente/:clienteId', animal_controller_1.getAnimaisByCliente);
router.get('/', animal_controller_1.getAnimais);
router.post('/', auth_1.requireVeterinarian, animal_controller_1.createAnimal);
router.get('/:id', animal_controller_1.getAnimalById);
router.put('/:id', auth_1.requireVeterinarian, animal_controller_1.updateAnimal);
router.delete('/:id', auth_1.requireVeterinarian, animal_controller_1.deleteAnimal);
router.patch('/:id/reactivate', auth_1.requireVeterinarian, animal_controller_1.reactivateAnimal);
exports.default = router;
//# sourceMappingURL=animal.routes.js.map