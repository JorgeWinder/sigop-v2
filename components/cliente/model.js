const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({

    _id: {
        type: Number,
        // unique: true,
        // index: true
    },
    nombre: String,
    direccion: String,
    correo: String,
    telefono: String,
    departamento: { type: Number, ref: 'ubigeos', field: 'departamentoId'},
    provincia: { type: Number, ref: 'ubigeos', field: 'provinciaId'},
    distrito: { type: Number, ref: 'ubigeos', field: 'distritoId'},
    nombresContacto: String,
    correoContacto: String,
    telefonoContacto: String,
    fecha_registro: Date
})

mySchema.index({nombre_producto: 'text'})

const model = mongoose.model('clientes', mySchema)
module.exports = model


// https://github.com/Automattic/mongoose/issues/3225
// https://stackoverflow.com/questions/18867628/mongoose-deep-population-populate-a-populated-field


