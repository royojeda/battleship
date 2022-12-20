export default class View {
  #root;

  constructor({ rootSelector }) {
    this.#root = document.querySelector(rootSelector);
    this.#root.className += "w-screen h-screen bg-black";
  }
}
