const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../../components/categoria/model')

const mySchema = new Schema({

    _id: {
        type: Number,
        // unique: true,
        // index: true
    },
    categoria: { type: String, ref: 'categorias'},
    origen: { type: String, ref: 'origenes'},
    color: { type: String, ref: 'colores'},
    adt1: { type: String, ref: 'adt1'},
    adt2: { type: Number, ref: 'adt2'},
    adt3: { type: String, ref: 'adt3'},
    nombre_producto: String,
    fecha_registro: Date

})



const model = mongoose.model('productos', mySchema)
module.exports = model

// https://stackoverflow.com/questions/14199529/mongoose-find-modify-save


