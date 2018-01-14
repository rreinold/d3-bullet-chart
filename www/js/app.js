const MAX_X = 200
const MAX_Y = 200

const MARKER_WIDTH = 2
const MARKER_HEIGHT = 15

const BAR_HEIGHT = 10
const BAR_Y = (MARKER_HEIGHT - BAR_HEIGHT) / 2

const MARGIN = 20


function startup(status){
	var graph1 = status[0]
	var x = d3.scaleLinear()
	    .domain([graph1.start, graph1.finish])
	    .range([0, MAX_X]);

	var domain = graph1.finish - graph1.start
	var range = MAX_X
	var expected = [
		(graph1.current - graph1.start) / domain * range,
		(graph1.best - graph1.start) / domain * range,
		(graph1.goal - graph1.start) / domain * range,

	]

	//Make an SVG Container
	var svgContainer = d3.select("body").append("svg")
		.attr("width",MAX_Y)
		.attr("height",MAX_X);

	var currentMaxBound = x(graph1.current)
	console.log("Setting current rect bound to " + currentMaxBound + " - " + graph1.current + " / " + graph1.finish)
	var current = svgContainer.append("rect")
		.attr("x",0)
		.attr("y",BAR_Y)
		.attr("width",currentMaxBound)
		.attr("height",BAR_HEIGHT)
		.attr("fill","#70C1B3");

	var bestMaxBound = x(graph1.best)
	console.log("Setting current rect bound to " + bestMaxBound + " - " + graph1.current + " / " + graph1.finish)
	var current = svgContainer.append("rect")
		.attr("x",currentMaxBound)
		.attr("y",BAR_Y)
		.attr("width",bestMaxBound)
		.attr("height",BAR_HEIGHT)
		.attr("fill","#FFE066");

	var goalMaxBound = x(graph1.goal)
	console.log("Setting current rect bound to " + goalMaxBound + " - " + graph1.current + " / " + graph1.finish)
	var current = svgContainer.append("rect")
		.attr("x",bestMaxBound)
		.attr("y",BAR_Y)
		.attr("width",goalMaxBound)
		.attr("height",BAR_HEIGHT)
		.attr("fill","#F25F5C");

	var finishMaxBound = x(graph1.finish)
	console.log("Setting current rect bound to " + finishMaxBound + " - " + graph1.current + " / " + graph1.finish)
	var current = svgContainer.append("rect")
		.attr("x", goalMaxBound)
		.attr("y", BAR_Y)
		.attr("width", finishMaxBound)
		.attr("height", BAR_HEIGHT)
		.attr("fill","#247BA0");

	const HALF_MARKER_WIDTH = MARKER_WIDTH / 2

	var markers = [0,currentMaxBound,bestMaxBound,goalMaxBound, x(graph1.finish)]
	markers.forEach(function(e){
		var markerGroup = svgContainer.append("g")
		markerGroup.append("rect")
	    	.attr("x",e - HALF_MARKER_WIDTH)
	    	.attr("y",0)
	    	.attr("width",MARKER_WIDTH)
	    	.attr("height",MARKER_HEIGHT)
	    markerGroup.append("text")
	    	.attr("y", 50)
	    	.text("Hello there")
	})
}

function loadJSON(url, callback) {	 

	var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
			}
	};
	xobj.send(null);	
 }

$(document).ready(function() {
	loadJSON("js/state.json", function(response) {
	charts = JSON.parse(response);
	console.log(charts)
	startup(charts)
 });
});