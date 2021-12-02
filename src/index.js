import './styles/index.scss';
import './assets/battleShipLogo.png';
import './assets/soundOn.png';
import './assets/soundOff.png';
import './assets/github.png';
import './assets/destroyer.svg';
import './assets/battleShip.svg';
import './assets/patrol.svg';
import './assets/submarine.svg';
import './assets/carrier.svg';
import './assets/shot-marker.svg';
import { Player, Computer } from './PlayerLibrary';
import GameBoard from './GameBoardLibrary';
import placeShipStage from './placeShipStage';
import transitionToGamePlay from './transitionToGamePlayLib';
import { formatImageElement } from './utilities';

const userBoard = GameBoard();
const compBoard = GameBoard();
const user = Player(userBoard);
const comp = Computer(compBoard, user);

const [hoverEffect, placeShipGUI] = placeShipStage(user, userBoard);
setTimeout(() => {
    transitionToGamePlay(hoverEffect, placeShipGUI);
    comp.placeGamePieces();
},8000);

const gamePlayModule = (user, comp, userBoard, compBoard) => {
    const hoverEffect = (e) => {
        if (e.target.hasAttribute('data-id')) {
            const cell = e.target;
            if (e.type === 'mouseover') {
              const dataID = cell.getAttribute('data-id');
              const [row, col] = compBoard.convertToCoordinates(dataID);
              if (
                compBoard.gameState[row][col] === 'x' ||
                compBoard.gameState[row][col] === '*'
              )
                cell.style.background = 'rgba(255, 60, 60, 0.6)';
              else cell.style.background = 'rgba(60, 255, 60, 0.6)';
            } else if (e.type === 'mouseout')
              cell.style.background = 'transparent';
        }
    };

    const placeShotMarker = (dataID, playerKind) => {
        let cell;
        const [row, col] = userBoard.convertToCoordinates(dataID);
        const shotMarker = document.createElement('img');
        shotMarker.src = './assets/shot-marker.svg';
        shotMarker.className = 'shot-marker';
        if (playerKind === 'user') {
            cell = document.querySelector(`.comp-gameboard > [data-id="${dataID}"]`);
            if (compBoard.gameState[row][col] === 'x') {
                shotMarker.style.filter = 'invert(99%) sepia(1%) saturate(0%) hue-rotate(4deg) brightness(104%) contrast(100%)';
            } 
            else if (compBoard.gameState[row][col] === '*') {
                shotMarker.style.filter = 'invert(15%) sepia(87%) saturate(4317%) hue-rotate(357deg) brightness(97%) contrast(125%)';
            }
        } 
        else {
            cell = document.querySelector(`.user-gameboard > [data-id="${dataID}"]`);
            if (userBoard.gameState[row][col] === 'x') {
              shotMarker.style.filter =
                'invert(99%) sepia(1%) saturate(0%) hue-rotate(4deg) brightness(104%) contrast(100%)';
            } else if (userBoard.gameState[row][col] === '*') {
              shotMarker.style.filter =
                'invert(15%) sepia(87%) saturate(4317%) hue-rotate(357deg) brightness(97%) contrast(125%)';
            }
        }
        cell.style.display = 'flex';
        cell.style.justifyContent = 'center';
        cell.style.alignItems = 'center';
        cell.appendChild(shotMarker);
    }

    const displaySunkShip = (dataID) => {
        const attackCoordinates = compBoard.convertToCoordinates(dataID);
        for (let shipData of compBoard.cachedShips) {
            for (let coordinates of shipData.cachedCoordinates) {
                if (JSON.stringify(attackCoordinates) === JSON.stringify(coordinates)) {
                    const originDataID = compBoard.convertToDataID(shipData.cachedCoordinates[0]);
                    const originCell = document.querySelector(`.comp-gameboard > [data-id='${originDataID}']`);
                    originCell.style.position = 'relative';
                    let shipName = shipData.ship.shipName;
                    const shipOrientation = shipData.shipOrientation;
                    
                    const shipImage = document.createElement('img');
                    formatImageElement(shipImage, shipOrientation, shipName);
                    shipImage.style.filter = 'invert(75%) sepia(6%) saturate(181%) hue-rotate(344deg) brightness(90%) contrast(88%)';
                    originCell.appendChild(shipImage);
                }
            }
        }
    }

    const playRound = (e) => {
        if (e.target.hasAttribute('data-id')) {
            const cell = e.target;
            const dataID = cell.getAttribute('data-id');
            const [row, col] = userBoard.convertToCoordinates(dataID);
            if (compBoard.gameState[row][col] === null || compBoard.gameState[row][col] === 'o') {
                user.attack(dataID, compBoard);
                placeShotMarker(dataID, 'user');
                if (comp.querySink(dataID)) {
                    displaySunkShip(dataID);
                }
                comp.attack(userBoard);
                placeShotMarker(comp.getLastHitArea(), 'comp');
            }
        }
    }

    const GlobalNodes = (() => {
      const compBoardGUI = document.querySelector('.comp-gameboard');
      const compBoardCells = document.querySelectorAll('.comp-gameboard > *');
      const userBoardGUI = document.querySelector('.user-gameboard');
      return {
          compBoardGUI,
          userBoardGUI,
          compBoardCells
      }
    })();
    const attachEventHandlers = (() => {
        GlobalNodes.compBoardCells.forEach(cell => {
            cell.addEventListener('mouseover', hoverEffect);
            cell.addEventListener('mouseout', hoverEffect);
        });
        GlobalNodes.compBoardGUI.addEventListener('click', playRound);
    })();
};

setTimeout(() => {
    gamePlayModule(user, comp, userBoard, compBoard);
}, 9000);

