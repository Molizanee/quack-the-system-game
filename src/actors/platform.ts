import * as ex from 'excalibur';

const PLATFORM_HEIGHT = 40;
const PLATFORM_COLOR = ex.Color.fromHex('#8B5E3C');

export class Platform extends ex.Actor {
  constructor(width: number, screenWidth: number, y: number, position: 'left' | 'right' | 'center' = 'center') {
    const posX =
      position === 'left' ? width / 2 :
      position === 'right' ? screenWidth - width / 2 :
      screenWidth / 2;

    super({
      pos: ex.vec(posX, y - PLATFORM_HEIGHT / 2),
      width: width,
      height: PLATFORM_HEIGHT,
      color: PLATFORM_COLOR,
      collisionType: ex.CollisionType.Fixed,
      anchor: ex.vec(0.5, 0.5),
    });
  }
}
