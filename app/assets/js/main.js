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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/assets/js/custom.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/assets/js/custom.js":
/*!*********************************!*\
  !*** ./app/assets/js/custom.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/components.js */ \"./app/assets/js/modules/components.js\");\n/* harmony import */ var _modules_visuals_shared_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/visuals_shared.js */ \"./app/assets/js/modules/visuals_shared.js\");\n/* harmony import */ var _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/module_metronome.js */ \"./app/assets/js/modules/module_metronome.js\");\n/* harmony import */ var _modules_module_tap_tempo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/module_tap_tempo.js */ \"./app/assets/js/modules/module_tap_tempo.js\");\n/* harmony import */ var _modules_module_beat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/module_beat.js */ \"./app/assets/js/modules/module_beat.js\");\n/* harmony import */ var _modules_module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/module_notes_per_beat.js */ \"./app/assets/js/modules/module_notes_per_beat.js\");\n/* harmony import */ var _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/module_timer.js */ \"./app/assets/js/modules/module_timer.js\");\n\n\n\n\n\n\n\n$(document).ready(function () {\n  // Early tweak\n  $('[data-toggle=\"tooltip\"]').tooltip();\n  _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].setBpm(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMRANGESLIDER\"].val()); // functions\n\n  var resetBeatVisuals = function resetTheBeatVisual() {\n    _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BEATSVISUAL\"].find('.beat').remove();\n\n    for (var x = 0; x < _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BEATCOUNT\"].val(); x += 1) {\n      var SRC = '../assets/img/beats/beat_1.png';\n      var BEAT = \"<img src=\".concat(SRC, \" class='beat'>\");\n      _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BEATSVISUAL\"].append(BEAT);\n    }\n  };\n\n  var isNoteNew = function isTheNoteNew(noteBtn) {\n    if (noteBtn.hasClass('focused')) {\n      return false;\n    } else {\n      $('.note-btn').removeClass('focused');\n      noteBtn.addClass('focused');\n      return true;\n    }\n  }; // Events listeners\n  // Metronome start\n\n\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"PLAYPAUSEBTN\"].click(function () {\n    _modules_visuals_shared_js__WEBPACK_IMPORTED_MODULE_1__[\"sharedVisuals\"].togglePlayLogo();\n\n    if (_modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].isPaused()) {\n      if (_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"ENABLE_TIMER_TOGGLER\"][0].checked) {\n        if (_modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].isReachedMinimumValidTime()) {\n          _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].play();\n        }\n      } else {\n        _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].play();\n      }\n    } else {\n      _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].pause();\n    }\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMRANGESLIDER\"].on('input', function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].setBpm(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMRANGESLIDER\"].val());\n    _modules_visuals_shared_js__WEBPACK_IMPORTED_MODULE_1__[\"sharedVisuals\"].changeBpmIndicatorText(_modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].getBpm());\n  }); // BPMINCREASEBTN events\n\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMINCREASEBTN\"].click(function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].bpmAdjustLoop('increase', false);\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMINCREASEBTN\"].mousedown(function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].bpmAdjustLoop('increase', true);\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMINCREASEBTN\"].mouseup(function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].bpmAdjustStop();\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMINCREASEBTN\"].mouseleave(function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].bpmAdjustStop();\n  }); // BPMDECREASEBTN events\n\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMDECREASEBTN\"].click(function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].bpmAdjustLoop('decrease', false);\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMDECREASEBTN\"].mousedown(function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].bpmAdjustLoop('decrease', true);\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMDECREASEBTN\"].mouseup(function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].bpmAdjustStop();\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMDECREASEBTN\"].mouseleave(function () {\n    _modules_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].bpmAdjustStop();\n  }); // Metronome end\n  // Beats start\n\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"BEATCOUNT\"].change(function () {\n    _modules_module_beat_js__WEBPACK_IMPORTED_MODULE_4__[\"beat\"].revertCurrentBeat();\n    resetBeatVisuals();\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"EMPHASIZE1STBEAT\"].change(function () {\n    _modules_module_beat_js__WEBPACK_IMPORTED_MODULE_4__[\"beat\"].setPlayFirstBeat(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"EMPHASIZE1STBEAT\"][0].checked);\n  }); // Beats end\n  // Notes Per Beat start\n\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"SINGLEBTN\"].click(function () {\n    if (isNoteNew(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"SINGLEBTN\"])) {\n      _modules_module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_5__[\"notesPerBeat\"].changeNote('Single');\n    }\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TUPLETSBTN\"].click(function () {\n    if (isNoteNew(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TUPLETSBTN\"])) {\n      _modules_module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_5__[\"notesPerBeat\"].changeNote('Tuplets');\n    }\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TRIPLETSBTN\"].click(function () {\n    if (isNoteNew(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TRIPLETSBTN\"])) {\n      _modules_module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_5__[\"notesPerBeat\"].changeNote('Triplets');\n    }\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TRIPLETSMIDRESTBTN\"].click(function () {\n    if (isNoteNew(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TRIPLETSMIDRESTBTN\"])) {\n      _modules_module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_5__[\"notesPerBeat\"].changeNote('Triplets Mid Rest');\n    }\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"QUADRUPLETSBTN\"].click(function () {\n    if (isNoteNew(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"QUADRUPLETSBTN\"])) {\n      _modules_module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_5__[\"notesPerBeat\"].changeNote('Quadruplets');\n    }\n  }); // Notes Per Beat end\n  // Timer start\n\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"ENABLE_TIMER_TOGGLER\"].click(function () {\n    _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].toggleTimer(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"ENABLE_TIMER_TOGGLER\"][0].checked);\n\n    if (_modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].isEnabled && _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].getMin() < 1 && _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].getSec() < 1) {\n      _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].setMin(Number.parseInt(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"MIN_SETTER\"].val(), 10));\n      _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].setSec(Number.parseInt(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"SEC_SETTER\"].val(), 10));\n    }\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"MIN_SETTER\"].change(function () {\n    _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].setMin(Number.parseInt(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"MIN_SETTER\"].val(), 10));\n    _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].setSec(Number.parseInt(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"SEC_SETTER\"].val(), 10));\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"SEC_SETTER\"].change(function () {\n    _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].setSec(Number.parseInt(_modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"SEC_SETTER\"].val(), 10));\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TIME_RESETTER\"].click(function () {\n    if (_modules_visuals_shared_js__WEBPACK_IMPORTED_MODULE_1__[\"sharedVisuals\"].padTime(_modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].getMin()) !== _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"MIN_SETTER\"].val() || _modules_visuals_shared_js__WEBPACK_IMPORTED_MODULE_1__[\"sharedVisuals\"].padTime(_modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].getSec()) !== _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"SEC_SETTER\"].val()) {\n      _modules_module_timer_js__WEBPACK_IMPORTED_MODULE_6__[\"timer\"].reset();\n    }\n  }); // Timer end\n  // Tap Metronome start\n\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TAP_TEMPO_BTN\"].mousedown(function () {\n    _modules_module_tap_tempo_js__WEBPACK_IMPORTED_MODULE_3__[\"tapTempo\"].tap();\n  });\n  $(document).keydown(function (e) {\n    if (e.keyCode === 32) {\n      _modules_module_tap_tempo_js__WEBPACK_IMPORTED_MODULE_3__[\"tapTempo\"].tap();\n      e.preventDefault();\n    }\n  });\n  _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TAP_TEMPO_BTN\"].hover(function () {\n    setTimeout(function () {\n      _modules_components_js__WEBPACK_IMPORTED_MODULE_0__[\"TAP_TEMPO_BTN\"].tooltip('hide');\n    }, 5000);\n  }); // Tap Metronome end\n});\n\n//# sourceURL=webpack:///./app/assets/js/custom.js?");

