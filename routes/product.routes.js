const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
//Middleware para controlar acciones de los usuarios
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const isProvider = require('../middlewares/isProvider');


// GET products
router.get('/products', productController.getProducts);
 
// GET product by id
router.get('/products/:id', productController.getProductById);

// - Rutas que solo puede usar o consumir un usuario autenticado

// POST product 
router.post('/products', auth, isAdmin,isProvider, productController.postProduct);

// DELETE product by id
router.delete('/products/:id',[auth, isAdmin], productController.deleteProduct);

// PUT product by id
router.put('/products/:id', auth, isAdmin,isProvider, productController.putProduct);




module.exports = router;