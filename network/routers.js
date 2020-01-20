const express = require('express')
const usuario = require('../components/usuario/network')


const routers = function(server){
    // Cada vez que nuestro server(APP) llame a '/ruta' llamará a nuestro componente de ruta
    server.use('/usuario', usuario)
    
}

module.exports = routers
