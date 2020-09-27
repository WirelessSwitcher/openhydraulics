/*
	Creation date: 03/06/2020
	last update: 18/08/2020
	updater: Andrade, J. V.
	REV: 0.001
	Reviewer: Doe, J.
	Review Date: --/--/--

	The REV number represents:
		- 0.XXX: JS version
		- X.000: Iteration
*/

function drawProject(){
	var valve1 = new digitalValve("valve1", 10, 60, 90);
	var valve2 = new digitalValve("Valve2", 40, 30, 0);

	var valve3 = new digitalValve("Valve3", 60, 20, 0);
	var valve4 = new digitalValve("Valve4", 100, 50, 0);

	var valve5 = new digitalValve("Dingetje", 80, 90, 270);

	//console.log(valve1.present()[0] + ", " + valve1.present()[1]);

	var tree1 = [valve1, valve2, valve3, valve4];
	var tree2 = [valve3, valve5];

	drawPipe(tree1);
	drawPipe(tree2);
}
