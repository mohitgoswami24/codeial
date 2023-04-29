const passport = require('passport');

const bodyParser = require('body-parser');

const LocalStrategy = require('passport-local').Strategy;



// const User = require('../models/user');
const User = require('../models/user');

// authentication using passprt
passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
   },
   async function(email, password, done){
    try{
        const user = await User.findOne({email: email})
        if(!user || user.password != password){
            console.log('error in finding user --> passport');
            return done(null, false);
        }
        return done(null, user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
   }
    
));
     

// serializing the user to decide which key is to be kept in the cokkies
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

//desearize the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try{
        const user = await User.findById(id)
        if(user){
            return done(null,user);
        }
    }
    catch(err){
        console.log(err);
        return done(err);
    }
    

})

module.exports = passport;