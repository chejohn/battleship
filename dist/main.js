/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/battleShip.svg":
/*!***********************************!*\
  !*** ./src/assets/battleShip.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/battleShip.svg");

/***/ }),

/***/ "./src/assets/battleShipLogo.png":
/*!***************************************!*\
  !*** ./src/assets/battleShipLogo.png ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/battleShipLogo.png");

/***/ }),

/***/ "./src/assets/carrier.svg":
/*!********************************!*\
  !*** ./src/assets/carrier.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/carrier.svg");

/***/ }),

/***/ "./src/assets/destroyer.svg":
/*!**********************************!*\
  !*** ./src/assets/destroyer.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/destroyer.svg");

/***/ }),

/***/ "./src/assets/github.png":
/*!*******************************!*\
  !*** ./src/assets/github.png ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/github.png");

/***/ }),

/***/ "./src/assets/patrol.svg":
/*!*******************************!*\
  !*** ./src/assets/patrol.svg ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/patrol.svg");

/***/ }),

/***/ "./src/assets/shot-marker.svg":
/*!************************************!*\
  !*** ./src/assets/shot-marker.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/shot-marker.svg");

/***/ }),

/***/ "./src/assets/soundOff.png":
/*!*********************************!*\
  !*** ./src/assets/soundOff.png ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/soundOff.png");

/***/ }),

/***/ "./src/assets/soundOn.png":
/*!********************************!*\
  !*** ./src/assets/soundOn.png ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/soundOn.png");

/***/ }),

/***/ "./src/assets/submarine.svg":
/*!**********************************!*\
  !*** ./src/assets/submarine.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/submarine.svg");

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ShipLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShipLibrary */ "./src/ShipLibrary.js");

// ship is represented by an 'o' on the gameboard
// misssed hits are represented by an 'x' on the gameboard
// attacked ships are represented by an '*' on the gameboard
const GameBoardProto = {
  convertToCoordinates(dataID) {
    let col;
    let row;
    if (dataID % 10 === 0) {
      col = 9;
      row = dataID / 10 - 1;
    } else {
      col = (dataID % 10) - 1;
      row = Math.floor(dataID / 10);
    }
    return [row, col];
  },

  convertToDataID(coordinates) {
    const [row, col] = coordinates;
    const dataID = (row * 10 + 1) + col;
    return `${dataID}`;
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
      cachedCoordinates,
    };
    this.cachedShips.push(dataObj);
  },

  validateInput(originCoordinates, shipLength) {
    const [row, col] = originCoordinates;
    if (this.currentOrientation === 'x') {
      if (col + (shipLength - 1) > 9) return false;
      if (row - 1 >= 0) {
        for (let i = col; i < col + shipLength; i++)
          if (this.gameState[row - 1][i] === 'o') return false;
      }
      if (row + 1 <= 9) {
        for (let i = col; i < col + shipLength; i++)
          if (this.gameState[row + 1][i] === 'o') return false;
      }
      if (col - 1 >= 0) {
        if (this.gameState[row][col - 1] === 'o') return false;
      }
      if (col + shipLength <= 9) {
        if (this.gameState[row][col + shipLength] === 'o') return false;
      }
      for (let i = col; i < col + shipLength; i++)
        if (this.gameState[row][i] === 'o') return false;
    } else {
      if (row + (shipLength - 1) > 9) return false;
      if (col - 1 >= 0) {
        for (let i = row; i < row + shipLength; i++) {
          if (this.gameState[i][col - 1] === 'o') return false;
        }
      }
      if (col + 1 <= 9) {
        for (let i = row; i < row + shipLength; i++)
          if (this.gameState[i][col + 1] === 'o') return false;
      }
      if (row - 1 >= 0) {
        if (this.gameState[row - 1][col] === 'o') return false;
      }
      if (row + shipLength <= 9) {
        if (this.gameState[row + shipLength][col] === 'o') return false;
      }
      for (let i = row; i < row + shipLength; i++)
        if (this.gameState[i][col] === 'o') return false;
    }
    return true;
  },

  placeShip(dataID, shipName) {
    const originCoordinates = this.convertToCoordinates(dataID);
    let [row, col] = originCoordinates;
    const shipOrientation = this.currentOrientation;
    let newShip;
    if (shipOrientation === 'x') newShip = (0,_ShipLibrary__WEBPACK_IMPORTED_MODULE_0__["default"])(col, shipName);
    else newShip = (0,_ShipLibrary__WEBPACK_IMPORTED_MODULE_0__["default"])(row, shipName);
    this.cacheShipData(newShip, shipOrientation, originCoordinates);
    for (let i = 0; i < newShip.shipLength; i++) {
      if (i == 0) this.gameState[row][col] = 'o';
      else {
        if (shipOrientation === 'x') this.gameState[row][++col] = 'o';
        else this.gameState[++row][col] = 'o';
      }
    }
  },

  recieveAttack(dataID) {
    const attackCoordinates = this.convertToCoordinates(dataID);
    const [row, col] = attackCoordinates;
    if (this.gameState[row][col] === null) {
      this.gameState[row][col] = 'x';
    } else if (this.gameState[row][col] === 'o') {
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
  },

  returnCurrentAxis() {
    return this.currentOrientation;
  },

  changeOrientation() {
    if (this.currentOrientation === 'x') this.currentOrientation = 'y';
    else  this.currentOrientation = 'x';
  }
}

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);




