const Category = require('../models/category.model');

async function getCategories(req, res) {
    try {
        console.log('getCategories');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener las categorias'
        });
    }
}

async function postCategory(req, res) {
    try {
        const category = new Category(req.body);
        const newCategory = await category.save();
        res.status(201).send({
            ok: true,
            message: 'Categoria creada correctamente',
            category: newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al crear la categoria'
        });
    }

}

module.exports = {  
    getCategories,
    postCategory
};