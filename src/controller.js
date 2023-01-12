import Game from "./model";
import View from "./view";

export default class Controller {
  #model;

  #view;

  constructor({ model = new Game(), view = new View() } = {}) {
    this.#model = model;
    this.#view = view;
  }

  start() {
    this.#model.bindHumanPlaceShips({ handler: this.onHumanPlaceShips });
    this.#model.bindHumanPlacingShip({ handler: this.onHumanPlacingShip });
    this.#model.bindHumanBoardChange({ handler: this.onHumanBoardChange });
    this.#model.bindHumanTurn({ handler: this.onHumanTurn });
    this.#model.bindHumanAttack({ handler: this.onHumanAttack });
    this.#model.bindGameEnd({ handler: this.onGameEnd });
    this.#view.setup();
    this.#model.play();
  }

  onHumanPlaceShips = () => this.#view.bindReceiveShip();

  onHumanBoardChange = ({ board }) => {
    this.#view.displayOwnBoard({ board });
  };

  onHumanPlacingShip = ({ ship, board }) => {
    this.#view.bindHumanPlacingShip({ ship, board });
  };

  onHumanTurn = ({ enemyBoard }) => {
    this.#view.bindHumanTurn({ enemyBoard });
  };

  onHumanAttack = ({ enemyBoard }) =>
    this.#view.bindHumanAttack({ enemyBoard });

  onGameEnd = ({ winner }) => {
    this.#view.showGameEnd({ winner, handler: this.restart });
  };

  restart = () => {
    this.#model = new Game();
    this.#view = new View();
    this.start();
  };
}
