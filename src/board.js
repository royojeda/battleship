export default class Board {
  #squares;

  #receivedAttacks;

  constructor({
    squares = new Array(10).fill(null).map(() => new Array(10).fill(null)),
    receivedAttacks = [],
  } = {}) {
    this.#squares = squares;
    this.#receivedAttacks = receivedAttacks;
  }

  receiveShip({ ship, location, orientation }) {
    const coordinatesToOccupy = [];
    switch (orientation) {
      case "horizontal":
        for (let i = 0; i < ship.length; i += 1) {
          coordinatesToOccupy.push([location[0] + i, location[1]]);
        }
        break;
      case "vertical":
        for (let i = 0; i < ship.length; i += 1) {
          coordinatesToOccupy.push([location[0], location[1] + i]);
        }
        break;
      default:
        console.log("Invalid receiveShip() orientation!");
    }

    if (
      coordinatesToOccupy.some(
        (coordinate) => this.#squares[coordinate[0]] === undefined
      ) ||
      coordinatesToOccupy.some(
        (coordinate) =>
          this.#squares[coordinate[0]][coordinate[1]] === undefined
      ) ||
      coordinatesToOccupy.some(
        (coordinate) => this.#squares[coordinate[0]][coordinate[1]] != null
      )
    ) {
      return;
    }

    coordinatesToOccupy.forEach((coordinate) => {
      this.#squares[coordinate[0]][coordinate[1]] = ship;
    });
  }

  get squares() {
    return this.#squares;
  }

  receiveAttack({ coordinates }) {
    if (this.#receivedAttacks.includes(coordinates)) {
      return "duplicate";
    }
    this.#receivedAttacks.push(coordinates);
    if (this.#squares[coordinates[0]][coordinates[1]] === null) {
      return false;
    }
    this.#squares[coordinates[0]][coordinates[1]].hit();
    return true;
  }
}
