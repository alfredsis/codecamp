const {sequelize} = require('../db');
const { sql } = require('@sequelize/core');



const getCategorias = async(req, res) => {
    

    try {
        
    const [categorias] = await sequelize.query(sql`SELECT * FROM CategoriaProductos`);
    res.json(categorias);
    console.log(categorias);

    } catch(error){
        console.log('Error al obtener categorias ', error);
        res.json({ message: 'Ocurrio un error al obtener las categorias'})
    }

};





const getCategoriaById = async (req, res) => {
  try {
      const { id } = req.params;

      const [categoria] = await sequelize.query(sql`SELECT * FROM CategoriaProductos WHERE idCategoriaProductos = ${id}`);

      if (categoria.length > 0) {
          res.json(categoria[0]);
      } else {
          res.json({ message: 'categoria no encontrado' });
      }

  } catch (error) {
      console.log('Error al obtener el categoria:', error);
      res.json({ message: 'Ocurrio un error al procesar la solicitud' });
  }
};




const createCategoria = async(req, res) => {

    try {
        const {
            idCategoriaProductos, 
            usuarios_idusuarios, 
            nombre, 
            estados_idestados, 
            fecha_creacion
          } = req.body;
        
          const result = await sequelize.query(sql`
            EXEC insertarCategoriaProductos
            ${idCategoriaProductos},
            ${usuarios_idusuarios},
            ${nombre},
            ${estados_idestados},
            ${fecha_creacion}
          `);

        
        res.send('categoria creada exitosamente');
      } catch (error) {
        console.log('Error al crear categoria: ', error);  
        res.send('Error al crear el categoria');
      }


};

const updateCategoria = async(req, res) => {

  try {
  
    const id = req.params.id;
    
    const {  
        idCategoriaProductos, 
        usuarios_idusuarios, 
        nombre, 
        estados_idestados, 
        fecha_creacion
      } = req.body;
      const result = await sequelize.query(sql`
        EXEC actualizarCategoriaProductos
            ${idCategoriaProductos},
            ${usuarios_idusuarios},
            ${nombre},
            ${estados_idestados},
            ${fecha_creacion}
          `);
      
   
      if (result[1] > 0) { 
        res.json({ message: 'categoria actualizado' });
    } else {
        res.json({ message: 'categoria no encontrado' });
    }


    } catch (error) {
      console.log('Error al actualizar el categoria:', error);
      res.json({ message: 'Ocurrió un error al actualizar el categoria' });
  }
};

module.exports = {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
};
