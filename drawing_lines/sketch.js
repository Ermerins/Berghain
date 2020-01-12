var canvas;
var song;
var button;

var previousAmps = [];

var linemode = true; 


function setup() {
  canvas = createCanvas(400, 400);
  angleMode(DEGREES);

  song = loadSound('../mallgrab.mp3', loaded);

  button = createButton('Play/Pause');
  button.mousePressed(function() {
    song.isPlaying() ? song.pause() : song.play();
  });

  amp = new p5.Amplitude();

  document.querySelector('canvas').addEventListener('click', toggleLineMode);
}

function toggleLineMode() {
  linemode = !linemode;
}

function loaded() {
  song.loop();
}

function draw() {
  background(0);

  var vol = amp.getLevel(); 
  previousAmps.push(vol);
  stroke(255);
  noFill();

  beginShape();
  linemode ? draw_line() : draw_circle();
  endShape();
}

function draw_line() {
  for (var i = 0; i < previousAmps.length; i++) {
    var y = map(previousAmps[i], 0, 1, height / 2, 0)
    vertex(i, y);
  }

  if (previousAmps.length > width / 2) {
    previousAmps.splice(0, 1);
  }
}

function draw_circle() {
  translate(width / 2, height / 2);

  for (var i = 0; i < 360; i++) {
    var r = map(previousAmps[i], 0, 1, 30, 600);
    var x = r * cos(i);
    var y = r * sin(i);

    vertex(x, y);
    fill(random(255), random(255), random(255));
  }

  if (previousAmps.length > 360) {
    previousAmps.splice(0, 1);
  }
}
