const express = require('express');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');
const { getOrdenes, getOrdenById, crearOrden, updateOrden } = require('../controllers/ordenes.controller');
const router = express.Router();

router.get("/ordenes", checkAuth, validarRol(['admin', 'cliente']),  getOrdenes);

router.get("/ordenes/:id", checkAuth, validarRol(['admin','cliente']), getOrdenById);

router.post("/ordenes", checkAuth, validarRol(['admin', 'cliente']), crearOrden);

router.put("/ordenes/:id", checkAuth, validarRol(['admin', 'cliente']), updateOrden);



module.exports = router;
