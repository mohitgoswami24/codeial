const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
       clientID: process.env.clientID,
       clientSecret: process.env.clientSecret,
       callbackURL: "http://localhost:9000/users/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done){
        //find a user
        try{
            const user = await User.findOne({email: profile.emails[0].value});
            if(user){
                //if found , set thi user as req.user
                return done(null, user);
            }else{
                //if not found, create the user & set it as req.user
                const Newuser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null, Newuser);
            }
        }catch(err){
            console.log('Error in google strategy-passport',err);
            return;
        }
        


    }))

module.exports = passport;