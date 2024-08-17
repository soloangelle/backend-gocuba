const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
//Middleware para controlar acciones de los usuarios
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const isAdminOrProvider = require('../middlewares/isAdminOrProvider');
const upload = require('../middlewares/upload');
const productValidation = require('../middlewares/validateProduct')

router.get('/products', productController.getProducts); 
router.get('/products/:id', productController.getProductById);

// - Rutas que solo puede usar o consumir un usuario autenticado
router.post('/products',auth, isAdminOrProvider, upload, productValidation.validateProduct, productController.postProduct);
router.delete('/products/:id',[auth, isAdmin], productController.deleteProduct);
router.put('/products/:id',[auth, isAdminOrProvider, upload], productController.putProduct);

module.exports = router;