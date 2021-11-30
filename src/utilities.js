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
  gameBoard.classList.add(`${playerKind}-board`);
  for (let i = 1; i <= 100; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', `${i}`);
    gameBoard.appendChild(cell);
  }
  return gameBoard;
}

export {
  getShipLength,
  createGameBoardGUI
};