/***/ }),

/***/ "./app/assets/js/modules/components.js":
/*!*********************************************!*\
  !*** ./app/assets/js/modules/components.js ***!
  \*********************************************/
/*! exports provided: BPMRANGESLIDER, BPMINDICATOR, PLAYPAUSEBTN, BPMINCREASEBTN, BPMDECREASEBTN, PLAYBUTTONLOGO, BEATSVISUAL, EMPHASIZE1STBEAT, BEATCOUNT, SINGLEBTN, TUPLETSBTN, TRIPLETSBTN, TRIPLETSMIDRESTBTN, QUADRUPLETSBTN, ENABLE_TIMER_TOGGLER, MIN_SETTER, SEC_SETTER, TIME_RESETTER, TAP_TEMPO_BTN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BPMRANGESLIDER\", function() { return BPMRANGESLIDER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BPMINDICATOR\", function() { return BPMINDICATOR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PLAYPAUSEBTN\", function() { return PLAYPAUSEBTN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BPMINCREASEBTN\", function() { return BPMINCREASEBTN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BPMDECREASEBTN\", function() { return BPMDECREASEBTN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PLAYBUTTONLOGO\", function() { return PLAYBUTTONLOGO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BEATSVISUAL\", function() { return BEATSVISUAL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EMPHASIZE1STBEAT\", function() { return EMPHASIZE1STBEAT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BEATCOUNT\", function() { return BEATCOUNT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SINGLEBTN\", function() { return SINGLEBTN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TUPLETSBTN\", function() { return TUPLETSBTN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TRIPLETSBTN\", function() { return TRIPLETSBTN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TRIPLETSMIDRESTBTN\", function() { return TRIPLETSMIDRESTBTN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QUADRUPLETSBTN\", function() { return QUADRUPLETSBTN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ENABLE_TIMER_TOGGLER\", function() { return ENABLE_TIMER_TOGGLER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MIN_SETTER\", function() { return MIN_SETTER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SEC_SETTER\", function() { return SEC_SETTER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TIME_RESETTER\", function() { return TIME_RESETTER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TAP_TEMPO_BTN\", function() { return TAP_TEMPO_BTN; });\n// Metronome\nvar BPMRANGESLIDER = $('#bpm-range-slider');\nvar BPMINDICATOR = $('#bpm-indicator');\nvar PLAYPAUSEBTN = $('#play-pause-btn');\nvar BPMINCREASEBTN = $('#bpm-increase-btn');\nvar BPMDECREASEBTN = $('#bpm-decrease-btn');\nvar PLAYBUTTONLOGO = $('#play-pause-btn > .logo'); // Beats\n\nvar BEATSVISUAL = $('.beats-visual');\nvar EMPHASIZE1STBEAT = $('#emphasize-1st-beat');\nvar BEATCOUNT = $('#beat-count'); // Notes Per Beat\n\nvar SINGLEBTN = $('#single-btn');\nvar TUPLETSBTN = $('#tuplets-btn');\nvar TRIPLETSBTN = $('#triplets-btn');\nvar TRIPLETSMIDRESTBTN = $('#triplets-mid-rest-btn');\nvar QUADRUPLETSBTN = $('#quadruplets-btn'); // Timer\n\nvar ENABLE_TIMER_TOGGLER = $('#enable-timer-toggler');\nvar MIN_SETTER = $('#min-select');\nvar SEC_SETTER = $('#sec-select');\nvar TIME_RESETTER = $('#time-resetter'); // Tap Timer\n\nvar TAP_TEMPO_BTN = $('#tap-tempo-btn');\n\n//# sourceURL=webpack:///./app/assets/js/modules/components.js?");

/***/ }),

