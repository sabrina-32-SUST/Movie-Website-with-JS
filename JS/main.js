// selecting   values  from DOM

const  buttoneElement = document.querySelector('#search');
const  inputElement = document.querySelector('#inputValue');


buttoneElement.onclick = function(event){
    event.preventDefault();

const  value  =  inputElement.value;
console.log('Value: ', value);

}
