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

var colors = ['#eeeeee', '#cccccc', '#aaaaaa', '#999999', '#666666', '#333333'];

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
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// JSON loader
function loadJSON(file, callback) {

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Objects
function Planet(x, y, radius, distance, velocity, color, line, name) {
  this.x;
  this.y;
  this.center = { x: x, y: y };
  this.distance = distance;
  this.color = color;
  this.radius = radius;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = velocity;
  this.line = line;
  this.zoom = 1;
  this.name = name;
}

Planet.prototype.update = function () {
  this.radians += this.velocity;

  this.x = this.center.x + Math.cos(this.radians) * (this.distance * this.zoom);
  this.y = this.center.y + Math.sin(this.radians) * (this.distance * this.zoom);
  this.draw();
};

Planet.prototype.setZoom = function (zoom) {
  this.zoom = zoom;
};

Planet.prototype.draw = function () {
  if (this.line) {
    c.beginPath();
    c.arc(this.center.x, this.center.y, this.distance * this.zoom, 0, 2 * Math.PI, false);
    c.lineWidth = 1;
    c.strokeStyle = '#090909';
    c.stroke();
  }

  c.beginPath();
  c.arc(this.x, this.y, this.radius * this.zoom, 0, 2 * Math.PI, false);
  c.fillStyle = this.color;
  c.fill();
  c.lineWidth = 2;
  c.strokeStyle = '#000';
  c.stroke();

  if (this.name) {
    c.font = "12px Arial";
    c.fillText(this.name, this.x + (this.radius + 1) * this.zoom, this.y + (this.radius + 1) * this.zoom);
  }
};

// Implementation
var planets = void 0;
var stars = void 0;
var data = void 0;
var zoom = 1;

var factorDistance = 100;

function init() {
  planets = [];
  stars = [];

  document.addEventListener("wheel", function (e) {
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    if (delta < 1) {
      zoom += 0.1;
    } else {
      zoom -= 0.1;
    }
  });

  loadJSON("/js/planet-data.json", function (response) {
    data = JSON.parse(response);

    // Stars
    for (var i = 0; i < 200; i++) {
      var radius = Math.random() * (5000 - 1000) + 1000;
      var _distance = Math.random() * 10 + 1;
      var velocity = 0;
      stars.push(new Planet(canvas.width / 2, canvas.height / 2, radius / 2000, _distance * factorDistance, velocity / 2000, randomColor(colors), false, false));
    }

    // Asteroidengürtel
    for (var _i = 0; _i < 1000; _i++) {
      var _radius = Math.random() * (5000 - 1000) + 1000;
      var _distance2 = Math.random() * (3.4 - 2) + 2;
      var _velocity = Math.random() * 2 + 1;
      planets.push(new Planet(canvas.width / 2, canvas.height / 2, _radius / 2000, _distance2 * factorDistance, _velocity / 2000, randomColor(colors), false, false));
    }

    // Planet
    data.forEach(function (planet) {
      planets.push(new Planet(canvas.width / 2, canvas.height / 2, planet.props.radius / 1000, planet.props.distance * factorDistance, planet.props.velocity / 2000, planet.props.color, true, planet.label));
    });
  });
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.fillStyle = '#000';
  c.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(function (star) {
    star.update();
  });

  planets.forEach(function (planet) {
    planet.setZoom(zoom);
    planet.update();
  });
}

init();
animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map