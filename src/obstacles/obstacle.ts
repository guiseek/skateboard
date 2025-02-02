import {BufferGeometry, Mesh, MeshStandardMaterial, Object3D} from 'three'
import {CollisionEvent, Entity, ObstacleMaterial} from '../interfaces'
import {Skateboard} from '../skateboard'
import {Body, Material} from 'cannon-es'
import {cannon} from '../utils'
import {Loader} from '../core'

export class Obstacle implements Entity {
  body: Body

  angleIrons: Mesh[] = []
  copings: Mesh[] = []
  rails: Mesh[] = []

  constructor(
    readonly object: Object3D,
    private skateboard: Skateboard,
    readonly materials: ObstacleMaterial
  ) {
    this.body = new Body({mass: 0})

    const position = cannon.mapper.toVec3(object.position)
    this.body.position.copy(position)

    const quaternion = cannon.mapper.toQuat(object.quaternion)
    this.body.quaternion.copy(quaternion)
    
    object.traverse((child) => {
      if (child instanceof Mesh) {
        if (this.#isRail(child.name)) {
          this.#addShape(child.geometry, materials.rail)
          const body = this.#createBody(child, materials.rail)
          body.addEventListener('collide', this.#log('rail'))
          this.rails.push(child)
        } else if (this.#isAngleIron(child.name)) {
          this.#addShape(child.geometry, materials.angleIron)
          const body = this.#createBody(child, materials.angleIron)
          body.addEventListener('collide', this.#log('angleIron'))
          this.angleIrons.push(child)
        } else if (this.#isCoping(child.name)) {
          this.copings.push(child)
          this.#addShape(child.geometry, materials.coping)
          const body = this.#createBody(child, materials.coping)
          body.addEventListener('collide', this.#log('coping'))
        } else {
          this.#addShape(child.geometry)
        }

        child.receiveShadow = true
        child.castShadow = true
      }
    })

    this.body.addEventListener('collide', (e: CollisionEvent) => {
      console.log('obstacle', e)
    })
    // this.body.addEventListener('collide', console.log)
  }

  #log = (ref: string) => (event: CollisionEvent) => console.log(ref, event)

  #createBody(mesh: Mesh, material: Material) {
    const shape = cannon.mapper.toTrimesh(mesh.geometry)

    const body = new Body({mass: 0, shape, material})

    const position = cannon.mapper.toVec3(mesh.position)
    body.position.copy(position)

    const quaternion = cannon.mapper.toQuat(mesh.quaternion)
    body.quaternion.copy(quaternion)

    return body
  }

  #isAngleIron(name: string) {
    return name.endsWith('AngleIron')
  }

  #isCoping(name: string) {
    return name.endsWith('Coping')
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

    const obstacle = new Obstacle(cloned, this.skateboard, this.materials)

    obstacle.body.position.copy(this.body.position)
    obstacle.body.quaternion.copy(this.body.quaternion)

    return obstacle
  }
}

export const loadObstacle = async (
  name: string,
  skateboard: Skateboard,
  materials: ObstacleMaterial
) => {
  const loader = Loader.getInstance()

  const {scene} = await loader.gltf.loadAsync(name)

  return new Obstacle(scene, skateboard, materials)
}
