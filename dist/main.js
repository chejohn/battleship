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

/***/ "./src/GameBoardLibrary.js":
/*!*********************************!*\
  !*** ./src/GameBoardLibrary.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameBoard": () => (/* binding */ GameBoard)
/* harmony export */ });
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _ShipLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShipLibrary */ "./src/ShipLibrary.js");


// ship is represented by an 'o' on the gameboard
// misssed hits are represented by an 'x' on the gameboard
// attacked ships are represented by an '*' on the gameboard
const GameBoardProto = {
    convertToCoordinates(dataID) {
        let col;
        let row;
        if (dataID % 10 === 0) {
            col = 9;
            row = dataID/10 - 1;
        } 
        else {
            col = (dataID % 10) - 1;
            row = Math.floor(dataID / 10); 
        }
        return [row, col];
    },
    cacheShipData(newShip, shipOrientation, originCoordinates) {
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
            ship: newShip,
            cachedCoordinates
        }
        this.cachedShips.push(dataObj);
    },
    validateInput(originCoordinates, shipLength) {
        const [row, col] = originCoordinates;
        if (this.currentOrientation === 'x') {
           if (col + (shipLength - 1) > 9) return false;
        } 
        else {
            if (row + (shipLength - 1) > 9) return false;
        }
        return true;
    },
    placeShip(dataID, shipLength) {
        const originCoordinates = this.convertToCoordinates(dataID);
        const validInput = this.validateInput(originCoordinates, shipLength);

        if (validInput) {
            let [row, col] = originCoordinates;
            const shipOrientation = this.currentOrientation;
            let newShip;
            if (shipOrientation === 'x') newShip = (0,_ShipLibrary__WEBPACK_IMPORTED_MODULE_1__.Ship)(col, shipLength);
            else newShip = (0,_ShipLibrary__WEBPACK_IMPORTED_MODULE_1__.Ship)(row, shipLength);
            this.cacheShipData(newShip, shipOrientation, originCoordinates);
            for (let i = 0; i < shipLength; i++) {
              if (i == 0) this.gameState[row][col] = 'o';
              else {
                if (shipOrientation === 'x') this.gameState[row][++col] = 'o';
                else this.gameState[++row][col] = 'o';
              }
            }
        }
    },
    recieveAttack(dataID) {
        const attackCoordinates = this.convertToCoordinates(dataID);
        const [row, col] = attackCoordinates;
        if (this.gameState[row][col] === null) {
            this.gameState[row][col] = 'x';
        }
        else if (this.gameState[row][col] === 'o') {
            this.gameState[row][col] = '*';
            let breakFromOuter = false;
            for (let shipData of this.cachedShips) {
                for (let xyPair of shipData.cachedCoordinates) {
                    if (JSON.stringify(xyPair) === JSON.stringify(attackCoordinates)) {
                        const ship = shipData.ship;
                        if (shipData.shipOrientation === 'x') ship.hit(col);
                        else ship.hit(row);
                        breakFromOuter = true;
                        break;
                    }
                }
                if (breakFromOuter) break;
            }
        }
    },
    fleetDestroyed() {
        for (let shipData of this.cachedShips) {
            if (!shipData.ship.isSunk()) return false;
        }
        return true;
    }
};

const GameBoard = () => {
    const gameState = [
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
    let currentOrientation = 'x';
    const cachedShips = [];
    return Object.create(GameBoardProto, {
        gameState: {value: gameState},
        currentOrientation: {
            value: currentOrientation,
            writable: true
        },
        cachedShips: {value: cachedShips} 
    })
}





/***/ }),

/***/ "./src/ShipLibrary.js":
/*!****************************!*\
  !*** ./src/ShipLibrary.js ***!
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

const Ship = (originInt, lenght) => {
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
/* harmony import */ var _GameBoardLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoardLibrary */ "./src/GameBoardLibrary.js");


// computer players must have access to available moves;
// players must be able to change gameboard orientation;
// players must be able to place ships;
// players must be able to attack another board;
// overall: players should be able to interact with gameboards

// create a player object
// create a computer object

// for the computer to know whether it has sunk the user's ship
// the user must tell the computer based on the user's board data;

const Player = () => {
    return {
        attack(dataID) {
            compBoard.recieveAttack(dataID);
        },
        rotateShip() {
            if (userBoard.currentOrientation === 'x') userBoard.currentOrientation = 'y';
            else userBoard.currentOrientation = 'x';
        }, 
        placeGamePiece(dataID, length) {
            userBoard.placeShip(dataID, length);
        },
        queryHit(dataID) {
            const [row, col] = userBoard.convertToCoordinates(dataID);
            if (userBoard.gameState[row][col] === '*') return true;
            return false;
        },
        querySink(dataID) {
            
        }
    };
}

const Computer = () => {
    const availableMoves = [];
    for (let i = 1; i <= 100; i++) {
        availableMoves.push(i);
    }
    return { 
        availableMoves,
        cachedHitAreas: [],
        chooseMove() {
            if (this.cachedHitAreas.length < 1) {
                const randIndex = Math.floor(Math.random() * this.cachedHitAreas.length);
                const dataID = this.availableMoves.splice(randIndex, 1)[0];
                return dataID;
            } 
            else {

            }
        },
        attack() {
            const dataID = chooseMove();
            userBoard.recieveAttack(dataID);
            const hit = user.queryHit(dataID);
            if (hit) this.cachedHitAreas.push(dataID);
        },
        rotateShip() {

        },
        placeGamePiece() {

        }
    };
}

})();

/******/ })()
;
//# sourceMappingURL=main.js.map