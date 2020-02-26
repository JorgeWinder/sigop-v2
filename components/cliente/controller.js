const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listCliente(id, text){
  return new Promise(function(resolver, rechazar){

    resolver(store.list(id, text))
    
  })
}

  
function addCliente(cliente){

  return new Promise(async function(resolver, rechazar){

    const {nro_doc, tipoCliente, nombre, direccion, correo, telefono, distrito, nombres_contacto , correoContacto, telefonoContacto} = cliente
    
    if(nro_doc==''){
      rechazar('No existe datos')
      return false
    }

    // Insertar nnuevo producto
    
    const nuevoCliente = {
        _id: nro_doc,
        tipoCliente: tipoCliente,
        nombre: nombre.toUpperCase() ,
        direccion: direccion.toUpperCase(),
        correo: correo.toUpperCase(),
        telefono: telefono,
        ubigeo: distrito,
        nombresContacto: nombres_contacto.toUpperCase(),
        correoContacto: correoContacto.toUpperCase(),
        telefonoContacto: telefonoContacto,
        fecha_registro: config.DATE
    }

    store.add(nuevoCliente)
    resolver(nuevoCliente) 

  })
  
}

function updateProducto(id, datos_cliente){

  return new Promise(function(resolver, rechazar){

    if(!id){
      rechazar('Datos invalido')
      return false
    }

    resolver(store.update(id, datos_cliente))

  })

}

module.exports = {
    listCliente,
    addCliente,
    updateProducto
}