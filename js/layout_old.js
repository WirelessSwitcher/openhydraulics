/*
	Creation date: 03/06/2020
	last update: 04/06/2020
	updater: Andrade, J. V.
	REV: 0.001
	Reviewer: J., Doe
	Review Date: --/--/--

	The REV number represents:
		- 0.XXX: JS version
		- X.000: Iteration
*/

var project = document.getElementById("project");						   // Define the area in which the PNID will be drwan on.
var ctx = project.getContext('2d');										 // Fetch context for project

window.addEventListener("load", drawLayout);								// This event calls the drawLayout function when the page is loaded
window.addEventListener("resize", drawLayout);							  // Since it is necessary to be responsive, this one will call the same function, drawLayout, when page is resized

function drawLayout(){

	// Get current device properties
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	// Calculate the exact dimensions for the project, so the grid fits in perfectly
	var protoHeight = Math.floor((windowHeight * 0.9)/400) ;
	var projectHeight = protoHeight*400;
	var projectWidth = protoHeight*600;

	// Initialize grid
	var gridScale = 10;
	var minSubdivion = getSubdivision(projectWidth, gridScale)[0];
	var maxSubdivion = getSubdivision(projectWidth, gridScale)[1];

	// Set dimensions into the project
	project.width = projectWidth;
	project.height = projectHeight;

	// Align the project in the middle of the screen
	var leftOffset = (windowWidth - projectWidth)/2;
	var topOffset = (windowHeight - projectHeight)/2;
	project.style.left = leftOffset + "px";
	project.style.top = topOffset + "px";

	// Call the functions
	drawGrid(minSubdivion, maxSubdivion);
	drawValve(minSubdivion, maxSubdivion);
}

function getSubdivision(projectWidth, gridScale){

	// Initialize grid variables
	var minSubdivion = 0;
	var maxSubdivion = 0;

	// Calculate min and maxSubdivion
	minSubdivion = Math.round(projectWidth/240);
	maxSubdivion = minSubdivion*gridScale;

	return [minSubdivion, maxSubdivion];
}

function drawGrid(minSubdivion, maxSubdivion) {
	
	var w = project.width;
	var h = project.height;

	// Inner grid
	for(var x = 0; x <= w; x += minSubdivion) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#000000";
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}
	for(var y = 0; y <= h; y += minSubdivion) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#000000";
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
		ctx.stroke();
	}
	
	// Outter grid
	for(var x = 0; x <= w; x += maxSubdivion) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#808080";
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}
	for(var y = 0; y <= h; y += maxSubdivion) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#808080";
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
		ctx.stroke();
	}
}

function drawValve(minSubdivion, maxSubdivion, orientation){

	var g = minSubdivion;
	var G = maxSubdivion;

	// Draw external container
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#FF0000"
	ctx.moveTo(G, G);
	ctx.lineTo(G, 2*G);
	ctx.lineTo(2*G, 2*G);
	ctx.lineTo(2*G, G);
	ctx.lineTo(G, G);
	//ctx.closePath;
	ctx.stroke();
	//ctx.fillStyle = "#FFFFF";
	//ctx.fill();

   // Draw internal valve symbol
   	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#00FF00"
	ctx.moveTo(G+g, G+g);
	ctx.lineTo(G+g, 2*G-g);
	ctx.lineTo(2*G-g, G+g);
	ctx.lineTo(2*G-g, 2*G-g);
	ctx.lineTo(G+g, G+g);
	ctx.closePath;
	ctx.stroke();
	ctx.fillStyle = "grey";
	ctx.fill();
}

function drawPipe(){
	// This should 
}