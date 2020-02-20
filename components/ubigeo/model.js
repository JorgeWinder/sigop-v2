const mongoose = require('mongoose')
const Schema = mongoose.Schema

//const textSearch = require('mongoose-text-search')

const mySchema = new Schema({

    _id: {
        type: Number,
    },
    departamentoId: Number,
    nombreDepartamento: String,
    provinciaId: Number,
    nombreProvincia: String,
    distritoId: Number,
    nombreDistrito: String

}, { collation: { locale: 'es', strength: 1 } })

const model = mongoose.model('ubigeos', mySchema)
module.exports = model

