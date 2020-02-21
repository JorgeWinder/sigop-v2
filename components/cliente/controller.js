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

    const {nro_doc, nombre, direccion, correo, telefono, departamento, provincia, distrito , nombres_contacto , correoContacto, telefonoContacto} = cliente
    
    if(nro_doc==''){
      rechazar('No existe datos')
      return false
    }

    // Insertar nnuevo producto
    
    const nuevoCliente = {
        _id: nro_doc,
        nombre: nombre ,
        direccion: direccion,
        correo: correo,
        telefono: telefono,
        departamento: departamento,
        provincia: provincia,
        distrito: distrito ,
        nombresContacto: nombres_contacto,
        correoContacto: correoContacto,
        telefonoContacto: telefonoContacto,
        fecha_registro: config.DATE
    }

    store.add(nuevoCliente)
    resolver(nuevoCliente) 

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
    listCliente,
    addCliente,
    updateProducto
}