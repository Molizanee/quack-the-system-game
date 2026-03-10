import * as ex from 'excalibur';

export class Duck extends ex.Actor {
  constructor(x: number, y: number) {

    super({
      pos: ex.vec(x, y),
      width: 50,
      height: 50,
      color: ex.Color.Yellow,
      collisionType: ex.CollisionType.Active,
    });

    const SPEED = 200; // pixels per second

    this.update = (engine: ex.Engine, delta: number) => {
      super.update(engine, delta);

      const dt = delta / 200; // Convert ms to seconds

      if (engine.input.keyboard.isHeld(ex.Keys.KeyW)) {
        this.vel.y -= SPEED * dt;
      }
      if (engine.input.keyboard.isHeld(ex.Keys.KeyS)) {
        this.vel.y += SPEED * dt;
      }
      if (engine.input.keyboard.isHeld(ex.Keys.KeyA)) {
        this.vel.x -= SPEED * dt;
      }
      if (engine.input.keyboard.isHeld(ex.Keys.KeyD)) {
        this.vel.x += SPEED * dt;
      }
    };
  };
}