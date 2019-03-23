(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arr = arr;

function arr(x, y) {
  return x + y;
}
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.age = exports.name = void 0;
var name = 'jack';
exports.name = name;
var age = 18;
exports.age = age;
},{}],3:[function(require,module,exports){
"use strict";

var _add = require("./add");

var _add2 = require("./add2");

console.log((0, _add.arr)(10, 5));
console.log(_add2.name, _add2.age);
},{"./add":1,"./add2":2}]},{},[3])