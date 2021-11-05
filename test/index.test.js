import {Ship} from '../src/ShipLibrary';
import { GameBoard } from '../src/GameBoardLibrary';
// testing ship 'Hit' function

describe('test ship library', () => {
    const ship1 = Ship(0, 5, 'y');
    const ship2 = Ship(3, 2, 'x');
    
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

      ship2.hit(3);
      ship2.hit(4);
      expect(ship2.isSunk()).toBe(true);
    });
});

describe('test gameboard library', () => {
    test('gameBoard placeShip method', () => {
      const gameBoard = GameBoard();
      gameBoard.currentOrientation = 'y';
      gameBoard.placeShip(16, 5);
      expect(gameBoard.gameState).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, 'o', null, null, null, null],
        [null, null, null, null, null, 'o', null, null, null, null],
        [null, null, null, null, null, 'o', null, null, null, null],
        [null, null, null, null, null, 'o', null, null, null, null],
        [null, null, null, null, null, 'o', null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
      ]);
      gameBoard.placeShip(1, 10);
      expect(gameBoard.gameState).toEqual([
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
      ]);
      gameBoard.currentOrientation = 'x';
      gameBoard.placeShip(8, 3);
      expect(gameBoard.gameState).toEqual([
        ['o', null, null, null, null, null, null, 'o', 'o', 'o'],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
      ]);
      gameBoard.currentOrientation = 'y';

      // testing invalid inputs
      gameBoard.placeShip(50, 7);
      expect(gameBoard.gameState).toEqual([
        ['o', null, null, null, null, null, null, 'o', 'o', 'o'],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, 'o', null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
        ['o', null, null, null, null, null, null, null, null, null],
      ]);
    });

    const gameBoard = GameBoard();
    gameBoard.currentOrientation = 'y';
    gameBoard.placeShip(16, 5);
    gameBoard.placeShip(1, 10);
    gameBoard.currentOrientation = 'x';
    gameBoard.placeShip(8, 3);
    gameBoard.recieveAttack(2);
    gameBoard.recieveAttack(4);
    test('game board recieveAttack method', () => {
        expect(gameBoard.gameState).toEqual([
          ['o', 'x', null, 'x', null, null, null, 'o', 'o', 'o'],
          ['o', null, null, null, null, 'o', null, null, null, null],
          ['o', null, null, null, null, 'o', null, null, null, null],
          ['o', null, null, null, null, 'o', null, null, null, null],
          ['o', null, null, null, null, 'o', null, null, null, null],
          ['o', null, null, null, null, 'o', null, null, null, null],
          ['o', null, null, null, null, null, null, null, null, null],
          ['o', null, null, null, null, null, null, null, null, null],
          ['o', null, null, null, null, null, null, null, null, null],
          ['o', null, null, null, null, null, null, null, null, null],
        ]);
    });
    gameBoard.recieveAttack(1);
    gameBoard.recieveAttack(11);
    test('game board fleetDestroyed method', () => {
        expect(gameBoard.fleetDestroyed()).toBe(false);
        gameBoard.recieveAttack(21);
        gameBoard.recieveAttack(31);
        gameBoard.recieveAttack(41);
        gameBoard.recieveAttack(51);
        gameBoard.recieveAttack(61);
        gameBoard.recieveAttack(71);
        gameBoard.recieveAttack(81);
        gameBoard.recieveAttack(91);
        gameBoard.recieveAttack(8);
        gameBoard.recieveAttack(9);
        gameBoard.recieveAttack(10);
        gameBoard.recieveAttack(16);
        gameBoard.recieveAttack(26);
        gameBoard.recieveAttack(36);
        gameBoard.recieveAttack(46);
        gameBoard.recieveAttack(56);
        expect(gameBoard.fleetDestroyed()).toBe(true);
    });
});

