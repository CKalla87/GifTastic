$(document).ready(function() {

    $("#userButton").on('click', function(event) {

        event.preventDefault();

        var searchInput = $("#userInput").val();

    

   

    

    //Storing API Key
    var queryURL = "https://api.giphy.com/v1/gifs/search?t=" + searchInput + "&api_key=LCGxT4k6PQZhd2R9b6VGJB0u4ZTn0XgZ&q=Movies&limit=10&offset=0&rating=G&lang=en";

    //Performing AJAX GET request to pull giphy images from api key
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

        console.log(queryURL);  
        console.log(response);

        var imgURL = response.data.images;

        var movieImage = $("<img>")
        movieImage.attr("src", imgURL);
        movieImage.attr("alt", "movie Image");
        $("#gifOutput").append(movieImage);

       
    });



});

 

    

   
    

});

