import {SkateboardAction, SkateboardActions} from './skateboard-actions'
import {AudioListener, Group, Mesh, Object3D} from 'three'
import {Entity, SkateboardMaterial} from '../interfaces'
import {Body, RaycastVehicle, Vec3} from 'cannon-es'
import {SkateboardSound} from './skateboard-sound'
import {SkateboardParts} from './skateboard-parts'
import {SkateboardTrick} from './skateboard-trick'
import {SkateboardWheel} from './skateboard-wheel'
import {cannon, three} from '../utils'
import {Loader} from '../core'

export class Skateboard implements Entity {
  parts: SkateboardParts

  body: Body

  raycast: RaycastVehicle

  actions: SkateboardActions

  wheels: SkateboardWheel[] = []

  object: Group

  settings = {maxforce: 30, maxSteerVal: 0.15, brakeForce: 4}

  constructor(
    object: Object3D,
    readonly sound: SkateboardSound,
    readonly materials: SkateboardMaterial
  ) {
    this.parts = new SkateboardParts(object)
    this.actions = new SkateboardActions()
    this.body = new Body({mass: 14})

    this.raycast = new RaycastVehicle({
      chassisBody: this.body,
      /* x */ indexRightAxis: 0,
      /* y */ indexUpAxis: 1,
      /* z */ indexForwardAxis: 2,
    })

    this.body.position.set(45, 55, 353)

    this.body.quaternion.set(
      this.parts.deckCollision.quaternion.x,
      this.parts.deckCollision.quaternion.y,
      this.parts.deckCollision.quaternion.z,
      this.parts.deckCollision.quaternion.w
    )

    this.body.angularVelocity.set(0, 1, -0.4)

    {
      /* Shape */
      const geometry = three.mapper.toBoxGeometry(
        this.parts.deckCollision.geometry
      )
      const offset = new Vec3(
        this.parts.deckCollision.position.x,
        this.parts.deckCollision.position.y,
        this.parts.deckCollision.position.z
      )
      const shape = cannon.mapper.toBox(geometry)
      shape.material = this.materials.slide
      this.body.addShape(shape, offset)
    }

    {
      /* Nose */
      const geometry = three.mapper.toBoxGeometry(
        this.parts.deckNoseCollision.geometry
      )
      const offset = new Vec3(
        this.parts.deckNoseCollision.position.x,
        this.parts.deckNoseCollision.position.y,
        this.parts.deckNoseCollision.position.z
      )
      const shape = cannon.mapper.toBox(geometry)
      shape.material = this.materials.slide
      this.body.addShape(shape, offset)
    }

    {
      /* Tail */
      const geometry = three.mapper.toBoxGeometry(
        this.parts.deckTailCollision.geometry
      )
      const offset = new Vec3(
        this.parts.deckTailCollision.position.x,
        this.parts.deckTailCollision.position.y,
        this.parts.deckTailCollision.position.z
      )
      const shape = cannon.mapper.toBox(geometry)
      shape.material = this.materials.slide
      this.body.addShape(shape, offset)
    }

    {
      /* Truck Front */
      const geometry = three.mapper.toBoxGeometry(
        this.parts.truckFrontCollision.geometry
      )
      const offset = new Vec3(
        this.parts.truckFrontCollision.position.x,
        this.parts.truckFrontCollision.position.y,
        this.parts.truckFrontCollision.position.z
      )
      const shape = cannon.mapper.toBox(geometry)
      shape.material = this.materials.grind
      this.body.addShape(shape, offset)
    }

    {
      /* Truck Back */
      const geometry = three.mapper.toBoxGeometry(
        this.parts.truckBackCollision.geometry
      )
      const offset = new Vec3(
        this.parts.truckBackCollision.position.x,
        this.parts.truckBackCollision.position.y,
        this.parts.truckBackCollision.position.z
      )
      const shape = cannon.mapper.toBox(geometry)
      shape.material = this.materials.grind
      this.body.addShape(shape, offset)
    }

    this.object = new Group()
    this.object.add(
      this.parts.deckParent,
      this.parts.truckFrontParent,
      this.parts.truckBackParent
    )

    this.#addWheel(
      this.parts.wheelFrontLeftCollision,
      this.parts.wheelFrontLeftParent
    )
    this.#addWheel(
      this.parts.wheelFrontRightCollision,
      this.parts.wheelFrontRightParent
    )
    this.#addWheel(
      this.parts.wheelBackLeftCollision,
      this.parts.wheelBackLeftParent
    )
    this.#addWheel(
      this.parts.wheelBackRightCollision,
      this.parts.wheelBackRightParent
    )

    this.body.addEventListener('collide', this.#onCollide)

    this.#listen()
  }

  setPosition(x: number, y: number, z: number) {
    this.body.position.set(x, y, z)
  }

  update(_delta: number) {
    this.object.position.copy(this.body.position)
    this.object.quaternion.copy(this.body.quaternion)

    for (let i = 0; i < this.raycast.wheelInfos.length; i++) {
      this.raycast.updateWheelTransform(i)
      const wheel = this.raycast.wheelInfos[i]

      const {position, quaternion} = this.wheels[i].object

      position.copy(wheel.worldTransform.position)
      quaternion.copy(wheel.worldTransform.quaternion)
    }
  }

  addTrick(action: SkateboardAction, trick: SkateboardTrick) {
    this.actions.on(action, (state, meta) => {
      if (state) trick.execute(this, meta)
    })
  }

  reset() {
    this.body.velocity.set(0, 0, 0)
    this.body.position.set(45, 55, 353)
    this.body.quaternion.set(0, 0, 0, 1)
    this.body.angularVelocity.set(0, 1, -0.4)

    this.raycast.wheelInfos.forEach((wheel) => {
      wheel.worldTransform.position.set(0, 0, 0)
      wheel.worldTransform.quaternion.set(0, 0, 0, 1)
    })

    this.object.position.copy(this.body.position)
    this.object.quaternion.copy(this.body.quaternion)

    this.raycast.wheelInfos.forEach((wheel, index) => {
      const {object} = this.wheels[index]
      object.position.copy(wheel.worldTransform.position)
      object.quaternion.copy(wheel.worldTransform.quaternion)
    })
  }

  #onCollide = () => {
    // console.log(event.contact.)

    if (!this.sound.collision.isPlaying) {
      this.sound.collision.play()
    }
  }

  #listen() {
    this.actions.on('up', (state) => {
      if (state) {
        this.raycast.applyEngineForce(-this.settings.maxforce, 0)
        this.raycast.applyEngineForce(-this.settings.maxforce, 1)
        this.raycast.applyEngineForce(-this.settings.maxforce, 2)
        this.raycast.applyEngineForce(-this.settings.maxforce, 3)
        // this.sound.running.setVolume(0.4)
      } else {
        this.raycast.applyEngineForce(0, 0)
        this.raycast.applyEngineForce(0, 1)
        this.raycast.applyEngineForce(0, 2)
        this.raycast.applyEngineForce(0, 3)
      }
    })

    this.actions.on('down', (state) => {
      if (state) {
        this.raycast.applyEngineForce(this.settings.maxforce, 0)
        this.raycast.applyEngineForce(this.settings.maxforce, 1)
        this.raycast.applyEngineForce(this.settings.maxforce, 2)
        this.raycast.applyEngineForce(this.settings.maxforce, 3)
        // this.sound.running.setVolume(0.4)
      } else {
        this.raycast.applyEngineForce(0, 0)
        this.raycast.applyEngineForce(0, 1)
        this.raycast.applyEngineForce(0, 2)
        this.raycast.applyEngineForce(0, 3)
      }
    })

    this.actions.on('left', (state) => {
      if (state) {
        this.raycast.setSteeringValue(this.settings.maxSteerVal, 0)
        this.raycast.setSteeringValue(this.settings.maxSteerVal, 1)
      } else {
        this.raycast.setSteeringValue(0, 0)
        this.raycast.setSteeringValue(0, 1)
      }
    })

    this.actions.on('right', (state) => {
      if (state) {
        this.raycast.setSteeringValue(-this.settings.maxSteerVal, 0)
        this.raycast.setSteeringValue(-this.settings.maxSteerVal, 1)
      } else {
        this.raycast.setSteeringValue(0, 0)
        this.raycast.setSteeringValue(0, 1)
      }
    })

    this.actions.on('space', (state) => {
      if (state) {
        this.raycast.setBrake(this.settings.brakeForce, 0)
        this.raycast.setBrake(this.settings.brakeForce, 1)
        this.raycast.setBrake(this.settings.brakeForce, 2)
        this.raycast.setBrake(this.settings.brakeForce, 3)
        // this.sound.running.setVolume(0)
      } else {
        this.raycast.setBrake(0, 0)
        this.raycast.setBrake(0, 1)
        this.raycast.setBrake(0, 2)
        this.raycast.setBrake(0, 3)
      }
    })
  }

  #addWheel(collision: Mesh, object: Object3D) {
    const {radius} = three.utils.getBoundingSphere(collision.geometry)
    const wheel = new SkateboardWheel(radius, object)
    this.raycast.addWheel(wheel)
    this.wheels.push(wheel)
  }
}

export const loadSkateboard = async (
  listener: AudioListener,
  materials: SkateboardMaterial
) => {
  const loader = Loader.getInstance()

  const kick = await loader.audio.loadAsync('kick.mp3')
  const collision = await loader.audio.loadAsync('collision.mp3')

  const sound = new SkateboardSound(listener, [kick, collision])

  const {scene} = await loader.gltf.loadAsync('skateboard.glb')

  return new Skateboard(scene, sound, materials)
}
