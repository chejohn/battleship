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
import {Player} from './PlayerLibrary';
import GameBoard from './GameBoardLibrary';
import placeShipStage from './placeShipStage'; 

const userBoard = GameBoard();
const user = Player(userBoard);

/*
    params: hoverEffect and placeShipGUI event listeners
    return: void
    task: remove placeShipStage event listeners; 
*/
const transitionToGamePlay = (hoverEffect, placeShipGUI) => {
    const GlobalNodes = (() => {
        const userBoardGUI = document.querySelector('.player-gameboard');
        const gameBoardCells = document.querySelectorAll('.player-gameboard > *');
        const axisBttn = document.querySelector('.bttn-orientation');
        return {
            userBoardGUI,
            gameBoardCells,
            axisBttn
        }
    })();
    const removeEventHandlers = (() => {
        GlobalNodes.gameBoardCells.forEach((cell) => {
            cell.removeEventListener('mouseover', hoverEffect);
            cell.removeEventListener('moseout', hoverEffect);
        });
        GlobalNodes.userBoardGUI.removeEventListener('click', placeShipGUI);
    })();
    const styleBoards = (() => {
        GlobalNodes.userBoardGUI.style.cursor = 'default';
    })();
}

const [hoverEffect, placeShipGUI] = placeShipStage(user, userBoard);
setTimeout(() => {
    transitionToGamePlay(hoverEffect, placeShipGUI);
}, 10000);

