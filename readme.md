#What is it?
----
A weather widget made with the HTML canvas, CSS, JavaScript, jQuery and the Open Weather Map API. The user can write in the name of any city and be shown the current conditions, the upcoming forecast and the current temp with a responsive thermometer and background.

##Languages Used
---
  * HTML
  * CSS 
  * Native JavaScript
  * jQuery

##Link to Github documents 
---
[Github](https://github.com/paigen11/weather-widget)

##Authors
---
Paige Niedringhaus

##Screenshots
---
Starting screen users see before typing in a city name
![alt text](https://github.com/paigen11/weather-widget/blob/master/screenshots/home-screen.png 'home-screen.png')

Screen Displayed After Users Enter City
![alt text](https://github.com/paigen11/weather-widget/blob/master/screenshots/updated-screen.png 'updated-screen.png')

Another Screen Displayed After Users Search Another City
![alt text](https://github.com/paigen11/weather-widget/blob/master/screenshots/second-updated-screen.png 'second-updated-screen.png')

##Further Info
---
Everything except for the background images are displayed within the HTML canvas, and the thermometer and all its changes are drawn on the canvas.

A JSON call is used each time the user enters a new city to pull the data from it, and it then displays all the info within the canvas elements. Using the weather condition codes provided by the Open Weather Map API, the background images are also dynamically updated depending on the current weather in each city searched for.

##Requirements
---
An API key is required to use this API, it can be obtained by visiting the Open Weather Map API site and signing up to get a key [here](http://openweathermap.org/appid).

##Code Examples
---
jQuery function dynamically updating the background images

```javascript
function weatherBg(weatherNum){
		if(weatherNum == 800){
			var getImageSrc = 'happy_wallpaper.jpg';
			$('body').css('background-image', 'url(' + getImageSrc + ')');
		}else if(((weatherNum >= 200) && (weatherNum <= 321)) || ((weatherNum >= 500) && (weatherNum< 600))){
			getImageSrc = 'rainy.jpg';
			$('body').css('background-image', 'url(' + getImageSrc + ')');
		}else if((weatherNum >= 600) && (weatherNum < 700)){
			getImageSrc = 'snowy.jpeg';
			$('body').css('background-image', 'url(' + getImageSrc + ')');
		}else if((weatherNum >= 801) && (weatherNum <= 804)){
			getImageSrc = 'cloudy.jpeg';
			$('body').css('background-image', 'url(' + getImageSrc + ')');
		}
	};
```

JavaScript function animating the temperature, so it adjusts based on the city's temp and changes color

```javascript
function animateTemp(current){
		
		context.clearRect(32, 2, 56, 195);
		context.beginPath();
		context.moveTo(60,200);
		context.lineTo(60, 200 - (200*current));
		// var tempColor = '#FF0000';
		var tempColor; 
		if(currentTemp < 30){
			tempColor = "blue";
		}else if((currentTemp > 30) && (currentTemp < 80)){
			tempColor = "green";
		}else if(currentTemp >80){
			tempColor="red";
		}
		context.strokeStyle = tempColor; //changes line color
		context.lineWidth = 55; //sets line width
		context.stroke();

		currPerc++;
		if(currPerc < currentTemp){
			requestAnimationFrame(function(){
				animateTemp(currPerc/100);
			})
		}
	}
```

Part of the JSON call to the weather API to pull in the appropriate data

```javascript
$.getJSON(url, function(weatherData){
			// set up a variable for the user's city's temp
			currentTemp = weatherData.list[0].main.temp;
			var temp = $(".temp");
			temp.html(currentTemp);
			currentSkies=weatherData.list[0].weather[0].id;
			weatherBg(currentSkies);

			//set weather for future days
			currentWeather = weatherData.list[0].weather[0].description;
			var weather = $('.weather');
			weather.html(currentWeather);

			//set weather icons for future days
			weatherIcon = weatherData.list[0].weather[0].icon;
			var src1 = "http://openweathermap.org/img/w/"+weatherIcon+".png";
                $('.weather-icon').attr("src", src1);
}); 
```                