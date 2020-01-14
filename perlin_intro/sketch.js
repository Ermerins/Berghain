var canvas; 
var t = 0;

function setup() {
  canvas = createCanvas(400, 400);
  frameRate(60);
}

function draw() {
  background(0);
  fill(255);

  x = noise(t);
  x = map(x,0,1,0,width);

  ellipse(x, height/2, 40, 40);

  t += 0.01;
}