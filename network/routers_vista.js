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

    router.get('/modulo-de-pedidos-y-ventas', function(req, res){
        res.render('modulo-de-pedidos-y-ventas', {script_name: 'modulo-de-ventas-y-pedido'})
    })

    router.get('/registrar-pedido', function(req, res){
        res.render('registrar-pedido')
    })

    router.get('/modulo-de-almacen', function(req, res){
        res.render('modulo-de-almacen')
    })

    router.get('/modulo-de-cobranzas', function(req, res){
        res.render('modulo-de-cobranzas')
    })


    // -------------------------------------------- //


}


module.exports = routers