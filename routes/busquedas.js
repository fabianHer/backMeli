/*
    ruta: api/buscar/
*/

const { Router } = require('express');
const { getTodo } = require('../controllers/busquedas');


const router = Router();

//Ruta de búqueda de productos según el parámetro enviado
router.get('/:busqueda', getTodo );


module.exports = router;