const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


    let opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'codeial'
    }


passport.use(new JWTStrategy(opts, async function(jwtPayload,done){
    console.log('1')
    try{
        const user = await User.findById(jwtPayload._id);
        console.log('2')

        if(user){
            console.log('3')
            return done(null,user);
        }else{
            return done(null,false);
        }
    }catch(err){
        console.log('Error in finding user form JWT');
        return;
    }

}));

module.exports = passport;
