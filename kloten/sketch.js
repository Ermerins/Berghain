var canvas; 
let balls = [];

function setup() {
  canvas = createCanvas(400, 400);

  for(var i = 0; i < 10; i++) {
    balls.push(new Ball());
  }

  mover = new Mover();
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(2);
  fill(255);

  for(ball in balls) {
    balls[ball].move();
    balls[ball].display();
  }

  stroke(100, 255, 0);
  fill(100, 255, 0);
  mover.display();
}

class Mover {
  constructor() {
    this.location = createVector(width/2, height/2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  // this will run in every draw loop
  display() {
    this.edges();
    
    ellipse(this.location.x, this.location.y, 40, 40);
    
    this.update();
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    mouse.sub(this.location);
    mouse.setMag(0.5);

    this.acceleration = mouse;

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.velocity.limit(5);

    // this.location.add(this.velocity);
    // this.velocity.add(this.acceleration);
  }

  edges() {
    if (this.location.x > width) this.location.x = 0;
    if (this.location.x < 0) this.location.x = width;
    if (this.location.y > height) this.location.y = 0;
    if (this.location.y < 0) this.location.y = height;
  }
}

class Ball {
  constructor() {
    this.x = random(width);
    this.y = random(height);

    this.xspeed = random(0, 10);
    this.yspeed = random(0, 10);
  }

  display() {
    ellipse(this.x, this.y, 20, 20);
  }

  move() {
    this.bounce();
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  bounce() {
    if ((this.x >= width) || (this.x <= 0)) { this.xspeed *= -1; }
    if ((this.y >= height) || (this.y <= 0)) { this.yspeed *= -1; }
  }
  
}