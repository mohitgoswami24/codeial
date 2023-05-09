{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDOM(data.data.comment);
                    $('.post-comments-list>ul').prepend(newComment);
                    deleteComment($('.delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "commented successfully",
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


    //method to create a comment in DOM
    let newCommentDOM = function(comment){
        return $(`<li id="comment-${comment._id}">
        <p>
           
                    <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fa-solid fa-trash"></i></a>
                    </small>
            
                    ${ comment.content }
            <br>
            <small>
            ${ comment.user.name}
            </small>
    </p>
    </li>`)
    }


    //delete a comment from DOM
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "deleted comment",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
    
                    }).show();
                    
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createComment();
}