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
      const coordinates = null;
      const orientation = null;
      let valid;
      do {
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
