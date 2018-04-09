$(document).ready(function(){

  // save an article
  $(document).on("click", ".save", function(event) {
    event.preventDefault();
    var articleId = $(this).data("id");

    $.ajax({
      method: "PUT",
      url: "/save/"+ articleId
    }).then(function(data) {
      
    });
  });



});
