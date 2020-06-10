/*
	Creation date: 03/06/2020
	last update: 08/06/2020
	updater: Andrade, J. V.
	REV: 0.001
	Reviewer: J., Doe
	Review Date: --/--/--

	The REV number represents:
		- 0.XXX: JS version
		- X.000: Iteration
*/
var project = document.getElementById("project");							// Define the area in which the PNID will be drwan on.
var ctx = project.getContext('2d');											// Fetch context for projects
window.addEventListener("load", drawLayout);								// This event calls the drawLayout function when the page is loaded
//window.addEventListener("resize", drawLayout);							// Since it is necessary to be responsive, this one will call the same function, drawLayout, when page is resized

function drawLayout(){

	defineDimensions();
	defineDrawingArea();
	defineAlignment();
	defineGrid();
	drawProject();
	
}

function defineDimensions(){

	// Get current device properties
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;

	return[windowWidth, windowHeight];
}

function defineDrawingArea(){

	// Get current device properties
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;

	// Calculate the exact dimensions for the project, so the grid fits in perfectly
	let protoHeight = Math.floor((windowHeight * 0.9)/400) ;
	let projectHeight = protoHeight*400;
	let projectWidth = protoHeight*600;
	
	project.width = projectWidth;
	project.height = projectHeight;

	return [projectWidth, projectHeight];
}

function defineAlignment(){

	let projectWidth = project.clientWidth;
	let projectHeight = project.clientHeight;

	// Get current device properties
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;

	// Align the project in the middle of the screen
	let leftOffset = (windowWidth - projectWidth)/2 + "px";
	let topOffset = (windowHeight - projectHeight)/2 + "px";

	project.style.left = leftOffset;
	project.style.top = topOffset;
	
	return[leftOffset, topOffset];
}

function defineGridscale(){
	let gridScale = 10;
	return gridScale;
}

function defineGrid() {
	
	let projectWidth = project.clientWidth;
	let projectHeight = project.clientHeight;
	let gridScale = defineGridscale();
	let minSubdivision = defineSubdivision()[0];
	let maxSubdivision  = defineSubdivision()[1];

	// Inner grid
	for(var x = 0; x <= projectWidth; x += minSubdivision) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#000000";
		ctx.moveTo(x, 0);
		ctx.lineTo(x, projectHeight);
		ctx.stroke();
	}
	for(var y = 0; y <= projectHeight; y += minSubdivision) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#000000";
		ctx.moveTo(0, y);
		ctx.lineTo(projectWidth, y);
		ctx.stroke();
	}
	
	// Outter grid
	for(var x = 0; x <= projectWidth; x += maxSubdivision) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#808080";
		ctx.moveTo(x, 0);
		ctx.lineTo(x, projectHeight);
		ctx.stroke();
	}
	for(var y = 0; y <= projectHeight; y += maxSubdivision) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#808080";
		ctx.moveTo(0, y);
		ctx.lineTo(projectWidth, y);
		ctx.stroke();
	}

	return[minSubdivision, maxSubdivision];
}

function defineSubdivision(){

	projectWidth = project.width;

	// Get grid scale
	let gridScale = defineGridscale();

	// Initialize grid variables
	let minSubdivision = 0;
	let maxSubdivision = 0;

	// Calculate min and maxSubdivision
	minSubdivision = Math.round(projectWidth/240);
	maxSubdivision = minSubdivision*gridScale;

	return [minSubdivision, maxSubdivision];
}

function showTag(){

}