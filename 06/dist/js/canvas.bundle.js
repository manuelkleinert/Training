/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = ['#00bdff', '#4d39ce', '#088eff'];

// Event Listeners
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', function () {
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
  var xDist = x2 - x1;
  var yDist = y2 - y1;

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
  this.draw();
};

Layout.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
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
  this.draw();
};

Button.prototype.draw = function () {

  this.position += 0.002;

  // button
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 5 + this.position + 0.7, 2 * Math.PI + this.position + 0.7);
  c.lineWidth = this.width;
  c.strokeStyle = '#666';
  c.stroke();

  // Text
  var textPos = {
    x: this.x + Math.cos(this.position) * (this.radius - 3),
    y: this.y + Math.sin(this.position) * (this.radius - 3)
  };

  c.save();
  c.translate(textPos.x, textPos.y);
  c.rotate(2 * Math.PI + (this.position + 1.6));
  c.font = "20px serif";
  c.fillStyle = "#00df00"; // green
  c.textAlign = "center";
  c.fillText(this.name, 0, 0);
  c.restore();
};

// Implementation
var buttons = void 0;
var layout = void 0;

function init() {
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = canvas.height / 2 - 80;

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

  buttons.forEach(function (button) {
    button.update();
  });
}

init();
animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map