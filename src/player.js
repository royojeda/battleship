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

  get ships() {
    return this.#ships;
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
      let valid = false;
      while (!valid) {
        const coordinates = this.chooseCoordinates({ board: this.#board });
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        valid = this.#board.receiveShip({ ship, coordinates, orientation });
      }
    });
  }

  attack({ board }) {
    let valid = false;
    while (!valid) {
      const coordinates = this.chooseCoordinates({ board });
      valid = board.receiveAttack({ coordinates });
    }
  }

  bindHumanPlaceShips({ handler }) {
    this.onHumanPlaceShips = handler;
  }

  bindHumanBoardChange({ handler }) {
    this.#board.bindBoardChange({ handler });
  }

  bindHumanPlacingShip({ handler }) {
    this.onHumanPlacingShip = handler;
  }

  bindHumanTurn({ handler }) {
    this.onHumanTurn = handler;
  }

  bindHumanAttack({ handler }) {
    this.onHumanAttack = handler;
  }
}
