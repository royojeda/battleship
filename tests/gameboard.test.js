import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

jest.mock("../src/ship");

describe("placeShip()", () => {
  test("places a ship at the correct squares on the board horizontally", () => {
    const board = new Gameboard();
    Ship.mockImplementation(() => ({
      length: 2,
    }));
    const ship = new Ship();

    board.placeShip({
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
    const board = new Gameboard();
    Ship.mockImplementation(() => ({
      length: 3,
    }));
    const ship = new Ship();

    board.placeShip({
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
    const board = new Gameboard({
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

    board.placeShip({
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
    const board = new Gameboard();
    Ship.mockImplementation(() => ({
      length: 5,
    }));
    const ship = new Ship();

    board.placeShip({
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
    const board = new Gameboard();
    Ship.mockImplementation(() => ({
      length: 2,
    }));
    const ship = new Ship();

    board.placeShip({
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

// describe("receiveAttack()", () => {
//   test("", () => {
//     const newGameBoard = new Gameboard();
//     Ship.mockImplementation(() => ({
//       length: 2,
//     }));

//     newGameBoard.receiveAttack({ coordinates: [4, 3] });
//   });
// });
