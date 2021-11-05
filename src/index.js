import { GameBoard } from "./GameBoardLibrary";

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
            const attackCoordinates = this.userBoard.convertToCoordinates(dataID);
            for (let shipData of this.userBoard.cachedShips) {
                for (let coordinates of shipData.cachedCoordinates) {
                    if (JSON.stringify(attackCoordinates) === JSON.stringify(coordinates)) {
                        return shipData.ship.isSunk();
                    }
                }
            }
        }
    };
}

const Computer = () => {
    const availableMoves = [];
    for (let i = 1; i <= 100; i++) {
        availableMoves.push(i);
    }
    const operandData = {
        operands: [-1, 1, -10, 10],
        currOperand: null,
        effectiveCurrOperand: null
    }
    return { 
        operandData,
        availableMoves,
        cachedHitAreas: [],
        validOperand() {

        },
        chooseMove() {
            let dataID;
            if (this.cachedHitAreas.length < 1) {
                const randIndex = Math.floor(Math.random() * this.cachedHitAreas.length);
                dataID = this.availableMoves.splice(randIndex, 1)[0];
            } 
            else {
                const cachedHitAreas = this.cachedHitAreas;
                const operandData = this.operandData;
                if (cachedHitAreas.length <= 1) {
                    const operands = operandData.operands;
                    for (let i = 0; i < operands.length; i++) {
                        if (!this.validOperand(dataID, operands[i])) {
                            operands.splice(i, 1);
                            i--;
                        }
                        else {
                            operandData.currOperand = operands.splice(i, 1)[0];
                            dataID = cachedHitAreas[0] + operandData.currOperand;
                            break;
                        }
                    }
                } 
                else {
                    if (operandData.effectiveCurrOperand)
                        dataID = cachedHitAreas[cachedHitAreas.length - 1] + operandData.currOperand;
                    else {
                        operandData.currOperand = -1 * (operandData.currOperand);
                        dataID = cachedHitAreas[0] + operandData.currOperand;
                    }
                }
            }
            return dataID;
        },
        attack() {
            const dataID = chooseMove();
            userBoard.recieveAttack(dataID);
            const hit = user.queryHit(dataID);
            if (hit) {
                const sunk = user.querySink(dataID);
                if (hit && !sunk) {
                    this.cachedHitAreas.push(dataID);
                    if (this.cachedHitAreas.length > 1) 
                        this.operandData.effectiveCurrOperand = true;
                } 
                else if (hit && sunk) {
                    this.cachedHitAreas = [];
                    this.operandData.operands = [-1,1, -10, 10];
                    this.operandData.effectiveCurrOperand = null;
                    this.operandData.currOperand = null;
                }
            }
            else if (!hit && this.cachedHitAreas.length > 1) 
                this.operandData.effectiveCurrOperand = false;
        },
        rotateShip() {

        },
        placeGamePiece() {

        }
    };
}
