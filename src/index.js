import "./styles.css";
import Model from "./model";
import View from "./view";
import Controller from "./controller";

const app = new Controller({
  model: new Model(),
  view: new View({ rootSelector: "#root" }),
});

(async () => {
  await app.start();
})();
