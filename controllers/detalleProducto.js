const fetch = require('node-fetch');

const getDetalleProducto = async(idProducto ) => {

    return fetch(`https://api.mercadolibre.com/items/${idProducto}`)
    .then(response => response.json())   
    .catch(error => console.log('error:', error));   

}
const getDescripcion = async(idProducto) => {    

  return fetch(`https://api.mercadolibre.com/items/${idProducto}/description`)
    .then(response => response.json())
    .catch(error => console.log('error:', error));   

}


module.exports = {
    getDetalleProducto,
    getDescripcion
}

