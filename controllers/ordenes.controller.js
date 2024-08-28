const {sequelize} = require('../db');
const { sql } = require('@sequelize/core');



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
          idOrden, 
          usuarios_idusuarios, 
          estados_idestados, 
          nombre_completo, 
          direccion, 
          telefono, 
          correo_electronico, 
          fecha_entrega
        },
        detalles
      } = req.body;

          const fecha_creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
          const total_orden = detalles.reduce((acc, detalle) => acc + detalle.cantidad * detalle.precio, 0);
        
          const insertarOrden = await sequelize.query(sql`
            EXEC insertarOrden
            ${idOrden}, 
            ${usuarios_idusuarios}, 
            ${estados_idestados}, 
            ${fecha_creacion}, 
            ${nombre_completo}, 
            ${direccion}, 
            ${telefono}, 
            ${correo_electronico}, 
            ${fecha_entrega}, 
            ${total_orden}
          `);

          for (const detalle of detalles) {
            const { idOrdenDetalles, productos_idProductos, cantidad, precio } = detalle;
            
            const intertarOrdenDetalle = await sequelize.query(sql`
              EXEC insertarOrdenDetalles
              ${idOrdenDetalles}, 
              ${idOrden},    
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
          idOrden, 
          usuarios_idusuarios, 
          estados_idestados, 
          nombre_completo, 
          direccion, 
          telefono, 
          correo_electronico, 
          fecha_entrega
      }
  } = req.body;     

  const [orden] = await sequelize.query(sql`SELECT total_orden FROM Orden WHERE idOrden = ${id}`);

  const fecha_creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const insertarOrden = await sequelize.query(sql`
    EXEC actualizarOrden
    ${idOrden}, 
    ${usuarios_idusuarios}, 
    ${estados_idestados}, 
    ${fecha_creacion}, 
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
