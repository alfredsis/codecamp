const { validarToken } = require("../helpers/generaToken");


const checkAuth = async( req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await validarToken(token);
       
        if(tokenData.userid){
            next()
        } else {
            res.send({ error: 'No autorizado'})
        }
    } catch (error) {
        console.log(error);
        res.send({ error: 'Error, No autorizado'})
    }
}



module.exports = {
    checkAuth
}