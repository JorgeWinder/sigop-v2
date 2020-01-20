  const store = require('./store')
  
  function addUser(name){

    return new Promise( function(resolver, rechazar){

      if(name==''){
        rechazar('No existe nombre')
        return false
      }

      const nuevoUser = {
        name: name,
        date: new Date()
      }

      store.add(nuevoUser)
      resolver(nuevoUser) 

    })
    
  }

  function getUser(filter){
      return new Promise((resolver, rechazar)=>{
          resolver(store.List(filter))
      })
  }

  function updateMensaje(id, mensaje){

    return new Promise((resolver, rechazar)=>{

      if(!id || !mensaje){
        rechazar('Datos invalidos')
        return false
      }

      return resolver(store.update(id, mensaje))

    })

  }

  function updateUser(id, name){

    return new Promise((resolver, rechazar)=>{

      if(!id || !name){
        rechazar('Datos invalidos')
        return false
      }

      return resolver(store.update(id, name))

    })

  }
  

  function deleteUser(id){
    return new Promise((resolver, rechazar)=>{

        if(!id){
          rechazar('Id invalido')
          return false
        }

        store.delete(id)
        .then((data)=>{
          resolver()
        })
        .catch((data)=>{
          rechazar()
        })
      

    })
  }

  module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser
  }