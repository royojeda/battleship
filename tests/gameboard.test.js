import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

jest.mock("../src/ship");

describe("placeShip()", () => {
  let newGameBoard;
  beforeEach(() => {
    newGameBoard = new Gameboard();
  });

  test("places a ship at the correct squares on the board horizontally", () => {
    Ship.mockImplementation(() => ({
      length: 2,
    }));
    const ship = new Ship();
    newGameBoard.placeShip({
      ship,
      location: [0, 0],
      orientation: "horizontal",
    });
    expect(newGameBoard.squares).toStrictEqual([
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
    Ship.mockImplementation(() => ({
      length: 3,
    }));
    const ship = new Ship();
    newGameBoard.placeShip({
      ship,
      location: [4, 7],
      orientation: "vertical",
    });
    expect(newGameBoard.squares).toStrictEqual([
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
    Ship.mockImplementation(() => ({
      length: 4,
    }));
    const shipOne = new Ship();
    newGameBoard.placeShip({
      ship: shipOne,
      location: [2, 5],
      orientation: "horizontal",
    });

    Ship.mockImplementation(() => ({
      length: 3,
    }));
    const shipTwo = new Ship();
    newGameBoard.placeShip({
      ship: shipTwo,
      location: [4, 4],
      orientation: "vertical",
    });
    expect(newGameBoard.squares).toStrictEqual([
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
    Ship.mockImplementation(() => ({
      length: 5,
    }));
    const ship = new Ship();
    newGameBoard.placeShip({
      ship,
      location: [6, 3],
      orientation: "horizontal",
    });
    expect(newGameBoard.squares).toStrictEqual([
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
    Ship.mockImplementation(() => ({
      length: 2,
    }));
    const ship = new Ship();
    newGameBoard.placeShip({
      ship,
      location: [1, 9],
      orientation: "vertical",
    });
    expect(newGameBoard.squares).toStrictEqual([
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
