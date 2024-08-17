const express = require('express');
const app = express();
const cors = require('cors');
const { rateLimit } = require ('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 25,
    message: {
        ok: false,
        message: "Ha excedido el numero de peticiones"
    }
})

app.use(limiter)

const api_routes = require('./routes/index');
const { message } = require('./validation/product.validation');
// Share public folder
app.use(express.static('public'));
// Middelewares
// CORS
app.use(cors());
// poder interpretar los datos que vienen en el body
app.use(express.json());

//Leer datos de un formulario
app.use(express.urlencoded({ extended: true }));

app.use('/api', api_routes);

module.exports = app;