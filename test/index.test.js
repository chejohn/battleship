import {Ship} from '../src/shipLibrary';
import { GameBoard } from '../src/index';
// testing ship 'Hit' function

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

const gameBoard = GameBoard();
test('gameBoard methods', () => {
    gameBoard.placeShip(16, 5);
    // expect(gameBoard.gameBoardRep).toEqual([
    //   [null, null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, 'o', null, null, null, null],
    //   [null, null, null, null, null, 'o', null, null, null, null],
    //   [null, null, null, null, null, 'o', null, null, null, null],
    //   [null, null, null, null, null, 'o', null, null, null, null],
    //   [null, null, null, null, null, 'o', null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null, null],
    // ]);
});