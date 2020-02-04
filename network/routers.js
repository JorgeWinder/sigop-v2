const express = require('express')
const usuario = require('../components/usuario/network')
const auth = require('../components/auth/network')
const trabajador = require('../components/trabajador/network')


const routers = function(server){
    // Cada vez que nuestro server(APP) llame a '/ruta' llamará a nuestro componente de ruta
    server.use('/usuario', usuario)
    server.use('/auth', auth)
    server.use('/trabajador', trabajador)
    
}

module.exports = routers
