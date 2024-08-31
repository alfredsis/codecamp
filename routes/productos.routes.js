const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct } = require('../controllers/products.controller');
const { checkAuth } = require('../middleware/auth');
const { validarRol } = require('../middleware/rolAuth');


router.get("/productos",  checkAuth, validarRol(['admin']), getProducts);

router.get("/productos/:id",  checkAuth, validarRol(['admin']),  getProductById);

router.post("/productos", checkAuth, validarRol(['admin']), createProduct);


router.put("/productos/:id", checkAuth, validarRol(['admin']), updateProduct);

module.exports = router;