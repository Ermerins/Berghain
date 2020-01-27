var canvas;
let movers = [];

function setup() {
	canvas = createCanvas(400, 400);

	// Creating n movers
	for(let i = 0; i < 5; i++) {
		movers.push(new Mover());
	}
	
}

function draw() {
	background(0);

	let gravity = createVector(0, 0.3);
	let wind = createVector(0.1, 0);

	for(var m in movers) {
		movers[m].applyForce(gravity);

		if(mouseIsPressed) {
			movers[m].applyForce(wind);
		}

		// Apply friction
		// Maar voor lucht gebruik je drag force
		// F_friction = F_vel * -1 * mu * ||F_normal||
		if(true) {
			let friction = movers[m].velocity.copy();
			let friction_coeff = 0.05;
			friction.normalize();
			friction.mult(-1);
			friction.mult(friction_coeff);
			movers[m].applyForce(friction);
		}
		
		// Apply drag force
	
		// Updating velocity, location, acceleration etc
		// Checking for edges
		// And display the mover
		movers[m].update();
		movers[m].bounce();
		movers[m].display();
	}
	
}

class Mover {
	constructor(id) {
		this.location = createVector(random(50, width - 50), 60);
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.mass = random(1, 3);

		this.height = 20;
		this.width = 20;
	}

	display() {
		ellipse(this.location.x, this.location.y, this.height, this.width);
	}

	// Multiply acceleration by 0 to prevent endless acceleration
	update() {
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	// acceleration = force / mass
	// let op: objects (zoals force) zijn pass by reference dus doe copy() op een vec obj
	applyForce(force) {
		let f = force.copy().div(this.mass);
		this.acceleration.add(f); 
	}

	// Checking for the edges
	bounce() {
		if(this.location.x > width - (this.width / 2) || this.location.x < this.width / 2) {
			if(this.location.x > width - (this.width / 2)) { this.location.x = width - (this.width / 2)};
			if(this.location.x < this.width / 2) {this.location.x = this.width / 2};
			this.velocity.x *= -1;
		}

		if(this.location.y > height - (this.height / 2) || this.location.y < this.height / 2) {
			if(this.location.y > height - (this.height / 2)) { this.location.y = height - (this.height / 2)};
			if(this.location.y < this.height / 2) {this.location.y = this.height / 2};
			this.velocity.y *= -1;
		}	
	}


}