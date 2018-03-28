// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#00bdff', '#4d39ce', '#088eff'];

// Event Listeners
addEventListener('mousemove', event =>{
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
};

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

// Set layout
function Layout(x, y, radius, width) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.width = width;
}

Layout.prototype.update = function () {
  this.draw()
};

Layout.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  c.lineWidth = this.width;
  c.strokeStyle = '#222';
  c.stroke();
};

// Objects
function Button(name, path, x, y, radius, color) {
  this.name = name;
  this.path = path;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.position = 1;
};

Button.prototype.update = function () {
  this.draw()
};

Button.prototype.draw = function () {

  this.position += 0.002;

  // button
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 5 + this.position+0.7, 2*Math.PI + this.position+0.7);
  c.lineWidth = this.width;
  c.strokeStyle = '#666';
  c.stroke();

  // Text
  const textPos = {
    x: this.x + Math.cos(this.position) * (this.radius-3),
    y: this.y + Math.sin(this.position) * (this.radius-3)
  };

  c.save();
  c.translate(textPos.x, textPos.y);
  c.rotate(2*Math.PI + (this.position + 1.6));
  c.font = "20px serif";
  c.fillStyle = "#00df00"; // green
  c.textAlign = "center";
  c.fillText(this.name, 0, 0 );
  c.restore();



};

// Implementation
let buttons;
let layout;

function init() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = (canvas.height / 2) - 80;

  layout = new Layout(centerX, centerY, radius, 70);

  buttons = [];

  buttons.push(new Button('Test', '#', centerX, centerY, radius, 68));

  // for (let i = 0; i < 50; i++) {
  //     const radius = (Math.random() * 2) + 1;
  //     particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
  // }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = '#000';
  c.fillRect(0, 0, canvas.width, canvas.height);

  layout.update();

  // c.fillStyle = 'rgba(255, 255, 255, 0.05)';
  // c.fillRect(0, 0, canvas.width, canvas.height);

  buttons.forEach(button => {
    button.update();
  });
}

init();
animate();
