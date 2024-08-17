// Checkeamos si el usuario está autenticado, y vamos a corrobarar que tenga un token válido

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

function jwtVerify(req, res, next) {
    
    const token = req.headers.authorization

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
        req.user = playload.user;

        next();
        
    })
}

module.exports = jwtVerify;