/***/ "./app/assets/js/modules/module_beat.js":
/*!**********************************************!*\
  !*** ./app/assets/js/modules/module_beat.js ***!
  \**********************************************/
/*! exports provided: beat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"beat\", function() { return beat; });\nvar beat = function () {\n  var currentBeat = 0;\n  var playFirstBeat = false;\n\n  function getTheCurrentBeat() {\n    return currentBeat;\n  }\n\n  function revertTheCurrentBeat() {\n    currentBeat = 0;\n  }\n\n  function plusOneToCurrentBeat() {\n    currentBeat += 1;\n  }\n\n  function shouldPlayTheFirstBeat() {\n    return playFirstBeat;\n  }\n\n  function setThePlayFirstBeat(newPlayFirstBeat) {\n    playFirstBeat = newPlayFirstBeat;\n  }\n\n  return {\n    getCurrentBeat: getTheCurrentBeat,\n    revertCurrentBeat: revertTheCurrentBeat,\n    plusOneCurrentBeat: plusOneToCurrentBeat,\n    shouldPlayFirstBeat: shouldPlayTheFirstBeat,\n    setPlayFirstBeat: setThePlayFirstBeat\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/module_beat.js?");

/***/ }),

/***/ "./app/assets/js/modules/module_metronome.js":
/*!***************************************************!*\
  !*** ./app/assets/js/modules/module_metronome.js ***!
  \***************************************************/
