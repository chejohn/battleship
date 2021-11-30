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
import {Player, Computer} from './PlayerLibrary';
import GameBoard from './GameBoardLibrary';
import placeShipStage from './placeShipStage'; 
import { createGameBoardGUI } from './utilities';

const userBoard = GameBoard();
const user = Player(userBoard);
const compBoard = GameBoard();
const comp = Computer(compBoard, user);

/*
    params: hoverEffect and placeShipGUI event handlers
    return: void
    task: remove placeShipStage event listeners; 
*/
const transitionToGamePlay = (hoverEffect, placeShipGUI) => {
    const GlobalNodes = (() => {
        const userBoardGUI = document.querySelector('.user-gameboard');
        const gameBoardCells = document.querySelectorAll('.user-gameboard > *');
        const axisBttn = document.querySelector('.bttn-orientation');
        const main = document.querySelector('main');
        const compBoardGUI = createGameBoardGUI('comp');
        return {
            userBoardGUI,
            gameBoardCells,
            axisBttn,
            main,
            compBoardGUI
        }
    })();
    const removeEventHandlers = (() => {
        GlobalNodes.gameBoardCells.forEach((cell) => {
            cell.removeEventListener('mouseover', hoverEffect);
            cell.removeEventListener('moseout', hoverEffect);
        });
        GlobalNodes.userBoardGUI.removeEventListener('click', placeShipGUI);
    })();
    const insertGameConsole = () => {
      const console = document.createElement('div');
      console.className = 'game-console';
      console.textContent = 'Awaiting Orders, Admiral Ché';
      GlobalNodes.main.appendChild(console);
    };
    const createContainer = (className) => {
        const container = document.createElement('div');
        container.className = className;
        return container;
    }
    const prepareThirdModule = (() => {
        const userBoard = GlobalNodes.userBoardGUI;
        document.querySelector('.placeShip-message').remove();
        document.querySelector('.bttn-orientation').remove();
        userBoard.remove();
        insertGameConsole();

        const gbContainer = createContainer('gameBoard-container');
        GlobalNodes.main.appendChild(gbContainer);

        const gbSubContainer = createContainer('gb-subcontainer');
        const gbSubContainer2 = createContainer('gb-subcontainer');
        gbContainer.appendChild(gbSubContainer);
        gbContainer.appendChild(gbSubContainer2);

        const gbHeader = document.createElement('p');
        gbHeader.textContent = 'Friendly waters';
        gbSubContainer.appendChild(gbHeader);
        gbSubContainer.appendChild(userBoard);

        const gbHeader2 = document.createElement('p');
        gbHeader2.textContent = 'Enemy waters';
        gbSubContainer2.appendChild(gbHeader2);
        gbSubContainer2.appendChild(GlobalNodes.compBoardGUI);
    })();
    const styleBoards = (() => {
        GlobalNodes.userBoardGUI.style.cursor = 'default';
        GlobalNodes.compBoardGUI.style.cursor = 'crosshair';
    })();
}

const [hoverEffect, placeShipGUI] = placeShipStage(user, userBoard);
setTimeout(() => {
    transitionToGamePlay(hoverEffect, placeShipGUI);
}, 10000);

