/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/bootstrap.ts":
/*!*****************************!*\
  !*** ./src/ts/bootstrap.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");

/***/ }),

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var snake_1 = __webpack_require__(/*! ./modules/snake */ "./src/ts/modules/snake.ts");

__webpack_require__(/*! ./bootstrap */ "./src/ts/bootstrap.ts");

var state_1 = __webpack_require__(/*! ./modules/state */ "./src/ts/modules/state.ts");

new snake_1["default"](new state_1["default"]("#score"), {
  level: parseInt(prompt("Entrez un niveau entre 1 et 4"))
}).start();

/***/ }),

/***/ "./src/ts/modules/Direction.ts":
/*!*************************************!*\
  !*** ./src/ts/modules/Direction.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = {
  LEFT: 4,
  RIGHT: 6,
  TOP: 8,
  BOTTOM: 2
};

/***/ }),

/***/ "./src/ts/modules/block.ts":
/*!*********************************!*\
  !*** ./src/ts/modules/block.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Block = void 0;

var values_1 = __webpack_require__(/*! ./values */ "./src/ts/modules/values.ts");

var Block = /*#__PURE__*/function () {
  function Block(props) {
    _classCallCheck(this, Block);

    this.sizeX = values_1.STEPX;
    this.sizeY = values_1.STEPY;
    this.position = props.position;
    this.isFirst = props.isFirst ? props.isFirst : false;
    this.initializeComponents();
  }

  _createClass(Block, [{
    key: "initializeComponents",
    value: function initializeComponents() {
      this.el = document.createElement('span');
      this.el.className = 'block';
      this.el.style.width = this.sizeX + 'px';
      this.el.style.height = this.sizeY + 'px';

      if (this.isFirst) {
        this.el.classList.add('is-first');
      } else {
        this.el.classList.add('is-body');
      }

      this._position = {
        x: 0,
        y: 0
      };
      this.el.style.top = this.position.y + 'px';
      this.el.style.left = this.position.x + 'px';
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(position) {
      this._position = this.position; // Saving last position

      this.position = position; // Overridding actual position
      // Updating element on front-end

      this.el.style.top = this.position.y + 'px';
      this.el.style.left = this.position.x + 'px';
    }
  }]);

  return Block;
}();

exports.Block = Block;

/***/ }),

/***/ "./src/ts/modules/point.ts":
/*!*********************************!*\
  !*** ./src/ts/modules/point.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Point = void 0;

var values_1 = __webpack_require__(/*! ./values */ "./src/ts/modules/values.ts");

var Point = /*#__PURE__*/function () {
  function Point() {
    _classCallCheck(this, Point);

    this.el = document.createElement('span');
    this.position = {
      x: 0,
      y: 0
    };
    this.initializeComponents();
  }

  _createClass(Point, [{
    key: "initializeComponents",
    value: function initializeComponents() {
      this.el.style.width = values_1.STEPX + 'px';
      this.el.style.height = values_1.STEPY + 'px';
      this.el.className = 'block mouse';
      this.updatePosition();

      values_1._table.appendChild(this.el);
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      this.position = {
        x: Math.round(Math.random() * (values_1.xDiv - 1)) * values_1.STEPX,
        y: Math.round(Math.random() * (values_1.yDiv - 1)) * values_1.STEPY
      };
      this.el.style.top = this.position.y + 'px';
      this.el.style.left = this.position.x + 'px';
      console.log(this.position);
    }
  }]);

  return Point;
}();

exports.Point = Point;

/***/ }),

/***/ "./src/ts/modules/snake.ts":
/*!*********************************!*\
  !*** ./src/ts/modules/snake.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 *  =========[ SNAKE GAME ]==========
 * Just for fun. Play with your keyboard (up, down, left, right)
 * Author: @joecamer , @Dy05
 * I allow you to use this code. It's 100% opensource
 * If you wanted to collaborate, then you are welcome
 *
 * All what I want is a little star
 * For second release by @Dy05.
 * Adding pause with Echap key and Restart game option withou any Style :-P
 */

var Direction_1 = __webpack_require__(/*! ./Direction */ "./src/ts/modules/Direction.ts");

var point_1 = __webpack_require__(/*! ./point */ "./src/ts/modules/point.ts");

var block_1 = __webpack_require__(/*! ./block */ "./src/ts/modules/block.ts");

var values_1 = __webpack_require__(/*! ./values */ "./src/ts/modules/values.ts");

var isPaused;
var isFinished = false;

