const model = require('./model')

// Agregar producto //
function addProducto(producto){

    const NuevoProducto = new model(producto)
    NuevoProducto.save()     

}

module.exports = {
    add: addProducto
}
