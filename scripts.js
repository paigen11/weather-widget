var apiKey = "c192d0d519bd4a8d9733fa183829c6a7";
var canvas;
var context;

$(document).ready(function(){
	var canvas = document.getElementById('currentTemp');  //local variables to doc ready function and its children
	var context = canvas.getContext('2d');
	var currentTemp = 0;
	var currPerc = 0;

	animateTherm();

	$('.weatherForm').submit(function(){
		// keep the form from submitting
		event.preventDefault();

		canvas = document.getElementById('currentTemp');
		context = canvas.getContext('2d');
		currPerc = 0;

		// get the user input
		var cityText = $(".city").val();
		// build the url from the user input and our api key
		var url = "http://api.openweathermap.org/data/2.5/forecast/city?q=" + cityText + "&units=imperial&APPID=" + apiKey;
		

		// go get JSON from the constructed url
		$.getJSON(url, function(weatherData){
			// set up a variable for the user's city's temp
			currentTemp = weatherData.list[0].main.temp;
			var temp = $(".temp");
			temp.html(currentTemp);

			animateTemp(0);

			temp1 = weatherData.list[5].main.temp;
			var temp1elem = $(".temp1");
			temp1elem.html(temp1);

			temp2 = weatherData.list[13].main.temp;
			var temp2elem = $(".temp2");
			temp2elem.html(temp2);

			temp3 = weatherData.list[21].main.temp;
			var temp3elem = $(".temp3");
			temp3elem.html(temp3);

			temp4 = weatherData.list[29].main.temp;
			var temp4elem = $(".temp4");
			temp4elem.html(temp4);

			temp5 = weatherData.list[37].main.temp;
			var temp5elem = $(".temp5");
			temp5elem.html(temp5);

			currentWeather = weatherData.list[0].weather[0].description;
			var weather = $('.weather');
			weather.html(currentWeather);

			weather1 = weatherData.list[5].weather[0].description;
			var weather1elem = $('.weather1');
			weather1elem.html(weather1);

			weather2 = weatherData.list[13].weather[0].description;
			var weather2elem = $('.weather2');
			weather2elem.html(weather2);

			weather3 = weatherData.list[21].weather[0].description;
			var weather3elem = $('.weather3');
			weather3elem.html(weather3);

			weather4 = weatherData.list[29].weather[0].description;
			var weather4elem = $('.weather4');
			weather4elem.html(weather4);

			weather4 = weatherData.list[37].weather[0].description;
			var weather5elem = $('.weather5');
			weather5elem.html(weather5);

		}); //end of JSON function

	}); //end of weather form submission
		
	function animateTherm(){
		// let's make sure canvas is empty
		context.clearRect(0,0,600,300);

		context.beginPath();
		context.moveTo(30,200);
		context.lineTo(30,0);
		context.lineTo(90,0);
		context.lineTo(90,200);
		context.lineWidth = 3;
		context.strokeStyle = '#000';
		context.stroke();

		context.beginPath();
		context.arc(61, 220, 40, 5.6, 1.2*Math.PI);
		// draw that circle

		context.lineWidth = 3;
		context.strokeStyle = '#000';
		context.fillStyle = '#FF0000';
		context.fill();
		context.stroke();
	}
	
	function animateTemp(current){
		
		context.beginPath();
		context.moveTo(60,200);
		context.lineTo(60, 200 - (200*current));
		var tempColor = '#FF0000';
		context.strokeStyle = tempColor; //changes line color
		context.lineWidth = 55; //sets line width
		context.stroke();

		context.fillText(currentTemp, 100, 100);

		currPerc++;
		if(currPerc < currentTemp){
			requestAnimationFrame(function(){
				animateTemp(currPerc/100);
			})
		}
	} //end of animate function

}); //end of doc ready function

