import './index.scss';
import {Ship} from './ShipLibrary';
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
            if (shipOrientation === 'x') newShip = Ship(col, shipLength);
            else newShip = Ship(row, shipLength);
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

export {GameBoard};

