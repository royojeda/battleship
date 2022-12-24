export default class Gameboard {
  #squares;

  constructor({
    squares = new Array(10).fill(null).map(() => new Array(10).fill(null)),
  } = {}) {
    this.#squares = squares;
  }

  placeShip({ ship, location, orientation }) {
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
        console.log("Invalid placeShip() orientation!");
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
}
