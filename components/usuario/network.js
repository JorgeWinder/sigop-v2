const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const passport = require('passport')

// Basic strategy
require('../../utils/auth/strategies/jwt')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}) ,function(req, res){

    const filterUser = req.query.user || null
    
    controller.getUser(filterUser)
        .then((userList)=>{
            response.success(req, res, userList, 200)
        })
        .catch((e)=>{
            response.error(req, res, 'UnExpected error', 500, e)
        })

   
})

router.post('/', function(req, res){
    

    controller.addUser(req.body.name)
    .then((data)=>{
        response.success(req, res, data, 201)
    })
    .catch((e)=>{
        response.error(req, res, 'Información invalida', 400 ,'Error en el controlador: ' + e)
    })

})

router.patch('/:id', function(req, res){

    controller.updateUser(req.params.id, req.body.name)
    .then((data)=>{
        response.success(req, res, data, 200)
    })
    .catch((e)=>{
        response.error(req, res, 'Error interno', 500, e)
    })

})

router.delete('/:id', function(req, res){

    controller.deleteUser(res.params.id)
    .then((data)=>{
        response.success(req, res, `Usuario Eliminado`, 200)
    })
    .catch((e)=>{
        response.error(req, res, 'Error interno', 500, e)
    })

})


module.exports = router