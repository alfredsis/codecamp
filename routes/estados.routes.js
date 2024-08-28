const express = require('express');
const { getEstados, getEstadoById, createEstado, updateEstado } = require('../controllers/estados.controller');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');
const router = express.Router();

router.get("/estados",  checkAuth, validarRol([350]), getEstados);

router.get("/estados/:id",  checkAuth, validarRol([350]), getEstadoById);

router.post("/estados", checkAuth, validarRol([350]), createEstado);


router.put("/estados/:id", checkAuth, validarRol([350]), updateEstado);

module.exports = router;