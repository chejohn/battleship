import './index.scss';
import {Ship} from './ShipLibrary';
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
            if (shipOrientation === 'x') newShip = Ship(col, shipLength);
            else newShip = Ship(row, shipLength);
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

export {GameBoard};