/*! exports provided: metronome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"metronome\", function() { return metronome; });\n/* harmony import */ var _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visuals_shared.js */ \"./app/assets/js/modules/visuals_shared.js\");\n/* harmony import */ var _module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module_notes_per_beat.js */ \"./app/assets/js/modules/module_notes_per_beat.js\");\n/* harmony import */ var _module_timer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_timer.js */ \"./app/assets/js/modules/module_timer.js\");\n\n\n\nvar metronome = function () {\n  var metronomePaused = true;\n  var bpm = null;\n  var bpmAdjust = null;\n\n  function isPaused() {\n    return metronomePaused;\n  }\n\n  function playMetronome() {\n    _module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_1__[\"notesPerBeat\"].playNote();\n    _module_timer_js__WEBPACK_IMPORTED_MODULE_2__[\"timer\"].start();\n    metronomePaused = false;\n  }\n\n  function pauseMetronome() {\n    _module_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_1__[\"notesPerBeat\"].pauseNote();\n    _module_timer_js__WEBPACK_IMPORTED_MODULE_2__[\"timer\"].pause();\n    metronomePaused = true;\n  }\n\n  function bpmGetter() {\n    return bpm;\n  }\n\n  function bpmSetter(newBpm) {\n    bpm = Number.parseInt(newBpm, 10);\n    Tone.Transport.bpm.value = bpm;\n  }\n\n  function bpmPlusOne() {\n    if (bpm < 260) {\n      bpmSetter(bpm + 1);\n      _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].adjustBpmSlider(bpm);\n    }\n  }\n\n  function bpmMinusOne() {\n    if (bpm > 20) {\n      bpmSetter(bpm - 1);\n      _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].adjustBpmSlider(bpm);\n    }\n  }\n\n  function minorBpmAdjustLooper(direction, willLoop) {\n    if (direction === 'increase') {\n      if (willLoop) {\n        bpmAdjust = setInterval(function () {\n          bpmPlusOne();\n        }, 200);\n      } else {\n        bpmPlusOne();\n      }\n    } else if (direction === 'decrease') {\n      if (willLoop) {\n        bpmAdjust = setInterval(function () {\n          bpmMinusOne();\n        }, 200);\n      } else {\n        bpmMinusOne();\n      }\n    }\n  }\n\n  function bpmAdjustStoper() {\n    clearInterval(bpmAdjust);\n  }\n\n  return {\n    play: playMetronome,\n    pause: pauseMetronome,\n    isPaused: isPaused,\n    getBpm: bpmGetter,\n    setBpm: bpmSetter,\n    bpmAdjustLoop: minorBpmAdjustLooper,\n    bpmAdjustStop: bpmAdjustStoper\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/module_metronome.js?");

/***/ }),

/***/ "./app/assets/js/modules/module_notes_per_beat.js":
/*!********************************************************!*\
  !*** ./app/assets/js/modules/module_notes_per_beat.js ***!
  \********************************************************/
