import Player from "./player";

export default class ComputerPlayer extends Player {
  static getRandomIntInclusive(min, max) {
    return Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  chooseCoordinates({ board }) {
    if (board.receivedAttacks.length === board.rows * board.columns) {
      return null;
    }

    const allPossibleAttacks = [];
    for (let x = 0; x < board.columns; x += 1) {
      for (let y = 0; y < board.rows; y += 1) {
        allPossibleAttacks.push([x, y]);
      }
    }

    const validGuesses = allPossibleAttacks.filter(
      (coordinates) =>
        !board.receivedAttacks.some(
          (receivedAttack) =>
            JSON.stringify(receivedAttack) === JSON.stringify(coordinates)
        )
    );

    const index = this.constructor.getRandomIntInclusive(
      0,
      validGuesses.length - 1
    );

    return validGuesses[index];
  }
}
