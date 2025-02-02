import {Scene, Clock, DirectionalLight, HemisphereLight} from 'three'
import {Camera, Controls, Follower, Renderer} from './core'
import {Entity, Materials, Updatable} from './interfaces'
import {ContactMaterial, World} from 'cannon-es'
// import CannonDebugger from 'cannon-es-debugger'
import {Skateboard} from './skateboard'
import {Player} from './player'
import {Day} from './scenario'

export class Stage {
  scene = new Scene()

  world = new World()

  clock = new Clock()

  camera = new Camera()

  renderer: Renderer

  #updatable = new Set<Updatable>()

  controls: Follower | Controls

  // debugger: ReturnType<typeof CannonDebugger>

  constructor(
    container: HTMLElement,
    private env: Env,
    private materials: Materials,
    private skateboard: Skateboard,
    private player: Player
  ) {
    this.world.gravity.set(0, env.gravity, 0)

    const {friction, restitution, equation} = env.contact
    this.world.defaultContactMaterial.friction = friction
    this.world.defaultContactMaterial.restitution = restitution

    this.world.defaultContactMaterial.contactEquationStiffness =
      equation.contact.stiffness

    this.world.defaultContactMaterial.contactEquationRelaxation =
      equation.contact.relaxation

    this.world.defaultContactMaterial.frictionEquationStiffness =
      equation.friction.stiffness

    this.world.defaultContactMaterial.frictionEquationRelaxation =
      equation.friction.relaxation

    this.renderer = new Renderer(container)

    const day = new Day(this.renderer.toneMappingExposure)

    this.renderer.toneMappingExposure = day.effect.exposure

    this.scene.add(day.object)

    const dirLight = new DirectionalLight()
    const hemiLight = new HemisphereLight()
    this.scene.add(dirLight, hemiLight)

    this.controls = new Follower(this.camera)

    this.skateboard.body.collisionResponse = true

    const skateGringObstacleAngleIronContact = new ContactMaterial(
      this.materials.obstacle.angleIron,
      this.materials.skateboard.grind,
      {friction: 0.1, restitution: 0.0}
    )
    this.world.addContactMaterial(skateGringObstacleAngleIronContact)

    const skateGringObstacleRailContact = new ContactMaterial(
      this.materials.obstacle.rail,
      this.materials.skateboard.grind,
      {friction: 0.1, restitution: 0.0}
    )
    this.world.addContactMaterial(skateGringObstacleRailContact)

    const skateSlideObstacleRailContact = new ContactMaterial(
      this.materials.obstacle.rail,
      this.materials.skateboard.slide,
      {friction: 0.1, restitution: 0.0}
    )
    this.world.addContactMaterial(skateSlideObstacleRailContact)

    const skateSlideObstacleAngleIronContact = new ContactMaterial(
      this.materials.obstacle.rail,
      this.materials.skateboard.slide,
      {friction: 0.1, restitution: 0.0}
    )
    this.world.addContactMaterial(skateSlideObstacleAngleIronContact)

    // this.debugger = CannonDebugger(this.scene, this.world)

    if (this.controls instanceof Follower) {
      this.controls.setTarget(skateboard.object)
    }

    player.actions.on('v', (state) => {
      if (state) {
        if (this.controls instanceof Follower) {
          this.controls = new Controls(this.camera, this.renderer)
        } else {
          this.controls = new Follower(this.camera)
          this.controls.setTarget(skateboard.object)
        }
      }
    })

    onresize = () => {
      this.camera.aspect = innerWidth / innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(innerWidth, innerHeight)
    }
  }

  add = (entity: Entity) => {
    this.scene.add(entity.object)
    if (entity.body) {
      this.world.addBody(entity.body)
    }
    if (entity.raycast) {
      entity.raycast.addToWorld(this.world)
    }
  }

  addUpdatable(entity: Updatable) {
    this.add(entity)

    this.#updatable.add(entity)
  }

  animate = () => {
    requestAnimationFrame(this.animate)

    if (this.player.actions.paused) return

    const delta = this.clock.getDelta()

    this.world.step(this.env.timeStep)

    this.skateboard.update(delta)

    // this.debugger.update()

    this.controls.update(delta)

    this.renderer.render(this.scene, this.camera)
  }
}
