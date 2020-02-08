const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listAdt2(id){
  return new Promise(function(resolver, rechazar){

    resolver(store.listAdt2(id))
    
  })
}


module.exports = {
  listAdt2
}