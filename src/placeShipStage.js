import {getShipLength} from './utilities';
/*
  params: user obj, userBoard obj
  returns: an array of userBoardGUI event listeners
*/
const placeShipStage = (user, userBoard) => {
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
    const currShipLength = getShipLength(
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
      const shipLength = getShipLength(currentShip);

      if (userBoard.validateInput(originCoordinates, shipLength) === true) {
        user.placeGamePiece(dataID);
        originCell.style.position = 'relative';
        const axisPosition = userBoard.returnCurrentAxis();
        const imageElement = document.createElement('img');
        imageElement.alt = '';
        formatImageElement(imageElement, axisPosition, currentShip);
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

export default placeShipStage;



