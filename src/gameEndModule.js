const gameEndModule = (gameWinner) => {
  
  const replayGame = () => {
    location.reload();
  }
  
  const GlobalNodes = (() => {
    const gameConsole = document.querySelector('.game-console');
    const gameBoardContainer = document.querySelector('.gameBoard-container');
    const main = document.querySelector('main');
    return {
      gameConsole,
      gameBoardContainer,
      main
    }
  })();
  const removeNodes = (() => {
    GlobalNodes.gameConsole.remove();
    GlobalNodes.gameBoardContainer.remove();
  })();
  const addNodes = (() => {
    const winnerMessage = document.createElement('p');
    winnerMessage.textContent = 'The Winner Is:';
    winnerMessage.className = 'winning-message';

    const winner = document.createElement('p');
    if (gameWinner === 'Comp') winner.textContent = 'Comp'
    else winner.textContent = gameWinner;
    winner.className = 'winning-message';

    const playAgain = document.createElement('button');
    playAgain.className = 'generic-bttn';
    playAgain.textContent = 'Play Again';
    playAgain.addEventListener('click', replayGame)

    GlobalNodes.main.appendChild(winnerMessage);
    GlobalNodes.main.appendChild(winner);
    GlobalNodes.main.appendChild(playAgain);
  })();
}

export default gameEndModule;