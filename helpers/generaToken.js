const jwt = require('jsonwebtoken');


const generarJWT = ( userid, rol )=> {

    return new Promise ( (resolve, reject ) =>{

        const payload = { userid, rol };

        jwt.sign( payload, process.env.JWTSECRETKEY, {
            expiresIn: '24h'
        }, (err, token) =>{
            if (err){
                console.log(err);
                reject( 'No se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    })
}

const validarToken = async(token) =>{
    try {
        return jwt.verify( token, process.env.JWTSECRETKEY)
    } catch (error) {
        return null
    }
}

module.exports = {
    generarJWT,
    validarToken
}