import {BufferGeometry, Mesh, MeshStandardMaterial, Object3D} from 'three'
import {cannon} from '../utils'
import {Body} from 'cannon-es'
import {Loader} from '../core'

export class Obstacle {
  body: Body

  constructor(readonly object: Object3D) {
    this.body = new Body({mass: 0})

    const position = cannon.mapper.toVec3(object.position)
    this.body.position.copy(position)

    const quaternion = cannon.mapper.toQuat(object.quaternion)
    this.body.quaternion.copy(quaternion)

    object.traverse((child) => {
      if (child instanceof Mesh) {
        this.#addShape(child.geometry)
        child.receiveShadow = true
        child.castShadow = true
      }
    })
  }

  #addShape(geometry: BufferGeometry) {
    const shape = cannon.mapper.toTrimesh(geometry)
    this.body.addShape(shape)
  }

  setPosition(x: number, y: number, z: number) {
    this.body.position.set(x, y, z)
    this.object.position.set(x, y, z)
  }

  clone() {
    const cloned = this.object.clone(true)

    cloned.traverse((child) => {
      if (child instanceof Mesh) {
        if (child.material instanceof MeshStandardMaterial) {
          child.material = child.material.clone()
        }
        child.receiveShadow = true
        child.castShadow = true
      }
    })

    const obstacle = new Obstacle(cloned)

    obstacle.body.position.copy(this.body.position)
    obstacle.body.quaternion.copy(this.body.quaternion)

    return obstacle
  }
}

export const loadObstacle = async (name: string) => {
  const loader = Loader.getInstance()

  const {scene} = await loader.gltf.loadAsync(name)

  return new Obstacle(scene)
}
