const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const passport = require('passport')

// Basic strategy
//require('../../utils/auth/strategies/jwt')

const router = express.Router()


router.get('/:by' ,function(req, res){

    const busqueda_por= req.params.by || null
    const filtroDepartamento = req.query.idDepartamento || null
    const filtroProvincia = req.query.idProvincia || null
    
    console.log(filtroDepartamento)

    controller.listUbigeo(busqueda_por, filtroDepartamento, filtroProvincia)
        .then((data)=>{
            response.success(req, res, data, 200)
        })
        .catch((e)=>{
            response.error(req, res, 'Error interno', 500, e)
        })

   
})


module.exports = router
