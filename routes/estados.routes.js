const express = require('express');
const { getEstados, getEstadoById, createEstado, updateEstado } = require('../controllers/estados.controller');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');
const router = express.Router();

router.get("/estados",  checkAuth, validarRol(['admin']), getEstados);

router.get("/estados/:id",  checkAuth, validarRol(['admin']), getEstadoById);

router.post("/estados", checkAuth, validarRol(['admin']), createEstado);


router.put("/estados/:id", checkAuth, validarRol(['admin']), updateEstado);

module.exports = router;