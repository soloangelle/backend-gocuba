const Type = require('../models/type.model');

async function getTypes(req, res) {
    try {
        
        const types =  await Type.find();

        if(types.length === 0) {
            return res.status(404).send({
                ok: false,
                message: 'No hay tipos de productos registrados'
            });
        }

        res.status(200).send({
            ok: true,
            message: 'Tipos obtenidos correctamente',
            types
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener los tipos de productos'
        });
    }
}

async function postType(req, res) {
    try {
        const type = new Type(req.body);
        const newType = await type.save();
        res.status(201).send({
            ok: true,
            message: 'Tipo creado correctamente',
            type: newType
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al crear el tipo de producto'
        });
    }

}

module.exports = {  
    getTypes,
    postType
};