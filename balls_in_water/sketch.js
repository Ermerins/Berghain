let canvas;
let movers = [];
let water;

function setup() {
	canvas = createCanvas(400, 400);

	// Creating n movers
	for(let i = 0; i < 5; i++) {
		movers.push(new Mover());
	}
	
	// Create water
	water = new Water();
}

function draw() {
	background(0);

	// Draw the water
	fill(0, 0, 255);
	water.display();

	let gravity = createVector(0, 0.3);
	let wind = createVector(0.1, 0);

	for(var m in movers) {
		// Always apply the gravity
		movers[m].applyForce(gravity);

		// Apply the drag force in water
		if(water.contains(movers[m])) {
			applyDrag(movers[m]);
		}

		// Some wind from the left
		if(mouseIsPressed) {
			movers[m].applyForce(wind);
		}

		// Updating velocity, location, acceleration etc
		// Checking for edges
		// And display the mover
		fill(255);
		movers[m].update();
		movers[m].bounce();
		movers[m].display();
	}
	
}

/*
	Apply drag force in water
	Fdrag = -1/2 * rho (density) * ||Fvel||^2 * A (surface area) * Coeff_drag * Fvel_unit
	Simpler: Fdrag = - C_d * ||vel||^2 * vel_norm
*/
function applyDrag(obj) {
	let drag = obj.velocity.copy();
	let speed = obj.velocity.mag();
	let drag_coeff = 0.1;

	drag.normalize();
	drag.mult(-1);
	drag.mult(drag_coeff * speed * speed);

	obj.applyForce(drag);
}

/*
	Actually this works better for falling balls through air.. 
	Apply friction
	Maar voor lucht gebruik je drag force
	F_friction = F_vel * -1 * mu * ||F_normal||
*/
function applyFriction(obj) {
	let friction = obj.velocity.copy();
	let friction_coeff = 0.05;
	friction.normalize();
	friction.mult(-1);
	friction.mult(friction_coeff);
	obj.applyForce(friction);
}




