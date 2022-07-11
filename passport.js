const passport = require('passport') 
const jwtStrategy = require('passport-jwt').Strategy //constructor estrategia
const extractJwt = require('passport-jwt').ExtractJwt //contruccion, extraccion de usuario

const User = require('../MyTinerary/models/users')
//definimos unas nueva estrategia, que mediante fromauth extraera el token
//del header y compara su firma desescriptada con nuestra secret key
module.exports = passport.use(
    new jwtStrategy(
        {jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), //estraigo la info que quiero y autorizamos
        secretOrKey: process.env.SECRET_KEY}, //depositar el token a traves de Secret Key
        async (jwt_payload,done) => {
            //console.log(jwt_payload)
            try {
                const user = await User.findOne({_id:jwt_payload.id})
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            }
            catch(error) {
                console.log(error)
                return done(error,false)
            }
        }
))