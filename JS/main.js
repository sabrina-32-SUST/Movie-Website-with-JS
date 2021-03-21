
// API

const  API_KEY = 'c6f56dd60e130c06ab6e02838322c1db';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=c6f56dd60e130c06ab6e02838322c1db';
const  IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

function generateUrl(path) {

    const  url =  `https://api.themoviedb.org/3${path}?api_key=c6f56dd60e130c06ab6e02838322c1db`;
    return  url;
}

// selecting   values  from DOM

const  buttoneElement = document.querySelector('#search');
const  inputElement = document.querySelector('#inputValue');
const  movieSearchable = document.querySelector('#movies-searchable');
 


function requestMovies(url,  onComplete, onError) {
    
    fetch(url)
  .then((res)=>res.json())
  .then(onComplete)
  .catch(onError);
}

function searchMovie(value) {

    const  path = '/search/movie';
    const url = generateUrl(path)+ '&query='+value;
    requestMovies(url,renderSearchMovies, handleError);

    
}


function getUpcomingMovie() {

    const  path = '/movie/upcoming';
    const url = generateUrl(path);
    requestMovies(url,renderSearchMovies, handleError);

    
}

function getTopRatedMovie() {

    const  path = '/movie/top_rated';
    const url = generateUrl(path);
    requestMovies(url,renderSearchMovies, handleError);

    
}



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
<div  class='content '>
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



function handleError(error) {
    console.log('Error:', error);
    
}

buttoneElement.onclick = function(event){
    event.preventDefault();

const  value  =  inputElement.value;
 searchMovie(value);


  inputElement.value = '';


console.log('Value: ', value);

}


function createIframe(video) {
const  iframe =  document.createElement('iframe');
iframe.src = `https://www.youtube.com/embed/${video.key}`;

iframe.width = 360;
iframe.height = 315;
iframe.allowFullscreen = true;

return  iframe;

    
}
function createVideoTemplate(data, content) {

    content.innerHTML= '<p id="content-close">X</p>';

    console.log('Videos: ', data);
    const videos = data.results;
    const  length = videos.length > 4 ? 4 : videos.length;
    const  iframeContainer = document.createElement('div');


    for(  let  i =0;  i<length;i++){

        const  video = videos[i];
        const  iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);

    }

    
}

// event Delegation
document.onclick = function (event) {
const target = event.target;
if(target.tagName.toLowerCase()==='img')
{
const  movieId = target.dataset.movieId;
    console.log('movie Id: ' ,movieId);
    const  section = event.target.parentElement;
    const  content = section.nextElementSibling;
    content.classList.add('content-display');

    const  path = `/movie/${movieId}/videos`;
    const  url = generateUrl(path);


    //feaching  videos
    fetch(url)
  .then((res)=>res.json())
  .then((data) => createVideoTemplate(data, content))
  .catch((error)=>{
      console.log('Error: ', error);

  });


}
 
if(target.id==='content-close'){

    const  content = target.parentElement;
    content.classList.remove('content-display');

}

 }

 



 getUpcomingMovie();

 getTopRatedMovie();
