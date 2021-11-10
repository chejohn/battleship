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
    
    const convertToCoordinates = (dataID) => {
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
    }

    const cacheShipData = (newShip, shipOrientation, originCoordinates) => {
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
        cachedShips.push(dataObj);
    }

    const validateInput = (originCoordinates, shipLength) => {
        const [row, col] = originCoordinates;
        if (currentOrientation === 'x') {
           if (col + (shipLength - 1) > 9) return false;
        } 
        else {
            if (row + (shipLength - 1) > 9) return false;
        }
        return true;
    }

    const placeShip = (dataID, shipLength) => {
        const originCoordinates = convertToCoordinates(dataID);
        const validInput = validateInput(originCoordinates, shipLength);

        if (validInput) {
            let [row, col] = originCoordinates;
            const shipOrientation = currentOrientation;
            let newShip;
            if (shipOrientation === 'x') newShip = (0,_ShipLibrary__WEBPACK_IMPORTED_MODULE_1__.Ship)(col, shipLength);
            else newShip = (0,_ShipLibrary__WEBPACK_IMPORTED_MODULE_1__.Ship)(row, shipLength);
            cacheShipData(newShip, shipOrientation, originCoordinates);
            for (let i = 0; i < shipLength; i++) {
              if (i == 0) gameState[row][col] = 'o';
              else {
                if (shipOrientation === 'x') gameState[row][++col] = 'o';
                else gameState[++row][col] = 'o';
              }
            }
        }
    }

    const recieveAttack = (dataID) => {
        const attackCoordinates = convertToCoordinates(dataID);
        const [row, col] = attackCoordinates;
        if (gameState[row][col] === null) {
            gameState[row][col] = 'x';
        }
        else if (gameState[row][col] === 'o') {
            gameState[row][col] = '*';
            let breakFromOuter = false;
            for (let shipData of cachedShips) {
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
    }

    const changeOrientation = () => {
        if (currentOrientation === 'x') currentOrientation = 'y';
        else currentOrientation = 'x';
    } 

    const fleetDestroyed = () => {
        for (let shipData of cachedShips) {
            if (!shipData.ship.isSunk()) return false;
        }
        return true;
    }
    
    return {
        fleetDestroyed,
        recieveAttack,
        placeShip,
        convertToCoordinates,
        cachedShips,
        gameState,
        changeOrientation
    }
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
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "Computer": () => (/* binding */ Computer)
/* harmony export */ });
/* harmony import */ var _GameBoardLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoardLibrary */ "./src/GameBoardLibrary.js");


const Player = (userBoard) => {
  const attack = (dataID) => {
    compBoard.recieveAttack(dataID);
  };

  const rotateShip = () => {
    userBoard.changeOrientation();
  };

  const placeGamePiece = (dataID, length) => {
    userBoard.placeShip(dataID, length);
  };

  const queryHit = (dataID) => {
    const [row, col] = userBoard.convertToCoordinates(dataID);
    if (userBoard.gameState[row][col] === '*') return true;
    return false;
  };

  const querySink = (dataID) => {
    const attackCoordinates = userBoard.convertToCoordinates(dataID);
    for (let shipData of userBoard.cachedShips) {
      for (let coordinates of shipData.cachedCoordinates) {
        if (JSON.stringify(attackCoordinates) === JSON.stringify(coordinates)) {
          return shipData.ship.isSunk();
        }
      }
    }
  };
  return {
    attack,
    rotateShip,
    placeGamePiece,
    queryHit,
    querySink,
  };
};

const Computer = (compBoard, user) => {
  const availableMoves = [];
  for (let i = 1; i <= 100; i++) {
    availableMoves.push(i);
  }
  const operandData = {
    operands: [-1, 1, -10, 10],
    currOperand: null,
    effectiveOperand: null,
  };
  let tempHitAreas = [];

  const validDataID = (hitArea, operand = 0) => {
    let aleredOperand;
    if (operand % 10 === 0 || operand % 10 === -0) aleredOperand = operand/10;
    const [row, col] = compBoard.convertToCoordinates(hitArea);
  
    if (operand === 1 || operand === -1) {
        if (col + operand < 0 || col + operand > 9) return false;
    }
    if (operand === 10 || operand === -10) {
        if (row + aleredOperand < 0 || row + aleredOperand > 9) return false;
    }
    for (let move of availableMoves) {
        if (move === hitArea + operand) return true;
    }
    return false;
  }

  const chooseMove = () => {
      let dataID;
      if (tempHitAreas.length < 1) {
          const randIndex = Math.floor(Math.random() * availableMoves.length);
          dataID = availableMoves.splice(randIndex, 1)[0];
      }
      else if (tempHitAreas.length <= 1) {
        const operands = operandData.operands;
        while(!validDataID(tempHitAreas[0], operands[operands.length - 1])) {
          operands.pop();
        }
        operandData.currOperand = operands.pop();
        dataID = tempHitAreas[0] + operandData.currOperand;
      } else {
          if (operandData.effectiveOperand) dataID = tempHitAreas[tempHitAreas.length - 1] + operandData.currOperand;
          else {
              operandData.currOperand = -1 * operandData.currOperand;
              dataID = operandData.currOperand + tempHitAreas[0];
          }
          if (!validDataID(dataID)) {
            operandData.currOperand = -1 * operandData.currOperand;
            dataID = operandData.currOperand + tempHitAreas[0]; 
          }
      }
      for (let i = 0; i < availableMoves.length; i++) {
          if (availableMoves[i] === dataID) {
              availableMoves.splice(i, 1);
              break;
          }
      }
      return dataID;
  };

  const attack = () => {
    const dataID = chooseMove();
    userBoard.recieveAttack(dataID);
    const hit = user.queryHit(dataID);
    if (hit) {
        const sunk = user.querySink(dataID);
        if (sunk) {
            operandData.operands = [-1, 1, -10, 10];
            operandData.currOperand = null;
            operandData.effectiveOperand = null;
            tempHitAreas = [];
        } else {
            tempHitAreas.push(dataID);
            if (tempHitAreas.length > 1) operandData.effectiveOperand = true;
        }
    }
    else if (!hit && tempHitAreas.length > 1) operandData.effectiveOperand = false;
  };

  const rotateShip = () => {
    if (Math.random() < 0.5) compBoard.changeOrientation();
  };

  const placeGamePiece = () => {
    const lengths = [];
  };

  return {
    attack,
    rotateShip,
    placeGamePiece,
  };
};






})();

/******/ })()
;
//# sourceMappingURL=main.js.map