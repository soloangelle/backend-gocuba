const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// GET products
router.get('/products', productController.getProducts);
 
// GET product by id




module.exports = router;