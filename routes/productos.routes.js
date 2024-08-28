const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct } = require('../controllers/products.controller');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');


router.get("/productos",  checkAuth, validarRol([350]), getProducts);

router.get("/productos/:id",  checkAuth, validarRol([350]),  getProductById);

router.post("/productos", checkAuth, validarRol([350]), createProduct);


router.put("/productos/:id", checkAuth, validarRol([350]), updateProduct);

module.exports = router;