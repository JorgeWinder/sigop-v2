const model = require('./model')


// Listar datos //
async function listUnidad(){

    return new Promise( async(resolver, rechazar)=>{
        //return list
            resolver(model.find())

    })
    
}


module.exports = {
    list: listUnidad
}
