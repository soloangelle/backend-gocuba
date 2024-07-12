//Este middleware se encarga de verificar si el usuario es administrador y se va a combinarse con el middleware de autenticación

function isAdmin(req, res, next) {
    if(req.user?.role === 'ADMIN_ROLE'){
        next();
        
    } else {
            return res.status(400).send({
                ok: false,
                message: 'No tienes permisos para realizar esta acción'
            })
    }      
}

module.exports = isAdmin;