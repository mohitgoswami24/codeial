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
 module.exports.create = (req, res)=>{
   if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
   }

  //  User.findOne({email: req.body.email}, (err, user)=>{
  //   if(err){
  //     console.log('error in finding user in signing up');
  //     return;
  //   }
  //   if(!user){
  //     User.create(req.body, (err, user)=>{
  //       if(err){console.log('error in creating user while signing up'); return}

  //       return res.redirect('/users/sign-in');
  //     })
  //   }else{
  //     return res.direct('back')
  //   }
  //  });

  User.findOne({email: req.body.email})
  .then((user)=>{
    if(!user){
      User.create(req.body)
      .then((newUser)=>{
        return res.redirect('/users/sign-in');
      })
      .catch((err)=>{
        console.log('error in creating user while signing up');
        return;
      })
    }
    else{
      return res.direct('back');
    }
  })

  .catch((err)=>{
    console.log('Error in finding User');
    return;
  })
   
   
 }


 // sign in and create a session for the user
 module.exports.createSession = (req,res)=>{
  //TODO later
 }