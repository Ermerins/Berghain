let canvas;
let movers = [];
let force_right;

function setup() {
	canvas = createCanvas(400, 400);

	movers[0] = new Mover(200, 200, 10);
	movers[1] = new Mover(100, 100, 50);

	movers[1].setVelocity(1, 0);
}

function draw() {
	background(0);

	for(m in movers) {
		movers[m].update();
		movers[m].display();
		movers[m].bounce();
	}


	let mover_1_attraction = movers[0].attract(movers[1]);


	movers[1].applyForce(mover_1_attraction);

}