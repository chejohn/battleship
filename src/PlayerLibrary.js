import getShipLength from "./utilities";

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
      if (compBoard.validateInput(originCoordinates, getShipLength(ships[ships.length-1]))) {
          compBoard.placeShip(randDataID, ships.pop());
      }
    }
  };

  return {
    attack,
    rotateShip,
    placeGamePieces,
  };
};

export { Player, Computer };

