import Game from "../src/model";
import Player from "../src/player";
import Board from "../src/board";

jest.mock("../src/player");
jest.mock("../src/board");

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

describe("playRound()", () => {
  test("", () => {
    Player.mockImplementation(() => ({
      attack: jest.fn(),
      board: new Board(),
    }));
    const playerOne = new Player();
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    game.playRound();

    expect(playerOne.attack).toHaveBeenCalledWith({ board: playerTwo.board });
    expect(playerTwo.attack).toHaveBeenCalledWith({ board: playerOne.board });
  });
});

describe("winner()", () => {
  test("returns player one's name if only player two is defeated", () => {
    Player.mockImplementation(() => ({
      name: "playerOne",
      isDefeated: () => false,
    }));
    const playerOne = new Player();
    Player.mockImplementation(() => ({
      name: "playerTwo",
      isDefeated: () => true,
    }));
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    expect(game.winner()).toBe(playerOne.name);
  });

  test("returns player two's name if only player one is defeated", () => {
    Player.mockImplementation(() => ({
      name: "playerOne",
      isDefeated: () => true,
    }));
    const playerOne = new Player();
    Player.mockImplementation(() => ({
      name: "playerTwo",
      isDefeated: () => false,
    }));
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    expect(game.winner()).toBe(playerTwo.name);
  });

  test("returns 'Draw' if both players are defeated", () => {
    Player.mockImplementation(() => ({ isDefeated: () => true }));
    const playerOne = new Player();
    Player.mockImplementation(() => ({ isDefeated: () => true }));
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    expect(game.winner()).toBe("Draw");
  });

  test("returns null if no player is defeated", () => {
    Player.mockImplementation(() => ({ isDefeated: () => false }));
    const playerOne = new Player();
    Player.mockImplementation(() => ({ isDefeated: () => false }));
    const playerTwo = new Player();
    const players = [playerOne, playerTwo];
    const game = new Game({ players });

    expect(game.winner()).toBeNull();
  });
});
