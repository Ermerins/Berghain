let canvas;
let movers = [];

function setup() {
	canvas = createCanvas(400, 400);

	movers[0] = new Mover(50, 200);
	movers[1] = new Mover(width - 20, height - 20);
}

function draw() {
	background(0);

	for(m in movers) {
		movers[m].update();
		movers[m].display();
		movers[m].bounce();
	}

	// applyGravitationalForce(movers[0], movers[1]);
	// applyGravitationalForce(movers[1], movers[0]);
}

/*
	F_grav = (G * m1 * m2) / d^2 * r_norm
*/
function applyGravitationalForce(obj1, obj2) {
	let G = 10;
	let mass1 = obj1.mass;
	let mass2 = obj2.mass;
	let loc1 = obj1.location.copy();
	let loc2 = obj2.location.copy();

	let dir = loc2.sub(loc1);
	let d = dir.mag();

	dir.normalize();
	dir.mult((G * mass1 * mass2) / (d * d));

	obj1.applyForce(dir);
}
