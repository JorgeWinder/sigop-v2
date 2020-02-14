const mongoose = require('mongoose')
const Schema = mongoose.Schema

//require('../../components/categoria/model')

const mySchema = new Schema({

    _id: {
        type: String
    },
    nombre: String

})



const model = mongoose.model('unidades', mySchema)
module.exports = model

// https://stackoverflow.com/questions/14199529/mongoose-find-modify-save