/*! exports provided: notesPerBeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"notesPerBeat\", function() { return notesPerBeat; });\n/* harmony import */ var _visuals_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visuals_notes_per_beat.js */ \"./app/assets/js/modules/visuals_notes_per_beat.js\");\n/* harmony import */ var _module_metronome_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module_metronome.js */ \"./app/assets/js/modules/module_metronome.js\");\n/* harmony import */ var _module_beat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_beat.js */ \"./app/assets/js/modules/module_beat.js\");\n\n\n\nvar notesPerBeat = function () {\n  var SYNTH_BLEND = {\n    envelope: {\n      attack: 0.01,\n      decay: 0.01,\n      sustain: 0,\n      release: 0.01\n    }\n  };\n  var SYNTH = new Tone.Synth(SYNTH_BLEND).toMaster();\n  var SYNTH2 = new Tone.Synth(SYNTH_BLEND).toMaster();\n  SYNTH2.volume.value = -3;\n  var mainLoop = null;\n  var subLoop = null;\n  var note = 'Single';\n\n  function disposeLoops() {\n    var result = true;\n\n    if (_module_metronome_js__WEBPACK_IMPORTED_MODULE_1__[\"metronome\"].isPaused()) {\n      result = false;\n    } else {\n      if (mainLoop !== null) {\n        mainLoop.dispose();\n        mainLoop = null;\n      }\n\n      if (subLoop !== null) {\n        subLoop.dispose();\n        subLoop = null;\n      }\n\n      Tone.Transport.stop();\n    }\n\n    return result;\n  }\n\n  function setMain() {\n    mainLoop = new Tone.Loop(function () {\n      var chord = 'A5';\n      _visuals_notes_per_beat_js__WEBPACK_IMPORTED_MODULE_0__[\"notesPerBeatVisuals\"].animateBeatVisual();\n\n      if (_module_beat_js__WEBPACK_IMPORTED_MODULE_2__[\"beat\"].shouldPlayFirstBeat() && _module_beat_js__WEBPACK_IMPORTED_MODULE_2__[\"beat\"].getCurrentBeat() === 1) {\n        chord = 'B6';\n      }\n\n      SYNTH.triggerAttackRelease(chord, '0:0:1');\n    }, '4n');\n    mainLoop.start('+0');\n  }\n\n  function singlet() {\n    setMain();\n    subLoop = null;\n  }\n\n  function tuplets() {\n    setMain();\n    subLoop = new Tone.Loop(function () {\n      SYNTH2.triggerAttackRelease('G3', '0:0:1');\n    }, '8n');\n    subLoop.start('+0');\n  }\n\n  function triplets() {\n    setMain();\n    subLoop = new Tone.Loop(function () {\n      SYNTH2.triggerAttackRelease('G3', '0:0:1');\n    }, '8t');\n    subLoop.start('+0');\n  }\n\n  function tripletsMid() {\n    setMain();\n    var count = 1;\n    subLoop = new Tone.Loop(function () {\n      if (count === 1) {\n        SYNTH2.triggerAttackRelease('G3', '0:0:1');\n      } else if (count >= 3) {\n        SYNTH2.triggerAttackRelease('G3', '0:0:1');\n        count = 0;\n      }\n\n      count += 1;\n    }, '8t');\n    subLoop.start('+0');\n  }\n\n  function quadruplets() {\n    setMain();\n    subLoop = new Tone.Loop(function () {\n      SYNTH2.triggerAttackRelease('G3', '0:0:1');\n    }, '16n');\n    subLoop.start('+0');\n  }\n\n  function setNote() {\n    var forceStopped = disposeLoops();\n    _module_beat_js__WEBPACK_IMPORTED_MODULE_2__[\"beat\"].revertCurrentBeat();\n\n    if (note === 'Single') {\n      singlet();\n    } else if (note === 'Tuplets') {\n      tuplets();\n    } else if (note === 'Triplets') {\n      triplets();\n    } else if (note === 'Triplets Mid Rest') {\n      tripletsMid();\n    } else if (note === 'Quadruplets') {\n      quadruplets();\n    }\n\n    if (forceStopped) {\n      Tone.Transport.start();\n    }\n  }\n\n  function changeTheNote(noteName) {\n    note = noteName;\n    setNote();\n  }\n\n  ;\n\n  function playTheNote() {\n    mainLoop === null ? setNote() : null;\n    Tone.Transport.start();\n  }\n\n  function pauseTheNote() {\n    Tone.Transport.stop();\n    disposeLoops();\n  }\n\n  return {\n    playNote: playTheNote,\n    pauseNote: pauseTheNote,\n    changeNote: changeTheNote\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/module_notes_per_beat.js?");

/***/ }),

/***/ "./app/assets/js/modules/module_tap_tempo.js":
/*!***************************************************!*\
  !*** ./app/assets/js/modules/module_tap_tempo.js ***!
  \***************************************************/
/*! exports provided: tapTempo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tapTempo\", function() { return tapTempo; });\n/* harmony import */ var _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visuals_shared.js */ \"./app/assets/js/modules/visuals_shared.js\");\n/* harmony import */ var _visuals_tap_tempo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visuals_tap_tempo.js */ \"./app/assets/js/modules/visuals_tap_tempo.js\");\n/* harmony import */ var _module_metronome_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_metronome.js */ \"./app/assets/js/modules/module_metronome.js\");\n\n\n\nvar tapTempo = function () {\n  var firstTap = 0;\n  var taps = 0;\n  var idleTimer = null;\n\n  function clearIdleTimer() {\n    if (idleTimer !== null) {\n      clearTimeout(idleTimer);\n      idleTimer = null;\n    }\n  }\n\n  function getFirstTap(time) {\n    var MIN_BPM = 20;\n    _visuals_tap_tempo_js__WEBPACK_IMPORTED_MODULE_1__[\"tapTempoVisuals\"].toggleTapTempoBtn();\n    firstTap = time;\n    taps = 1;\n    _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].adjustBpmSlider(MIN_BPM);\n    _module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].setBpm(MIN_BPM);\n  }\n\n  function getTapBasedTempo(currentTap) {\n    var averageBpm = 60000 * taps / (currentTap - firstTap);\n    var MIN_BPM = 20;\n    var MAX_BPM = 260;\n\n    if (averageBpm < MIN_BPM) {\n      averageBpm = MIN_BPM;\n    } else if (averageBpm > MAX_BPM) {\n      averageBpm = MAX_BPM;\n    } else {\n      averageBpm = Math.round(averageBpm);\n    }\n\n    _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].adjustBpmSlider(averageBpm);\n    _module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].setBpm(averageBpm);\n    taps += 1;\n  }\n\n  function resetTapTempo() {\n    _visuals_tap_tempo_js__WEBPACK_IMPORTED_MODULE_1__[\"tapTempoVisuals\"].toggleTapTempoBtn();\n    firstTap = 0;\n    taps = 0;\n    clearIdleTimer();\n  }\n\n  function tapTempoTapped() {\n    var TAP_SNAPSHOT = $.now();\n    clearIdleTimer();\n\n    if (taps < 1) {\n      getFirstTap(TAP_SNAPSHOT);\n    } else {\n      getTapBasedTempo(TAP_SNAPSHOT);\n    }\n\n    _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].changeBpmIndicatorText(_module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].getBpm());\n    idleTimer = setTimeout(function () {\n      resetTapTempo();\n    }, 3500);\n  }\n\n  return {\n    tap: tapTempoTapped\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/module_tap_tempo.js?");

