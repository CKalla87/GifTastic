$(document).ready(function() {
    
    //Setting Top Button Array
    var Topics = ["Batman", "The Godfather", "The Matrix", "The Conjuring", "The Exorcism Of Emily Rose", "Casino", "Tusk", "The Avengers", "Star-Wars"];
    
    //Adding array with a function
    function addMovie() {
    
    //Removing element content before placing
    $("#movieName").empty();
    
    //Setting up for loop to pull 0 - end of array index
    for (var i = 0; i < Topics.length; i++) {
        
        //Setting up tag, Class, Id's from CSS, Inputting text from array and then appending to the button
        var newMovie = $("<button>");
        newMovie.addClass("btn btn-primary mb-2");
        newMovie.attr("id","userButton");
        newMovie.attr("id", "topButton");
        //'storing api under data-name
        newMovie.attr("data-name", Topics[i]);
        newMovie.text(Topics[i]);
        $("#movieName").append(newMovie);
        }
    };
    
    //Calling addMovie function to page
    addMovie();
    
    
    //Setting Up API connetion and pull
    function apiSearch() {
        
        //Creating and saving search input variable
        var searchInput = $(this).attr("data-name");
        
        $("#gifOutput").empty();
        //Storing API Key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchInput + "&rating=pg-13&limit=10&api_key=LCGxT4k6PQZhd2R9b6VGJB0u4ZTn0XgZ";
        
        //Performing AJAX GET request to pull giphy images from api key
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        
        console.log(queryURL);  
        
        //Variable To Enter API Object
        var imgURL = response.data;

            //For Loop to run 10 images through API Object
            for (var i = 0; i < imgURL.length; i++) {
            
            //Setting Div to hold Image & Rating
            var movieDiv = $("<div class='newDiv'>")  
            
            //Setting Image API for Still & Animate
            var imgObject = imgURL[i].images.fixed_height_still.url
            var imgAnimate = imgURL[i].images.fixed_height.url
            
            var movieImage = $("<img>").attr("src", imgObject);
            movieImage.attr("data-still", imgObject)
            movieImage.attr("data-animate", imgAnimate)
            movieImage.attr("data-state", "still")
            movieDiv.append(movieImage);
            
            
            //Setting Rating API
            var ratingObject = imgURL[i].rating
            var rating = $("<p>").text("Movie Rating: " + ratingObject);
            movieDiv.append(rating);

            //Outputting API
            $("#gifOutput").prepend(movieDiv);
            };
        });
    };
    
    //Animate Gif
    function animateImage() {
        
        //If, Else Condition to find image and then arrtibute to either change to still or animate
        imageState = $(this).find("img").attr("data-state")
        if (imageState === "still") {
         $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
         $(this).find("img").attr("data-state", "animate");
        } else {
         $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
         $(this).find("img").attr("data-state", "still");
        }
    };

 
    //Adding User Event
    $("#userButton").on('click', function(event) {
        event.preventDefault();

        //Input user key search
        var searchInput = $("#userInput").val().trim()
        
        //Putting new movie search in top of array
        Topics.push(searchInput);
        
        //applying the function logic to add move to the array
        addMovie();
        
    });


    //Adding click event for top images api data to pull
    $(document).on('click', "#topButton", apiSearch)
    
    //Adding click event on images to animate or be still
    $(document).on('click', ".newDiv", animateImage)
});

