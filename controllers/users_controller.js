const User = require('../models/user');
 
 module.exports.profile = async function(req, res){
   const user = await User.findById(req.params.id);
    return res.render('user_profile', {
      title: "profile page",
       profile_user: user
    })
 }

 //render the sign up  page
 module.exports.signUp = (req,res)=>{
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up',{
    title: 'codeial || sign up'
  });
 }


 //render the sign in page
 module.exports.signIn = (req, res)=>{
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in',{
    title: 'codeial || sign in'
  });
 }

 // get the sign up data
 module.exports.create = async function(req, res){
   if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
   }

  else{
    try{
       const user = await User.findOne({email: req.body.email})
       if(!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else{
          return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error in finding user');
        return;
    }
  }
   
   
 }


 // sign in and create a session for the user
 module.exports.createSession = function(req,res){
   return res.redirect('/');
 }


 module.exports.destroySession = function(req,res,next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
  });

  return res.redirect('/')
 }