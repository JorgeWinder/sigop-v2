const store = require('./store')

const config = require('../../config').config
const mongo_function = require('../../utils/database/mongo-function')


function listColor(id){
  return new Promise(function(resolver, rechazar){

    resolver(store.listColor(id))
    
  })
}


module.exports = {
  listColor
}