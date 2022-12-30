import Gameboard from "../src/gameboard";
import Player from "../src/player";
import Ship from "../src/ship";

jest.mock("../src/gameboard");
jest.mock("../src/ship");

describe("isDefeated()", () => {
  test("returns true if all of the player's ships are sunk", () => {
    Ship.mockImplementation(() => ({
      isSunk: () => true,
    }));
    const shipOne = new Ship();
    const shipTwo = new Ship();
    const player = new Player({
      board: new Gameboard(),
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
      board: new Gameboard(),
      ships: [shipOne, shipTwo],
    });

    expect(player.isDefeated()).toBe(false);
  });
});
