const express = require('express');
const cors = require('cors'); 

require('dotenv').config();


const app = express();

const productRoutes = require('./routes/productos.routes');
const estadoRoutes = require('./routes/estados.routes');
const categoriaRoutes = require('./routes/categorias.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const ordenRoutes = require('./routes/orden.routes');

app.use(cors());
app.use(express.json());
app.use(productRoutes);
app.use(estadoRoutes);
app.use(categoriaRoutes);
app.use(usuariosRoutes);
app.use(ordenRoutes);

module.exports = app;
 