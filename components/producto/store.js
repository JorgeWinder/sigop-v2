const model = require('./model')

// Listar prodcutos //

async function listProducto(id, text){

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
        .populate({path:'categoria',select: 'nombre -_id'})
        .populate('origen')
        .populate('color')
        .populate('unidad')
        .exec((error, populate)=>{
            if(error){                
                rechazar("Populado en listado de producto ==> " + error)                
            }
           resolver(populate)
            
        })


    })

}


// Agregar producto //
function addProducto(producto){

    const NuevoProducto = new model(producto)
    NuevoProducto.save()     

}

// Modificar producto //

async function updateProducto(id, producto){

    const {nombre, categoria, origen, color, adt1, adt2, adt3} = producto

    const doc_producto = await model.findOne({_id: id})
    doc_producto.nombre_producto= nombre
    doc_producto.categoria = categoria
    doc_producto.origen = origen
    doc_producto.color = color
    doc_producto.adt1 = adt1
    doc_producto.adt2 = adt2
    doc_producto.adt3 = adt3

    return doc_producto.save()
    
}

// Eliminar producto //

async function deleteProducto(id){

    const doc_producto = await model.deleteOne({_id: id})
}

module.exports = {
    list: listProducto,
    add: addProducto,
    update: updateProducto
}
