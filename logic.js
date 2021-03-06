var topics = ["who's the boss", "game of thrones", "playing house", "superstore", "perfect strangers", "firefly", "gilmore girls", "modern family", "gravity falls", "downton abbey", "full house", "new girl", "supernatural", "wonder years", "project runway", "quantum leap", "macgyver", "grace and frankie", "sherlock", "big bang theory"];


function makeButtons() {
    for (i = 0; i < topics.length; i++) {
        $("#tvShowButtons").append('<input type="button" class="btn btn-success" value="' + topics[i] + '">');
    };
}


makeButtons();


$("#addShow").on("click", function(event) {
    event.preventDefault();

    var newShow = $("#tvShowInput").val().trim();

    topics.push(newShow);
    // $("#tvShowInput").text(" ");
    $("#tvShowButtons").empty();
    console.log(topics);
    makeButtons();
})


$("#tvShowButtons").on("click", ".btn", function() {
    event.preventDefault();

    var show = $(this).attr("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        // console.log(response);

        var results = response.data;

        for (j = 0; j < results.length; j++) {

            var showDiv = $("<div>");
            var showImage = $("<img>");
            var p = $("<p>").text("Rating: " + results[j].rating);

            showImage.attr({
                "src": results[j].images.fixed_height_still.url,
                "data-still": results[j].images.fixed_height_still.url,
                "data-animate": results[j].images.fixed_height.url,
                "data-state": "still",
                "class": "gif"
            });

            showDiv.append(showImage);
            showDiv.append(p);
            $("#tvShowGifs").prepend(showDiv);

        }
    })
});

$("#tvShowGifs").on("click", ".gif", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});