/*
	coulomb.js
	Simulasi interaksi dua partikel akibat potensial Coulomb
	Kode : B4
	
	Asumsi:
	Massa dan diameter partikel dibuat sangat besar agar dapat disimulasikan
	
	Natasha Flaminggo
	10215032
*/

// Define global variables
var h1, btn, ta, can;
var proc, Tproc;
var tbeg, tend, dt, t;
var Tdata, Ndata, idata;
var m1, D1, x1, y1, v1, cL1, cF1;
var m2, D2, x2, y2, v2, cL2, cF2;
var xmin, ymin, xmax, ymax;
var k, q1, q1, theta;

// Execute main function
main();

// Define main function
function main() {
	// Create and arrange elements
	createAndArrangeElements();
	
	// Initialize parameters
	initParams();
}

// Initialize parameters
function initParams() {
	// Set iteration parameters
	Tproc = 1;
	tbeg = 0;
	tend = 0.1;
	dt = 0.00001;
	t = tbeg;
	Tdata = 0.001;
	Ndata = Math.round(Tdata / dt);
	idata = Ndata;
	
	// Set collision parameters
	k = 9000000000; //Nm^2/C^2
	q1 = -0.000005; //C
	q2 = 0.0000008; //C
	
	// Set physical system parameters of mass m1 and m2
	m1 = 0.01; // kg
	D1 = 0.01; // m
	m2 = 0.01; // kg
	D2 = 0.01; // m
	
	// Set color of m1 and m2
	cL1 = "#f00";
	cF1 = "#fcc";
	cL2 = "#00f";
	cF2 = "#ccf";
	
	// Set initial conditions
	x1 = -0.05; // m
	y1 = 0; // m
	v1x = 0; // m/s
	v1y = 0; // m/s
	x2 = 0.05; // m
	v2x = 0; // m/s
	v2y = 0; // m/s
	y2 = 0.05; // m
	
	// Set drawing area
	xmin = -0.2; // m
	ymin = -0.1; // m
	xmax = 0.2; // m
	ymax = 0.2; // m
	
	//Calculate angle between two particles
	theta = Math.atan((y2-y1)/(x2-x1));
	
	// Display header information
	ta.value = "# t\tx1\ty1\tv1x\tv1y\tx2\ty2\tv2x\tv2y\n";
}

// Perform simulation
function simulate() {
	
	if(idata == Ndata) {
		// Display results on textarea
		ta.value += t.toFixed(4) + "\t"
			+ x1.toFixed(4) + "\t" + y1.toFixed(4) + "\t" 
			+ v1x.toFixed(4) + "\t" + v1y.toFixed(4) + "\t" 
			+ x2.toFixed(4) + "\t" + y2.toFixed(4) + "\t" 
			+ v2x.toFixed(4) + "\t" + v2y.toFixed(4) + "\n";
		ta.scrollTop = ta.scrollHeight;
		
		// Display mass position of canvas
		clearCanvas(can);
		drawMassOnCanvas(x1, y1, 0.5 * D1, cL1, cF1, can);
		drawMassOnCanvas(x2, y2, 0.5 * D2, cL2, cF2, can);
		
		idata = 0;
	}
	
	// Calculate overlap
	var l12 = Math.abs(x1 - x2);
	var xi = Math.max(0, 0.5 * (D1 + D2) - l12);
	
	//Calculate Coulomb's Force
	var r = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	var F1 = -k*q1*q2/(r*r);
	var F1x = F1*Math.cos(theta);
	var F1y = F1*Math.sin(theta);
	var F2x = -F1x;
	var F2y = -F1y;
	
	// Use Newton 2nd law of motion
	var a1x = F1x / m1;
	var a1y = F1y / m1;
	var a2x = F2x / m2;
	var a2y = F2y / m2;
	
	
	// Implement Euler method
	v1x = v1x + a1x*dt;
	v1y = v1y + a1y*dt;
	x1 = x1 + v1x*dt;
	y1 = y1 + v1y*dt;
	
	v2x = v2x + a2x*dt;
	v2y = v2y + a2y*dt;
	x2 = x2 + v2x*dt;
	y2 = y2 + v2y*dt;

	// Terminate simulation if condition meets		
	if(t >= tend || xi!=0) {
		clearInterval(proc);
		btn.innerHTML = "Start";
		btn.disabled = true;
	} else {
		t +=dt;
		idata++;
	}
}

// Clear canvas
function clearCanvas(can) {
	var cx = can.getContext("2d");
	cx.clearRect(0, 0, can.width, can.height);
}

// Display mass position of canvas
function drawMassOnCanvas(x, y, R, cLine, cFill, can) {
	var cx = can.getContext("2d");
	
	// Get canvas coordinate
	var XMIN = 0;
	var YMIN = can.height;
	var XMAX = can.width;
	var YMAX = 0;
	
	// Draw mass
	var RR = tx(2*R) - tx(R);
	cx.beginPath();
	cx.strokeStyle = cLine;
	cx.lineWidth = 4;
	cx.arc(tx(x), ty(y), RR, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = cFill;
	cx.fill();
	
	// Transform x from real coordinate to canvas coordinate
	function tx(x) {
		var xx = (x - xmin) / (xmax - xmin) * (XMAX - XMIN) + XMIN;
		return xx;
	}
	
	// Transform y from real coordinate to canvas coordinate
	function ty(y) {
		var yy = (y - ymin) / (ymax - ymin) * (YMAX - YMIN) + YMIN;
		return yy;
	}
}

// Create and arrange elements
function createAndArrangeElements() {
	// Create text with style h1
	h1 = document.createElement("h1");
	h1.innerHTML = "Interaksi 2 Partikel Akibat Potensial Coulomb";
	
	// Create start button
	btn = document.createElement("button");
	btn.innerHTML = "Start";
	btn.style.width = "48px";
	btn.style.float = "left";
	btn.addEventListener("click", btnClick);
		
	// Create output textarea
	ta = document.createElement("textarea");
	ta.style.width = "600px";
	ta.style.height = "146px";
	ta.style.overflowY = "scroll";
	
	// Create a canvas
	can = document.createElement("canvas");
	can.width = "1000";
	can.height = "500";
	can.style.width = can.width + "px";
	can.style.height = can.height + "px";
	can.style.border = "1px solid #ccc";
	
	// Arrange elements
	document.body.append(h1);
	document.body.append(btn);
	document.body.append(ta);
	document.body.append(can);
}

// Handle button click event
function btnClick() {
	var cap = event.target.innerHTML;
	if(cap == "Start") {
		console.log("Start");
		event.target.innerHTML = "Stop";
		proc = setInterval(simulate, Tproc);
	} else {
		console.log("Stop");
		event.target.innerHTML = "Start";
		clearInterval(proc);
	}
}