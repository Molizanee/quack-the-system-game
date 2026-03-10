import * as ex from 'excalibur';
import { Platform } from '../actors/platform';
import { Duck } from '../actors/duck';

export class Level1 extends ex.Scene {
  onInitialize(engine: ex.Engine): void {
    const leftPlatform = new Platform(engine.drawWidth * 0.3, engine.drawWidth, engine.drawHeight, 'left');
    const skyPlarform = new Platform(engine.drawWidth * 0.3, engine.drawWidth, engine.drawHeight * 0.7, 'center');
    const rightPlatform = new Platform(engine.drawWidth * 0.3, engine.drawWidth, engine.drawHeight, 'right');

    const duck = new Duck(1, 2)
    const actors = [duck, leftPlatform, skyPlarform, rightPlatform]

    actors.map((actor) => {
      this.add(actor)
    })
  }
}
