const {sequelize} = require('../db');
const { sql } = require('@sequelize/core');
const { validarToken } = require('../helpers/generaToken');



const getProducts = async(req, res) => {
    

    try {
        
    const [productos] = await sequelize.query(sql`SELECT * FROM Productos`);
    res.json(productos);
    console.log(productos);

    } catch(error){
        console.log('Error al obtener productos ', error);
        res.json({ message: 'Ocurrio un error al obtener los productos'})
    }

};





const getProductById = async (req, res) => {
  try {
      const { id } = req.params;

      const [producto] = await sequelize.query(sql`SELECT * FROM Productos WHERE idProductos = ${id}`);
      console.log(producto[0].nombre);

      if (producto.length > 0) {
          res.json(producto[0]);
      } else {
          res.json({ message: 'Producto no encontrado' });
      }

  } catch (error) {
      console.log('Error al obtener el producto:', error);
      res.json({ message: 'Ocurrio un error al procesar la solicitud' });
  }
};




const createProduct = async(req, res) => {

    try {
        const {
            
            CategoriaProductos_idCategoriaProductos,           
            nombre,
            marca,
            codigo,
            stock,
            estados_idestados,
            precio,           
            foto
          } = req.body;

          const token = req.headers.authorization.split(' ').pop();
          const {userid} = await validarToken(token);
        
        
          const result = await sequelize.query(sql`
            EXEC insertarProductos
           
            ${CategoriaProductos_idCategoriaProductos},
            ${userid},
            ${nombre},
            ${marca},
            ${codigo},
            ${stock},
            ${estados_idestados !== undefined ? estados_idestados : null},        
            ${precio},           
            ${foto !== undefined ? foto : null}     
          `);

        
        res.send('Producto creado exitosamente');
      } catch (error) {
        console.log('Error al crear producto: ', error);
    
        
        res.send('Error al crear el producto');
      }


};

const updateProduct = async(req, res) => {

  try {
  
    const id = req.params.id;
    
    const {
        
        CategoriaProductos_idCategoriaProductos,       
        nombre,
        marca,
        codigo,
        stock,
        estados_idestados,
        precio,       
        foto
      } = req.body;

      const token = req.headers.authorization.split(' ').pop();
      const {userid} = await validarToken(token);

      const result = await sequelize.query(sql`
        EXEC actualizarProductos
        ${id},
        ${CategoriaProductos_idCategoriaProductos},
        ${userid},
        ${nombre},
        ${marca},
        ${codigo},
        ${stock},
        ${estados_idestados !== undefined ? estados_idestados : null},        
        ${precio},           
        ${foto !== undefined ? foto : null}  
      `);
      
   
      if (result[1] > 0) { 
        res.json({ message: 'Producto actualizado' });
    } else {
        res.json({ message: 'Producto no encontrado' });
    }


    } catch (error) {
      console.log('Error al actualizar el producto:', error);
      res.json({ message: 'Ocurrió un error al actualizar el producto' });
  }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
};
