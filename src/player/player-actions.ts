import {Actions} from '../core'

export type PlayerAction = 'enter' | 'p' | 'r'

export class PlayerActions extends Actions<PlayerAction> {
  state = {
    enter: false,
    p: false,
    r: false,
  }

  #paused = false

  get paused() {
    return this.#paused
  }

  constructor() {
    super()

    this.on('p', (state) => {
      if (state) this.pause()
    })
  }

  pause() {
    this.#paused = !this.#paused
  }
}
