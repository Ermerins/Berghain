var canvas; 

var x = 200;
var y = 200;

function setup() {
  canvas = createCanvas(400, 400);
  background(0);
}

function draw() {
  stroke(255);
  strokeWeight(2);
  point(x, y);

  var r = floor(random(0, 4));

  switch(r) {
    case 0: x += 1; break;
    case 1: x -= 1; break;
    case 2: y += 1; break;
    case 3: y -= 1; break;
  }
}