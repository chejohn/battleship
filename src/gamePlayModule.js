import {
  formatImageElement,
  convertToCoordinates,
  convertToDataID,
  findShipData,
} from './utilities';

const gamePlayModule = (user, comp, userBoard, compBoard) => {
  const hoverEffect = (e) => {
    if (e.target.hasAttribute('data-id')) {
      const cell = e.target;
      if (e.type === 'mouseover') {
        const dataID = cell.getAttribute('data-id');
        const [row, col] = convertToCoordinates(dataID);
        if (
          compBoard.gameState[row][col] === 'x' ||
          compBoard.gameState[row][col] === '*'
        ) {
          cell.style.background = 'rgba(255, 60, 60, 0.6)';
          cell.style.cursor = 'not-allowed';
        }
        else cell.style.background = 'rgba(60, 255, 60, 0.6)';
      } else if (e.type === 'mouseout') cell.style.background = 'transparent';
    }
  };

  const placeShotMarker = (dataID, otherBoard, otherPlayerKind) => {
    let cell;
    const [row, col] = convertToCoordinates(dataID);
    const shotMarker = document.createElement('img');
    shotMarker.src = './assets/shot-marker.svg';
    shotMarker.className = 'shot-marker';
    cell = document.querySelector(
      `.${otherPlayerKind}-gameboard > [data-id="${dataID}"]`
    );
    if (otherBoard.gameState[row][col] === 'x') {
      shotMarker.style.filter =
        'invert(99%) sepia(1%) saturate(0%) hue-rotate(4deg) brightness(104%) contrast(100%)';
    } else if (otherBoard.gameState[row][col] === '*') {
      shotMarker.style.filter =
        'invert(15%) sepia(87%) saturate(4317%) hue-rotate(357deg) brightness(97%) contrast(125%)';
    }
    cell.style.display = 'flex';
    cell.style.justifyContent = 'center';
    cell.style.alignItems = 'center';
    cell.appendChild(shotMarker);
  };

  const displaySunkShip = (dataID) => {
    const attackCoordinates = convertToCoordinates(dataID);
    const shipData = findShipData(compBoard, attackCoordinates);
    const originDataID = convertToDataID(shipData.cachedCoordinates[0]);
    const originCell = document.querySelector(
      `.comp-gameboard > [data-id='${originDataID}']`
    );
    originCell.style.position = 'relative';
    let shipName = shipData.ship.shipName;
    const shipOrientation = shipData.shipOrientation;

    const shipImage = document.createElement('img');
    formatImageElement(shipImage, shipOrientation, shipName);
    shipImage.style.filter =
      'invert(75%) sepia(6%) saturate(181%) hue-rotate(344deg) brightness(90%) contrast(88%)';
    originCell.appendChild(shipImage);
  };

  const _printStatusToConsole = (
    dataID,
    user, 
    otherUser,
    otherBoard
  ) => {
    const messageNode = GlobalNodes.gameConsole.children[0];
    messageNode.remove();
    const attackCoordinates = convertToCoordinates(dataID);
    const [row, col] = attackCoordinates;
    let status;
    if (otherBoard.gameState[row][col] === '*' && otherUser.querySink(dataID)) {
      status = 'sunk';
      const shipData = findShipData(otherBoard, attackCoordinates);
      const shipName = shipData.ship.shipName;
      messageNode.textContent = `${user.userName} attacks and sunk ${otherUser.userName}'s ${shipName}!`;
    } else {
      if (otherBoard.gameState[row][col] === '*') {
        messageNode.textContent = `${user.userName} attacks and... it's a hit!`;
        status = 'hit';
      } else if (otherBoard.gameState[row][col] === 'x') {
        messageNode.textContent = `${user.userName} attacks and... it's a miss!`;
        status = 'miss';
      }
    }
    GlobalNodes.gameConsole.appendChild(messageNode);
    return status;
  };

  const printStatusToConsole = (
    dataID,
    user,
    otherUser,
    otherBoard
  ) => {
    return new Promise((resolve) => {
      const status = _printStatusToConsole(
        dataID,
        user,
        otherUser,
        otherBoard
      );
      setTimeout(() => {
        resolve(status);
      }, 900);
    });
  };

  const darkenUserShip = (dataID) => {
    const attackCoordinates = convertToCoordinates(dataID);
    const shipData = findShipData(userBoard, attackCoordinates);
    const originDataID = convertToDataID(shipData.cachedCoordinates[0]);
    const originCell = document.querySelector(
      `.user-gameboard > [data-id='${originDataID}']`
    );
    const shipImage = originCell.children[0];
    shipImage.style.filter =
      'invert(75%) sepia(6%) saturate(181%) hue-rotate(344deg) brightness(90%) contrast(88%)';
  };

  const playAudio = (MP3Obj) => {
    MP3Obj.currentTime = 0;
    MP3Obj.play();
  };

  const playRound = async (e) => {
    GlobalNodes.compBoardGUI.removeEventListener('click', playRound);
    if (userBoard.fleetDestroyed()) return;

    if (e.target.hasAttribute('data-id')) {
      const cell = e.target;
      const dataID = cell.getAttribute('data-id');
      const [row, col] = convertToCoordinates(dataID);
      if (
        compBoard.gameState[row][col] === null ||
        compBoard.gameState[row][col] === 'o'
      ) {
        user.attack(dataID, compBoard);
        playAudio(GlobalNodes.fireShotMP3);
        let status = await printStatusToConsole(
          dataID,
          user,
          comp,
          compBoard
        );
        placeShotMarker(dataID, compBoard, 'comp');
        if (status === 'miss') playAudio(GlobalNodes.shotMissMP3);
        else if (status === 'hit' || status === 'sunk') {
          playAudio(GlobalNodes.shotHitMP3);
          if (status === 'sunk') displaySunkShip(dataID);
        }
        if (compBoard.fleetDestroyed()) return;
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(comp.attack(userBoard));
          }, 1200);
        });
        playAudio(GlobalNodes.fireShotMP3);
        const recentHitArea = comp.getLastHitArea();
        status = await printStatusToConsole(
          recentHitArea,
          comp,
          user,
          userBoard,
        );
        if (status === 'miss') playAudio(GlobalNodes.shotMissMP3);
        else if (status === 'hit' || 'sunk') {
          playAudio(GlobalNodes.shotHitMP3);
          if (status === 'sunk') darkenUserShip(recentHitArea);
        }
        placeShotMarker(recentHitArea, userBoard, 'user');
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 900);
        });
      }
    }
    GlobalNodes.compBoardGUI.addEventListener('click', playRound);
  };

  const GlobalNodes = (() => {
    const compBoardGUI = document.querySelector('.comp-gameboard');
    const compBoardCells = document.querySelectorAll('.comp-gameboard > *');
    const userBoardGUI = document.querySelector('.user-gameboard');
    const gameConsole = document.querySelector('.game-console');
    const backgroundSound = document.querySelector('.background-sound');
    const fireShotMP3 = document.querySelector('.fire-shot');
    const shotMissMP3 = document.querySelector('.shot-miss');
    const shotHitMP3 = document.querySelector('.shot-hit');
    return {
      compBoardGUI,
      userBoardGUI,
      compBoardCells,
      gameConsole,
      backgroundSound,
      fireShotMP3,
      shotHitMP3,
      shotMissMP3,
    };
  })();
  const attachEventHandlers = (() => {
    GlobalNodes.compBoardCells.forEach((cell) => {
      cell.addEventListener('mouseover', hoverEffect);
      cell.addEventListener('mouseout', hoverEffect);
    });
    GlobalNodes.compBoardGUI.addEventListener('click', playRound);
  })();
  const playBackgroundMusic = (() => {
    GlobalNodes.backgroundSound.play();
  })();
};

export default gamePlayModule;
