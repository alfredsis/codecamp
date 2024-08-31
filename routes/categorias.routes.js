const express = require('express');
const { getCategorias, getCategoriaById, createCategoria, updateCategoria } = require('../controllers/categorias.controller');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');


const router = express.Router();

router.get("/categorias",  checkAuth, validarRol(['admin']), getCategorias);

router.get("/categorias/:id",  checkAuth, validarRol(['admin']), getCategoriaById);

router.post("/categorias", checkAuth, validarRol(['admin']), createCategoria);


router.put("/categorias/:id",  checkAuth, validarRol(['admin']), updateCategoria);

module.exports = router;