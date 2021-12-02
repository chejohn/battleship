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
      const consoleText = document.createElement('p');
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
    })();
}

export default transitionToGamePlay;
