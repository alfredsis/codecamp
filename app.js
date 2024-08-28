const express = require('express');

require('dotenv').config();


const app = express();

const productRoutes = require('./routes/productos.routes');
const estadoRoutes = require('./routes/estados.routes');
const categoriaRoutes = require('./routes/categorias.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const ordenRoutes = require('./routes/orden.routes');

app.use(express.json());
app.use(productRoutes);
app.use(estadoRoutes);
app.use(categoriaRoutes);
app.use(usuariosRoutes);
app.use(ordenRoutes);

module.exports = app;
 