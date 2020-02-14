const model = require('./model')


// Listar datos //
async function listColor(id){

    return new Promise( async(resolver, rechazar)=>{
        //return list
            let filter = {}

            if(id){
                filter._id = id
            }

            resolver(model.find(filter).sort({nombre: 1}))

    })
    
}


module.exports = {
    listColor
}
