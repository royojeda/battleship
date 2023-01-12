export default class View {
  #rootSelector;

  #squares;

  #enemySquares;

  #orientation;

  #oldOrientation;

  constructor({ rootSelector = "#root" } = {}) {
    this.#rootSelector = rootSelector;
    this.#root.className +=
      "w-screen h-screen flex justify-center items-center";
    this.#squares = new Array(10)
      .fill(null)
      .map(() => new Array(10).fill(null));
    this.#enemySquares = new Array(10)
      .fill(null)
      .map(() => new Array(10).fill(null));
    this.#orientation = "horizontal";
    this.#oldOrientation = "vertical";
  }

  get #root() {
    return document.querySelector(this.#rootSelector);
  }

  setup() {
    this.#root.innerHTML = /* html */ `
        <div class="flex boards justify-center relative w-[80%] p-4 gap-10">
          <div class="ownBoard border border-gray-500 w-full max-w-screen-sm grid grid-cols-10 gap-"></div>
          <div class="rotate absolute -bottom-4 text-gray-400 italic">Press "R" to rotate the ship before placing it on the board.</div>
        </div>
    `;
  }

  displayOwnBoard({ board }) {
    document.body.replaceWith(document.body.cloneNode(true));
    document.querySelector(".ownBoard").replaceChildren();
    for (let y = 0; y < board.rows; y += 1) {
      for (let x = 0; x < board.columns; x += 1) {
        const element = document.createElement("button");
        element.className = `border border-gray-500 aspect-square cursor-default ${this.#bgFor(
          { board, coordinates: [x, y] }
        )}`;
        this.#squares[x][y] = element;
        document.querySelector(".ownBoard").append(element);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #bgFor({ board, coordinates }) {
    if (
      board.receivedAttacks.some(
        (receivedAttack) =>
          JSON.stringify(receivedAttack) === JSON.stringify(coordinates)
      )
    ) {
      if (board.isOccupiedAt({ coordinates })) {
        if (board.squares[coordinates[0]][coordinates[1]].isSunk()) {
          return "bg-red-300";
        }
        return "bg-orange-300";
      }
      return "bg-gray-300";
    }
    if (board.isOccupiedAt({ coordinates })) {
      return "bg-green-300";
    }
    return "bg-white";
  }

  // eslint-disable-next-line class-methods-use-this
  #bgForEnemy({ board, coordinates }) {
    if (
      board.receivedAttacks.some(
        (receivedAttack) =>
          JSON.stringify(receivedAttack) === JSON.stringify(coordinates)
      )
    ) {
      if (board.isOccupiedAt({ coordinates })) {
        if (board.squares[coordinates[0]][coordinates[1]].isSunk()) {
          return "bg-red-300";
        }
        return "bg-orange-300";
      }
      return "bg-gray-300";
    }
    return "bg-white";
  }

  // eslint-disable-next-line class-methods-use-this
  bindReceiveShip() {
    return new Promise((resolve) => {
      this.#squares.forEach((column, x) => {
        column.forEach((square, y) => {
          square.addEventListener("click", () => {
            resolve({
              coordinates: [x, y],
              orientation: this.#orientation,
            });
          });
        });
      });
    });
  }

  bindHumanPlacingShip({ ship, board }) {
    let coordinates;

    this.#squares.forEach((column, x) => {
      column.forEach((square, y) => {
        square.addEventListener("mouseover", () => {
          coordinates = [x, y];
          const targetSquares = board.canReceiveShipAt({
            ship,
            coordinates,
            orientation: this.#orientation,
          });
          targetSquares.forEach((targetSquare) => {
            this.#squares[targetSquare[0]][targetSquare[1]].classList.replace(
              "bg-white",
              "bg-green-100"
            );
            this.#squares[targetSquare[0]][targetSquare[1]].classList.add(
              "cursor-pointer"
            );
          });
        });
        square.addEventListener("mouseout", () => {
          const targetSquares = board.canReceiveShipAt({
            ship,
            coordinates,
            orientation: this.#orientation,
          });
          targetSquares.forEach((targetSquare) => {
            this.#squares[targetSquare[0]][targetSquare[1]].classList.replace(
              "bg-green-100",
              "bg-white"
            );
            this.#squares[targetSquare[0]][targetSquare[1]].classList.remove(
              "cursor-pointer"
            );
          });
        });
      });
    });

    document.body.addEventListener("keydown", (event) => {
      if (event.key === "r") {
        const tempOrientation = this.#oldOrientation;
        this.#oldOrientation = this.#orientation;
        this.#orientation = tempOrientation;

        if (coordinates) {
          const targetSquares2 = board.canReceiveShipAt({
            ship,
            coordinates,
            orientation: this.#oldOrientation,
          });
          targetSquares2.forEach((targetSquare) => {
            this.#squares[targetSquare[0]][targetSquare[1]].classList.replace(
              "bg-green-100",
              "bg-white"
            );
            this.#squares[targetSquare[0]][targetSquare[1]].classList.remove(
              "cursor-pointer"
            );
          });

          const targetSquares = board.canReceiveShipAt({
            ship,
            coordinates,
            orientation: this.#orientation,
          });
          targetSquares.forEach((targetSquare) => {
            this.#squares[targetSquare[0]][targetSquare[1]].classList.replace(
              "bg-white",
              "bg-green-100"
            );
            this.#squares[targetSquare[0]][targetSquare[1]].classList.add(
              "cursor-pointer"
            );
          });
        }
      }
    });

    document.querySelector(".ownBoard").addEventListener("mouseout", () => {
      coordinates = null;
    });
  }

  bindHumanTurn({ enemyBoard }) {
    if (document.querySelector(".rotate")) {
      document.querySelector(".rotate").remove();
    }
    if (document.querySelector(".enemyBoard")) {
      document.querySelector(".enemyBoard").replaceChildren();
    } else {
      const element = document.createElement("div");
      element.className =
        "enemyBoard relative border border-gray-500 w-full max-w-screen-sm grid grid-cols-10";
      document.querySelector(".boards").append(element);
    }

    for (let y = 0; y < enemyBoard.rows; y += 1) {
      for (let x = 0; x < enemyBoard.columns; x += 1) {
        const element = document.createElement("button");
        element.className = `border border-gray-500 aspect-square cursor-default ${this.#bgForEnemy(
          { board: enemyBoard, coordinates: [x, y] }
        )}`;
        this.#enemySquares[x][y] = element;
        document.querySelector(".enemyBoard").append(element);
      }
    }
  }

  bindHumanAttack({ enemyBoard }) {
    const element = document.createElement("div");
    element.className =
      "absolute -bottom-10 left-0 right-0 text-center text-gray-400 italic";
    element.textContent = "Place your attacks on the enemy board.";
    document.querySelector(".enemyBoard").append(element);
    return new Promise((resolve) => {
      this.#enemySquares.forEach((column, x) => {
        column.forEach((square, y) => {
          const coordinates = [x, y];
          if (enemyBoard.canReceiveAttackAt({ coordinates })) {
            square.classList.add("cursor-pointer");
            square.addEventListener("click", () => {
              resolve({ coordinates });
            });
            square.addEventListener("mouseover", () => {
              square.classList.replace("bg-white", "bg-gray-200");
            });
            square.addEventListener("mouseout", () => {
              square.classList.replace("bg-gray-200", "bg-white");
            });
          } else {
            square.classList.add("cursor-default");
          }
        });
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showGameEnd({ winner, handler }) {
    let message;
    switch (winner) {
      case "Human":
        message = "You win!";
        break;
      case "Computer":
        message = "The computer wins!";
        break;
      case "Draw":
        message = "It's a tie!";
        break;
      default:
        console.log("Winner error.");
    }
    const element = document.createElement("div");
    element.className =
      "absolute -top-20 left-0 right-0 flex flex-col items-center gap-2 text-gray-600";
    element.innerHTML = /* html */ `
      <div class="text-center text-4xl font-medium drop-shadow">${message}</div>
      <button class="border shadow-sm rounded py-1 px-2 transition hover:bg-gray-200 active:bg-gray-300">Play again</button>
    `;
    document.querySelector(".boards").append(element);
    element.addEventListener("click", handler);
  }
}
