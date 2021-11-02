import './index.scss';
import {Ship} from './shipLibrary';
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
        if (shipOrientation === 'x') newShip = Ship(originCoordinates[1], shipLength);
        else newShip = Ship(originCoordinates[0], shipLength);
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

export {GameBoard};
