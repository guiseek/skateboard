import {ActionMeta, SkateboardMovement} from '../interfaces'
import {Skateboard} from './skateboard'
import {Vec3} from 'cannon-es'
import {Axis} from '../types'

export class SkateboardTrick {
  #hasUpward: boolean

  constructor(readonly name: string, private movement: SkateboardMovement) {
    const {forces} = movement
    this.#hasUpward = !!forces && forces.some((force) => !!force.y)
  }

  execute(skateboard: Skateboard, meta: ActionMeta) {
    if (this.#hasUpward && skateboard.raycast.numWheelsOnGround) {
      skateboard.sound.kick.play()
    }

    const {rotation, forces} = this.movement

    if (rotation) {
      /* Local Angular Velocity => World Angular Velocity */
      const lav = this.#fromTrickAxis(rotation)
      const wav = skateboard.body.quaternion.vmult(lav)
      const vec = meta.shift ? wav.vadd(wav) : wav
      skateboard.body.angularVelocity.copy(vec)
    }

    if (forces && skateboard.raycast.numWheelsOnGround) {
      forces.forEach((force) => {
        const vector = this.#fromTrickAxis(force)
        const vec = meta.ctrl ? vector.vadd(vector) : vector
        skateboard.body.applyLocalImpulse(vec)
      })
    }
  }

  #fromTrickAxis({x, y, z}: Axis) {
    return new Vec3(x ?? 0, y ?? 0, z ?? 0)
  }
}
