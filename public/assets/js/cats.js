// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-sleep").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newsleep");

    var newdevouredState = {
      devoured: newDevoured
    };

    // Send the PUT request.
    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: newdevouredState
    }).then(
      function() {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/cats", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".toggle-class").on("click", function(event){
    event.stopPropagation();
   

  $(this).parent().empty().addClass("hideStuff");
   


  });
  
  $(".delete-noname").on("click", function(event) {
    

    // Send the DELETE request.
    $.ajax("/api/cats/route", {
      type: "DELETE"
    }).then(
      function() {
       
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
