import * as ex from 'excalibur'

export class Trigger extends ex.Actor {
  private callbackAction: (() => void) | null = null;

  constructor(x: number, y: number) {
    super({
      pos: ex.vec(x, y),
      width: 50,
      height: 50,
      color: ex.Color.Yellow,
      collisionType: ex.CollisionType.Passive,
    });
  }

  linkAction(callbackAction: () => void): void {
    this.callbackAction = callbackAction;
  }

  onInitialize(): void {
    console.log('Trigger initialized');
    this.on('collisionstart', (evt) => {
      console.log('Collision start:', evt.other);
      if (this.callbackAction) {
        this.callbackAction();
      }
    });
  }
}