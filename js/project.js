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

/* this should be in a different*/

function drawProject(){
	var valve1 = drawValve("Valve1", 10, 10, "vertical");
	var valve2 = drawValve("Valve2", 30, 30, "horizontal");

	var valve3 = drawValve("Valve3", 70, 20, "horizontal");
	var valve4 = drawValve("Valve4", 70, 50, "horizontal");

	var valve5 = new digitalValve("valve5", 90, 40, "vertical");
	//valve5.drawValve();
	console.log(valve5.tag);

	drawPipe(valve1, valve2);
}