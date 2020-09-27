 /*
	Creation date: 03/06/2020
	last update: 18/08/2020
	updater: Andrade, J. V.
	REV: 0.001
	Reviewer: Doe, J.
	Review Date: --/--/----

	The REV number represents:
		- 0.XXX: JS version
		- X.000: Iteration
*/

var digitalValve = class{
	constructor(
		tag,																			// This is a unique name of the valve
		posX,																			// X coordinate
		posY,																			// Y coordinate
		rotation,																		// Rotation angle in degrees
		action,																			// Open / Close / PopUp Menu / Context Menu
		status,																			// Opened / Closed / 
		command,
		description
	){
		this.tag = tag;
		this.posX = posX;
		this.posY = posY;
		this.rotation = rotation;
		this.action = action;
		this.status = status;
		this.command = command;
		this.description = description;

		addComponent2dataBase(this);
		dataBase.push(this);

		//let actionTest = retrieveAction(this.tag);
		//console.log(actionTest);

		if(this.tag == clickedElement){													// detects if this is the clicked element
	
			drawValve(this.tag, this.posX, this.posY, this.rotation, this.status);
	
			// draws context menu
			if(myAction == "openPopUp"){
				var valveContext = new contextMenu(
					this.tag + "_contextMenu",
					this.tag
				);
			}
		}
		else {
			drawValve(this.tag, this.posX, this.posY, this.rotation, this.status);
		}
	}
}

var contextMenu = class{
	constructor(
		tag,
		title,
		description,
		status,
		command,
		button0,
		button1,
		button2,
		button3,
		button4,
		button5,
	){
		this.tag = tag;
		this.title = title;
		//console.log(title);
		this.description = description;
		this.status = status;
		this.command = command;
		this.button0 = button0;
		this.button1 = button1;
		this.button2 = button2;
		this.button3 = button3;
		this.button4 = button4;
		this.button5 = button5;

		let lineWidth = 4;

		let contextMenuLeft = lineWidth/2;
		let contextMenuTop = (0.9 * project.offsetHeight);

		let contextMenuWidth = project.offsetWidth - contextMenuLeft - lineWidth;
		let contextMenuHeight = (0.1 * project.offsetHeight) - lineWidth;

		// Draw footer
		ctx.save()
		ctx.beginPath();
		ctx.rect(contextMenuLeft, contextMenuTop, contextMenuWidth, contextMenuHeight);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = "#FFFFFF";
		ctx.stroke();
		ctx.fillStyle = "#000000";
		ctx.fill();
		ctx.restore();

		// Retrieves buttons dimensions
		let percentage = 0.2 * contextMenuHeight;									// Used as button spacing and corner radius
		let buttonArcRadius = percentage / 2;
		let buttonWidth = (contextMenuWidth / 12) - (2 * percentage);
		let buttonHeight = contextMenuHeight - (2 * percentage);

		// Retrieves coordinates for drawing out the buttons
		let p1X = percentage;
		let p1Y = contextMenuTop + percentage;

		var openButton = new button(
			this.tag + "_Open",
			"Open",
			p1X,
			p1Y,
			buttonWidth,
			buttonHeight,
			buttonArcRadius,
			this.status,
			this.command
		);

		var closeButton = new button(
			this.tag + "_Close",
			"Close",
			2 * p1X + buttonWidth,
			p1Y,
			buttonWidth,
			buttonHeight,
			buttonArcRadius,
			this.status,
			this.command
		);this.posX = contextMenuLeft;
		this.posY = contextMenuTop;

		var stopButton = new button(
			this.tag + "_Stop",
			"Stop",
			3 * p1X + 2 * buttonWidth,
			p1Y,
			buttonWidth,
			buttonHeight,
			buttonArcRadius,
			this.status,
			this.command
		);

		// Draw footer title
		this.posX = contextMenuLeft;
		this.posY = contextMenuTop;
		
		let tagFont = (0.3 * contextMenuHeight) + "px Arial";
		let tagX = this.posX + (contextMenuWidth / 2);
		let tagY = this.posY + (contextMenuHeight / 2) + (parseInt(tagFont) / 2);
		ctx.font = tagFont;
		ctx.fillStyle = "#00FF00";
		ctx.textAlign = "center";
		let tagWidth = ctx.measureText(tag).width;
		ctx.fillText(this.title, tagX, tagY);

		console.log(
			tagFont + "\n"
			+ contextMenuLeft /*posX*/ + "\n"
			+ contextMenuTop /*posY*/ + "\n"
			+ contextMenuWidth + "\n"
			+ contextMenuHeight + "\n"
			+ tagX + "\n"
			+ tagY + "\n"
			+ tagWidth
		);
	}
}