var Snake = /*#__PURE__*/function () {
  function Snake(state, props) {
    var _this = this;

    _classCallCheck(this, Snake);

    this.keyboardControlEvent = function (_ref) {
      var keyCode = _ref.keyCode;

      switch (keyCode) {
        case 37:
          if (_this.direction !== Direction_1["default"].RIGHT) {
            _this.direction = Direction_1["default"].LEFT;
          }

          break;

        case 38:
          if (_this.direction !== Direction_1["default"].BOTTOM) {
            _this.direction = Direction_1["default"].TOP;
          }

          break;

        case 39:
          if (_this.direction !== Direction_1["default"].LEFT) {
            _this.direction = Direction_1["default"].RIGHT;
          }

          break;

        case 40:
          if (_this.direction !== Direction_1["default"].TOP) {
            _this.direction = Direction_1["default"].BOTTOM;
          }

          break;
      }
    };

    this.keyboardEscEvent = function (_ref2) {
      var keyCode = _ref2.keyCode;

      if (keyCode === 27) {
        if (!isFinished) {
          if (isPaused) {
            _this.pauseStop();
          } else {
            _this.pauseStart();
          }
        }
      }
    };

    this.level = props.level - 1 || 1;
    this.state = state;
    this.initializeComponents();
  }

  _createClass(Snake, [{
    key: "initializeComponents",
    value: function initializeComponents() {
      if (isPaused === undefined) {
        isPaused = false;
      } else {
        document.querySelectorAll('.block').forEach(function (elmt) {
          return elmt.remove();
        });
      }

      this.mouse = new point_1.Point();
      document.querySelector('#level').innerHTML = values_1.Levels[this.level].title;
      this.direction = Direction_1["default"].RIGHT;
      this.blocks = [new block_1.Block({
        position: {
          x: values_1.STEPX,
          y: values_1.STEPY
        },
        isFirst: true
      })];

      for (var i = 0; i < this.level * 2; i++) {
        this.blocks.push(new block_1.Block({
          position: {
            x: 0,
            y: values_1.STEPY
          },
          range: i + 1
        }));
      }
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      var _this2 = this;

      var gameOver_box = document.querySelector("#gameOver-box");
      var yesBtn = document.querySelector("#yesBtn");
      var answers = {
        yes: function yes(event) {
          var keyCode = event.keyCode;

          if (!keyCode || keyCode && keyCode === 32) {
            _this2.state.scores = 0;

            _this2.initializeComponents();

            _this2.start();

            isFinished = false;
            renew();
          }
        }
      };

      var renew = function renew() {
        gameOver_box.classList.remove("animate__bounceIn");
        gameOver_box.classList.add("animate__bounceOut");
        yesBtn.removeEventListener('click', answers.yes);
        document.body.removeEventListener('keydown', answers.yes);
      };

      this.stop();
      document.body.removeEventListener('keydown', this.keyboardEscEvent);
      document.body.addEventListener('keydown', answers.yes);
      yesBtn.addEventListener('click', answers.yes);
      gameOver_box.className = "gb-visible animate__animated animate__bounceIn";
    }
  }, {
    key: "walk",
    value: function walk() {
      var _this3 = this;

      var alignedX = this.mouse.position.x === this.blocks[0].position.x;
      var alignedY = this.mouse.position.y === this.blocks[0].position.y;

      if (alignedX && alignedY) {
        this.increase();
        this.mouse.updatePosition();
        this.state.scores += values_1.Levels[this.level].score;
      }

      this.blocks.forEach(function (_) {
        values_1._table.appendChild(_.el);
      });
      this.blocks.forEach(function (b, i) {
        var position;

        if (i === 0) {
          switch (_this3.direction) {
            case Direction_1["default"].LEFT:
              position = {
                x: b.position.x - values_1.STEPX,
                y: b.position.y
              };
              _this3.blocks[0].el.style.transform = 'rotate(90deg)';
              break;

            case Direction_1["default"].RIGHT:
              position = {
                x: b.position.x + values_1.STEPX,
                y: b.position.y
              };
              _this3.blocks[0].el.style.transform = 'rotate(-90deg)';
              break;

            case Direction_1["default"].TOP:
              position = {
                x: b.position.x,
                y: b.position.y - values_1.STEPY
              };
              _this3.blocks[0].el.style.transform = 'rotate(180deg)';
              break;

            case Direction_1["default"].BOTTOM:
              position = {
                x: b.position.x,
                y: b.position.y + values_1.STEPY
              };
              _this3.blocks[0].el.style.transform = 'rotate(-360deg)';
              break;
          }
        } else {
          position = {
            x: _this3.blocks[i - 1]._position.x,
            y: _this3.blocks[i - 1]._position.y
          };
        }

        b.updatePosition(position);
      });
    }
  }, {
    key: "increase",
    value: function increase() {
      this.blocks.push(new block_1.Block({
        position: this.blocks[this.blocks.length - 1]._position
      }));
    }
  }, {
    key: "start",
    value: function start() {
      this.launch();
      this.play();
      document.body.addEventListener('keydown', this.keyboardEscEvent);
    }
  }, {
    key: "play",
    value: function play() {
      var _this4 = this;

      document.body.addEventListener('keydown', this.keyboardControlEvent);
      this.timer = setInterval(function () {
        var maxX = values_1.STEPX * 2;
        var maxY = values_1.STEPY * 2;
        var hx = _this4.blocks[0].position.x + maxX;
        var hy = _this4.blocks[0].position.y + maxY;
        var d = _this4.direction;

        if (hx >= values_1.tableX && d === Direction_1["default"].RIGHT || hx <= maxX && d === Direction_1["default"].LEFT || hy >= values_1.tableY && d === Direction_1["default"].BOTTOM || hy <= maxY && d === Direction_1["default"].TOP) {
          _this4.gameOver();
        } else {
          var touched = false;
          var count = 1;

          while (!touched && count < _this4.blocks.length) {
            touched = _this4.blocks[count].position.x === _this4.blocks[0].position.x && _this4.blocks[count].position.y === _this4.blocks[0].position.y;
            count++;
          }

          if (touched) {
            _this4.gameOver();
          } else {
            _this4.walk();
          }
        }
      }, values_1.Levels[this.level].speed);
    }
  }, {
    key: "pauseStop",
    value: function pauseStop() {
      // Ici on peut creer un div ou une bonne alert qui met le score avec le bouton qui active le confirm
      isPaused = false;
      document.querySelector("#pause-box").animate([{
        visibility: "visible",
        opacity: 1
      }, {
        visibility: "hidden",
        opacity: 0
      }], {
        fill: "both",
        duration: 300,
        easing: "ease-in"
      });
      this.play();
    }
  }, {
    key: "pauseStart",
    value: function pauseStart() {
      isPaused = true;
      this.stop();
      document.querySelector("#pause-box").animate([{
        visibility: "hidden",
        opacity: 0
      }, {
        visibility: "visible",
        opacity: 1
      }], {
        fill: "both",
        duration: 300,
        easing: "ease-in"
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      document.body.removeEventListener('keydown', this.keyboardControlEvent);
      clearInterval(this.timer);
    }
  }, {
    key: "launch",
    value: function launch() {
      document.body.addEventListener('keydown', this.keyboardControlEvent);
    }
  }]);

  return Snake;
}();

exports.default = Snake;

/***/ }),

