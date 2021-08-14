//select elements

const tempElement = document.querySelector('.temperature.value p');
const descElement = document.querySelector('.temperature.description');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

//App data
const weather = {};
weather.temperature={
	unit:'celsius'

};

//Const and Variables
const KELVIN = 273;
//API key
const key = 'a1485357b2de86d49abcf6f44cb0d44a';

//Check if browser supports Geolocation
if('geolocation' in navigator){
	navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
	notificationElement.style.display = 'block';
	notificationElement.innerHTML = '<p> Browser doesnt support Geolocation';

}


//Set user position
function setPosition(position){
	let latitude = position.coord.latitude;
	let longitude = position.coord.longitude;

	getWeather(latitude,longitude);


}

//Show error when there is a issue with geolocation service

function showError(error){
	notificationElement.style.display = 'block';
	notificationElement.innerHTML = '<p> ${error.message}';

}

//get weather from API Provider
function getWeather(latitude,longitude){
	let api='http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}';
	
	fetch(api)
	.then(function(response){
		let data = response.json();
		return data;
	})
   .then (function(data){
		weather.temperature.value=Math.floor(data.main.temp - KELVIN)
		weather.description = data.weather[0].description;
		weather.iconID = data.weather[0].icon;
		weather.city=data.name;
		weather.city=data.name;
		weather.country = data.sys.country;
	 })
     .then(function(){
     	displayWeather();
     });
	
}

//DISPLAY WEATHER TO UI
function displayWeather() {
	tempElement.innerHTML = '${weather.temperature.value} <span>C</span>'
	descElement.innerHTML = weather.description;
	locationElement.innerHTML = '${weather.city}, ${weather.country}';
}