import Ship from '../src/ShipLibrary';
import GameBoard from '../src/GameBoardLibrary';
import {Player, Computer} from '../src/PlayerLibrary.js'
// testing ship 'Hit' function

describe('test ship library', () => {
    const ship1 = Ship(0, 'carrier');
    const ship2 = Ship(6, 'patrol boat');
    
    test('ship constructor', () => {
      expect(ship1.shipLength).toBe(5);
      expect(ship1.hit).not.toBeUndefined();
      expect(ship1.isSunk).not.toBeUndefined();
    });

    test('ship methods', () => {
      ship1.hit(1);
      expect(ship1.shipRep).toEqual([0, 'hit', 2, 3, 4]);
      ship1.hit(0);
      ship1.hit(3);
      expect(ship1.shipRep).toEqual(['hit', 'hit', 2, 'hit', 4]);
      expect(ship1.isSunk()).toBe(false);

      ship2.hit(6);
      ship2.hit(7);
      expect(ship2.isSunk()).toBe(true);
    });
});

describe('test gameboard library', () => {
  const gameBoard = GameBoard();
  test('placeShip method', () => {
    gameBoard.changeOrientation();
    gameBoard.placeShip(1, 'carrier');
    gameBoard.placeShip(16, 'battleship');
    gameBoard.changeOrientation()
    gameBoard.placeShip(3, 'patrol boat');
    gameBoard.placeShip(74, 'destroyer');
    expect(gameBoard.gameState).toEqual([
      ['o', null, 'o', 'o', null, null, null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, 'o', 'o', 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
    gameBoard.placeShip(98, 'battleship');
    expect(gameBoard.gameState).toEqual([
      ['o', null, 'o', 'o', null, null, null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, 'o', 'o', 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
    gameBoard.changeOrientation();
    gameBoard.placeShip(2, 'carrier');
    gameBoard.placeShip(17, 'battleship');
    gameBoard.changeOrientation();
    gameBoard.placeShip(77, 'submarine');
    expect(gameBoard.gameState).toEqual([
      ['o', null, 'o', 'o', null, null, null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, 'o', 'o', 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test('recieveAttack method', () => {
    gameBoard.recieveAttack(1);
    gameBoard.recieveAttack(11);
    gameBoard.recieveAttack(3);
    gameBoard.recieveAttack(100);
    expect(gameBoard.gameState).toEqual([
      ['*', null, '*', 'o', null, null, null, null, null, null],
      ['*', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, 'o', 'o', 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, 'x'],
    ]);
  });

  test('fleetDestroyed method', () => {
    gameBoard.recieveAttack(21);
    gameBoard.recieveAttack(31);
    gameBoard.recieveAttack(41);
    expect(gameBoard.fleetDestroyed()).toBe(false);
    gameBoard.recieveAttack(4);
    gameBoard.recieveAttack(16);
    gameBoard.recieveAttack(26);
    gameBoard.recieveAttack(36);
    gameBoard.recieveAttack(46);
    gameBoard.recieveAttack(74);
    gameBoard.recieveAttack(75);
    gameBoard.recieveAttack(76);
    expect(gameBoard.fleetDestroyed()).toBe(true);
  });
});

describe('Player Library', () => {
  const userBoard = GameBoard();
  const user = Player(userBoard);
  test('placeGamePiece and rotateShip methods', () => {
    user.rotateShip();
    user.placeGamePiece(1);
    user.placeGamePiece(16);
    user.rotateShip();
    user.placeGamePiece(74);
    user.placeGamePiece(93);
    user.placeGamePiece(3);
    expect(userBoard.gameState).toEqual([
      ['o', null, 'o', 'o', null, null, null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      ['o', null, null, null, null, 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, 'o', 'o', 'o', null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, 'o', 'o', 'o', null, null, null, null, null],
    ]);
  });
})

