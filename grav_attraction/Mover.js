class Mover {
	constructor(x, y) {
		this.location = createVector(x, y);
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.mass = random(1, 3);

		this.height = 20;
		this.width = 20;
	}

	// returns a vector that will be applied to the mover
	// F_grav = (G * m1 * m2) / d^2 * r_norm
	attract(mover) {
		let G = 1;

		let loc_mover = mover.location.copy();
		let loc_attractor = this.location.copy();

		let mass_mover = mover.mass.copy();
		let mass_attractor = this.mass.copy();

		// Get direction of the force (and d)
		let force = loc_attractor.sub(loc_mover);
		let d = force.mag();
		force.normalize();

		// Get magnitude of the force
		let strength = (G * mass_mover * mass_attractor) / (d * d);
		
		return force.mult(strength);
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

