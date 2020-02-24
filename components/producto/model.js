const mongoose = require('mongoose')
const Schema = mongoose.Schema

//const textSearch = require('mongoose-text-search')

const mySchema = new Schema({

    _id: {
        type: Number,
        // unique: true,
        // index: true
    },
    categoria: { type: String, ref: 'categorias'},
    origen: { type: String, ref: 'origenes'},
    color: { type: Number, ref: 'colores'},
    unidad: { type: String, ref: 'unidades'},
    descrip_unidad: String,
    nombre_producto: String,
    precioMin : Number,
    precioMax : Number,
    stockMin  : Number,
    especificacion: String,
    fecha_registro: Date

})

//mySchema.plugin(textSearch)
mySchema.index({nombre_producto: 'text'})



const model = mongoose.model('productos', mySchema)
module.exports = model

// https://stackoverflow.com/questions/14199529/mongoose-find-modify-save


