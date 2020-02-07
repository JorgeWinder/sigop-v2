const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema1 = new Schema({
    _id: String,
    nombre: String,
})

const model = mongoose.model('categorias', mySchema1)

//----------------------------------------------


const mySchema2 = new Schema({
    _id: String,
    nombre: String,
})

const model2 = mongoose.model('origenes', mySchema2)




const mySchema3 = new Schema({
    _id: String,
    nombre: String,
})

const model3 = mongoose.model('colores', mySchema3)


module.exports = { 
    model,
    model2,
    model3
}