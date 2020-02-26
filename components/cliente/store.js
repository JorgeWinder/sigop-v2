const model = require('./model')

// Listar prodcutos //

async function listCliente(id, text){

    return new Promise(async (resolver, rechazar)=>{

        if(text){

            //model.find({nombre_producto: { $regex: '.*' + text + '.*' } }).explain()

            resolver(
            model.find({$text: {$search: '\"' + text + '\"'}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
            .populate({path:'categoria',select: 'nombre -_id'})
            .populate('origen')
            .populate('color')
            .populate('unidad')
            )
        }

        const filter = {}

        if(id){
        filter._id = id
        }

        // .populate('categoria', 'nombre -_id') -> para mostar campos especificos de 
        // .populate({path:'categoria',select: 'nombre -_id'})
        // .populate('categoria origen') -> para seleccionar multiples campos a popular
        // .select('categoria origen') -> mostrar campos especificos
        // .populate('departamento', '-_id -provinciaId -nombreProvincia -distritoId -nombreDistrito')

        await model.find(filter)
        .populate('ubigeo')
        .exec((error, populate)=>{
            if(error){                
                rechazar("Populado en listado de clientes ==> " + error)                
            }
           resolver(populate)
            
        })


    })

}


// Agregar cliente //
function addCliente(producto){

    const NuevoProducto = new model(producto)
    NuevoProducto.save()     

}

// Modificar cliente //

async function updateCliente(id, cliente){

    const {tipoCliente, nombre, direccion, correo, telefono, distrito, nombres_contacto , correoContacto, telefonoContacto} = cliente

    const doc_cliente = await model.findOne({_id: id})
    doc_cliente.tipoCliente= tipoCliente
    doc_cliente.nombre = nombre.toUpperCase()
    doc_cliente.direccion = direccion.toUpperCase()
    doc_cliente.correo = correo.toUpperCase()
    doc_cliente.ubigeo = distrito 
    doc_cliente.telefono = telefono 
    doc_cliente.nombres_contacto = nombres_contacto.toUpperCase()
    doc_cliente.correoContacto = correoContacto.toUpperCase()
    doc_cliente.telefonoContacto = telefonoContacto
    
    return doc_cliente.save()
    
}

// Eliminar producto //

async function deleteCliente(id){

    const doc_producto = await model.deleteOne({_id: id})
}

module.exports = {
    list: listCliente,
    add: addCliente,
    update: updateCliente,
    delete: deleteCliente
}