/***/ }),

/***/ "./src/PlayerLibrary.js":
/*!******************************!*\
  !*** ./src/PlayerLibrary.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "Computer": () => (/* binding */ Computer)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");


const Player = (userBoard) => {
  const availableShips = ['patrol boat','submarine','destroyer','battleship','carrier'];
  
  const attack = (dataID, compBoard) => {
    compBoard.recieveAttack(dataID);
  };

  const rotateShip = () => {
    userBoard.changeOrientation();
  };

  const placeGamePiece = (dataID) => {
    const shipName = availableShips.pop();
    userBoard.placeShip(dataID, shipName);
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
    availableShips
  };
};

const Computer = (compBoard, user) => {
  const availableMoves = [];
  let lastHitArea;
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

  const negateOperand = () => {operandData.currOperand = -1 * operandData.currOperand;}

  const addToOriginHitArea = () => {
    const dataID = tempHitAreas[0] + operandData.currOperand;
    return dataID;
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
        dataID = addToOriginHitArea();
      } else {
          if (operandData.effectiveOperand) dataID = tempHitAreas[tempHitAreas.length - 1] + operandData.currOperand;
          else {
              negateOperand();
              dataID = addToOriginHitArea();
          }
          if (!validDataID(dataID)) {
            negateOperand();
            dataID = addToOriginHitArea(); 
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

  const attack = (userBoard) => {
    const dataID = chooseMove();
    userBoard.recieveAttack(dataID);
    lastHitArea = dataID;
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

  const placeGamePieces = () => {
    const ships= ['patrol boat', 'submarine', 'destroyer', 'battleship', 'carrier'];
    while (ships.length > 0) {
      const randDataID = Math.floor(Math.random() * 100) + 1;
      const originCoordinates = compBoard.convertToCoordinates(randDataID);
      rotateShip();
      if (compBoard.validateInput(originCoordinates, (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.getShipLength)(ships[ships.length-1]))) {
          compBoard.placeShip(randDataID, ships.pop());
      }
    }
  };

  const querySink = (dataID) => {
    const attackCoordinates = compBoard.convertToCoordinates(dataID);
    for (let shipData of compBoard.cachedShips) {
      for (let coordinates of shipData.cachedCoordinates) {
        if (JSON.stringify(attackCoordinates) === JSON.stringify(coordinates)) {
          return shipData.ship.isSunk();
        }
      }
    }
  }

  const getLastHitArea = () => {
    return lastHitArea;
  }

  return {
    attack,
    rotateShip,
    placeGamePieces,
    getLastHitArea,
    querySink
  };
};





/***/ }),

/***/ "./src/ShipLibrary.js":
/*!****************************!*\
  !*** ./src/ShipLibrary.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");


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

const Ship = (originInt, name) => {
    const shipLength = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.getShipLength)(name);
    const shipName = name;
    const shipRep = [];
    for (let i = 0; i < shipLength; i++) {
        shipRep.push(originInt);
        originInt++;
    }
    return Object.create(ShipProto, {
        shipLength: {value: shipLength},
        shipRep: {value: shipRep},
        shipName: {value: shipName}
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ }),

/***/ "./src/placeShipStage.js":
/*!*******************************!*\
  !*** ./src/placeShipStage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");

/*
  params: user obj, userBoard obj
  returns: an array of userBoardGUI event listeners
*/
const placeShipStage = (user, userBoard) => {
  const alterGameMessage = (availableShips) => {
    if (availableShips.length > 0) {
      const gameMessage = GlobalNodes.gameMessage.textContent;
      const currentShip = availableShips[availableShips.length - 1];
      const userName = gameMessage.substr(0, gameMessage.indexOf(','));
      GlobalNodes.gameMessage.textContent = `${userName}, place your ${currentShip}`;
    }
  };

  const toggleAxisGUI = (e) => {
    const axisBttn = e.target;
    user.rotateShip();
    if (userBoard.returnCurrentAxis() === 'x')
      axisBttn.textContent = 'axis: x';
    else axisBttn.textContent = 'axis: y';
  };

  const hoverEffect = (e) => {
    const availableShips = user.availableShips;
    const axisPosition = userBoard.returnCurrentAxis();
    let cell = e.target;
    const currShipLength = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.getShipLength)(
      availableShips[availableShips.length - 1]
    );
    const originCoordinates = userBoard.convertToCoordinates(
      Number(cell.getAttribute('data-id'))
    );

    if (!userBoard.validateInput(originCoordinates, currShipLength)) {
      if (e.type === 'mouseover') {
        cell.style.background = 'rgba(255, 60, 60, 0.6)';
        cell.style.cursor = 'not-allowed';
      } else if (e.type === 'mouseout') {
        cell.style.background = 'transparent';
        cell.style.cursor = 'pointer';
      }
    } else {
      let cellColor;
      if (axisPosition === 'x') {
        if (e.type === 'mouseover') cellColor = 'lightgrey';
        else if (e.type === 'mouseout') cellColor = 'transparent';
        for (let i = 0; i < currShipLength; i++) {
          cell.style.background = cellColor;
          cell = cell.nextElementSibling;
        }
      } else if (axisPosition === 'y') {
        if (e.type === 'mouseover') cellColor = 'lightgrey';
        else if (e.type === 'mouseout') cellColor = 'transparent';
        for (let i = 0; i < currShipLength; i++) {
          cell.style.background = cellColor;
          const dataID = cell.getAttribute('data-id');
          const newDataID = `${Number(dataID) + 10}`;
          cell = document.querySelector(`[data-id='${newDataID}']`);
        }
      }
    }
  };

  const placeShipGUI = (e) => {
    if (e.target.hasAttribute('data-id')) {
      const originCell = e.target;
      const dataID = Number(originCell.getAttribute('data-id'));
      const originCoordinates = userBoard.convertToCoordinates(dataID);
      const currentShip = user.availableShips[user.availableShips.length - 1];
      const shipLength = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.getShipLength)(currentShip);

      if (userBoard.validateInput(originCoordinates, shipLength) === true) {
        user.placeGamePiece(dataID);
        originCell.style.position = 'relative';
        const axisPosition = userBoard.returnCurrentAxis();
        const imageElement = document.createElement('img');
        imageElement.alt = '';
        (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.formatImageElement)(imageElement, axisPosition, currentShip);
        let cell = originCell;
        if (axisPosition === 'x') {
          for (let i = 0; i < shipLength; i++) {
            cell.style.background = 'transparent';
            cell = cell.nextElementSibling;
          }
        } else {
          for (let i = 0; i < shipLength; i++) {
            cell.style.background = 'transparent';
            const dataID = cell.getAttribute('data-id');
            const newDataID = `${Number(dataID) + 10}`;
            cell = document.querySelector(`[data-id='${newDataID}']`);
          }
        }
        originCell.appendChild(imageElement);
        alterGameMessage(user.availableShips);
      }
    }
  };

  const GlobalNodes = (() => {
    const axisBttn = document.querySelector('.bttn-orientation');
    const gameBoardCells = document.querySelectorAll('.user-gameboard > *');
    const gameBoard = document.querySelector('.user-gameboard');
    const gameMessage = document.querySelector('.placeShip-message');
    return {
      axisBttn,
      gameBoardCells,
      gameBoard,
      gameMessage,
    };
  })();

  const AddEventHandlers = (() => {
    GlobalNodes.axisBttn.addEventListener('click', toggleAxisGUI);
    GlobalNodes.gameBoardCells.forEach((cell) => {
      cell.addEventListener('mouseover', hoverEffect);
      cell.addEventListener('mouseout', hoverEffect);
    });
    GlobalNodes.gameBoard.addEventListener('click', placeShipGUI);
  })();

  return [hoverEffect, placeShipGUI]
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (placeShipStage);





