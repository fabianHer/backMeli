const { response } = require('express');
const fetch = require('node-fetch');

const getTodo = async(req , res = response ) => {
    const busqueda = req.params.busqueda;
    const categories =[];
    const items = [];

   fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`)
  .then(response => response.json())
  .then(data => {

    /** Procesar los datos **/

    const respuesta = data.results
    respuesta.forEach(element => {
        categories.push(element.category_id)        
    });
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
   

    const datosRespuesta =[{
        author: { 
            name: process.env.NAME, 
            lastname: process.env.LASTNAME         
        },
        categories: categories.slice(0, 4),
        items: items.slice(0, 4)
    }];
    res.json({
        datosRespuesta,
        ok: true
    })
  })
  .catch(error => console.log('error:', error));  

}

module.exports = {
    getTodo
}

