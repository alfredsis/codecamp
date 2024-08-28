const {sequelize} = require('../db');
const { sql } = require('@sequelize/core');
const { encrypt, comparar } = require('../helpers/handleBcrypt');
const { generarJWT } = require('../helpers/generaToken');





const getUsuarios = async(req, res) => {
    

    try {
        
    const [usuarios] = await sequelize.query(sql`SELECT * FROM Usuarios`);
    res.json(usuarios);
    

    } catch(error){
        console.log('Error al obtener usuarios ', error);
        res.json({ message: 'Ocurrio un error al obtener las usuarios'})
    }

};





const getUsuarioById = async (req, res) => {
  try {
      const { id } = req.params;

      const [usuario] = await sequelize.query(sql`SELECT * FROM Usuarios WHERE idusuarios = ${id}`);

      if (usuario.length > 0) {
          res.json(usuario[0]);
      } else {
          res.json({ message: 'usuario no encontrado' });
      }

  } catch (error) {
      console.log('Error al obtener el usuario:', error);
      res.json({ message: 'Ocurrio un error al procesar la solicitud' });
  }
};




const createUsuarios = async(req, res) => {

    try {
        const {
            idusuarios, 
            rol_idrol, 
            estados_idestados, 
            correo_electronico, 
            nombre_completo, 
            password, 
            telefono, 
            fecha_nacimiento            
          } = req.body;
          
          const fecha_creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
          const passwordHash = await encrypt(password)
        
          const result = await sequelize.query(sql`
            EXEC insertarUsuarios
            ${idusuarios},
            ${rol_idrol},
            ${estados_idestados},
            ${correo_electronico},
            ${nombre_completo},
            ${passwordHash},
            ${telefono},
            ${fecha_nacimiento},
            ${fecha_creacion}
          `);

      
        res.send('Usuario creado exitosamente');


      } catch (error) {
        console.log('Error al crear el usuario: ', error);  
        res.send('Error al crear el usuario');
      }


};

const updateUsuarios = async(req, res) => {

  try {
  
    const id = req.params.id;
    
    const {
        
        rol_idrol, 
        estados_idestados, 
        correo_electronico, 
        nombre_completo, 
        password, 
        telefono, 
        fecha_nacimiento,
        fecha_creacion     
      } = req.body;      
          
      const [getPassword] = await sequelize.query(sql`
        SELECT password FROM Usuarios WHERE idusuarios = ${id}
      `);

      const pass = getPassword[0].password;

      const comparePassword = await comparar(password, pass );



      console.log("son iguales? ",comparePassword);

      

      const result = await sequelize.query(sql`
            EXEC actualizarUsuarios
            ${id},
            ${rol_idrol},
            ${estados_idestados},
            ${correo_electronico},
            ${nombre_completo},
            ${password},
            ${telefono},
            ${fecha_nacimiento},
            ${fecha_creacion}
          `);
      
   
      if (result[1] > 0) { 
        res.json({ message: 'Usuario actualizado' });
    } else {
        res.json({ message: 'Usuario no encontrado' });
    }


    } catch (error) {
      console.log('Error al actualizar el Usuario:', error);
      res.json({ message: 'Ocurrió un error al actualizar el Usuario' });
  }
};


const loginUsuario = async(req, res) => {

    try {
        const {            
            correo_electronico,             
            password            
          } = req.body;
          
          if (!correo_electronico || !password) {       // Valida que se envie el correo y contraseña
            return res.status(400).json({ message: 'Correo electronico y contraseña son obligatorios' });
        }
        
          const [usuarios] = await sequelize.query(sql`SELECT idusuarios, rol_idrol, password FROM USUARIOS WHERE ${correo_electronico} = correo_electronico
          `);
          
          if (usuarios.length === 0) {     //Valida si se encontro el usuario
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuario = usuarios[0];
        const validarPassword = await comparar(password, usuario.password);

        if (!validarPassword){
            return res.status(400).json({
                message: 'La contraseña no es correcta'
            });
        }

        const token = await generarJWT( usuario.idusuarios, usuario.rol_idrol);        
        
        res.json({
            usuario,
            token
        });
        console.log(validarPassword);
        

      } catch (error) {
       
        res.send('Error al buscar');
      }


};



module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuarios,
    updateUsuarios,
    loginUsuario
};
