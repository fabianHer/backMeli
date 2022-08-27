require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );


//Rutas
app.use( '/api/buscar', require('./routes/busquedas') );
app.use( '/api/detalleProducto', require('./routes/detalleProducto') );


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});