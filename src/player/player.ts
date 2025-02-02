import {PlayerActions} from './player-actions'
import {PlayerSpawn} from './player-spawn'
import {Skateboard} from '../skateboard'
import {MediaPlayer} from '../media'
import {Object3D} from 'three'

export class Player {
  actions: PlayerActions
  spawns: PlayerSpawn[] = []

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

  addSpawnPoint(object: Object3D) {
    this.spawns.push(new PlayerSpawn(object))
  }
}
