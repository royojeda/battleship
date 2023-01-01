import Model from "../src/model";
import ComputerPlayer from "../src/computerPlayer";

jest.mock("../src/computerPlayer");

describe("turn()", () => {
  test("sends receiveAttack() to playerTwo with coordinates chosen by playerOne", () => {
    ComputerPlayer.mockImplementation(() => ({
      chooseCoordinates: jest.fn(() => [7, 7]),
    }));
    const playerOne = new ComputerPlayer();
    ComputerPlayer.mockImplementation(() => ({ receiveAttack: jest.fn() }));
    const playerTwo = new ComputerPlayer();
    const players = [playerOne, playerTwo];
    const game = new Model({ players });

    game.playTurn();

    expect(playerOne.chooseCoordinates).toHaveBeenCalled();
    expect(playerTwo.receiveAttack).toHaveBeenCalledWith([7, 7]);
  });

  test("sends receiveAttack() to playerTwo with another set of coordinates chosen by playerOne", () => {
    ComputerPlayer.mockImplementation(() => ({
      chooseCoordinates: jest.fn(() => [1, 5]),
    }));
    const playerOne = new ComputerPlayer();
    ComputerPlayer.mockImplementation(() => ({ receiveAttack: jest.fn() }));
    const playerTwo = new ComputerPlayer();
    const players = [playerOne, playerTwo];
    const game = new Model({ players });

    game.playTurn();

    expect(playerOne.chooseCoordinates).toHaveBeenCalled();
    expect(playerTwo.receiveAttack).toHaveBeenCalledWith([1, 5]);
  });
});
