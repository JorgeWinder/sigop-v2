const express = require('express')

const routers = function(server){

    const router = express.Router()
    server.use(router)
    

    // ---------- Renderizar diseños --------------- //

    router.get('/pagina-de-inicio', function(req, res){
        res.render('home')
    })

    router.get('/ingresar', function(req, res){
        res.render('login')
    })

    router.get('/registrar-movientos-almacen', function(req, res){
        res.render('registrar-movientos-almacen')
    })

    // -------------------------------------------- //


}


module.exports = routers