var button = class{
	constructor(
		tag,
		text,
		posX,
		posY,
		width,
		height,
		radius,
		status,
		command,
		border,
		background,
	){
		this.tag = tag;
		this.text = text;
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.radius = radius;
		this.status = status;
		this.command = command;
		this.border = border;
		this.background = background;

		addComponent2dataBase(this);

		//let arcRadius = 0.05 * ((this.width + this.height) / 2);
		let p1X = posX + this.radius;
		let p1Y = posY + this.radius;
		let p2X = posX + this.width - this.radius;
		let p2Y = posY + this.height - this.radius;

		// Draw button
		ctx.save();																	// Save previous canvas configurations
		ctx.beginPath();
		ctx.arc(p1X, p1Y, this.radius, 1*Math.PI, 1.5*Math.PI);
		ctx.arc(p2X, p1Y, this.radius, 1.5*Math.PI, 0*Math.PI);
		ctx.arc(p2X, p2Y, this.radius, 0*Math.PI, 0.5*Math.PI);
		ctx.arc(p1X, p2Y, this.radius, 0.5*Math.PI, 1*Math.PI);

		ctx.closePath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#808080"
		ctx.stroke();
		ctx.fillStyle = "#202020";
		ctx.fill();
		ctx.restore();

		// Inner text
		let tagFont = (0.3 * this.height) + "px Arial";
		let tagX = posX + (this.width / 2);
		let tagY = posY + (this.height / 2) + (parseInt(tagFont) / 2);
		ctx.font = tagFont;
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = "center";
		let tagWidth = ctx.measureText(tag).width;
		ctx.fillText(text, tagX, tagY);
	}
}

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

	let g = defineSubdivision()[0];													// Get project's smaller grid division
	let G = defineSubdivision()[1];													// Get project's greater grid division

	// Define dimensions
	let l = 3 * g;																	// Valve symbol base length
	let L = G / 2;																	// Valve bezel base legth

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
		let tagFont = (5*g) + "px Arial";
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

		let l = Math.round(((4 * g) / Math.sqrt(2)) * 1000) / 1000;			// Calculates the valve's symbol rotation radius
		let L = Math.round((G / Math.sqrt(2)) * 1000) / 1000;				// Calculates the valve's bezel rotation radius

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
	let rho = angle * (Math.PI / 180);										// Converts angle to radians
	let sinR = Math.sin(rho);												// Get's the sin from the valve's current  angle
	let cosR = Math.cos(rho);												// Get's the cos from the valve's current  angle
	let rhoX = Math.round((X * sinR) * 1000) / 1000;						// Converts to polar X
	let rhoY = Math.round((Y * cosR) * 1000) / 1000;						// Converts to polar Y

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

	drawLayout();

	return showTagStatus;
}
/*
function retrieveAction(searchedValve){
	let searchedValveIndex;
	for(var i = 0; i < dataBase.length; i++){
		if(dataBase[i].tag == searchedValve){
			searchedValveIndex = i;
		}
	}
	console.log(clickedElement);
	console.log(searchedValveIndex);
	return searchedValve;
}
*/
