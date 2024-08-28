const express = require('express');
const { getUsuarios, getUsuarioById, createUsuarios, updateUsuarios, loginUsuario } = require('../controllers/usuarios.controller');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');


const router = express.Router();

router.get("/usuarios", checkAuth, validarRol([350]), getUsuarios);

router.get("/usuarios/:id", checkAuth, validarRol([350]), getUsuarioById);

router.post("/registrar", createUsuarios);

router.post("/login", loginUsuario);


router.put("/usuarios/:id", checkAuth, validarRol([350]), updateUsuarios);

module.exports = router;