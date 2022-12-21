export default class Controller {
  #model;

  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  start() {}
}
