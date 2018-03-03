// you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics

var topics = ["shark", "whale", "stingray", "dolphin", "jellyfish"]


// Here we take the objects in the array, make buttons for each of them, and print them to the page

for (i = 0; i < topics.length; i++) {
    var topicButton = $("<button>");
    topicButton.text(topics[i]);
    topicButton.attr("data-person", topics[i]);
    $("#animalButtons").append(topicButton);

}

// On click function for each of the buttons, grab 10 static non-animated gif images from the giphy api and place them on them on the page. Make sure to display ratings for every gif under the gif.

$("button").on("click", function () {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=f4k2vwdMyK1f7a2ZkdSbHpzrggAA8jt9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(queryURL)
            console.log(response)
            console.log(response.data[1].url)
            console.log(response.data[1].rating);

            for (i = 0; i < response.data.length; i++) {

                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                $("#animals").prepend(p);

                var personImage = $("<img>");
                personImage.attr("src", response.data[i].images.fixed_height_still.url);

                personImage.attr("data-still", response.data[i].images.fixed_height_still.url);
                personImage.attr("data-animate", response.data[i].images.original.url);
                personImage.attr("data-state", "still");

                $("#animals").prepend(personImage);

            }
            
            imageOnClick();

        });
});

function imageOnClick(){
    $("img").on("click", function () {
        console.log("click")
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
}

// Logic here for when a user clicks the images that they will become animated and revert to still if clicked again


// Create a function that captures input from the input form element and add it to the "topics" array. 
// Then this same function remakes the buttons on the page including hte most recent one pushed to the array.

