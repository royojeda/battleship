import Game from "../src/model";
import Player from "../src/player";

jest.mock("../src/player");

describe("isOver()", () => {
  test("returns true if only playerOne is defeated", () => {
    Player.mockImplementation(() => ({ isDefeated: () => true }));
    const playerOne = new Player();
    Player.mockImplementation(() => ({ isDefeated: () => false }));
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    expect(game.isOver()).toBe(true);
  });

  test("returns true if only playerTwo is defeated", () => {
    Player.mockImplementation(() => ({ isDefeated: () => false }));
    const playerOne = new Player();
    Player.mockImplementation(() => ({ isDefeated: () => true }));
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    expect(game.isOver()).toBe(true);
  });

  test("returns true if all players are defeated", () => {
    Player.mockImplementation(() => ({ isDefeated: () => true }));
    const playerOne = new Player();
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    expect(game.isOver()).toBe(true);
  });

  test("returns false if none of the players are defeated", () => {
    Player.mockImplementation(() => ({ isDefeated: () => false }));
    const playerOne = new Player();
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    expect(game.isOver()).toBe(false);
  });
});

describe("setup()", () => {
  test("sends arrangeShips() to all players", () => {
    Player.mockImplementation(() => ({ arrangeShips: jest.fn() }));
    const playerOne = new Player();
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    game.setup();

    expect(playerOne.arrangeShips).toHaveBeenCalled();
    expect(playerTwo.arrangeShips).toHaveBeenCalled();
  });
});
