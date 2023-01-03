import Board from "../src/board";
import Ship from "../src/ship";

jest.mock("../src/ship");

describe("receiveShip()", () => {
  test("places a ship at the correct squares on the board horizontally", () => {
    const board = new Board();
    Ship.mockImplementation(() => ({
      length: 2,
    }));
    const ship = new Ship();

    board.receiveShip({
      ship,
      location: [0, 0],
      orientation: "horizontal",
    });

    expect(board.squares).toStrictEqual([
      [ship, null, null, null, null, null, null, null, null, null],
      [ship, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("places another ship with a different length at the correct squares on the board vertically", () => {
    const board = new Board();
    Ship.mockImplementation(() => ({
      length: 3,
    }));
    const ship = new Ship();

    board.receiveShip({
      ship,
      location: [4, 7],
      orientation: "vertical",
    });

    expect(board.squares).toStrictEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, ship, ship, ship],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("doesn't place a new ship if it will overlap an existing ship", () => {
    const shipOne = new Ship();
    const board = new Board({
      squares: [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, shipOne, null, null, null, null],
        [null, null, null, null, null, shipOne, null, null, null, null],
        [null, null, null, null, null, shipOne, null, null, null, null],
        [null, null, null, null, null, shipOne, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
      ],
    });
    Ship.mockImplementation(() => ({
      length: 3,
    }));
    const shipTwo = new Ship();

    board.receiveShip({
      ship: shipTwo,
      location: [4, 4],
      orientation: "vertical",
    });

    expect(board.squares).toStrictEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, shipOne, null, null, null, null],
      [null, null, null, null, null, shipOne, null, null, null, null],
      [null, null, null, null, null, shipOne, null, null, null, null],
      [null, null, null, null, null, shipOne, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("doesn't place a new ship if it will exceed the board boundaries horizontally", () => {
    const board = new Board();
    Ship.mockImplementation(() => ({
      length: 5,
    }));
    const ship = new Ship();

    board.receiveShip({
      ship,
      location: [6, 3],
      orientation: "horizontal",
    });

    expect(board.squares).toStrictEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("doesn't place a new ship if it will exceed the board boundaries vertically", () => {
    const board = new Board();
    Ship.mockImplementation(() => ({
      length: 2,
    }));
    const ship = new Ship();

    board.receiveShip({
      ship,
      location: [1, 9],
      orientation: "vertical",
    });

    expect(board.squares).toStrictEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });
});

describe("receiveAttack()", () => {
  describe("when given already-attacked coordinates", () => {
    test("returns 'duplicate'", () => {
      const coordinates = [2, 2];
      const board = new Board();

      board.receiveAttack({ coordinates });

      expect(board.receiveAttack({ coordinates })).toBe("duplicate");
    });
  });
  describe("when given not-yet-attacked coordinates", () => {
    test("sends hit() to the ship at the target square and returns true", () => {
      Ship.mockImplementation(() => ({ hit: jest.fn() }));
      const ship = new Ship();
      const board = new Board({
        squares: [
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, ship, null, null, null, null, null, null],
          [null, null, null, ship, null, null, null, null, null, null],
          [null, null, null, ship, null, null, null, null, null, null],
          [null, null, null, ship, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
        ],
      });

      expect(board.receiveAttack({ coordinates: [4, 3] })).toBe(true);

      expect(ship.hit).toHaveBeenCalled();
    });

    test("sends hit() to the ship at another target square and returns true", () => {
      Ship.mockImplementation(() => ({ hit: jest.fn() }));
      const ship = new Ship();
      const board = new Board({
        squares: [
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, ship, ship, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
        ],
      });

      expect(board.receiveAttack({ coordinates: [1, 6] })).toBe(true);

      expect(ship.hit).toHaveBeenCalled();
    });

    test("doesn't send hit() to any ship and returns false if target square is empty", () => {
      Ship.mockImplementation(() => ({ hit: jest.fn() }));
      const ship = new Ship();
      const board = new Board({
        squares: [
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, null, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
          [ship, ship, ship, ship, ship, ship, ship, ship, ship, ship],
        ],
      });

      expect(board.receiveAttack({ coordinates: [2, 7] })).toBe(false);

      expect(ship.hit).not.toHaveBeenCalled();
    });
  });
});
