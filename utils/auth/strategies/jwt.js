const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

passport.use(
        new Strategy(
            {
                secretOrKey: 'secret',
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            async function(tokenPayload, done){
                
                if(tokenPayload.sub=='admin'){
                    console.log(tokenPayload.sub)
                    return done(null, tokenPayload.sub + ' autorizado')
                }
            }
        )
    )