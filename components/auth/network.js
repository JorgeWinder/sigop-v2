const express = require('express')
const response = require('../../network/response')
//const controller = require('./controller')

const passport = require('passport')
const jwt = require('jsonwebtoken')

// Basic strategy
require('../../utils/auth/strategies/basic')

const router = express.Router()


// router.get('/',
//     passport.authenticate('basic', { session: false }),
//         function(req, res) {
//             //res.send(req.user.username);
//             console.log(req.user)
       
//                 const payload = { sub: req.user.username, name: 'Jorge Winder' ,email: req.user.email}
//                 const token = jwt.sign(payload, 'secret', {
//                     expiresIn: "15m"
//                 })
//                 response.success(req, res, { access_token: token }, 200)
            
//         })

router.get('/', function(req, res){

    res.send({'acceso': true})

})

module.exports = router