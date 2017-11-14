/**
 * es6 modules and imports
 */
import sayHello from './hello.js';
import $ from 'jquery';

sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

$("#page-loading").delay(600).fadeOut();
$("#page-loaded").delay(1200).fadeIn();

getMovies().then((movies) => {
  movies.forEach(({title, rating, id}) => {
    $("#movieList")
      .append(`<div class="row">`)
      .append(`<div class="column one-fourth">${id}</div>`)
      .append(`<div class="column one-fourth">${title}</div>`)
      .append(`<div class="column one-fourth">${rating}</div>`)
      .append(`<div class="column one-fourth"><button id="edit" type="button">Edit</button>
        <button id="delete" type="button">Delete</button></div>`)
      .append(`</div>`)
      .append(`<hr>`);

    movies.id++;
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

$("#addMovie").click(function () {
  let inputTitle = $("#title").val();
  let inputRating = $("#rating").val();

  addMovie(inputTitle, inputRating)
});

function addMovie(title, rating) {
  const movieListing = {title, rating};
  const url = "http://localhost:3000/movies";
  const options = {
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

$("#delete").click(function () {
  deleteMovie();
});

function deleteMovie(title, rating) {
  const movieListing = {title, rating};
  const url = "http://localhost:3000/movies";
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieListing),
  };

  fetch(url, options)
    .then(alert("Movie successfully added!"))
    .catch((error) => {
      alert("An error has occurred. Please check the console.");
      console.log(error);
    });
}