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
      .append(`<div class="column one-half">${title}</div>`)
      .append(`<div class="column one-fourth">${rating}</div>`)
      .append(`</div>`)
      .append(`<hr>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

$("#addMovie").click(function () {
  let inputId = $("#id").val();
  let inputTitle = $("#title").val();
  let inputRating = $("#rating").val();

  addMovie(inputId, inputTitle, inputRating)
});

function addMovie(id, title, rating) {
  if (id !== isNaN && title !== "" && rating !== isNaN && 0 <= rating <= 5) {
    $("#movieList")
      .append(`<div class="row">`)
      .append(`<div class="column one-fourth">${id}</div>`)
      .append(`<div class="column one-half">${title}</div>`)
      .append(`<div class="column one-fourth">${rating}</div>`)
      .append(`</div>`)
      .append(`<hr>`);
  } else {
      alert("Invalid parameter(s). Please try again.");
  }
}