require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(' \x1b[35m Conectado a la base de datos \x1b[37m');
        app.listen(process.env.SERVER_PORT, () => {
            console.log(` \x1b[36m Servidor funcionando en el puerto ${process.env.SERVER_PORT} \x1b[37m`);
        });
    })
    .catch(error => console.log(error));



