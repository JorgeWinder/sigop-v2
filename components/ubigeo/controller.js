const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listUbigeo(by, idDeparatamento, idProvincia){
  return new Promise(function(resolver, rechazar){

    if(!by){
      rechazar('Datos inválidos')
      return false
    }

    resolver(store.list(by, idDeparatamento, idProvincia))
    
  })
}


module.exports = {
  listUbigeo,
}