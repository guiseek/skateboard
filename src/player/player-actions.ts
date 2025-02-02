import {Actions} from '../core'

export type PlayerAction =
  | 'enter'
  | 'p'
  | 'r'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'

export class PlayerActions extends Actions<PlayerAction> {
  state = {
    enter: false,
    p: false,
    r: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  }

  #paused = false

  get paused() {
    return this.#paused
  }

  #follower = true

  get follower() {
    return this.#follower
  }

  constructor() {
    super()

    this.on('p', (state) => {
      if (state) this.pause()
    })

    // this.on('1', (state) => {
    //   if (state) this.follow()
    // })
  }

  pause() {
    this.#paused = !this.#paused
  }

  follow() {
    this.#follower = !this.#follower
  }
}