/***/ "./src/ts/modules/state.ts":
/*!*********************************!*\
  !*** ./src/ts/modules/state.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var State = /*#__PURE__*/function () {
  function State(elSelector) {
    var _this = this;

    _classCallCheck(this, State);

    this.scoreInternal = 0;
    this.scoreDOM = document.querySelector(elSelector);

    this.scoreListener = function (val) {
      _this.scoreDOM.innerHTML = val;
    };
  }

  _createClass(State, [{
    key: "registerScoreListener",
    value: function registerScoreListener(listener) {
      this.scoreListener = listener;
    }
  }, {
    key: "scores",
    get: function get() {
      return this.scoreInternal;
    },
    set: function set(score) {
      this.scoreInternal = score;
      this.scoreListener(score);
    }
  }]);

  return State;
}();

exports.default = State;

/***/ }),

/***/ "./src/ts/modules/values.ts":
/*!**********************************!*\
  !*** ./src/ts/modules/values.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.yDiv = exports.xDiv = exports.STEPY = exports.STEPX = exports.tableY = exports.tableX = exports._table = exports.Levels = exports.Speed = void 0;
var Speed = {
  LOW: 500,
  MEDIUM: 300,
  FAST: 200,
  FASTEST: 100
};
exports.Speed = Speed;
var Levels = [{
  title: 'Easy',
  speed: Speed.LOW,
  score: 5
}, {
  title: 'Normal',
  speed: Speed.MEDIUM,
  score: 10
}, {
  title: 'Hard',
  speed: Speed.FAST,
  score: 15
}, {
  title: 'Very Hard',
  speed: Speed.FASTEST,
  score: 20
}];
exports.Levels = Levels;

var _table = document.querySelector('#table'); // The game zone in the document


exports._table = _table;
var tableX = _table.clientWidth; // The client width

exports.tableX = tableX;
var tableY = _table.clientHeight; // The client height

exports.tableY = tableY;
var xDiv = 40; // The number of squares or steps on x axis

exports.xDiv = xDiv;
var yDiv = Math.floor(xDiv * tableY / tableX); // The number of squares or steps on y axis

exports.yDiv = yDiv;
var STEPX = Math.floor(tableX / xDiv); // Step value on x axis

exports.STEPX = STEPX;
var STEPY = Math.floor(tableY / yDiv); // Step value in y axis

exports.STEPY = STEPY;

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "css/app.css");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/ts/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=app.js.map