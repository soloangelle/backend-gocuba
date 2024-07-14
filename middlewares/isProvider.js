function isProvider(req, res, next) {
    if(req.user?.role === 'PROVIDER_ROLE'){
        next();
        
    } else {
            return res.status(400).send({
                ok: false,
                message: 'No tienes permisos para realizar esta acción'
            })
    }      
}

module.exports = isProvider;