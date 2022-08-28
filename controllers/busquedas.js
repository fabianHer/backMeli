/** 
 controlador búsqueda de productos
 */

const { response } = require('express');
const fetch = require('node-fetch');


//Consulta lo productos según el parámetor
const getTodo = async(req , res = response ) => {
    const busqueda = req.params.busqueda;
    const categories =[];
    const items = [];

//consulta el Api
   fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`)
  .then(response => response.json())
  .then(data => {

    /** Procesar los datos **/

    const respuesta = data.results

    //Extrae las categorias y las inserta en un arreglo
    respuesta.forEach(element => {
        categories.push(element.category_id)        
    });

    //Extrae la información requeria y la inserta en un arreglo
    respuesta.forEach(element => {
        items.push(
            { 
                id: element.id,
                title: element.title,
                price: { currency: element.price, amount: element.installments.amount, decimals: element.installments.quantity },
                picture: element.thumbnail,
                condition: element.condition,
                free_shipping: element.shipping.free_shipping
            })        
    });
   
//Contruye la respuesta con las variables de entorno (nombre y apellido) y los arreglos anteriores
    const datosRespuesta =[{
        author: { 
            name: process.env.NAME, 
            lastname: process.env.LASTNAME         
        },
        categories: categories.slice(0, 4),
        items: items.slice(0, 4)
    }];

    res.status(200).json({
        datosRespuesta,
        ok: true
    })
  })
  .catch(error => console.log('error:', error));  

}

module.exports = {
    getTodo
}