/***/ }),

/***/ "./src/transitionToGamePlayLib.js":
/*!****************************************!*\
  !*** ./src/transitionToGamePlayLib.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");

/*
    params: hoverEffect and placeShipGUI event handlers
    return: void
    task: remove placeShipStage event listeners; 
*/
const transitionToGamePlay = (hoverEffect, placeShipGUI) => {
    const GlobalNodes = (() => {
        const userBoardGUI = document.querySelector('.user-gameboard');
        const gameBoardCells = document.querySelectorAll('.user-gameboard > *');
        const axisBttn = document.querySelector('.bttn-orientation');
        const main = document.querySelector('main');
        const compBoardGUI = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createGameBoardGUI)('comp');
        return {
            userBoardGUI,
            gameBoardCells,
            axisBttn,
            main,
            compBoardGUI
        }
    })();
    const removeEventHandlers = (() => {
        GlobalNodes.gameBoardCells.forEach((cell) => {
            cell.removeEventListener('mouseover', hoverEffect);
            cell.removeEventListener('moseout', hoverEffect);
        });
        GlobalNodes.userBoardGUI.removeEventListener('click', placeShipGUI);
    })();
    const insertGameConsole = () => {
      const console = document.createElement('div');
      console.className = 'game-console';
      const consoleText = document.createElement('p');
      consoleText.textContent = 'Awaiting Orders, Admiral Ché';
      console.appendChild(consoleText);
      GlobalNodes.main.appendChild(console);
    };
    const createContainer = (className) => {
        const container = document.createElement('div');
        container.className = className;
        return container;
    }
    const prepareThirdModule = (() => {
        const userBoard = GlobalNodes.userBoardGUI;
        document.querySelector('.placeShip-message').remove();
        document.querySelector('.bttn-orientation').remove();
        userBoard.remove();
        insertGameConsole();

        const gbContainer = createContainer('gameBoard-container');
        GlobalNodes.main.appendChild(gbContainer);

        const gbSubContainer = createContainer('gb-subcontainer');
        const gbSubContainer2 = createContainer('gb-subcontainer');
        gbContainer.appendChild(gbSubContainer);
        gbContainer.appendChild(gbSubContainer2);

        const gbHeader = document.createElement('p');
        gbHeader.textContent = 'Friendly waters';
        gbSubContainer.appendChild(gbHeader);
        gbSubContainer.appendChild(userBoard);

        const gbHeader2 = document.createElement('p');
        gbHeader2.textContent = 'Enemy waters';
        gbSubContainer2.appendChild(gbHeader2);
        gbSubContainer2.appendChild(GlobalNodes.compBoardGUI);
    })();
    const styleBoards = (() => {
        GlobalNodes.userBoardGUI.style.cursor = 'default';
        GlobalNodes.compBoardGUI.style.cursor = 'crosshair';
    })();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transitionToGamePlay);


