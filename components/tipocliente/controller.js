const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listTipoCliente(id){
  return new Promise(function(resolver, rechazar){

    resolver(store.list(id))
    
  })
}


module.exports = {
  listTipoCliente,
}