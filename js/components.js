 /*
	Creation date: 03 / 06 / 2020
	last update: 02 / 07 / 2020
	updater: Andrade, J. V.
	REV: 0.001
	Reviewer: J., Doe
	Review Date: -- / -- / --

	The REV number represents:
		- 0.XXX: JS version
		- X.000: Iteration
*/

var tree = class{
	constructor(
		component
	){
		// Do something
	}
}

var button = class{
	constructor(
		tag,
		posX,
		posY,
		height,
		length,
		value,
		status,
		command
	){
		// Do something
	}
}

var digitalValve = class{
	constructor(
		tag,
		posX,
		posY,
		rotation,
		status,
		command
	){
		this.tag = tag;
		this.posX = posX;
		this.posY = posY;
		this.rotation = rotation;
		this.status = status;
		this.command = command;

		drawValve(this.tag, this.posX, this.posY, this.rotation, this.status);
		addComponent2dataBase(this);
		dataBase.push(this);
	}
}

/*var screenIcon = class{
	constructor(
		tag,
		posX,
		posY,
		length,
		height,
		idNumber
	){
		this.tag = tag;
		this.posX = posX;
		this.posY = posY;
		this.length = length;
		this.height = height;
		this.endX = posX + length;
		this.endY = posY + height;
		this.idNumber = idNumber;
	}
}*/


function addComponent2dataBase(component){

	let currentComponent = [];
	currentComponent.push(component.tag);
	currentComponent.push(component.posX);
	currentComponent.push(component.posY);
	componentArray.push(currentComponent);											// Add valve to array

	//let currentIcon = new screenIcon(component.tag, component.posX, component.posY, valveNum);
	let thisComponent = componentArray[valveNum];									// Extract values and store in local variable

	valveNum = valveNum + 1;
}

function drawValve(tag, xPos, yPos, angle, status){

	let g = defineSubdivision()[0];											// Get project's smaller grid division
	let G = defineSubdivision()[1];											// Get project's greater grid division

	// Define dimensions
	let l = 3 * g;															// Valve symbol base length
	let L = G / 2;															// Valve bezel base legth

	// Convert from general position to pixels
	let x = xPos * g;
	let y = yPos * g;

	// Retrieve angular centre
	let centreX = x + L;
	let centreY = y + L;

	// Status and command words
	let inputStatus;
	let outpuStatus;
	let commandOpen;
	let commandClose;

	// Defines bezel colour
	if(hoverArray[0] == tag){
		bezelColour = "#FFFFFF";
	}
	else{
		bezelColour = "#FFFF80";
	}

	// Calculates the hypothenusa from a triange in which the side is equivalent to the desired side width of the valve bezel
	let H = Math.round(Math.sqrt(2) * L * 1000) / 1000;
	let h = Math.round(Math.sqrt(2) * l * 1000) / 1000;

	// Draw the outter bezel
	for (var i = 0; i <= 4; i++){

		let theta = i * 90 + 45;

		// Transforms the angle from degrees to radians
		let R = Math.round((angle + theta) * (Math.PI / 180) * 100) / 100;

		let sinR = Math.round(Math.sin(R) * 1000) / 1000;
		let cosR = Math.round(Math.cos(R) * 1000) / 1000;

		let thetaX = (Math.round(x + (H * sinR)) * 1000) / 1000 + L;
		let thetaY = (Math.round(y + (H * cosR)) * 1000) / 1000 + L;

		if(i == 0){
			ctx.beginPath();
			ctx.moveTo(thetaX, thetaY);
		}
		else if (i == 4){
			ctx.closePath();
			ctx.strokeStyle = bezelColour;
			ctx.stroke();
		}
		else {
			ctx.lineTo(thetaX, thetaY);
		}
	}

	// Draw valve
	for (var i = 0; i <= 6; i++){
		
		let alpha = (i * 90) + 135;

		// Transforms the angle from degrees to radians
		let r = Math.round((angle + alpha) * (Math.PI / 180) * 100) / 100;

		let sinr = Math.round(Math.sin(r) * 1000) / 1000;
		let cosr = Math.round(Math.cos(r) * 1000) / 1000;

		let alphaX = (Math.round(centreX + (h * sinr)) * 1000) / 1000;
		let alphaY = (Math.round(centreY + (h * cosr)) * 1000) / 1000;

		if(i == 0){
			// Begin input triangle
			ctx.beginPath();
			ctx.moveTo(centreX, centreY);
		}
		else if (i == 3){
			// End input triangle
			ctx.closePath();
			ctx.strokeStyle = "#800000";
			ctx.stroke();
			ctx.fillStyle = "#800000";
			ctx.fill();

			// Begin output triangle
			ctx.beginPath();
			ctx.moveTo(centreX, centreY);
			ctx.lineTo(alphaX,alphaY);
		}
		else if (i == 5){
			// End output triangle
			ctx.closePath();
			ctx.strokeStyle = "#008000";
			ctx.stroke();
			ctx.fillStyle = "#008000";
			ctx.fill();
		}
		else {
			ctx.lineTo(alphaX, alphaY);
		}
	}

	// Draw Tag
	if(showTagStatus == 1){
		let tagFont = (5*g) + "px Arial white";
		let tagX = x + L;
		let tagY = y + G + (5*g);
		ctx.font = tagFont;
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = "center";
		ctx.fillText(tag, tagX, tagY)
	}
}

