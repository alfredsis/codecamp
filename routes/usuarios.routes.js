const express = require('express');
const { getUsuarios, getUsuarioById, createUsuarios, updateUsuarios, loginUsuario } = require('../controllers/usuarios.controller');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');


const router = express.Router();

router.get("/usuarios", checkAuth, validarRol(['admin']), getUsuarios);

router.get("/usuarios/:id", checkAuth, validarRol(['admin']), getUsuarioById);

router.post("/registrar", createUsuarios);

router.post("/login", loginUsuario);


router.put("/usuarios/:id", checkAuth, validarRol(['admin']), updateUsuarios);

module.exports = router;