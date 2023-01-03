import ComputerPlayer from "../src/computerPlayer";
import Gameboard from "../src/board";
import Ship from "../src/ship";

jest.mock("../src/board");
jest.mock("../src/ship");

describe("chooseCoordinates()", () => {
  let board;
  let ships;
  let possibleCoordinates;

  beforeEach(() => {
    board = new Gameboard();
    ships = [new Ship(), new Ship()];
  });

  test("returns valid x and y coordinates", () => {
    possibleCoordinates = [];
    for (let x = 0; x <= 9; x += 1) {
      for (let y = 0; y <= 9; y += 1) {
        possibleCoordinates.push([x, y]);
      }
    }
    const player = new ComputerPlayer({ board, ships, possibleCoordinates });

    const coordinates = player.chooseCoordinates();

    expect(coordinates).toHaveLength(2);
    coordinates.forEach((coordinate) => {
      expect(Number.isInteger(coordinate)).toBe(true);
      expect(coordinate).toBeGreaterThanOrEqual(0);
      expect(coordinate).toBeLessThanOrEqual(9);
    });
  });

  test("returns coordinates from a collection of possible coordinates", () => {
    possibleCoordinates = [[1, 1]];
    const player = new ComputerPlayer({ board, ships, possibleCoordinates });

    const coordinates = player.chooseCoordinates();

    expect(player.possibleCoordinates).toContainEqual(coordinates);
  });

  test("returns null if there are no more remaining possible coordinates", () => {
    possibleCoordinates = [];
    const player = new ComputerPlayer({ board, ships, possibleCoordinates });

    const coordinates = player.chooseCoordinates();

    expect(coordinates).toBeNull();
  });
});
