const model = require('./model')

// Listar prodcutos //

async function listTipoCliente(id){

    return new Promise(async (resolver, rechazar)=>{

        let filter = {}

        if(id){
            filter._id = id
        }

        resolver(model.find(filter).sort({nombre: 1}))

    })

}


module.exports = {
    list: listTipoCliente
}
