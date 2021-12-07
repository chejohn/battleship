import { createGameBoardGUI } from './utilities';
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
        const soundIcon = document.querySelector('.sound-icon-game');
        return {
            userBoardGUI,
            gameBoardCells,
            axisBttn,
            main,
            compBoardGUI,
            soundIcon
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
      const consoleText = document.createElement('p');
      consoleText.className = 'console-text';
      consoleText.textContent = 'Awaiting Orders, Admiral Ché';
      console.appendChild(consoleText);
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
        GlobalNodes.userBoardGUI.classList.remove('fade-out');
    })();
   const insertAudio = (src, className) => {
        const audio = document.createElement('audio');
        audio.src = src;
        audio.className = className;
        if (GlobalNodes.soundIcon.id === 'sound-off') audio.muted = true;
        if (className === 'background-sound') audio.loop = true;
        document.body.appendChild(audio);
   }
    const prepareMusic = (() => {
        insertAudio('./assets/backgroundSound.mp3', 'background-sound');
        insertAudio('./assets/fire-shot.mp3', 'fire-shot');
        insertAudio('./assets/shot-hit.mp3', 'shot-hit');
        insertAudio('./assets/shot-miss.mp3', 'shot-miss');
    })();
}

export default transitionToGamePlay;

