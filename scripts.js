var apiKey = "c192d0d519bd4a8d9733fa183829c6a7";
var canvas;
var context;

$(document).ready(function(){
	var canvas = document.getElementById('currentTemp');  //local variables to doc ready function and its children
	var context = canvas.getContext('2d');
	var currentTemp = 0;

	$('.weatherForm').submit(function(){
		// keep the form from submitting
		event.preventDefault();
		// get the user input
		var cityText = $(".city").val();
		// build the url from the user input and our api key
		var url = "http://api.openweathermap.org/data/2.5/forecast/city?q=" + cityText + "&units=imperial&APPID=" + apiKey;
		

		// go get JSON from the constructed url
		$.getJSON(url, function(weatherData){
			// set up a variable for the user's city's temp
			currentTemp = weatherData.list[0].main.temp;
			animate(0);


		}); //end of JSON function

	}); //end of weather form submission

	function animate(current){

		var tempColor = '#FF0000';
		context.strokeStyle = tempColor; //changes line color
		context.lineWidth = 10; //sets line width

		// let's make sure canvas is empty
		context.clearRect(0,0,300,300);
		
		context.beginPath();
		context.arc(155,155,60, Math.PI * 1.5, Math.PI * 2);
		context.fillStyle(#ddd);
		context.fill();
		// I'm ready to draw...
		context.beginPath();

		context.arc(155, 155, 70, Math.PI * 1.5, (current/100) * (Math.PI * 2) + (Math.PI *1.5));
		// draw that circle
		context.stroke();

		context.fillText(currentTemp, 100, 100);

		current++;
		if(current < currentTemp){
			requestAnimationFrame(function(){
				animate(current);
			})
		}
	} //end of animate function

}); //end of doc ready function

