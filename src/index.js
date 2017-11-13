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

$("#page-loading").delay(600).fadeOut();
$("#page-loaded").delay(1200).fadeIn();