const Post = require('../models/post');

module.exports.home = async function(req, res){

    console.log(req.cookies);
    res.cookie('user_id', 25);

    const posts = await Post.find({})
    .populate('user')  // populate the user of each post

        return res.render('home', {
            title: 'Codeial || Home'
            ,posts: posts
        })

   
   
    
}