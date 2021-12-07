import Ship from './ShipLibrary';
import {
  convertToCoordinates,
} from './utilities';

// ship is represented by an 'o' on the gameboard
// misssed hits are represented by an 'x' on the gameboard
// attacked ships are represented by an '*' on the gameboard
const GameBoardProto = {
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
    const originCoordinates = convertToCoordinates(dataID);
    let [row, col] = originCoordinates;
    const shipOrientation = this.currentOrientation;
    let newShip;
    if (shipOrientation === 'x') newShip = Ship(col, shipName);
    else newShip = Ship(row, shipName);
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
    const attackCoordinates = convertToCoordinates(dataID);
    const [row, col] = attackCoordinates;
    if (this.gameState[row][col] === null) {
      this.gameState[row][col] = 'x';
    } else if (this.gameState[row][col] === 'o') {
      this.gameState[row][col] = '*';
      for (let shipData of this.cachedShips) {
        for (let xyPair of shipData.cachedCoordinates) {
          if (JSON.stringify(xyPair) === JSON.stringify(attackCoordinates)) {
            const ship = shipData.ship;
            if (shipData.shipOrientation === 'x') ship.hit(col);
            else ship.hit(row);
            return;
          }
        }
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

export default GameBoard;


