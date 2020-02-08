const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listCategoria(id){
  return new Promise(function(resolver, rechazar){

    resolver(store.listCategoria(id))
    
  })
}


module.exports = {
    listCategoria
}