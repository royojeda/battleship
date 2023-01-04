import Board from "../src/board";
import ComputerPlayer from "../src/computerPlayer";

jest.mock("../src/board");

describe("chooseCoordinates()", () => {
  test("returns coordinates within the scope of the given board", () => {
    const player = new ComputerPlayer();
    Board.mockImplementation(() => ({
      rows: 5,
      columns: 5,
      receivedAttacks: [],
    }));
    const board = new Board();

    const coordinates = player.chooseCoordinates({ board });

    expect(coordinates).toHaveLength(2);
    coordinates.forEach((coordinate) => {
      expect(Number.isInteger(coordinate)).toBe(true);
      expect(coordinate).toBeGreaterThanOrEqual(0);
      expect(coordinate).toBeLessThanOrEqual(4);
    });
  });

  test("returns only not-yet-attacked coordinates", () => {
    const player = new ComputerPlayer();
    Board.mockImplementation(() => ({
      rows: 3,
      columns: 3,
      receivedAttacks: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
      ],
    }));
    const board = new Board();

    const coordinates = player.chooseCoordinates({ board });

    expect(coordinates).toStrictEqual([2, 2]);
  });

  test("returns null if there are no more remaining attackable coordinates", () => {
    const player = new ComputerPlayer();
    Board.mockImplementation(() => ({
      rows: 2,
      columns: 2,
      receivedAttacks: [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
    }));
    const board = new Board();

    const coordinates = player.chooseCoordinates({ board });

    expect(coordinates).toBeNull();
  });
});
