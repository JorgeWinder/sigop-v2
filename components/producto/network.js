const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const passport = require('passport')

// Basic strategy
//require('../../utils/auth/strategies/jwt')

const router = express.Router()


router.post('/', function(req, res){

    //res.send(req.body)


    controller.addProducto(req.body.nombre)
    .then((data)=>{
        response.success(req, res, data, 201)
    })
    .catch((e)=>{
        response.error(req, res, 'Información invalida', 400 ,'Error en el controlador: ' + e)
    })

})

module.exports = router
