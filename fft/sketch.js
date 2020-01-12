var canvas;
var song;
var button;
var fft;
var w; 

function setup() {
  canvas = createCanvas(500, 500);
  angleMode(DEGREES);
  colorMode(HSB);

  song = loadSound('../mallgrab.mp3', loaded);

  button = createButton('Play/Pause');
  button.mousePressed(function() {
    song.isPlaying() ? song.pause() : song.play();
  });

  fft = new p5.FFT(0.9, 256);
  w = width / 64;
}


function loaded() {
  song.loop();
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  console.log(spectrum);
  noStroke();
  translate(width / 2, height / 2);

  beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];

    // var y = map(amp, 0, 256, height, 0);
    var r = map(amp, 0, 256, 40, 200);
    var x = r * cos(angle);
    var y = r * sin(angle);

    // fill(i, 255, 255);
    // line(i * w, height, i * w, y);
    // rect(i * w, y, w - 3, height - y);
    vertex(x, y);
  }
  endShape();

}