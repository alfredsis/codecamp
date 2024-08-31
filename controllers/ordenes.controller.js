const {sequelize} = require('../db');
const { sql, QueryTypes } = require('@sequelize/core');
const { validarToken } = require('../helpers/generaToken');



const getOrdenes = async(req, res) => {    

    try {
        
    const [ordenes] = await sequelize.query(sql`SELECT * FROM Orden`);
    res.json(ordenes);
    console.log(ordenes);

    } catch(error){
        console.log('Error al obtener las ordenes ', error);
        res.status(500).json({ message: 'Ocurrio un error al obtener las ordenes'})
    }

};





const getOrdenById = async (req, res) => {
  try {
      const { id } = req.params;

      const [orden] = await sequelize.query(sql`SELECT * FROM Orden WHERE idOrden = ${id}`);

      if (orden.length > 0) {
          res.json(orden[0]);
      } else {
          res.json({ message: 'Orden no encontrado' });
      }

  } catch (error) {
      console.log('Error al obtener la orden:', error);
      res.status(500).json({ message: 'Ocurrio un error al procesar la solicitud' });
  }
};




const crearOrden = async(req, res) => {

    try {
      const {
        orden: {         
         
          nombre_completo, 
          direccion, 
          telefono, 
          correo_electronico, 
          fecha_entrega
        },
        detalles
      } = req.body;

      const token = req.headers.authorization.split(' ').pop();
      const {userid} = await validarToken(token);

      let total_orden = 0;

      for (const detalle of detalles) {
        const { productos_idProductos, cantidad } = detalle;

        // Consultar el precio del producto
        const [producto] = await sequelize.query(sql`
            SELECT precio
            FROM Productos
            WHERE idProductos = ${productos_idProductos}
        `, { type: QueryTypes.SELECT });

        const precio = producto.precio;
        total_orden += cantidad * precio;
    }



         
        
          const [insertarOrden] = await sequelize.query(sql`
            EXEC insertarOrden
           
            ${userid}, 
            ${estados_idestados=4},             
            ${nombre_completo}, 
            ${direccion}, 
            ${telefono}, 
            ${correo_electronico}, 
            ${fecha_entrega}, 
            ${total_orden}
          `, { type:QueryTypes.SELECT });          
       

          const idOrdenNuevo = insertarOrden.idOrden;

          for (const detalle of detalles) {
            const { productos_idProductos, cantidad} = detalle;

            const [producto] = await sequelize.query(sql`
              SELECT precio
              FROM Productos
              WHERE idProductos = ${productos_idProductos}
          `, { type: QueryTypes.SELECT });

             

          const precio = producto.precio;

      
            
            const intertarOrdenDetalle = await sequelize.query(sql`
              EXEC insertarOrdenDetalles              
              ${idOrdenNuevo},           
              ${productos_idProductos}, 
              ${cantidad}, 
              ${precio}, 
              ${cantidad * precio} 
            `);        
             
        }

        
          res.status(201).send('Orden creada exitosamente');
      } catch (error) {
        console.log('Error al crear la orden: ', error);
    
        
        res.status(500).send('Error al crear la orden');
      }


};

const updateOrden = async(req, res) => {
  try {
  
    const id = req.params.id;
    
    const {
      orden: {
          estados_idestados,                   
          nombre_completo, 
          direccion, 
          telefono, 
          correo_electronico, 
          fecha_entrega
      }
  } = req.body;     

  const token = req.headers.authorization.split(' ').pop();
  const {userid} = await validarToken(token);

  const [orden] = await sequelize.query(sql`SELECT total_orden FROM Orden WHERE idOrden = ${id}`);



  const insertarOrden = await sequelize.query(sql`
    EXEC actualizarOrden
    ${id}, 
    ${userid}, 
    ${estados_idestados !== undefined ? estados_idestados : 4},   
    ${nombre_completo}, 
    ${direccion}, 
    ${telefono}, 
    ${correo_electronico}, 
    ${fecha_entrega}, 
    ${orden[0].total_orden}
   
  `);
  res.status(201).send('Orden actualizada exitosamente');
  
    } catch (error) {
      console.log('Error al actualizar la orden:', error);
      res.status(500).json({ message: 'Ocurrió un error al actualizar la orden' });
  }
};

module.exports = {
    getOrdenes,
    getOrdenById,
    crearOrden,   
    updateOrden
};
