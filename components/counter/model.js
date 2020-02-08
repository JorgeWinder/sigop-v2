const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({

    _id: {
        type: String,
    },
    seq: Number,

})

const model = mongoose.model('counters', mySchema)

module.exports = model