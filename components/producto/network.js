const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const passport = require('passport')

// Basic strategy
//require('../../utils/auth/strategies/jwt')

const router = express.Router()


router.get('/' ,function(req, res){

    const filterProducto = req.query.id || null
    const filterProductoText = req.query.textSearch || null
    
    controller.listProducto(filterProducto, filterProductoText)
        .then((data)=>{
            response.success(req, res, data, 200)
        })
        .catch((e)=>{
            response.error(req, res, 'Error interno', 500, e)
        })

   
})


router.post('/', function(req, res){

    controller.addProducto(req.body)
    .then((data)=>{
        response.success(req, res, data, 201)
    })
    .catch((e)=>{
        response.error(req, res, 'Información invalida', 400 ,'Error en el controlador: ' + e)
    })

})

router.patch('/:id', function(req, res){

    controller.updateProducto(req.params.id, req.body)
    .then((data)=>{
        response.success(req, res, data, 200)
    })
    .catch((e)=>{
        response.error(req, res, 'Error interno', 500, e)
    })

})


module.exports = router
