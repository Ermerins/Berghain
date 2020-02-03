var canvas; 
var i = 0;

var a = 0.0;
var aVelocity = 0.0;
var aAcceleration = 0.0001;

function setup() {
  canvas = createCanvas(400, 400);
}


function draw() {
  background(0);
  stroke(255);
  rectMode(CENTER);

  a += aVelocity;
  aVelocity += aAcceleration;

  translate(height/2, width/2);
  rotate(a);
  rect(0, 0, 64, 36)
}
