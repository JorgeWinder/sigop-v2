const express = require('express')
const usuario = require('../components/usuario/network')
const auth = require('../components/auth/network')
const trabajador = require('../components/trabajador/network')
const producto = require('../components/producto/network')
const categoria = require('../components/categoria/network')
const origen = require('../components/origen/network')
const color = require('../components/color/network')
const adt1 = require('../components/adt1/network')
const adt2 = require('../components/adt2/network')
const adt3 = require('../components/adt3/network')
const unidad = require('../components/unidad/network')



const routers = function(server){
    // Cada vez que nuestro server(APP) llame a '/ruta' llamará a nuestro componente de ruta
    server.use('/usuario', usuario)
    server.use('/auth', auth)
    server.use('/trabajador', trabajador)
    server.use('/producto', producto)
    server.use('/categoria', categoria)
    server.use('/origen', origen)
    server.use('/color', color)
    server.use('/adt1', adt1)
    server.use('/adt2', adt2)
    server.use('/adt3', adt3)
    server.use('/unidad', unidad)
    
}

module.exports = routers
