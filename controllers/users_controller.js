const User = require('../models/user');
 
 module.exports.profile = function(req, res){
    if(req.cookies.user_id){
      User.findById(req.cookies.user_id)
      .then((user)=>{
        return res.render('user_profile',{
          title: "User Profile",
          user: user
        })
      })
      .catch((err)=>{
        return res.redirect('/users/sign-up');
      })
     
    }else{
      return res.redirect('/users/sign-in');
    }
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
  //  });  old version code....

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

  //step to authentication
  //find the user
  User.findOne({email: req.body.email})
  .then((user)=>{
       if(user){
          //handle password which dont match
           if(user.password != req.body.password){
            return res.redirect('back');
           }
           //handle session creation
           res.cookie('user_id', user.id);
           return res.redirect('/users/profile');
        } else{
           //handle user not found
           return res.redirect('back');
        }
  })


  .catch((err)=>{
    console.log('Error in finding User sign in');
    return;
  })
   
  //handle user found

  
 
 }