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
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: SyntaxError: X:/xampp/htdocs/github/wikihistory/src/modules/api.js: Unexpected token (49:23)\\n\\n\\u001b[0m \\u001b[90m 47 | \\u001b[39m    \\u001b[36mconst\\u001b[39m key \\u001b[33m=\\u001b[39m \\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mformatTitle(title)\\u001b[33m;\\u001b[39m\\n \\u001b[90m 48 | \\u001b[39m    title \\u001b[33m=\\u001b[39m title\\u001b[33m.\\u001b[39mreplace(\\u001b[35m/ /g\\u001b[39m\\u001b[33m,\\u001b[39m \\u001b[32m'%20'\\u001b[39m)\\u001b[33m;\\u001b[39m\\n\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 49 | \\u001b[39m    \\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mparseResponse(\\u001b[33m,\\u001b[39m samples[])\\n \\u001b[90m    | \\u001b[39m                       \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\n \\u001b[90m 50 | \\u001b[39m  }\\n \\u001b[90m 51 | \\u001b[39m\\n \\u001b[90m 52 | \\u001b[39m  formatTitle(title) {\\u001b[0m\\n\");\n\n//# sourceURL=webpack://wikihistory/./src/modules/api.js?");

/***/ }),

/***/ "./src/modules/master.js":
/*!*******************************!*\
  !*** ./src/modules/master.js ***!
  \*******************************/
/*! exports provided: Master */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Master\", function() { return Master; });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/modules/api.js\");\n\n\nclass Master {\n  constructor() {\n    this.api = new _api__WEBPACK_IMPORTED_MODULE_0__[\"API\"]();\n\n    // test\n    this.api.sampleRequest('Dark Souls');\n  }\n}\n\n\n\n//# sourceURL=webpack://wikihistory/./src/modules/master.js?");

/***/ })

/******/ });