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
		currentTemp = 0;

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
			animateTherm2(0);

			//set temps for future days
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

			//set weather for future days
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

			//set weather icons for future days
			weatherIcon = weatherData.list[0].weather[0].icon;
			var src1 = "http://openweathermap.org/img/w/"+weatherIcon+".png";
                $('.weather-icon').attr("src", src1);

            weatherIcon1 = weatherData.list[5].weather[0].icon;
			var src2 = "http://openweathermap.org/img/w/"+weatherIcon1+".png";
                $('.weather-icon1').attr("src", src2); 

            weatherIcon2 = weatherData.list[13].weather[0].icon;
			var src3 = "http://openweathermap.org/img/w/"+weatherIcon2+".png";
                $('.weather-icon2').attr("src", src3); 

            weatherIcon3 = weatherData.list[21].weather[0].icon;
			var src4 = "http://openweathermap.org/img/w/"+weatherIcon3+".png";
                $('.weather-icon3').attr("src", src4); 

            weatherIcon4 = weatherData.list[29].weather[0].icon;
			var src5 = "http://openweathermap.org/img/w/"+weatherIcon4+".png";
                $('.weather-icon4').attr("src", src5);             

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
		context.stroke();
	}

	function animateTherm2(){
		
		context.beginPath();
		context.arc(61, 220, 40, 5.6, 1.2*Math.PI);
		// draw that circle

		var fillColor;
		if(currentTemp < 30){
			fillColor = "blue";
		}else if((currentTemp > 30) && (currentTemp < 80)){
			fillColor = "green";
		}else if(currentTemp >80){
			fillColor="red";
		}
		context.fillStyle = fillColor;
		context.fill();
	}	
	
	function animateTemp(current){

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

		context.font="15px cursive";
		context.fillText(currentTemp, 100, 35);

		currPerc++;
		if(currPerc < currentTemp){
			requestAnimationFrame(function(){
				animateTemp(currPerc/100);
			})
		}
	} //end of animate function

}); //end of doc ready function

