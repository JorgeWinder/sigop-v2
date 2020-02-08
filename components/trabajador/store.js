const model = require('./model')

// Agregar datos //
function addTrabajador(tranajador){
    const objUser = new model(tranajador)
    objUser.save()     
}

// Listar datos //
async function getUser(filteruser){

    return new Promise( async(resolver, rechazar)=>{
        //return list
            let filter = {}
            console.log(filteruser)

            if(filteruser !== null){
                // filter = {message: 'mensaje para ref user v2'}
                filter = { user: filteruser}
            }

            resolver(model.find())

    })
    
}


async function updateUser(id, name){
    const find_user = await model.findOne({_id: id})
    find_user.name = name
    return find_user.save()
}

async function deleteUser(id){
    return await model.deleteOne({_id: id})
}

module.exports = {
    add: addTrabajador,
    List: getUser,
    update: updateUser,
    delete: deleteUser
}
