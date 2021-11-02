/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shipLibrary.js":
/*!****************************!*\
  !*** ./src/shipLibrary.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
const ShipProto =  {
    // marks where the ship has been hit
    hit(number) {
        const shipRepArr = this.shipRep;
        for(let i = 0; i < shipRepArr.length; i++) {
            if (shipRepArr[i] === number) {
                shipRepArr[i] = 'hit';
            }
        }
    },
    isSunk() {
        const shipRepArr = this.shipRep;
        for (let i = 0; i < shipRepArr.length; i++) {
            if (shipRepArr[i] !== 'hit') return false;
        }
        return true;
    }
}

const Ship = (originInt, length) => {
    const shipLength = length;
    const shipRep = [];
    for (let i = 0; i < shipLength; i++) {
        shipRep.push(originInt);
        originInt++;
    }
    return Object.create(ShipProto, {
        shipLength: {value: shipLength},
        shipRep: {value: shipRep}
    });
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameBoard": () => (/* binding */ GameBoard)
/* harmony export */ });
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _shipLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shipLibrary */ "./src/shipLibrary.js");


// ship is represented by an 'o' on the gameboard
// misssed hits are represented by an 'x' on the gameboard

const GameBoardProto = {
    convertToCoordinates(int) {
        const col = (int % 10) - 1;
        const row = Math.floor(int / 10); 
        return [row, col];
    },
    cacheShip(newShip, shipOrientation, originCoordinates) {
        let [row, col] = originCoordinates;
        const cachedCoordinates = [];
        for (let i = 0; i < newShip.shipLength; i++) {
            if (i == 0) cachedCoordinates.push(originCoordinates);
            else {
                if (shipOrientation === 'x') cachedCoordinates.push([row, ++col]);
                else cachedCoordinates.push([++row, col]);
            }
        }
        const dataObj = {
            shipOrientation,
            newShip,
            cachedCoordinates
        }
        this.cachedShips.push(dataObj);
    },
    placeShip(dataID, shipLength) {
        const originCoordinates = this.convertToCoordinates(dataID);
        let [row, col] = originCoordinates;
        const shipOrientation = this.currentOrientation;
        let newShip;
        if (shipOrientation === 'x') newShip = (0,_shipLibrary__WEBPACK_IMPORTED_MODULE_1__.Ship)(originCoordinates[1], shipLength);
        else newShip = (0,_shipLibrary__WEBPACK_IMPORTED_MODULE_1__.Ship)(originCoordinates[0], shipLength);
        this.cacheShip(newShip, shipOrientation, originCoordinates);
        for(let i = 0; i < shipLength; i++) {
            if (i == 0) this.gameBoardRep[row][col] = 'o';
            else {
                if (shipOrientation === 'x') this.gameBoardRep[row][++col] = 'o';
                else this.gameBoardRep[++row][col] = 'o';
            }
        }
    },
    recieveAttack() {

    }
};

const GameBoard = () => {
    const gameBoardRep = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    const currentOrientation = 'x';
    const cachedShips = [];
    return Object.create(GameBoardProto, {
        gameBoardRep: {value: gameBoardRep},
        currentOrientation: {value: currentOrientation},
        cachedShips: {value: cachedShips} 
    })
}



})();

/******/ })()
;
//# sourceMappingURL=main.js.map