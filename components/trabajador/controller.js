const store = require('./store')
  
function addTrabajador(dni, nombres, apellidos, password){

  return new Promise( function(resolver, rechazar){

    if(nombres==''){
      rechazar('No existe datos')
      return false
    }

    const nuevoTrabajador = {
        dni: dni,
        nombres: nombres,
        apellidos: apellidos,
        password: password,
        fecha_reg: new Date()
    }

    store.add(nuevoTrabajador)
    resolver(nuevoTrabajador) 

  })
  
}

module.exports = {
    addTrabajador
}