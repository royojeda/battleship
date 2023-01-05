export default class Player {
  #board;

  #ships;

  #name;

  constructor({ board, ships, name } = {}) {
    this.#board = board;
    this.#ships = ships;
    this.#name = name;
  }

  get board() {
    return this.#board;
  }

  get name() {
    return this.#name;
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
