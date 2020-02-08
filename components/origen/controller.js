const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listOrigen(id){
  return new Promise(function(resolver, rechazar){

    resolver(store.listOrigen(id))
    
  })
}


module.exports = {
  listOrigen
}