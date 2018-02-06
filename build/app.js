var wikihistory =
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


var _master = __webpack_require__(2);

var _master2 = _interopRequireDefault(_master);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  this.master = new _master2.default();
};

window.onload = function () {
  var app = new App();
};

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Master = function Master() {
  _classCallCheck(this, Master);

  this.api = new _api2.default();

  // test

  this.api.getPage('Dark Souls');
};

exports.default = Master;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _page = __webpack_require__(4);

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = function () {
  function API() {
    _classCallCheck(this, API);

    // api interface

    // NOTE use action=parse to get html in .content
    // NOTE setting rvprop=content reduces rate limit / 10 (500 -> 50)
    this.pages = {};
    this.users = {};
    this.endpoint = 'https://en.wikipedia.org/w/api.php';
    this.action = '?action=query';
    this.props = '&prop=revisions&rvprop=content|ids|user|userid|flags|tags|timestamp|comment|user&rvlimit=5';
    this.format = '&format=json&formatversion=2';
  }

  _createClass(API, [{
    key: 'parsePage',
    value: function parsePage(key, page) {
      // create page, user

      if (!this.pages[key]) {
        this.pages[key] = new _page2.default(key);
      }

      this.pages[key].parseQuery(page);
    }
  }, {
    key: 'getPage',
    value: function getPage(title) {
      var _this = this;

      // build request string, get page

      var key = title.replace(/ /g, '%20');
      var req = '' + this.endpoint + this.action + '&titles=' + key + this.props + this.format;

      // send request

      $.ajax({
        type: 'POST',
        url: 'call_api.php',
        dataType: 'json',
        data: { request: req },
        success: function success(page) {
          _this.parsePage(key, page);
        },
        error: function error(err) {
          console.warn('Error', err);
        }
      });
    }
  }, {
    key: 'getMore',
    value: function getMore() {
      // get more revisions of previous request
    }
  }]);

  return API;
}();

exports.default = API;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function () {
  function Page(title) {
    _classCallCheck(this, Page);

    // page data container

    this.title = title;
  }

  _createClass(Page, [{
    key: "parsePage",
    value: function parsePage(page) {
      // parse query results

      console.log(page);

      /*
      res
        continue
          continue ||
          rvcontinue
        limit
          revisions 50
        query
          pages[]
            id
            title
            revision
          */
    }
  }]);

  return Page;
}();

exports.default = Page;

/***/ })
/******/ ]);