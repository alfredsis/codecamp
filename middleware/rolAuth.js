const { validarToken } = require("../helpers/generaToken");
const Roles = require('./roles');

const validarRol = ( rolesPermitidos ) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await validarToken(token);
        const rolUser = tokenData.rol;

      
        const rolesIds = rolesPermitidos.map(role => typeof role === 'string' ? Roles[role] : role);

        if (rolesIds.includes(rolUser)) {
            next();
        } else {
            res.status(403).send({ error: 'Este usuario no tiene los permisos' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al comprobar el permiso del usuario' });
    }
}



module.exports = {
    validarRol
}