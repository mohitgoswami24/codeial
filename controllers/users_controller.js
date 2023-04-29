const User = require('../models/user');
 
 module.exports.profile = function(req, res){
   //  res.end('<h1>User Profile</h1>');

    return res.render('user', {
      title: "title is User page path /users/profile"
    })
 }

 //render the sign up  page
 module.exports.signUp = (req,res)=>{
  return res.render('user_sign_up', {
    title: "Codeial | Sign Up"
  })
 }


 //render the sign in page
 module.exports.signIn = (req, res)=>{
  return res.render('user_sign_in', {
    title: "Codeial | Sign In"
  })
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
        retrun;
    }
  }
   
   
 }


 // sign in and create a session for the user
 module.exports.createSession = function(req,res){
   return res.redirect('/');
 }