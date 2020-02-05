const mongoose = require('mongoose')
const Schema = mongoose.Schema



const modelCounter = require('../counter/model')
const mongo = require('../../utils/database/mongo')

let idtabla = 0

mongo.getIdSchema(modelCounter, 'productoid')
.then((data)=>{
    console.log(data[0])
    idtabla = data[0].seq
})
.catch((e)=>{
    console.log(e)
})





const mySchema = new Schema({

    _id: {
        type: String,
        default: idtabla
    },
    nombre_producto: String,
    fecha_registro: Date

})



const model = mongoose.model('producto', mySchema)
module.exports = model

// https://stackoverflow.com/questions/14199529/mongoose-find-modify-save


