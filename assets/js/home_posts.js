{
    //method to submit the form using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDOM(data.data.post); 
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: 'Post created',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                    
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

     //method to create a post in DOM
     let newPostDOM = function(post){
        return $(`<li id="post-${post._id}">
        <p>
               
                <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-solid fa-trash"></i></a>
                </small>
              
                ${post.content}
        <br>
        <small>
          ${ post.user.name }
        </small>
        </p>
        <div class="post-comments">
               
                        <form action="/comments/create" id="new-comment-form" method="post">
                           <input type="text" name="content" placeholder="Type Here to add comments..">
                           <input type="hidden" name="post" value="${post._id}">
                           <input type="submit" value="Add comment">
                        </form>   
               

                <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                               
                        </ul>
                </div>
        </div>
        
    </li>`)
     }


     //method to delete a post from DOM
     let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                  $(`#post-${data.data.post_id}`).remove();

                  new Noty({
                theme: 'relax',
                 text: 'Post Deleted!',
                 type: 'success',
                 layout: 'topRight',
                 timeout: 1500

                }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
     }

    createPost();
}