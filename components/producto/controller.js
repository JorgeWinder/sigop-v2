const store = require('./store')
  
function addProducto(nombre_producto, fecha_registro){

  return new Promise( function(resolver, rechazar){

    if(nombre_producto==''){
      rechazar('No existe datos')
      return false
    }

    const nuevoProdcuto = {
        nombre_producto: nombre_producto,
        fecha_registro: new Date()
    }

    store.add(nuevoProdcuto)
    resolver(nuevoProdcuto) 

  })
  
}

module.exports = {
    addProducto
}