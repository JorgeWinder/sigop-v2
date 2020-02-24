const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    _id: Number,
    nombre: String,
})

const model = mongoose.model('colores', mySchema)



module.exports = model