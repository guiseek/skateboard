import {Skateboard} from '../skateboard'
import {Object3D, Vector3} from 'three'
import {Stage} from '../stage'

export class PlayerSpawn {
  constructor(readonly object: Object3D) {}

  spawn(skateboard: Skateboard, stage: Stage) {
    const pos = new Vector3()
    this.object.getWorldPosition(pos)
    skateboard.setPosition(pos.x, pos.y, pos.z)

    stage.add(skateboard)
  }
}
