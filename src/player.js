export default class Player {
  #board;

  #ships;

  constructor({ board, ships } = {}) {
    this.#board = board;
    this.#ships = ships;
  }

  get board() {
    return this.#board;
  }

  isDefeated() {
    return this.#ships.every((ship) => ship.isSunk());
  }

  // eslint-disable-next-line class-methods-use-this
  chooseCoordinates() {
    // throw new Error("Not implemented!");
  }

  arrangeShips() {
    this.#ships.forEach((ship) => {
      let valid;
      do {
        const coordinates = this.chooseCoordinates({ board: this.#board });
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        valid = this.#board.receiveShip({ ship, coordinates, orientation });
      } while (!valid);
    });
  }

  attack({ board }) {
    let valid;
    do {
      const coordinates = this.chooseCoordinates({ board });
      valid = board.receiveAttack({ coordinates });
    } while (!valid);
  }
}