/***/ }),

/***/ "./app/assets/js/modules/module_timer.js":
/*!***********************************************!*\
  !*** ./app/assets/js/modules/module_timer.js ***!
  \***********************************************/
/*! exports provided: timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timer\", function() { return timer; });\n/* harmony import */ var _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visuals_shared.js */ \"./app/assets/js/modules/visuals_shared.js\");\n/* harmony import */ var _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visuals_timer.js */ \"./app/assets/js/modules/visuals_timer.js\");\n/* harmony import */ var _module_metronome_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_metronome.js */ \"./app/assets/js/modules/module_metronome.js\");\n\n\n\nvar timer = function () {\n  var defaultMin = 0;\n  var defaultSec = 0;\n  var min = 0;\n  var sec = 0;\n  var timerInterval = null;\n  var timerEnabled = false;\n\n  function timerPauseMetronome() {\n    _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].togglePlayLogo();\n    _module_metronome_js__WEBPACK_IMPORTED_MODULE_2__[\"metronome\"].pause();\n    pauseTheTimer();\n  }\n\n  function stopTimer() {\n    timerPauseMetronome();\n    resetTheTimer();\n  }\n\n  function timeStep() {\n    if (sec > 1) {\n      sec -= 1;\n      _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].updateTimerMonitor(null, sec);\n    } else if (min > 0) {\n      min -= 1;\n      sec = 59;\n      _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].updateTimerMonitor(min, sec);\n    } else {\n      stopTimer();\n    }\n  }\n\n  function isTheTimeReachedMinimum() {\n    var result = false;\n    min <= 0 && sec < 1 ? _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].showTimerErrorModal() : result = true;\n    return result;\n  }\n\n  function toggleTheTimer(state) {\n    timerEnabled = state;\n\n    if (timerEnabled) {\n      _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].enableTimeEditing();\n      _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].createRemainingTime(min, sec);\n    } else {\n      _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].disableTimer();\n    }\n  }\n\n  function resetTheTimer() {\n    min = defaultMin;\n    sec = defaultSec;\n    _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].updateTimerMonitor(min, sec);\n  }\n\n  function startTheTimer() {\n    if (timerEnabled) {\n      _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].disableTimeEditing();\n      timerInterval = setInterval(function () {\n        timeStep();\n      }, 1000);\n    }\n  }\n\n  function pauseTheTimer() {\n    if (timerEnabled) {\n      clearInterval(timerInterval);\n      _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].enableTimeEditing();\n    }\n  }\n\n  function getTheMin() {\n    return min;\n  }\n\n  function setTheMin(newMin) {\n    defaultMin = newMin;\n    min = defaultMin;\n    _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].updateTimerMonitor(min, null);\n  }\n\n  function getTheSec() {\n    return sec;\n  }\n\n  function setTheSec(newSec) {\n    defaultSec = newSec;\n    sec = defaultSec;\n    _visuals_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"timerVisuals\"].updateTimerMonitor(null, sec);\n  }\n\n  function getTimerEnabled() {\n    return timerEnabled;\n  }\n\n  return {\n    toggleTimer: toggleTheTimer,\n    isReachedMinimumValidTime: isTheTimeReachedMinimum,\n    start: startTheTimer,\n    pause: pauseTheTimer,\n    reset: resetTheTimer,\n    getMin: getTheMin,\n    setMin: setTheMin,\n    getSec: getTheSec,\n    setSec: setTheSec,\n    isEnabled: getTimerEnabled\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/module_timer.js?");

