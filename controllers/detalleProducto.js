/*
 controlador detalle de producto
 */
const fetch = require('node-fetch');

//consulta detalle de producto seleccionado y retorna la respuesta
const getDetalleProducto = async(idProducto ) => {

    return fetch(`https://api.mercadolibre.com/items/${idProducto}`)
    .then(response => response.json())   
    .catch(error => console.log('error:', error));   

}
//consulta la descripción del producto seleccionado y retorna la respuesta
const getDescripcion = async(idProducto) => {    

  return fetch(`https://api.mercadolibre.com/items/${idProducto}/description`)
    .then(response => response.json())
    .catch(error => console.log('error:', error));   

}


module.exports = {
    getDetalleProducto,
    getDescripcion
}

