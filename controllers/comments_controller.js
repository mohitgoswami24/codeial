const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
 
module.exports.create = async function(req,res){
    const post = await Post.findById(req.body.post);
    if(post){
        try{
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })

            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email');
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);
            })
            

            if(req.xhr){
                return res.status(200).json({
                    data: {
                       comment: comment
                    },
                    message: "commented successfully!"
                })
            }
            
            // req.flash('success','commented Successfully!')
            res.redirect('/');
        }catch(error){
            console.log(error);
        }   


    }
} 


module.exports.destroy = async function(req,res){
    const comment = await Comment.findById(req.params.id);
    const post = await Post.findById(comment.post);
    try{
        if(comment.user ==  req.user.id || post.user == req.user.id) {
            let postID = comment.post;
            await Comment.findByIdAndDelete(req.params.id);
            await Post.findByIdAndUpdate(postID,{$pull:{comments:req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id : req.params.id
                    }, 
                    message: "Comment Deleted!"
                })
            }

            // req.flash('success',' comments deleted!')

            return res.redirect('back');
            }else{
                req.flash('error','You are not authorized to delete this comment!')

                return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        req.flash('error',error)

        return res.redirect('back');
    }
   
}