const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const bcrypt = require('bcryptjs')

passport.use(
    new BasicStrategy( function(username, password, done){

        if(username!= 'admin' || password!='1234'){
            return done('{"error": "Datos invalidos"}', false)
        }
        
        return done(null, {username: username, email: 'jorge.winder@gmail.com'})
    })
)