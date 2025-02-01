import {AudioListener, PositionalAudio} from 'three'

export class SkateboardSound {
  readonly kick: PositionalAudio

  readonly collision: PositionalAudio

  constructor(listener: AudioListener, [kick, collision]: AudioBuffer[]) {
    this.kick = new PositionalAudio(listener).setBuffer(kick)
    this.collision = new PositionalAudio(listener).setBuffer(collision)
  }
}
