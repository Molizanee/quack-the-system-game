import * as ex from "excalibur";
import { Level1 } from "./scenes/level1";

const game = new ex.Engine({
  width: 0,
  height: 0,
  backgroundColor: ex.Color.White,
  displayMode: ex.DisplayMode.FillScreen,
  physics: {
    gravity: ex.vec(0, 800),
    solver: ex.SolverStrategy.Arcade,
  },
});

game.addScene("level1", new Level1());
game.goToScene("level1");
game.start();