/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getShipLength": () => (/* binding */ getShipLength),
/* harmony export */   "createGameBoardGUI": () => (/* binding */ createGameBoardGUI),
/* harmony export */   "formatImageElement": () => (/* binding */ formatImageElement)
/* harmony export */ });
const getShipLength = (shipName) => {
  let shipLength;
  switch (shipName) {
    case 'patrol boat':
      shipLength = 2;
      break;
    case 'destroyer':
    case 'submarine':
      shipLength = 3;
      break;
    case 'battleship':
      shipLength = 4;
      break;
    case 'carrier':
      shipLength = 5;
      break;
  }
  return shipLength;
};

const createGameBoardGUI = (playerKind) => {
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('gameboard');
  gameBoard.classList.add(`${playerKind}-gameboard`);
  for (let i = 1; i <= 100; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', `${i}`);
    gameBoard.appendChild(cell);
  }
  return gameBoard;
}

const formatImageElement = (imageElement, axisPosition, currentShip) => {
  if (currentShip === 'patrol boat') {
    imageElement.src = './assets/patrol.svg';
    imageElement.className = `patrol-${axisPosition}`;
  } else {
    imageElement.src = `./assets/${currentShip}.svg`;
    imageElement.className = `${currentShip}-${axisPosition}`;
  }
  imageElement.classList.add('ship-image');
};



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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _assets_battleShipLogo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/battleShipLogo.png */ "./src/assets/battleShipLogo.png");
/* harmony import */ var _assets_soundOn_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/soundOn.png */ "./src/assets/soundOn.png");
/* harmony import */ var _assets_soundOff_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/soundOff.png */ "./src/assets/soundOff.png");
/* harmony import */ var _assets_github_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/github.png */ "./src/assets/github.png");
/* harmony import */ var _assets_destroyer_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/destroyer.svg */ "./src/assets/destroyer.svg");
/* harmony import */ var _assets_battleShip_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/battleShip.svg */ "./src/assets/battleShip.svg");
/* harmony import */ var _assets_patrol_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/patrol.svg */ "./src/assets/patrol.svg");
/* harmony import */ var _assets_submarine_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/submarine.svg */ "./src/assets/submarine.svg");
/* harmony import */ var _assets_carrier_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/carrier.svg */ "./src/assets/carrier.svg");
/* harmony import */ var _assets_shot_marker_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/shot-marker.svg */ "./src/assets/shot-marker.svg");
/* harmony import */ var _PlayerLibrary__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PlayerLibrary */ "./src/PlayerLibrary.js");
/* harmony import */ var _GameBoardLibrary__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./GameBoardLibrary */ "./src/GameBoardLibrary.js");
/* harmony import */ var _placeShipStage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./placeShipStage */ "./src/placeShipStage.js");
/* harmony import */ var _transitionToGamePlayLib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./transitionToGamePlayLib */ "./src/transitionToGamePlayLib.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");

















