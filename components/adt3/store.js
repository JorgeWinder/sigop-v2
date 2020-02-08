const model = require('./model')

// Listar datos //
async function listAdt3(id){

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
    listAdt3
}
