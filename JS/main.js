// API

const  API_KEY = 'c6f56dd60e130c06ab6e02838322c1db';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=c6f56dd60e130c06ab6e02838322c1db';
const  IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';


// selecting   values  from DOM

const  buttoneElement = document.querySelector('#search');
const  inputElement = document.querySelector('#inputValue');
const  movieSearchable = document.querySelector('#movies-searchable');



function movieSection(movies){
  return  movies.map((movie) =>{
      if(movie.poster_path){
        return `<img src = ${IMAGE_URL + movie.poster_path} data-movie-id = ${movie.id}>`;
      }
      
    } )
}

function  createMovieContainer(movies){
    const  movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    const  movieTemplete =`
    <section class="section">
                 

    ${movieSection(movies)}

    </section>
<div  class='content'>
<p id="content-close">X</p>

             `;
            movieElement.innerHTML = movieTemplete;
            return movieElement;

}

function renderSearchMovies(data) {
    movieSearchable.innerHTML ='';

     const  movies = data.results;

     const movieBlock =  createMovieContainer(movies);

     movieSearchable.appendChild(movieBlock);
      console.log('Data: ',  data);

}



buttoneElement.onclick = function(event){
    event.preventDefault();

const  value  =  inputElement.value;

const  newUrl = url + '&query=' + value;

fetch(newUrl)
  .then((res)=>res.json())
  .then(renderSearchMovies)
  .catch((error)=>{
      console.log('Error: ', error);

  });

  inputElement.value = '';
  

console.log('Value: ', value);

}
