/*
    ruta: api/detalleProducto/
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { getDetalleProducto, getDescripcion } = require('../controllers/detalleProducto');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
/*Se consulta el detalle del producto y con la respuesta se consulta su descripción 
luego arma la respuesta y la retorna
*/
router.get('/:id/',
//check('id','El id del producto es necesario').not().isEmpty(),
//validarCampos, 
async function(req, res, next) {

    const idProducto = req.params.id;
    let respuesta = await getDetalleProducto(idProducto);
    let respuestaDescripcion = await getDescripcion(idProducto);
   
    const datosRespuesta= { 
        author: { 
            name: process.env.NAME, 
            lastname: process.env.LASTNAME         
        },
        items: {
            id: respuesta.id,
            title: respuesta.title,
            price: { currency: respuesta.price, amount: '', decimals: '' },
            picture: respuesta.thumbnail,
            condition: respuesta.condition,
            sold_quantity: respuesta.sold_quantity,
            description: respuestaDescripcion.plain_text
        }
    };

     res.status(200).json({
        datosRespuesta,
        ok: true
    })
}
     );

module.exports = router;