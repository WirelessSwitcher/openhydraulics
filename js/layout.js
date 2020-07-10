/*
	Creation date: 03/06/2020
	last update: 10/07/2020
	updater: Andrade, J. V.
	REV: 0.001
	Reviewer: J., Doe
	Review Date: --/--/--

	The REV number represents:
		- 0.XXX: JS version
		- X.000: Iteration
*/

// Global variables

// Data base
var componentArray = [];													// Erase the graphical component's position
var showTagStatus = 0;														// Erase tag
var valveNum = 0;
var hoverArray = ["out", 0, 0];												// Initialize hover array
var dataBase = [];															// Initialize data base
var clickedArray = [];

// Special objects
var ctx = project.getContext('2d');											// Initialize project canvas
var outArray = ["out", 0, 0];												// Empty icon model
var mouseOverArray = [outArray, outArray];									// Initialize mouseOverArray with empty icons

// Interactions
var debounceResize = debounce(drawLayout, 250);								// Fetch context for projects
var debounceMouseMove = debounce(detectMouseOver, 10);						// Debounce mouse movement

window.addEventListener("resize", debounceResize);							// Resize project when window is resized
//window.addEventListener("resize", drawLayout);							// Resize project when window is resized
window.addEventListener("load", drawLayout);								// This event calls the drawLayout function when the page is loaded
project.addEventListener('contextmenu', event => event.preventDefault());
project.addEventListener("mousemove", debounceMouseMove);
project.addEventListener("mousedown", mouseClickDetection);

// Main fucntion
function drawLayout(){
	clearData();
	defineDrawingArea();
	defineAlignment();
	defineGrid();
	drawProject();
	drawShowTagButton();
}

// Specific functions

function mouseClickDetection(e){

	let clickedElement = hoverArray[0];
	clickedArray.push(clickedElement);
	//console.log(clickedArray);
	if(clickedArray.length > 2){
		clickedArray.shift();
	}
	//defineAction(clickedElement);
	let action;
	
	if(e.button == 0){
		console.log("left click");
		action = "toggle";
	}
	else if(e.button == 2){
		console.log("right click");
		action = "openPopUp";
		drawContextMenu();
	}
	else{
		console.log("Something else");
	}

	for(var i = 0; i < dataBase.length; i++){

		let getter = dataBase[i];
		let setter = getter;

		if(clickedElement == getter.tag){
			setter.action = action;
			dataBase[i] = setter;
			//console.log(dataBase[i].tag, dataBase[i].action);
		}
	}
}

/*
function defineAction(clickedElement){

	for(var i = 0; i < dataBase.length; i++){

		let getter = dataBase[i];
		let setter = getter;

		if(clickedElement == getter.tag){
			setter.action = 1;
			dataBase[i] = setter;
			console.log(dataBase[i].tag, dataBase[i].action);
		}
	}
}
*/

function detectMouseOver(e){

	// Get grid dimensions
	var grid = defineSubdivision();
	var g = defineSubdivision()[0];
	var G = defineSubdivision()[1];

	let leftOffset = parseInt(project.style.left);
	let topOffset = parseInt(project.style.top);

	let projectWidth = parseInt(project.offsetWidth);
	let projectHeight = parseInt(project.offsetHeight);

	let mouseX = parseInt(e.clientX - leftOffset);
	let mouseY = parseInt(e.clientY - topOffset);

	posX.innerHTML = mouseX;
	posY.innerHTML = mouseY;

	hoverArray = outArray;

	for(var i = 0; i < componentArray.length; i++){

		let currentComponent = componentArray[i];
		let currentX = currentComponent[1] * g;
		let currentY = currentComponent[2] * g;
		let sideX = currentX + G;
		let sideY = currentY + G;

		if((currentX <= mouseX) && (mouseX <= sideX) && (currentY <= mouseY) && (mouseY <= sideY)){
			hoverArray = currentComponent;
		}
	}

	mouseOverArray.push(hoverArray);
	if(mouseOverArray.length >= 2){
		mouseOverArray.shift();
	}

	let mouseOver_Old = mouseOverArray[0];
	let mouseOver_New = mouseOverArray[1];

	if(mouseOver_Old[0] != mouseOver_New[0]){
		//console.log("mouseOver_Old is: " + mouseOver_Old +"\nmouseOver_New is: " + mouseOver_New);
		ctx.clearRect(0, 0, project.width, project.height);
		drawLayout();
	}
	else{
		//console.log("no change");
	}

	console.log(clickedArray);
}

function clearData(){
	// Clear cache:
	componentArray = [];
	dataBase = [];
	valveNum = 0;
}

function defineDrawingArea(){

	// Get current device properties
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;

	let maxWidth = windowWidth * 0.8;
	let maxHeight = windowHeight * 0.8;

	let protoWidth;
	let protoHeight;

	if(maxHeight > maxWidth){
		protoWidth = maxWidth;
		protoHeight = (maxWidth * 2) / 3;
	}
	else{
		protoWidth = (maxHeight * 3) / 2;
		protoHeight = maxHeight;

		if(protoWidth > maxWidth){
			protoWidth = maxWidth;
			protoHeight = (maxWidth * 2) / 3;
		}
	}
	
	project.width = protoWidth;
	project.height = protoHeight;
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

function drawShowTagButton(){

	let projectWidth = project.clientWidth;
	let projectHeight = project.clientHeight;

	// Position in page
	showTagButton.style.left = (projectWidth * 0.01) + "px";
	showTagButton.style.top = (projectHeight * 0.01) + "px";

	// Define size
	showTagButton.style.width = (projectWidth * 0.10)  + "px";
	showTagButton.style.height = (projectHeight * 0.05) + "px";

	// Align text vertically
	showTagButton.style.top = ((showTagButton.offsetHeight - showTag.offsetHeight)/2) + "px";
}

function highlight(element){

	element.style.border = "2px solid #FFFFFF";	
}

function unhighlight(element){

	element.style.border = "2px solid #222";
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/* DATA STORAGE AND LOGGING
	var saveData = (function () {
	    var a = document.createElement("a");
	    document.body.appendChild(a);
	    a.style = "display: none";
	    return function (data, fileName) {
	        var json = JSON.stringify(data),
	            blob = new Blob([json], {type: "octet/stream"}),
	            url = window.URL.createObjectURL(blob);
	        a.href = url;
	        a.download = fileName;
	        a.click();
	        window.URL.revokeObjectURL(url);
	    };
	}());
	var data = { x: 42, s: "hello, world", d: new Date() },
	fileName = "my-download.json";
	saveData(data, fileName);
*/
