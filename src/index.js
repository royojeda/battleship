import "./styles.css";
import Game from "./model";
import View from "./view";
import Controller from "./controller";
import ComputerPlayer from "./computerPlayer";
import Board from "./board";
import Ship from "./ship";

new Controller({
  model: new Game({
    players: [
      new ComputerPlayer({
        name: "Computer 1",
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
        name: "Computer 2",
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
  }),
  view: new View({ rootSelector: "#root" }),
}).start();