const userBoard = (0,_GameBoardLibrary__WEBPACK_IMPORTED_MODULE_12__["default"])();
const compBoard = (0,_GameBoardLibrary__WEBPACK_IMPORTED_MODULE_12__["default"])();
const user = (0,_PlayerLibrary__WEBPACK_IMPORTED_MODULE_11__.Player)(userBoard);
const comp = (0,_PlayerLibrary__WEBPACK_IMPORTED_MODULE_11__.Computer)(compBoard, user);

const [hoverEffect, placeShipGUI] = (0,_placeShipStage__WEBPACK_IMPORTED_MODULE_13__["default"])(user, userBoard);
setTimeout(() => {
    (0,_transitionToGamePlayLib__WEBPACK_IMPORTED_MODULE_14__["default"])(hoverEffect, placeShipGUI);
    comp.placeGamePieces();
},8000);

const gamePlayModule = (user, comp, userBoard, compBoard) => {
    const hoverEffect = (e) => {
        if (e.target.hasAttribute('data-id')) {
            const cell = e.target;
            if (e.type === 'mouseover') {
              const dataID = cell.getAttribute('data-id');
              const [row, col] = compBoard.convertToCoordinates(dataID);
              if (
                compBoard.gameState[row][col] === 'x' ||
                compBoard.gameState[row][col] === '*'
              )
                cell.style.background = 'rgba(255, 60, 60, 0.6)';
              else cell.style.background = 'rgba(60, 255, 60, 0.6)';
            } else if (e.type === 'mouseout')
              cell.style.background = 'transparent';
        }
    };

    const placeShotMarker = (dataID, playerKind) => {
        let cell;
        const [row, col] = userBoard.convertToCoordinates(dataID);
        const shotMarker = document.createElement('img');
        shotMarker.src = './assets/shot-marker.svg';
        shotMarker.className = 'shot-marker';
        if (playerKind === 'user') {
            cell = document.querySelector(`.comp-gameboard > [data-id="${dataID}"]`);
            if (compBoard.gameState[row][col] === 'x') {
                shotMarker.style.filter = 'invert(99%) sepia(1%) saturate(0%) hue-rotate(4deg) brightness(104%) contrast(100%)';
            } 
            else if (compBoard.gameState[row][col] === '*') {
                shotMarker.style.filter = 'invert(15%) sepia(87%) saturate(4317%) hue-rotate(357deg) brightness(97%) contrast(125%)';
            }
        } 
        else {
            cell = document.querySelector(`.user-gameboard > [data-id="${dataID}"]`);
            if (userBoard.gameState[row][col] === 'x') {
              shotMarker.style.filter =
                'invert(99%) sepia(1%) saturate(0%) hue-rotate(4deg) brightness(104%) contrast(100%)';
            } else if (userBoard.gameState[row][col] === '*') {
              shotMarker.style.filter =
                'invert(15%) sepia(87%) saturate(4317%) hue-rotate(357deg) brightness(97%) contrast(125%)';
            }
        }
        cell.style.display = 'flex';
        cell.style.justifyContent = 'center';
        cell.style.alignItems = 'center';
        cell.appendChild(shotMarker);
    }

    const displaySunkShip = (dataID) => {
        const attackCoordinates = compBoard.convertToCoordinates(dataID);
        for (let shipData of compBoard.cachedShips) {
            for (let coordinates of shipData.cachedCoordinates) {
                if (JSON.stringify(attackCoordinates) === JSON.stringify(coordinates)) {
                    const originDataID = compBoard.convertToDataID(shipData.cachedCoordinates[0]);
                    const originCell = document.querySelector(`.comp-gameboard > [data-id='${originDataID}']`);
                    originCell.style.position = 'relative';
                    let shipName = shipData.ship.shipName;
                    const shipOrientation = shipData.shipOrientation;
                    
                    const shipImage = document.createElement('img');
                    (0,_utilities__WEBPACK_IMPORTED_MODULE_15__.formatImageElement)(shipImage, shipOrientation, shipName);
                    shipImage.style.filter = 'invert(75%) sepia(6%) saturate(181%) hue-rotate(344deg) brightness(90%) contrast(88%)';
                    originCell.appendChild(shipImage);
                }
            }
        }
    }

    const playRound = (e) => {
        if (e.target.hasAttribute('data-id')) {
            const cell = e.target;
            const dataID = cell.getAttribute('data-id');
            const [row, col] = userBoard.convertToCoordinates(dataID);
            if (compBoard.gameState[row][col] === null || compBoard.gameState[row][col] === 'o') {
                user.attack(dataID, compBoard);
                placeShotMarker(dataID, 'user');
                if (comp.querySink(dataID)) {
                    displaySunkShip(dataID);
                }
                comp.attack(userBoard);
                placeShotMarker(comp.getLastHitArea(), 'comp');
            }
        }
    }

    const GlobalNodes = (() => {
      const compBoardGUI = document.querySelector('.comp-gameboard');
      const compBoardCells = document.querySelectorAll('.comp-gameboard > *');
      const userBoardGUI = document.querySelector('.user-gameboard');
      return {
          compBoardGUI,
          userBoardGUI,
          compBoardCells
      }
    })();
    const attachEventHandlers = (() => {
        GlobalNodes.compBoardCells.forEach(cell => {
            cell.addEventListener('mouseover', hoverEffect);
            cell.addEventListener('mouseout', hoverEffect);
        });
        GlobalNodes.compBoardGUI.addEventListener('click', playRound);
    })();
};

setTimeout(() => {
    gamePlayModule(user, comp, userBoard, compBoard);
}, 9000);


})();

/******/ })()
;
//# sourceMappingURL=main.js.map