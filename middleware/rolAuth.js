const { validarToken } = require("../helpers/generaToken");


const validarRol = ( rol ) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await validarToken(token);
        const rolUser = tokenData.rol;
        if( rol == rolUser){
            next()
        } else {
            res.send({ error: 'Este usuario no tiene los permisos'})
        }
    } catch (error) {
        console.log(error);
        res.send({ error: 'Error al comprobar el permiso del usuario'})
    }
}



module.exports = {
    validarRol
}