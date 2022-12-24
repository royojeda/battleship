export default class Ship {
  #length;

  #hits;

  constructor({ length, hits = 0 }) {
    this.#length = length;
    this.#hits = hits;
  }

  isSunk() {
    return this.#hits === this.#length;
  }

  hit() {
    this.#hits += 1;
  }

  get length() {
    return this.#length;
  }
}
