const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    dni: String,
    nombres: String,
    apellidos: String,
    password: String, 
    fecha_reg: Date,
})


const model = mongoose.model('trabajadores', mySchema)
module.exports = model
