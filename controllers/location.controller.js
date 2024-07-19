const Location = require('../models/location.model');


async function getLocations(req, res) {
    try {
        
        const locations =  await Location.find();

        if(locations.length === 0) {
            return res.status(404).send({
                ok: false,
                message: 'No hay ciudades registradas'
            });
        }

        res.status(200).send({
            ok: true,
            message: 'Localidad obtenidas correctamente',
            locations
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener las ciudades'
        });
    }

}

async function getLocationById(req, res) {
    try {
        const location = await Location.findById(req.params.id);

        if(!location) {
            return res.status(404).send({
                ok: false,
                message: 'Ciudad no encontrada'
            });
        }

        res.status(200).send({
            ok: true,
            message: 'Ciudad obtenida correctamente',
            location
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener la ciudad'
        });
    }
}

async function postLocation(req, res) {
    try {
        const location = new Location(req.body);
        const newLocation = await location.save();
        res.status(201).send({
            ok: true,
            message: 'Ciudad creada correctamente',
            type: newLocation
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al crear la ciudad'
        });
    }


}

module.exports = {  
    getLocations,
    getLocationById,
    postLocation
};