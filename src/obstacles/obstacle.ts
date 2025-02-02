import {BufferGeometry, Mesh, MeshStandardMaterial, Object3D} from 'three'
import {Entity, ObstacleMaterial} from '../interfaces'
import {Body, Material} from 'cannon-es'
import {cannon} from '../utils'
import {Loader} from '../core'

export class Obstacle implements Entity {
  body: Body

  constructor(readonly object: Object3D, readonly materials: ObstacleMaterial) {
    this.body = new Body({mass: 0})

    const position = cannon.mapper.toVec3(object.position)
    this.body.position.copy(position)

    const quaternion = cannon.mapper.toQuat(object.quaternion)
    this.body.quaternion.copy(quaternion)

    object.traverse((child) => {
      if (child instanceof Mesh) {
        if (this.#isRail(child.name)) {
          this.#addShape(child.geometry, materials.rail)
        } else if (this.#isAngleIron(child.name)) {
          this.#addShape(child.geometry, materials.angleIron)
        } else {
          this.#addShape(child.geometry)
        }

        child.receiveShadow = true
        child.castShadow = true
      }
    })

    this.body.addEventListener('collide', console.log)
  }

  #isAngleIron(name: string) {
    return name.endsWith('AngleIron')
  }

  #isRail(name: string) {
    return name.endsWith('Rail')
  }

  #addShape(geometry: BufferGeometry, material?: Material) {
    const shape = cannon.mapper.toTrimesh(geometry)
    if (material) shape.material = material

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

    const obstacle = new Obstacle(cloned, this.materials)

    obstacle.body.position.copy(this.body.position)
    obstacle.body.quaternion.copy(this.body.quaternion)

    return obstacle
  }
}

export const loadObstacle = async (
  name: string,
  materials: ObstacleMaterial
) => {
  const loader = Loader.getInstance()

  const {scene} = await loader.gltf.loadAsync(name)

  return new Obstacle(scene, materials)
}
