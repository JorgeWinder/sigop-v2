const express = require('express')

const routers = function(server){

    const router = express.Router()
    server.use(router)
    

    // ---------- Renderizar diseños --------------- //

    router.get('/', function(req, res){
        res.render('login', {layout: 'acceso', script_name: 'login'})
    })

    router.get('/pagina-de-bienvenida', function(req, res){
        res.render('home')
    })

    router.get('/mantenimiento-de-producto', function(req, res){
        res.render('mantenimiento-de-producto')
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

    router.get('/registrar-producto', function(req, res){
        res.render('registrar-producto')
    })

    router.get('/modulo-de-almacen', function(req, res){
        res.render('modulo-de-almacen')
    })

    router.get('/modulo-de-cobranzas', function(req, res){
        res.render('modulo-de-cobranzas')
    })

    router.get('/modulo-de-configuracion', function(req, res){
        res.render('modulo-de-configuracion')
    })

    router.get('/mantenimiento-de-tablas', function(req, res){
        res.render('mantenimiento-de-tablas')
    })
    
    // -------------------------------------------- //


}


module.exports = routers