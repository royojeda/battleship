export default class Game {
  #players;

  constructor({ players }) {
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
}
