export default class Board {
  #squares;

  #receivedAttacks;

  constructor({
    squares = new Array(10).fill(null).map(() => new Array(10).fill(null)),
    receivedAttacks = [],
    onBoardChange = () => {},
  } = {}) {
    this.#squares = squares;
    this.#receivedAttacks = receivedAttacks;
    this.onBoardChange = onBoardChange;
  }

  get squares() {
    return this.#squares;
  }

  get receivedAttacks() {
    return this.#receivedAttacks;
  }

  get rows() {
    return this.#squares[0].length;
  }

  get columns() {
    return this.#squares.length;
  }

  receiveShip({ ship, coordinates, orientation }) {
    const coordinatesToOccupy = [];
    switch (orientation) {
      case "horizontal":
        for (let i = 0; i < ship.length; i += 1) {
          coordinatesToOccupy.push([coordinates[0] + i, coordinates[1]]);
        }
        break;
      case "vertical":
        for (let i = 0; i < ship.length; i += 1) {
          coordinatesToOccupy.push([coordinates[0], coordinates[1] + i]);
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
      this.onBoardChange({ board: this });
      return false;
    }

    coordinatesToOccupy.forEach((coordinate) => {
      this.#squares[coordinate[0]][coordinate[1]] = ship;
    });
    this.onBoardChange({ board: this });
    return true;
  }

  receiveAttack({ coordinates }) {
    if (
      this.#receivedAttacks.some(
        (receivedAttack) =>
          receivedAttack[0] === coordinates[0] &&
          receivedAttack[1] === coordinates[1]
      )
    ) {
      return false;
    }
    this.#receivedAttacks.push(coordinates);
    if (this.#squares[coordinates[0]][coordinates[1]] !== null) {
      this.#squares[coordinates[0]][coordinates[1]].hit();
    }
    this.onBoardChange({ board: this });
    return true;
  }

  reportAttackResult() {
    const previousAttack =
      this.#receivedAttacks[this.#receivedAttacks.length - 1];
    if (this.#squares[previousAttack[0]][previousAttack[1]] !== null) {
      if (this.#squares[previousAttack[0]][previousAttack[1]].isSunk()) {
        return "sunk";
      }
      return "hit";
    }
    return "miss";
  }

  isOccupiedAt({ coordinates }) {
    return this.#squares[coordinates[0]][coordinates[1]] !== null;
  }

  bindBoardChange({ handler }) {
    this.onBoardChange = handler;
  }

  canReceiveShipAt = ({ ship, coordinates, orientation }) => {
    const coordinatesToOccupy = [];
    switch (orientation) {
      case "horizontal":
        for (let i = 0; i < ship.length; i += 1) {
          coordinatesToOccupy.push([coordinates[0] + i, coordinates[1]]);
        }
        break;
      case "vertical":
        for (let i = 0; i < ship.length; i += 1) {
          coordinatesToOccupy.push([coordinates[0], coordinates[1] + i]);
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
      return [];
    }
    return coordinatesToOccupy;
  };

  canReceiveAttackAt({ coordinates }) {
    // if (this.#receivedAttacks.includes(coordinates)) {
    //   return false;
    // }
    if (
      this.#receivedAttacks.some(
        (receivedAttack) =>
          receivedAttack[0] === coordinates[0] &&
          receivedAttack[1] === coordinates[1]
      )
    ) {
      return false;
    }
    return true;
  }
}
