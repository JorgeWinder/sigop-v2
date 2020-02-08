const model = require('./model')

// Listar datos //

async function listOrigen(id){

    return new Promise( async(resolver, rechazar)=>{
        //return list
            let filter = {}

            if(id){
                filter._id = id
            }

            resolver(model.find(filter))

    })
    
}


module.exports = {
    listOrigen
}
