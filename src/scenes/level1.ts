import * as ex from "excalibur";
import { Ground } from "../actors/ground";

export class Level1 extends ex.Scene {
  onInitialize(engine: ex.Engine): void {
    const ground = new Ground(engine.drawWidth, engine.drawHeight);
    this.add(ground);
  }
}
