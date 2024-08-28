const express = require('express');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');
const { getOrdenes, getOrdenById, crearOrden, updateOrden } = require('../controllers/ordenes.controller');
const router = express.Router();

router.get("/ordenes", checkAuth, validarRol([350]),  getOrdenes);

router.get("/ordenes/:id", checkAuth, validarRol([350]), getOrdenById);

router.post("/ordenes", checkAuth, validarRol([350]), crearOrden);

router.put("/ordenes/:id", checkAuth, validarRol([350]), updateOrden);

// checkAuth, validarRol([350]),

module.exports = router;
