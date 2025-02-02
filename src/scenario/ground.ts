import {Body, Plane} from 'cannon-es'
import {Mesh, Object3D} from 'three'
import {cannon} from '../utils'
import {Loader} from '../core'

export class Ground {
  body: Body
  constructor(public object: Object3D) {
    this.body = new Body({type: Body.STATIC})

    const shape = new Plane()
    this.body.addShape(shape)

    const position = cannon.mapper.toVec3(object.position)
    this.body.position.copy(position)

    this.body.quaternion.setFromEuler(-Math.PI / 2, 0, 0)

    object.traverse((child) => {
      if (child instanceof Mesh) {
        child.receiveShadow = true
        child.castShadow = true
      }
    })
  }
}

export const loadGround = async (name: string) => {
  const loader = Loader.getInstance()

  const {scene} = await loader.gltf.loadAsync(name)

  return new Ground(scene)
}
