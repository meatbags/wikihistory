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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_master__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/master */ \"./src/modules/master.js\");\n\n\nclass App {\n  constructor() {\n    this.master = new _modules_master__WEBPACK_IMPORTED_MODULE_0__[\"Master\"]();\n  }\n}\n\nwindow.onload = () => {\n  const app = new App();\n};\n\n//# sourceURL=webpack://wikihistory/./src/app.js?");

/***/ }),

/***/ "./src/modules/api.js":
/*!****************************!*\
  !*** ./src/modules/api.js ***!
  \****************************/
/*! exports provided: API */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"API\", function() { return API; });\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page */ \"./src/modules/page.js\");\n\n\nclass API {\n  constructor() {\n    // api interface\n    // NOTE use action=parse to get html in .content, setting rvprop=content reduces rate limit / 10 (500 -> 50)\n    this.pages = {};\n    this.users = {};\n    this.endpoint = 'https://en.wikipedia.org/w/api.php';\n    this.action = '?action=query';\n    this.props = '&prop=revisions&rvprop=content|ids|user|userid|flags|tags|timestamp|comment|user&rvlimit=5';\n    this.format = '&format=json&formatversion=2';\n  }\n\n  parsePage(key, page) {\n    // create page, user\n    if (!this.pages[key]) {\n      this.pages[key] = new _page__WEBPACK_IMPORTED_MODULE_0__[\"Page\"](key);\n    }\n    this.pages[key].parsePage(page);\n  }\n\n  getPage(title) {\n    // build request string, get page\n    const key = title.replace(/ /g, '%20');\n    const req = `${this.endpoint}${this.action}&titles=${key}${this.props}${this.format}`;\n\n    // send request\n    $.ajax({\n      type: 'POST',\n      url: 'call_api.php',\n      dataType: 'json',\n      data: { request: req },\n      success: page => {\n        this.parsePage(key, page);\n      },\n      error: err => {\n        console.warn('Error', err);\n      }\n    });\n  }\n\n  getMore() {\n    // get more revisions of previous request\n  }\n}\n\n\n\n//# sourceURL=webpack://wikihistory/./src/modules/api.js?");

/***/ }),

/***/ "./src/modules/master.js":
/*!*******************************!*\
  !*** ./src/modules/master.js ***!
  \*******************************/
/*! exports provided: Master */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Master\", function() { return Master; });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/modules/api.js\");\n\n\nclass Master {\n  constructor() {\n    this.api = new _api__WEBPACK_IMPORTED_MODULE_0__[\"API\"]();\n\n    // test\n    this.api.getPage('Dark Souls');\n  }\n}\n\n\n\n//# sourceURL=webpack://wikihistory/./src/modules/master.js?");

/***/ }),

/***/ "./src/modules/page.js":
/*!*****************************!*\
  !*** ./src/modules/page.js ***!
  \*****************************/
/*! exports provided: Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Page\", function() { return Page; });\nclass Page {\n  constructor(title) {\n    // page data container\n\n    this.title = title;\n  }\n\n  parsePage(page) {\n    // parse query results\n\n    console.log(page);\n    /*\r\n    res\r\n      continue\r\n        continue ||\r\n        rvcontinue\r\n      limit\r\n        revisions 50\r\n      query\r\n        pages[]\r\n          id\r\n          title\r\n          revision\r\n        */\n  }\n}\n\n\n\n//# sourceURL=webpack://wikihistory/./src/modules/page.js?");

/***/ })

/******/ });