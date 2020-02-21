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

        await model.find(filter)
        .populate('departamento', '-_id -provinciaId -nombreProvincia -distritoId -nombreDistrito')
        .exec((error, populate)=>{
            if(error){                
                rechazar("Populado en listado de clientes ==> " + error)                
            }
           resolver(populate)
            
        })


    })

}


// Agregar producto //
function addCliente(producto){

    const NuevoProducto = new model(producto)
    NuevoProducto.save()     

}

// Modificar producto //

async function updateProducto(id, producto){

    const {nombre_producto, categoria, origen, color, medidas, precioMin, precioMax, stockMin, especificacion} = producto

    const doc_producto = await model.findOne({_id: id})
    doc_producto.nombre_producto= nombre_producto
    doc_producto.categoria = categoria
    doc_producto.origen = origen
    doc_producto.color = color
    doc_producto.descrip_unidad = medidas 
    doc_producto.precioMin = precioMin 
    doc_producto.precioMax = precioMax 
    doc_producto.stockMin = stockMin
    doc_producto.especificacion = especificacion
    
    return doc_producto.save()
    
}

// Eliminar producto //

async function deleteProducto(id){

    const doc_producto = await model.deleteOne({_id: id})
}

module.exports = {
    list: listCliente,
    add: addCliente,
    update: updateProducto
}
