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

  play() {
    this.setup();
    while (!this.isOver()) {
      this.playRound();
    }
    console.table(this.#players[0].board.squares);
    console.table(this.#players[0].board.receivedAttacks);
    console.table(this.#players[1].board.squares);
    console.table(this.#players[1].board.receivedAttacks);
    console.log(this.winner());
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
}
