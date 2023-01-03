import Board from "../src/board";
import Player from "../src/player";
import Ship from "../src/ship";

jest.mock("../src/board");
jest.mock("../src/ship");

describe("isDefeated()", () => {
  test("returns true if all of the player's ships are sunk", () => {
    Ship.mockImplementation(() => ({
      isSunk: () => true,
    }));
    const shipOne = new Ship();
    const shipTwo = new Ship();
    const player = new Player({
      board: new Board(),
      ships: [shipOne, shipTwo],
    });

    expect(player.isDefeated()).toBe(true);
  });

  test("returns false if not all of the player's ships are sunk", () => {
    Ship.mockImplementation(() => ({
      isSunk: () => true,
    }));
    const shipOne = new Ship();
    Ship.mockImplementation(() => ({
      isSunk: () => false,
    }));
    const shipTwo = new Ship();
    const player = new Player({
      board: new Board(),
      ships: [shipOne, shipTwo],
    });

    expect(player.isDefeated()).toBe(false);
  });
});

describe("receiveAttack()", () => {
  test("sends receiveAttack() to board with the given set of coordinates and returns whatever board returns", () => {
    Board.mockImplementation(() => ({ receiveAttack: jest.fn(() => true) }));
    const board = new Board();
    const ships = [new Ship(), new Ship()];
    const player = new Player({ board, ships });

    expect(player.receiveAttack({ coordinates: [5, 9] })).toBe(true);

    expect(board.receiveAttack).toHaveBeenCalledWith({ coordinates: [5, 9] });
  });

  test("sends receiveAttack() to board with another given set of coordinates and returns whatever board returns", () => {
    Board.mockImplementation(() => ({ receiveAttack: jest.fn(() => 123) }));
    const board = new Board();
    const ships = [new Ship(), new Ship()];
    const player = new Player({ board, ships });

    expect(player.receiveAttack({ coordinates: [9, 0] })).toBe(123);

    expect(board.receiveAttack).toHaveBeenCalledWith({ coordinates: [9, 0] });
  });
});
