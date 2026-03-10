import * as ex from "excalibur";

const GROUND_HEIGHT = 40;
const GROUND_COLOR = ex.Color.fromHex("#8B5E3C");

export class Ground extends ex.Actor {
  constructor(screenWidth: number, screenHeight: number) {
    super({
      pos: ex.vec(screenWidth / 2, screenHeight - GROUND_HEIGHT / 2),
      width: screenWidth,
      height: GROUND_HEIGHT,
      color: GROUND_COLOR,
      collisionType: ex.CollisionType.Fixed,
      anchor: ex.vec(0.5, 0.5),
    });
  }
}
