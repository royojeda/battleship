import HumanPlayer from "./humanPlayer";
import ComputerPlayer from "./computerPlayer";
import Board from "./board";
import Ship from "./ship";

export default class Game {
  #players;

  constructor({
    players = [
      new HumanPlayer({
        name: "Human",
        board: new Board(),
        ships: [
          new Ship({ length: 5 }),
          new Ship({ length: 4 }),
          new Ship({ length: 3 }),
          new Ship({ length: 3 }),
          new Ship({ length: 2 }),
        ],
      }),
      new ComputerPlayer({
        name: "Computer",
        board: new Board(),
        ships: [
          new Ship({ length: 5 }),
          new Ship({ length: 4 }),
          new Ship({ length: 3 }),
          new Ship({ length: 3 }),
          new Ship({ length: 2 }),
        ],
      }),
    ],
  } = {}) {
    this.#players = players;
  }

  isOver() {
    return this.#players.some((player) => player.isDefeated());
  }

  async setup() {
    // eslint-disable-next-line no-restricted-syntax
    for (const player of this.#players) {
      // eslint-disable-next-line no-await-in-loop
      await player.arrangeShips();
    }
  }

  async playRound() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, player] of this.#players.entries()) {
      let targetPlayerIndex;
      if (index + 1 === this.#players.length) {
        targetPlayerIndex = 0;
      } else {
        targetPlayerIndex = index + 1;
      }
      // eslint-disable-next-line no-await-in-loop
      await player.attack({ board: this.#players[targetPlayerIndex].board });
    }
  }

  async play() {
    await this.setup();
    while (!this.isOver()) {
      // eslint-disable-next-line no-await-in-loop
      await this.playRound();
    }
    this.onGameEnd({ winner: this.winner() });
  }

  winner() {
    if (this.#players[0].isDefeated()) {
      if (this.#players[1].isDefeated()) {
        return "Draw";
      }
      return this.#players[1].name;
    }
    if (this.#players[1].isDefeated()) {
      return this.#players[0].name;
    }
    return null;
  }

  bindHumanPlaceShips({ handler }) {
    this.#players.forEach((player) => {
      player.bindHumanPlaceShips({ handler });
    });
  }

  bindHumanBoardChange({ handler }) {
    this.#players.forEach((player) => {
      if (player.constructor.name === "HumanPlayer") {
        player.bindHumanBoardChange({ handler });
      }
    });
  }

  bindHumanPlacingShip({ handler }) {
    this.#players.forEach((player) => {
      if (player.constructor.name === "HumanPlayer") {
        player.bindHumanPlacingShip({ handler });
      }
    });
  }

  bindHumanTurn({ handler }) {
    this.#players.forEach((player) => {
      if (player.constructor.name === "HumanPlayer") {
        player.bindHumanTurn({ handler });
      }
    });
  }

  bindHumanAttack({ handler }) {
    this.#players.forEach((player) => {
      if (player.constructor.name === "HumanPlayer") {
        player.bindHumanAttack({ handler });
      }
    });
  }

  bindGameEnd({ handler }) {
    this.onGameEnd = handler;
  }
}