function drawPipe(tree){

	let projectWidth = project.clientWidth;
	let gridScale = defineGridscale();

	let g = defineSubdivision(projectWidth, gridScale)[0];
	let G = defineSubdivision(projectWidth, gridScale)[1];

	let centreX = [];
	let centreY = [];
	let angleR = [];

	let startInputX = [];
	let startInputY = [];
	let endInputX = [];
	let endInputY = [];

	let startOutputX = [];
	let startOutputY = [];
	let endOutputX = [];
	let endOutputY = [];

	for(var i = 0; i < tree.length; i++){

		// Gets the valve's coordinates and rotation angle
		centreX.push((tree[i].posX * g) + G/2);
		centreY.push((tree[i].posY * g) + G/2);
		angleR.push(tree[i].rotation);

		let l = Math.round(((4 * g) / Math.sqrt(2)) * 1000) / 1000;		// Calculates the valve's symbol rotation radius
		let L = Math.round((G / Math.sqrt(2)) * 1000) / 1000;			// Calculates the valve's bezel rotation radius

		let polarl = polarCoordinate(l, l, (angleR[i] + 90));
		let polarL = polarCoordinate(L, L, (angleR[i] + 90));
		
		startInputX.push(centreX[i] - polarl[0]);
		startInputY.push(centreY[i] - polarl[1]);
		startOutputX.push(centreX[i] + polarl[0]);
		startOutputY.push(centreY[i] + polarl[1]);

		endInputX.push(centreX[i] - polarL[0]);
		endInputY.push(centreY[i] - polarL[1]);
		endOutputX.push(centreX[i] + polarL[0]);
		endOutputY.push(centreY[i] + polarL[1]);

		switch(i){
			case 0:															// First valve doesn't need input pipe
			drawOuputPipe();
			break;

			case (tree.length - 1):											// Last valve doesn't need output pipe
			drawInputPipe();
			checkRelativePosition();
			break;

			default:
			drawInputPipe();
			drawOuputPipe();
			checkRelativePosition();
		}
	
		function drawInputPipe(){
			// Draw input pipe
			ctx.beginPath();
			ctx.moveTo(startInputX[i], startInputY[i]);
			ctx.lineTo(endInputX[i], endInputY[i]);
			ctx.strokeStyle = "#FF00FF";
			ctx.stroke();
		}

		function drawOuputPipe(){
			// Draw output pipe
			ctx.beginPath();
			ctx.moveTo(startOutputX[i], startOutputY[i]);
			ctx.lineTo(endOutputX[i], endOutputY[i]);
			ctx.strokeStyle = "#00FFFF";
			ctx.stroke();
		}

		function checkRelativePosition(){
			ctx.beginPath();
			ctx.moveTo(endOutputX[i-1], endOutputY[i-1]);

			ctx.lineTo(endInputX[i], endOutputY[i-1]);
			ctx.lineTo(endInputX[i], endInputY[i]);

			ctx.strokeStyle = "#0000FF";
			ctx.stroke();
		}
		
		/*console.log(
			"centreX is: " + centreX[i]
			+ "\n" + "centreY is: " + centreY[i]
			+ "\n" + "polarl is: " + polarl
			+ "\n" + "polarL is: " + polarL
			+ "\n" + "startOutputX is: " + startOutputX
			+ "\n" + "startOutputY is: " + startOutputY
			+ "\n" + "endOutputX is: " + endOutputX
			+ "\n" + "endOutputY is: " + endOutputY
		);*/
	}
}

function polarCoordinate(X, Y, angle){
	// Place here the recurrent code to convert the cartesian coordinates to angular coordinates
	let rho = angle * (Math.PI / 180);									// Converts angle to radians
	let sinR = Math.sin(rho);											// Get's the sin from the valve's current  angle
	let cosR = Math.cos(rho);											// Get's the cos from the valve's current  angle
	let rhoX = Math.round((X * sinR) * 1000) / 1000;					// Converts to polar X
	let rhoY = Math.round((Y * cosR) * 1000) / 1000;					// Converts to polar Y

	//console.log("rhoX is: " + rhoX + " and rhoY is: " + rhoY);
	return [rhoX, rhoY];
}

function nodeConnection(){
	// This node is used to make corners where the algorithm can't position directly
	// This also should function to connect different valve trees when needed
}

function showTag(){
	if(showTagStatus == 0){
		showTagStatus = 1;
		showTagButton.style.background = "linear-gradient(to left, #743ad5, #d53a9d)";
	}
	else{
		showTagStatus = 0;
		showTagButton.style.background = "#202020";
	}
	console.log("showTagStatus now is: " + showTagStatus);

	drawLayout();

	return showTagStatus;
}