/***/ }),

/***/ "./app/assets/js/modules/visuals_notes_per_beat.js":
/*!*********************************************************!*\
  !*** ./app/assets/js/modules/visuals_notes_per_beat.js ***!
  \*********************************************************/
/*! exports provided: notesPerBeatVisuals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"notesPerBeatVisuals\", function() { return notesPerBeatVisuals; });\n/* harmony import */ var _module_beat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module_beat.js */ \"./app/assets/js/modules/module_beat.js\");\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components.js */ \"./app/assets/js/modules/components.js\");\n// Import the components and beat module\n\n\nvar notesPerBeatVisuals = function () {\n  function animateTheBeatVisual() {\n    _module_beat_js__WEBPACK_IMPORTED_MODULE_0__[\"beat\"].plusOneCurrentBeat();\n    var currentBeat = _module_beat_js__WEBPACK_IMPORTED_MODULE_0__[\"beat\"].getCurrentBeat();\n    var CURRVISBEAT = _components_js__WEBPACK_IMPORTED_MODULE_1__[\"BEATSVISUAL\"].find(\".beat:nth-child(\".concat(currentBeat, \")\"));\n\n    if (currentBeat === 1) {\n      _components_js__WEBPACK_IMPORTED_MODULE_1__[\"BEATSVISUAL\"].find('.beat').removeClass('beat-played');\n      CURRVISBEAT.addClass('beat-played');\n    } else if (currentBeat >= Number(_components_js__WEBPACK_IMPORTED_MODULE_1__[\"BEATCOUNT\"].val(), 10)) {\n      CURRVISBEAT.addClass('beat-played');\n      _module_beat_js__WEBPACK_IMPORTED_MODULE_0__[\"beat\"].revertCurrentBeat();\n    } else {\n      CURRVISBEAT.addClass('beat-played');\n    }\n  }\n\n  return {\n    animateBeatVisual: animateTheBeatVisual\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/visuals_notes_per_beat.js?");

/***/ }),

/***/ "./app/assets/js/modules/visuals_shared.js":
/*!*************************************************!*\
  !*** ./app/assets/js/modules/visuals_shared.js ***!
  \*************************************************/
/*! exports provided: sharedVisuals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sharedVisuals\", function() { return sharedVisuals; });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./app/assets/js/modules/components.js\");\n\nvar sharedVisuals = function () {\n  function changeTheBpmIndicatorText(value) {\n    _components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMINDICATOR\"].text(value);\n  }\n\n  function adjustTheBpmSlider(newBpm) {\n    _components_js__WEBPACK_IMPORTED_MODULE_0__[\"BPMRANGESLIDER\"].val(newBpm);\n    changeTheBpmIndicatorText(newBpm);\n  }\n\n  ;\n\n  function togglePlayButtonLogo() {\n    _components_js__WEBPACK_IMPORTED_MODULE_0__[\"PLAYBUTTONLOGO\"].toggleClass('glyphicon-play');\n    _components_js__WEBPACK_IMPORTED_MODULE_0__[\"PLAYBUTTONLOGO\"].toggleClass('glyphicon-pause');\n  }\n\n  ;\n\n  function padTheTime(time) {\n    if (time < 10) {\n      return \"0\".concat(time);\n    }\n\n    return time.toString();\n  }\n\n  return {\n    changeBpmIndicatorText: changeTheBpmIndicatorText,\n    adjustBpmSlider: adjustTheBpmSlider,\n    togglePlayLogo: togglePlayButtonLogo,\n    padTime: padTheTime\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/visuals_shared.js?");

/***/ }),

/***/ "./app/assets/js/modules/visuals_tap_tempo.js":
/*!****************************************************!*\
  !*** ./app/assets/js/modules/visuals_tap_tempo.js ***!
  \****************************************************/
/*! exports provided: tapTempoVisuals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tapTempoVisuals\", function() { return tapTempoVisuals; });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./app/assets/js/modules/components.js\");\n\nvar tapTempoVisuals = function () {\n  function toggleTheTapTempoBtn() {\n    _components_js__WEBPACK_IMPORTED_MODULE_0__[\"TAP_TEMPO_BTN\"].toggleClass('btn-success');\n    _components_js__WEBPACK_IMPORTED_MODULE_0__[\"TAP_TEMPO_BTN\"].toggleClass('btn-danger');\n  }\n\n  return {\n    toggleTapTempoBtn: toggleTheTapTempoBtn\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/visuals_tap_tempo.js?");

/***/ }),

