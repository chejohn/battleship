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

const convertToCoordinates = (dataID) => {
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
}

const convertToDataID = (coordinates) => {
    const [row, col] = coordinates;
    const dataID = (row * 10 + 1) + col;
    return `${dataID}`;
}

const findShipData = (gameBoard, attackCoordinates) => {
  for (let shipData of gameBoard.cachedShips) {
    for (let coordinates of shipData.cachedCoordinates) {
      if (JSON.stringify(attackCoordinates) === JSON.stringify(coordinates)) {
        return shipData;
      }
    }
  }
};

export {
  getShipLength,
  createGameBoardGUI,
  formatImageElement,
  convertToCoordinates,
  convertToDataID,
  findShipData
};