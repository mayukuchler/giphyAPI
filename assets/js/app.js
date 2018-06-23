var animals = [
  "Dog",
  "Cat",
  "Mouse",
  "Rabbit",
  "Deer",
  "Hippo",
  "Manatee",
  "Pig",
  "Horse",
  "Peacock",
  "Goat"
];
var animalImage = "";

function createButton() {
  $("#newButton").empty();
  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    a.attr("data-animal", animals[i]);
    a.text(animals[i]);
    a.addClass("gifButton");
    a.addClass("btn btn-outline-secondary");
    $("#newButton").append(a);
  }
}

$(function() {
  $(document).on("click", ".gifButton", function() {
    var animal = $(this).attr("data-animal");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr({
          src: results[i].images.fixed_height.url,
          "data-state": "animate",
          class: "gifImages",
          "data-animate": results[i].images.fixed_height.url,
          "data-still": results[i].images.fixed_height_still.url
        });
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#view-gifs-here").prepend(animalDiv);
      }
      createButton();
    });
  });

  $("#add-new-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("#animal-input")
      .val()
      .trim();
    if (animals.indexOf(newAnimal) === -1) {
      animals.push(newAnimal);
      createButton();
    }
  });

  $(document).on("click", ".gifImages", function(event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state == "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
createButton();
