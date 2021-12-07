import { createGameBoardGUI } from "./utilities";


const transitionToPlaceShips = (user) => {
    const removeNodes = (() => {
        const inputContainer = document.querySelector('.input-container');
        inputContainer.remove();
    })();
    const editNodes = (() => {
        document.querySelector('.sound-icon').className = 'sound-icon-game';
        document.querySelector('.logo').className = 'logo-game';
    })();
    const insertNodes = (() => {
        const main = document.querySelector('main');

        const gameMessage = document.createElement('p');
        gameMessage.className = 'placeShip-message';
        gameMessage.textContent = `${user.userName}, place your carrier`;

        const userBoard = createGameBoardGUI('user');
        
        const axisBttn = document.createElement('button');
        axisBttn.textContent = 'axis: x';
        axisBttn.className = 'bttn-orientation';

        main.appendChild(gameMessage);
        main.appendChild(axisBttn);
        main.appendChild(userBoard);
    })();
}

export default transitionToPlaceShips;
