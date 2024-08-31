const {sequelize} = require('../db');
const { sql } = require('@sequelize/core');
const { validarToken } = require('../helpers/generaToken');



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
             
            nombre, 
            estados_idestados,
          
          } = req.body;

          const token = req.headers.authorization.split(' ').pop();
          const {userid} = await validarToken(token);
        
          const result = await sequelize.query(sql`
            EXEC insertarCategoriaProductos            
            ${userid},
            ${nombre},           
            ${estados_idestados !== undefined ? estados_idestados : null}           
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
       
        nombre, 
        estados_idestados,
       
      } = req.body;

      const token = req.headers.authorization.split(' ').pop();
      const {userid} = await validarToken(token);
    
      const result = await sequelize.query(sql`
        EXEC actualizarCategoriaProductos
            ${id},
            ${userid},
            ${nombre !== undefined ? nombre : null},        
            ${estados_idestados !== undefined ? estados_idestados : null}      
           
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
