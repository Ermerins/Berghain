var canvas;

let movers = [];

function setup() {
	canvas = createCanvas(400, 400);

	for(let i = 0; i < 10; i++) {
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
	
		movers[m].update();
		movers[m].display();
	}
	
}

class Mover {

	constructor() {
		this.location = createVector(200, 60);
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);

		this.mass = 10;
	}

	display() {
		ellipse(this.location.x, this.location.y, 20, 20);
	}

	update() {
		this.bounce();
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	// acceleration = force / mass
	applyForce(force) {
		// dit gaat fout omdat ie voor elk object dezelfde force deelt 
		let f = force;
		f.div(this.mass);
		//  var f = force.div(this.mass);
		this.acceleration.add(f); 
	}

	bounce() {
		if(this.location.x > width || this.location.x < 0) {
			if(this.location.x > width) { this.location.x = width};
			if(this.location.x < 0) {this.location.x = 0};
			this.velocity.x *= -1;
		}

		if(this.location.y > height || this.location.y < 0) {
			if(this.location.y > height) { this.location.y = height};
			if(this.location.y < 0) {this.location.y = 0};
			this.location.y = height;
			this.velocity.y *= -1;

		}	
	}


}