/***/ "./app/assets/js/modules/visuals_timer.js":
/*!************************************************!*\
  !*** ./app/assets/js/modules/visuals_timer.js ***!
  \************************************************/
/*! exports provided: timerVisuals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timerVisuals\", function() { return timerVisuals; });\n/* harmony import */ var _visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visuals_shared.js */ \"./app/assets/js/modules/visuals_shared.js\");\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components.js */ \"./app/assets/js/modules/components.js\");\n\n\nvar timerVisuals = function () {\n  function enableTheTimeEditing() {\n    _components_js__WEBPACK_IMPORTED_MODULE_1__[\"MIN_SETTER\"].attr('disabled', false);\n    _components_js__WEBPACK_IMPORTED_MODULE_1__[\"SEC_SETTER\"].attr('disabled', false);\n    _components_js__WEBPACK_IMPORTED_MODULE_1__[\"TIME_RESETTER\"].attr('disabled', false);\n\n    if ($('.remaining-time-wrapper')) {\n      $('.remaining-time-wrapper').addClass('disabled');\n    }\n  }\n\n  function disableTheTimeEditing() {\n    _components_js__WEBPACK_IMPORTED_MODULE_1__[\"MIN_SETTER\"].attr('disabled', true);\n    _components_js__WEBPACK_IMPORTED_MODULE_1__[\"SEC_SETTER\"].attr('disabled', true);\n    _components_js__WEBPACK_IMPORTED_MODULE_1__[\"TIME_RESETTER\"].attr('disabled', true);\n\n    if ($('.remaining-time-wrapper')) {\n      $('.remaining-time-wrapper').removeClass('disabled');\n    }\n  }\n\n  function createRemainingTimeComponent(min, sec) {\n    var WRAPPER = $('<div>');\n    var LABEL = $('<b>Remaining Time: </b>');\n    var MIN_MONITOR = $(\"<span>\".concat(_visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].padTime(min), \"m</span>\"));\n    var SEC_MONITOR = $(\"<span>\".concat(_visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].padTime(sec), \"s</span>\"));\n    WRAPPER.addClass('section remaining-time-wrapper disabled');\n    MIN_MONITOR.addClass('time-monitor');\n    MIN_MONITOR.attr('id', 'min-monitor');\n    SEC_MONITOR.addClass('time-monitor');\n    SEC_MONITOR.attr('id', 'sec-monitor');\n    WRAPPER.append(LABEL);\n    WRAPPER.append(MIN_MONITOR);\n    WRAPPER.append(SEC_MONITOR);\n    $('body').prepend(WRAPPER);\n  }\n\n  function disableTheTimer() {\n    disableTheTimeEditing();\n\n    if ($('.remaining-time-wrapper')) {\n      $('.remaining-time-wrapper').remove();\n    }\n  }\n\n  function updateTheTimeMonitor(newMin, newSec) {\n    if ($('#min-monitor') && $('#sec-monitor')) {\n      var MIN_MONITOR = $('#min-monitor');\n      var SEC_MONITOR = $('#sec-monitor');\n      newMin !== null ? MIN_MONITOR.text(\"\".concat(_visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].padTime(newMin), \"m\")) : null;\n      newSec !== null ? SEC_MONITOR.text(\"\".concat(_visuals_shared_js__WEBPACK_IMPORTED_MODULE_0__[\"sharedVisuals\"].padTime(newSec), \"s\")) : null;\n    }\n  }\n\n  function showTheTimerErrorModal() {\n    var ERROR_MODAL = $('#error-msg-modal');\n    ERROR_MODAL.modal('show');\n  }\n\n  return {\n    enableTimeEditing: enableTheTimeEditing,\n    disableTimeEditing: disableTheTimeEditing,\n    createRemainingTime: createRemainingTimeComponent,\n    disableTimer: disableTheTimer,\n    updateTimerMonitor: updateTheTimeMonitor,\n    showTimerErrorModal: showTheTimerErrorModal\n  };\n}();\n\n//# sourceURL=webpack:///./app/assets/js/modules/visuals_timer.js?");

/***/ })

/******/ });