import Snake from "./modules/snake"
import "./bootstrap"
import State from "./modules/state";


(
  new Snake(
    new State("#score"), {level: parseInt(prompt("Entrez un niveau entre 1 et 4"))})).start()