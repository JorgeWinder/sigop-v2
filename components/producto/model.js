const mongoose = require('mongoose')
const Schema = mongoose.Schema



const mySchema = new Schema({

    _id: {
        type: String,
        unique: true,
        index: true
    },
    familia: { type: String, ref: 'familias'},
    origen: { type: String, ref: 'origenes'},
    color: { type: String, ref: 'colores'},
    adt1: { type: String, ref: 'adt1s'},
    adt2: { type: String, ref: 'adt2s'},
    adt3: { type: String, ref: 'adt3s'},
    nombre_producto: String,
    fecha_registro: Date

})



const model = mongoose.model('productos', mySchema)
module.exports = model

// https://stackoverflow.com/questions/14199529/mongoose-find-modify-save


