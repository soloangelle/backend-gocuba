const express = require('express');
const router = express.Router();


const user_routes = require('./user.routes');
const product_routes= require('./product.routes');
const type_routes = require('./type.routes');

router.use([
    user_routes,
    product_routes, 
    type_routes
]);
    

module.exports = router;