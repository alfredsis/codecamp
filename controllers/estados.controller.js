const {sequelize} = require('../db');
const { sql } = require('@sequelize/core');



const getEstados = async(req, res) => {
    

    try {
        
    const [estados] = await sequelize.query(sql`SELECT * FROM Estados`);
    res.json(estados);
    console.log(estados);

    } catch(error){
        console.log('Error al obtener estados ', error);
        res.json({ message: 'Ocurrio un error al obtener los estados'})
    }

};





const getEstadoById = async (req, res) => {
  try {
      const { id } = req.params;

      const [estado] = await sequelize.query(sql`SELECT * FROM Estados WHERE idestados = ${id}`);

      if (estado.length > 0) {
          res.json(estado[0]);
      } else {
          res.json({ message: 'Estado no encontrado' });
      }

  } catch (error) {
      console.log('Error al obtener el estado:', error);
      res.json({ message: 'Ocurrio un error al procesar la solicitud' });
  }
};




const createEstado = async(req, res) => {

    try {
        const {
         
            nombre,
          } = req.body;
        
          const result = await sequelize.query(sql`
            insertarEstados     
            ${nombre}
          `);

        
        res.send('Estado creado exitosamente');
      } catch (error) {
        console.log('Error al crear estado: ', error);  
        
        res.send('Error al crear el estado');
      }


};

const updateEstado = async(req, res) => {

  try {
  
    const id = req.params.id;
    
    const { nombre } = req.body;
      const result = await sequelize.query(sql`
        EXEC actualizarEstados ${id}, ${nombre}`);
      
   
      if (result[1] > 0) { 
        res.json({ message: 'Estado actualizado' });
    } else {
        res.json({ message: 'Estado no encontrado' });
    }


    } catch (error) {
      console.log('Error al actualizar el Estado:', error);
      res.json({ message: 'Ocurrió un error al actualizar el Estado' });
  }
};

module.exports = {
    getEstados,
    getEstadoById,
    createEstado,
    updateEstado,
};
