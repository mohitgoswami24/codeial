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
                    
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

     //method to create a post in DOM
     let newPostDOM = function(post){
        return $(`<li id="post-${post.id}">
        <p>
               
                <small>
                        <a class="delete-post-button" href="/posts/destroy/${post.id}"><i class="fa-solid fa-trash"></i></a>
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

    createPost();
}