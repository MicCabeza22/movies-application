/**
 * es6 modules and imports
 */
import sayHello from "./hello.js";
import $ from "jquery";

sayHello("World");

/**
 * require style imports
 */
const {getMovies} = require("./api.js");

let editTitle = "";
let editRating = 1;
let inputTitle = "";
let inputRating = 1;
let movieListing = {};
let options = {};
let url = "";

//  Loading "animation"
$("#page-loading").delay(600).fadeOut();
$("#page-loaded").delay(1200).fadeIn();

//  Generate a list of movies from an external database.
getMovies().then((movies) => {
  movies.forEach(({title, rating, id}) => {
    $("#movieList")
      .append(`<div class="row">`)
      .append(`<div class="column one-fourth">${id}</div>`)
      .append(`<div class="column one-fourth">${title}</div>`)
      .append(`<div class="column one-fourth">${rating}</div>`)
      .append(`<div class="column one-fourth"><button class="edit" type="button">Edit</button>
        <button class="delete" type="button">Delete</button></div>`)
      .append(`</div>`)
      .append(`<hr>`);

    movies.id++;
  });
}).catch((error) => {
  alert("Oh no! Something went wrong.\nCheck the console for details.");
  console.log(error);
});

//  Add button functionality to add a movie to the list based on user input.
$("#addMovie").click(function () {
  inputTitle = $("#title").val();
  inputRating = $("#rating").val();

  addMovie(inputTitle, inputRating)
});

function addMovie(title, rating) {
  movieListing = {title, rating};
  url = "http://localhost:3000/movies";
  options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieListing),
  };

  if (title === "") {
    alert("Please enter a movie title.");
  } else if (isNaN(rating) || rating < 1 || rating > 5) {
      alert("Please enter a rating between 1 and 5");
  } else {
      fetch(url, options)
        .then(alert("Movie successfully added!"))
        .catch((error) => {
          alert("An error has occurred. Please check the console.");
          console.log(error);
        });
  }
}

//  Add button functionality to edit a movie in the list based on user input.
$(".edit").click(function () {
  editTitle = movie.title;
  editRating = movie.rating;

  editMovie(editTitle, editRating);
});

function editMovie(title, rating) {
  $("#editTitle").val(title);
  $("#editRating").val(rating);
}

$("#confirmEdit").click(function () {
  getMovies().then((movies) => {
    movies.forEach(({title, rating}) => {
      $("#movieList")
        .html(`<div class="column one-fourth">${title}</div>`)
        .html(`<div class="column one-fourth">${rating}</div>`);
    });
  })
  .catch((error) => {
    alert("Oh no! Something went wrong.\nCheck the console for details.");
    console.log(error);
  });
});