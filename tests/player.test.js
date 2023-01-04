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

describe("arrangeShips()", () => {
  describe("when ships are placed on valid squares", () => {
    test("sends receiveShip() to board twice if the player has two ships", () => {
      Board.mockImplementation(() => ({ receiveShip: jest.fn(() => true) }));
      const board = new Board();
      const shipOne = new Ship();
      const shipTwo = new Ship();
      const ships = [shipOne, shipTwo];
      const player = new Player({ board, ships });

      player.arrangeShips();

      expect(board.receiveShip).toHaveBeenCalledTimes(2);
      expect(board.receiveShip.mock.calls[0][0].ship).toBe(shipOne);
      expect(board.receiveShip.mock.calls[1][0].ship).toBe(shipTwo);
    });

    test("sends receiveShip() to board thrice if the player has three ships", () => {
      Board.mockImplementation(() => ({ receiveShip: jest.fn(() => true) }));
      const board = new Board();
      const shipOne = new Ship();
      const shipTwo = new Ship();
      const shipThree = new Ship();
      const ships = [shipOne, shipTwo, shipThree];
      const player = new Player({ board, ships });

      player.arrangeShips();

      expect(board.receiveShip).toHaveBeenCalledTimes(3);
      expect(board.receiveShip.mock.calls[0][0].ship).toBe(shipOne);
      expect(board.receiveShip.mock.calls[1][0].ship).toBe(shipTwo);
      expect(board.receiveShip.mock.calls[2][0].ship).toBe(shipThree);
    });
  });

  describe("when a player has one ship and that ship is placed on invalid squares", () => {
    test("sends receiveShip() to board five times if there are four invalid placements", () => {
      Board.mockImplementation(() => ({
        receiveShip: jest
          .fn(() => true)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false),
      }));
      const board = new Board();
      const ship = new Ship();
      const ships = [ship];
      const player = new Player({ board, ships });

      player.arrangeShips();

      expect(board.receiveShip).toHaveBeenCalledTimes(5);
    });

    test("sends receiveShip() to board three times if there are two invalid placements", () => {
      Board.mockImplementation(() => ({
        receiveShip: jest
          .fn(() => true)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false),
      }));
      const board = new Board();
      const ship = new Ship();
      const ships = [ship];
      const player = new Player({ board, ships });

      player.arrangeShips();

      expect(board.receiveShip).toHaveBeenCalledTimes(3);
    });
  });
});

describe("attack()", () => {
  describe("when board returns true after the attack", () => {
    test("sends receiveAttack() to board once", () => {
      const player = new Player();
      Board.mockImplementation(() => ({ receiveAttack: jest.fn(() => true) }));
      const targetBoard = new Board();

      player.attack({ board: targetBoard });

      expect(targetBoard.receiveAttack).toHaveBeenCalledTimes(1);
    });
  });

  describe("when board returns false after each of three attacks and true on the fourth", () => {
    test("sends receiveAttack() to board four times", () => {
      const player = new Player();
      Board.mockImplementation(() => ({
        receiveAttack: jest
          .fn(() => true)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false),
      }));
      const targetBoard = new Board();

      player.attack({ board: targetBoard });

      expect(targetBoard.receiveAttack).toHaveBeenCalledTimes(4);
    });
  });
});
