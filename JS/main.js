// API

const  API_KEY = 'c6f56dd60e130c06ab6e02838322c1db';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=c6f56dd60e130c06ab6e02838322c1db&query=furious';


// selecting   values  from DOM

const  buttoneElement = document.querySelector('#search');
const  inputElement = document.querySelector('#inputValue');


buttoneElement.onclick = function(event){
    event.preventDefault();

const  value  =  inputElement.value;
fetch(url)
  .then((res)=>res.json())
  .then((data)=> {
      console.log('Data: ',  data);

  })
  .catch((error)=>{
      console.log('Error: ', error);

  });

console.log('Value: ', value);

}
