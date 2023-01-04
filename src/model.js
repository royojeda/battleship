export default class Game {
  #players;

  constructor({ players } = {}) {
    this.#players = players;
  }

  isOver() {
    return this.#players.some((player) => player.isDefeated());
  }

  setup() {
    this.#players.forEach((player) => {
      player.arrangeShips();
    });
  }

  playRound() {
    this.#players.forEach((player, index) => {
      let targetPlayerIndex;
      if (index + 1 === this.#players.length) {
        targetPlayerIndex = 0;
      } else {
        targetPlayerIndex = index + 1;
      }
      player.attack({ board: this.#players[targetPlayerIndex].board });
    });
  }
}
