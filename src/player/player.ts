import {PlayerActions} from './player-actions'
import {Skateboard} from '../skateboard'
import {MediaPlayer} from '../media'

export class Player {
  actions: PlayerActions

  constructor(private skateboard: Skateboard, private media: MediaPlayer) {
    this.actions = new PlayerActions()

    media.onfocus = () => this.actions.pause()

    this.media.audio.volume = 0.5

    this.actions.on('enter', (state) => {
      if (state) this.media.audio.play()
    })

    this.actions.on('r', (state) => {
      if (state) this.skateboard.reset()
    })
  }
}
