const mongoose = require('mongoose')
const Schema = mongoose.Schema

const modelCounter = require('../counter/model')

const getIdSchema = function (campo) {

    return new Promise((resolver, rechazar)=>{

        modelCounter.updateOne({ _id: campo},{ $inc: { seq: 1} }, function(err, numberAffected, rawResponse) {          
            console.log(numberAffected)            
            resolver(modelCounter.find({ _id: campo})) 
            return modelCounter.find({ _id: campo})
         })

    })


}

let idtabla = 0

getIdSchema('productoid')
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


