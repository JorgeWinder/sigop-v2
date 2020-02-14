const mongoose = require('mongoose')
const Schema = mongoose.Schema

//require('../../components/categoria/model')

const mySchema = new Schema({

    _id: {
        type: Number,
        // unique: true,
        // index: true
    },
    categoria: { type: String, ref: 'categorias'},
    origen: { type: String, ref: 'origenes'},
    color: { type: String, ref: 'colores'},
    unidad: { type: String, ref: 'unidades'},
    descrip_unidad: String,
    nombre_producto: String,
    precioMin : Number,
    precioMax : Number,
    stockMin  : Number,
    fecha_registro: Date

})



const model = mongoose.model('productos', mySchema)
module.exports = model

// https://stackoverflow.com/questions/14199529/mongoose-find-modify-save


