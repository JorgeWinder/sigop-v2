const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const passport = require('passport')

// Basic strategy
//require('../../utils/auth/strategies/jwt')

const router = express.Router()


router.get('/' ,function(req, res){

    const filterProducto = req.query.id || null
    
    controller.listColor(filterProducto)
        .then((data)=>{
            response.success(req, res, data, 200)
        })
        .catch((e)=>{
            response.error(req, res, 'Error interno', 500, e)
        })

   
})


module.exports = router
