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

var digitalValve = class{
	constructor (
		tag,
		posX,
		posY,
		orientation,
		status,
		command
	) {
		this.tag = tag;
		this.posX = posX;
		this.posY = posY;
		this.orientation = orientation;
		this.status = status;
		this.command = command;
		drawValve(this.tag, this.posX, this.posY, this.orientation, this.status);
	}	
}

function drawValve(tag, xPos, yPos, orientation, status){

	let projectWidth = project.clientWidth;
	let gridScale = defineGridscale();

	let g = defineSubdivision(projectWidth, gridScale)[0];
	let G = defineSubdivision(projectWidth, gridScale)[1];

	let x = xPos * g;
	let y = yPos * g;

	let valveIn = [0, 0];						// Creates an array to store valve input's X and Y coordinates
	let valveOut = [0, 0];						// Creates an array to store valve input's X and Y coordinates

	ctx.save();

	// Rotates the valve 180° when needed
	if(orientation == "vertical"){
		// Rotates the canvas
		ctx.translate((x + G/2), (y + G/2));
		ctx.rotate(Math.PI/2);
		ctx.translate((-1)*(x + G/2), (-1)*(y + G/2));
	}
	else{
		// Restore the canvas to original position
		ctx.restore();
	}

	// Draw bezel
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+G, y);
	ctx.lineTo(x+G, y+G);
	ctx.lineTo(x, y+G);
	ctx.lineTo(x, y);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#FFFF80"
	ctx.stroke();

	// Draw internal valve symbol
	// Input Triangle
   	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#00FF00"
	ctx.moveTo(x+(2*g), y+(2*g));
	ctx.lineTo(x+(G/2), y+(G/2));
	ctx.lineTo(x+(2*g), y+G-(2*g));
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = "grey";
	ctx.fill();
	// Output Triangle
   	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#00FF00"
	ctx.moveTo(x+(G/2), y+(G/2));
	ctx.lineTo(x+G-(2*g), y+(2*g));
	ctx.lineTo(x+G-(2*g), y+G-(2*g));
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = "grey";
	ctx.fill();

	ctx.restore();

	return[valveIn, valveOut];
}

function drawPipe(valve1, valve2){

	let projectWidth = project.clientWidth;
	let gridScale = defineGridscale();

	let g = defineSubdivision(projectWidth, gridScale)[0];
	let G = defineSubdivision(projectWidth, gridScale)[1];

	v1_input = valve1[0];
	v1_output = valve1[1];

	v1_inX = v1_input[0];
	v1_inY = v1_input[1];
	v1_outX = v1_output[0];
	v1_outY = v1_output[1];

	console.log("v1_inX is: " + v1_inX +
	"\n" + "v1_inY is: " + v1_inY +
	"\n" + "v1_outX is: " + v1_outX +
	"\n" + "v1_outY is: " + v1_outY);

	v2_input = valve2[0];
	v2_output = valve2[1];

	v2_inX = v2_input[0];
	v2_inY = v2_input[1];
	v2_outX = v2_output[0];
	v2_outY = v2_output[1];

	let point1 = [0, 0];
	let point2 = [0, 0];

	if(v1_inX == v1_outX){

		console.log("Valve is in VERTICAL position");

		if(v1_inY < v1_outY){
			console.log("Output on TOP");
			point1[0] = v1_outX;
			point1[1] = v1_outY - g;
		}
		else {
			console.log("Output on BOTTOM");
			point1[0] = v1_outX;
			point1[1] = v1_outY + g;
		}
	}
	else {

		// Valve is in HORIZONTAL position

		if(v1_inX > v1_outX){
			console.log("Output on RIGHT");
			point1[0] = v1_outX + g;
			point1[1] = v1_outY;
		}
		else {
			console.log("Output on LEFT");
			point1[0] = v1_outX - g;
			point1[1] = v1_outY;
		}

	}

	ctx.save();

	ctx.beginPath();
	ctx.moveTo(v1_outX, v1_outY);
	ctx.lineTo(point1[0], point1[1]);
	ctx.lineTo(v2_inX, v2_inY);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#FF0000"
	ctx.stroke();

	//ctx.restore();
}

function nodeConnection(){
	// This node is used to make corners where the algorithm can't position directly
	// This also should function to connect different valve trees when needed
}