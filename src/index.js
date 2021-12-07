import './styles/index.scss';
import './assets/battleShipLogo.png';
import './assets/soundOn.png';
import './assets/soundOff.svg';
import './assets/github.png';
import './assets/destroyer.svg';
import './assets/battleShip.svg';
import './assets/patrol.svg';
import './assets/submarine.svg';
import './assets/carrier.svg';
import './assets/shot-marker.svg';
import './assets/backgroundSound.mp3';
import './assets/fire-shot.mp3';
import './assets/shot-hit.mp3';
import './assets/shot-miss.mp3';
import './assets/theme-music.mp3';

import GameBoard from './GameBoardLibrary';
import {Player, Computer} from './PlayerLibrary';
import placeShipStage from './placeShipStage';
import transitionToPlaceShips from './transitionToPlaceShips';
import transitionToGamePlay from './transitionToGamePlayLib';
import gamePlayModule from './gamePlayModule';
import gameEndModule from './gameEndModule';

const toggleSound = (e) => {
    const soundIcon = e.target;
    soundIcon.remove();
    const audioNodes = document.querySelectorAll('audio');
    if (soundIcon.id === 'sound-off') {
        GlobalNodes.main.prepend(GlobalNodes.soundOnIcon);
        audioNodes.forEach((audioNode) => {
            audioNode.muted = false;
            if (audioNode.className === 'theme-music') audioNode.play();
        });
    }
    else {
        GlobalNodes.main.prepend(GlobalNodes.soundOffIcon);
        audioNodes.forEach((audioNode) => {
          audioNode.muted = true;
        });
    }
}

const validateInput = () => {
    const input = GlobalNodes.form.value.trim();
    if (!input) {
        GlobalNodes.inputContainer.insertBefore(GlobalNodes.errorMessage, GlobalNodes.submitBttn);
        return null;
    } else {
        GlobalNodes.errorMessage.remove();
    }
    return input;
};

const placeShipStageLoop = (user, userBoard) => {
    return new Promise(resolve => {
        transitionToPlaceShips(user);
        if (GlobalNodes.soundOnIcon.className === 'sound-icon-game') {
            GlobalNodes.soundOffIcon.className = 'sound-icon-game';
        }
        else GlobalNodes.soundOnIcon.className = 'sound-icon-game';
        const eventHandlers = placeShipStage(user, userBoard);
        setInterval(() => {
            if (user.availableShips.length < 1) resolve(eventHandlers);
        },0);
    });
}

const gamePlayLoop = (hoverEffect, placeShipGUI, user, userBoard, comp, compBoard) => {
    return new Promise(resolve => {
        document.querySelector('.theme-music').remove();
        transitionToGamePlay(hoverEffect, placeShipGUI);
        comp.placeGamePieces();
        gamePlayModule(user, comp, userBoard, compBoard);
        setInterval(() => {
            if (userBoard.fleetDestroyed()) resolve(comp.userName);
            else if (compBoard.fleetDestroyed()) resolve(user.userName);
        }, 0);
    });
}

const transition = async (nextStage='') => {
    if (nextStage === 'game-end') {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
    return new Promise(resolve => {
        const mainNodes = document.querySelectorAll('main > *:not(.sound-icon, .sound-icon-game)');
        mainNodes.forEach((node) => {
            node.classList.add('fade-out');
        });
        setTimeout(() => {
            resolve();
        }, 1000)
    });
}

const gameLoop = async () => {
    const input = validateInput();
    if (input) {
        const userBoard = GameBoard();
        const compBoard = GameBoard();
        const user = Player(userBoard, input);
        const comp = Computer(compBoard, user);
        await transition();
        const [hoverEffect, placeShipGUI] = await placeShipStageLoop(user, userBoard);
        await transition();
        const winner = await gamePlayLoop(hoverEffect, placeShipGUI, user, userBoard, comp, compBoard);
        await transition('game-end');
        gameEndModule(winner);
    }
};

const GlobalNodes = (() => {
  const form = document.querySelector('#playerName');
  const submitBttn = document.querySelector('.generic-bttn');
  const inputContainer = document.querySelector('.input-container');
  const errorMessage = document.createElement('p');
  const soundOffIcon = document.querySelector('.sound-icon');
  const soundOnIcon = document.createElement('img');
  const main = document.querySelector('main');
  return {
      form,
      submitBttn,
      inputContainer,
      errorMessage,
      soundOffIcon,
      soundOnIcon,
      main
  }
})();
const formatNodes = (() => {
    GlobalNodes.errorMessage.textContent = 'name required';
    GlobalNodes.errorMessage.style.color = 'red';
    GlobalNodes.errorMessage.style.fontSize = '1.5rem';
    
    GlobalNodes.soundOnIcon.className = 'sound-icon';
    GlobalNodes.soundOnIcon.id = 'sound-on';
    GlobalNodes.soundOnIcon.src = './assets/soundOn.png';
    GlobalNodes.soundOnIcon.alt = 'sound-on icon';
})();
const AttachEventHandlers = (() => {
    GlobalNodes.submitBttn.addEventListener('click', gameLoop);
    GlobalNodes.soundOnIcon.addEventListener('click', toggleSound);
    GlobalNodes.soundOffIcon.addEventListener('click', toggleSound);
})();