const express = require('express');
const { getCategorias, getCategoriaById, createCategoria, updateCategoria } = require('../controllers/categorias.controller');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');

const router = express.Router();

router.get("/categorias",  checkAuth, validarRol([350]), getCategorias);

router.get("/categorias/:id",  checkAuth, validarRol([350]), getCategoriaById);

router.post("/categorias", checkAuth, validarRol([350]), createCategoria);


router.put("/categorias/:id",  checkAuth, validarRol([350]), updateCategoria);

module.exports = router;