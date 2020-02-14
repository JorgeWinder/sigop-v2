const store = require('./store')


function listUnidad(){
  return new Promise(function(resolver, rechazar){

    resolver(store.list())
    
  })
}


module.exports = {
  listUnidad
}