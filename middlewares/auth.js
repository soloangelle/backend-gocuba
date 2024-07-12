// Checkeamos si el usuario está autenticado, y vamos a corrobarar que tenga un token válido

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

function jwtVerify(req, res, next) {

    // const token = req.headers.authorization.split(' ')[1];
    const token = req.headers.authorization

    // Checkear si nos enviaron un token, si no lo enviaron, devolvemos un mensaje de error con un código 401
    if(!token) {
        return res.status(401).send({
        ok: false, 
        message: 'El token es requerido'
    
        })
    }

    jwt.verify(token, SECRET, (error, playload) => {

        if(error) {
            return res.status(401).send({
                ok: false,
                message: 'Token inválido o vencido'
            })
        }
        console.log(playload);
        req.user = playload.user;

        next();
        
    })
}

module.exports = jwtVerify;