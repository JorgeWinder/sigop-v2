const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listProducto(id, text){
  return new Promise(function(resolver, rechazar){

    resolver(store.list(id, text))
    
  })
}

  
function addProducto(producto){

  return new Promise(async function(resolver, rechazar){

    const {nombre_producto, categoria, origen, color, unidad, medidas, precioMin, precioMax, stockMin} = producto
    
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
        categoria: categoria,
        origen: origen,
        color: color,
        unidad: unidad,
        descrip_unidad: medidas,
        precioMin: precioMin ,
        precioMax: precioMax,
        stockMin: stockMin,
        fecha_registro: config.DATE
    }

    store.add(nuevoProdcuto)
    resolver(nuevoProdcuto) 

  })
  
}

function updateProducto(id, datos_producto){

  return new Promise(function(resolver, rechazar){

    if(!id){
      rechazar('Datos invalidos')
      return false
    }

    resolver(store.update(id, datos_producto))

  })

}

module.exports = {
    listProducto,
    addProducto,
    updateProducto
}