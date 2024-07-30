
const Product = require('../models/product.model');
const Type = require('../models/type.model');

async function getProducts(req, res) {
    try { 
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 9;

        const filter = {};

        if (req.query.type) {
            const type = await Type.findOne({ name: req.query.type });
            if (!type) {
                return res.status(404).send({
                    ok: false,
                    message: 'Tipo de producto no encontrado'
                });
            }
            filter.type = type._id;
        }

        const products = await Product.find(filter)
                                      .populate('type', 'description')
                                      .populate('location', 'name')
                                      .skip(page * limit)
                                      .limit(limit);

        const total = await Product.countDocuments(filter);

        res.status(200).send({
            ok: true,
            message: 'Productos obtenidos correctamente',
            products,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener los productos'
        });
    }
}


async function getProductById(req, res) {
    try {
        const id = req.params.id;

        const product = await Product.findById(id).populate('type', 'name')
                                                  .populate('location', 'name');

        if(!product){
            return res.status(404).send({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).send({
            ok: true,
            message: 'Producto obtenido correctamente',
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener el producto'
        });
    }
}

// Crear un nuevo producto
async function postProduct(req, res) {
    try {

        
        const product = new Product(req.body);

        if(req.file?.filename){
            product.image = req.file.filename;
        }
        if(req.file?.filename){
            product.imageFront = req.file.filename;
        }

        const newProduct = await product.save();

        res.status(201).send({
            ok: true,            
            message: 'Producto creado correctamente',
            product: newProduct    
        });
      
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al crear el producto',
        });
        
    }
}

async function deleteProduct(req, res) {  
    try {
        const id = req.params.id;

        const deleteProduct = await Product.findByIdAndDelete(id);
        
        

        if(!deleteProduct){
            return res.status(404).send({
                ok: false,
                message: 'Producto no encontrado'
            });
        }
        console.log(deleteProduct);
        res.status(200).send({
            ok: true,
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al eliminar el producto'
        });
        
    }
}

async function putProduct(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;

        console.log(req.file);

        if(req.file?.filename){
            data.image = req.file.filename;
        } else {
            delete data.image;
        }

        if(req.file?.filename){
            data.imageFront = req.file.filename;
        } else {
            delete data.imageFront;
        }

        data.updatedAt = Date.now();

        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        if(!product){
            return res.status(404).send({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).send({
            ok: true,
            message: 'Producto actualizado correctamente',
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al actualizar el producto'
        });
        
    }
}
module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    postProduct,
    putProduct
}
