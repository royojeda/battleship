export default class Model {
  #players;

  constructor({ players }) {
    this.#players = players;
  }

  playTurn() {
    this.targetPlayer.receiveAttack(this.attackingPlayer.chooseCoordinates());
  }

  get attackingPlayer() {
    return this.#players[0];
  }

  get targetPlayer() {
    return this.#players[1];
  }

  isGameOver() {
    return this.attackingPlayer.isDefeated();
  }
}
