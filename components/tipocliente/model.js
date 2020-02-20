const mongoose = require('mongoose')
const Schema = mongoose.Schema

//const textSearch = require('mongoose-text-search')

const mySchema = new Schema({

    _id: {
        type: Number,
    },
    nombre: String

})

const model = mongoose.model('tipoclientes', mySchema)
module.exports = model

// https://stackoverflow.com/questions/14199529/mongoose-find-modify-save


