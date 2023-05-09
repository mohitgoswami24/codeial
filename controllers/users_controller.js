const User = require('../models/user');
 
 module.exports.profile = async function(req, res){
   const user = await User.findById(req.params.id);
    return res.render('user_profile', {
      title: "profile page",
       profile_user: user
    })
 }

 module.exports.update = async function(req,res){
//   await User.findByIdAndUpdate(req.params.id, req.body);
// return res.redirect('back');
  if(req.user.id == req.params.id){
    try{
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function(err){
        if(err) {console.log('******MULTER ERROR:', err)}

        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){
          //this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('back');
      })
    }catch(err){
      req.flash('error',err);
      return res.redirect('back');
    }
  }else{
    req.flash('error', 'Unauthorized!');
    return res.status(401).send('Unauthorized');
  }
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
  req.flash('success', 'Logged in Successfully');
   return res.redirect('/');
 }


 module.exports.destroySession = function(req,res,next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    req.flash('success', 'user logged out!');
    return res.redirect('/')
  });
 
  
 }