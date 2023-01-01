import Player from "./player";

export default class ComputerPlayer extends Player {
  #possibleCoordinates;

  static getRandomIntInclusive(min, max) {
    return Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
    );
  }

  constructor({ board, ships, possibleCoordinates }) {
    super({ board, ships });
    this.#possibleCoordinates = possibleCoordinates;
  }

  get possibleCoordinates() {
    return this.#possibleCoordinates;
  }

  // eslint-disable-next-line class-methods-use-this
  chooseCoordinates() {
    if (this.#possibleCoordinates.length === 0) {
      return null;
    }
    const index = this.constructor.getRandomIntInclusive(
      0,
      this.#possibleCoordinates.length - 1
    );
    return this.#possibleCoordinates[index];
  }
}
