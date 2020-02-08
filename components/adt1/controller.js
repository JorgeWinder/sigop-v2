const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listAdt1(id){
  return new Promise(function(resolver, rechazar){

    resolver(store.listAdt1(id))
    
  })
}


module.exports = {
  listAdt1
}