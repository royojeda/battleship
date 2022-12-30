export default class Player {
  #board;

  #ships;

  constructor({ board, ships }) {
    this.#board = board;
    this.#ships = ships;
  }

  get board() {
    return this.#board;
  }

  isDefeated() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}
