const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    _id: String,
    nombre: String,
})

const model = mongoose.model('adt1', mySchema)



module.exports = model