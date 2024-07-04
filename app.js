const express = require('express');
const app = express();

const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes');

app.use(express.json());

app.use("/api",[
    user_routes,product_routes]);

module.exports = app;