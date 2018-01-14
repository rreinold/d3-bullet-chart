const MAX_X = 200
const MAX_Y = 200
const BAR_HEIGHT = 50
function startup(status){
	var graph1 = status[0]
	var x = d3.scaleLinear()
	    .domain([graph1.start, graph1.finish])
	    .range([0, MAX_X]);

	//Make an SVG Container
	var svgContainer = d3.select("body").append("svg")
	                                    .attr("width", MAX_Y)
	                                    .attr("height", MAX_X);



	var currentMaxBound = x(graph1.current)
	console.log("Setting current rect bound to " + currentMaxBound + " - " + graph1.current + " / " + graph1.finish)
	var current = svgContainer.append("rect")
	                            .attr("x", 0)
	                            .attr("y", 0)
	                            .attr("width", currentMaxBound)
	                            .attr("height", BAR_HEIGHT)
	                            .attr("fill","#7FDBFF");

	var bestMaxBound = x(graph1.best)
	console.log("Setting current rect bound to " + bestMaxBound + " - " + graph1.current + " / " + graph1.finish)
	var current = svgContainer.append("rect")
	                            .attr("x", currentMaxBound)
	                            .attr("y", 0)
	                            .attr("width", bestMaxBound)
	                            .attr("height", BAR_HEIGHT)
	                            .attr("fill","#2ECC40");

	var finishMaxBound = x(graph1.finish)
	console.log("Setting current rect bound to " + finishMaxBound + " - " + graph1.current + " / " + graph1.finish)
	var current = svgContainer.append("rect")
	                            .attr("x", bestMaxBound)
	                            .attr("y", 0)
	                            .attr("width", finishMaxBound)
	                            .attr("height", BAR_HEIGHT)
	                            .attr("fill","#FFDC00");

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