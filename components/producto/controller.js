const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


  
function addProducto(nombre_producto){

  return new Promise(async function(resolver, rechazar){

    if(nombre_producto==''){
      rechazar('No existe datos')
      return false
    }

    // Extraer el id correlativo //
    await mongo_function.getIdSchema('productoid')
    .then((data)=>{
        mongo_function._id = data[0].seq
    })
    .catch((e)=>{
        console.log(e)
    })

    // Insertar nnuevo producto

    const nuevoProdcuto = {
        _id: mongo_function._id,
        nombre_producto: nombre_producto,
        fecha_registro: config.DATE
    }

    store.add(nuevoProdcuto)
    resolver(nuevoProdcuto) 

  })
  
}

module.exports = {
    addProducto
}