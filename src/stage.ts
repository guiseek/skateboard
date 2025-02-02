import {Scene, Clock, DirectionalLight, HemisphereLight} from 'three'
import {Camera, Controls, Follower, Renderer} from './core'
import {ContactMaterial, Material, World} from 'cannon-es'
import {Entity, Materials, Updatable} from './interfaces'
import CannonDebugger from 'cannon-es-debugger'
import {Skateboard} from './skateboard'
import {MediaPlayer} from './media'
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

  materials: Materials = {
    obstacle: {
      angleIron: new Material({friction: 0.02, restitution: 0.01}),
      rail: new Material({friction: 0.01, restitution: 0.02}),
    },
    skateboard: {
      slide: new Material({friction: 0.01, restitution: 0.0}),
      grind: new Material({friction: 0.02, restitution: 0.0}),
    },
  }

  debugger: ReturnType<typeof CannonDebugger>

  constructor(
    container: HTMLElement,
    private env: Env,
    private skateboard: Skateboard,
    private media: MediaPlayer,
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

    const skateGringObstacleAngleIronContact = new ContactMaterial(
      this.materials.skateboard.grind,
      this.materials.obstacle.angleIron,
      {friction: 0.1, restitution: 0.0}
    )
    this.world.addContactMaterial(skateGringObstacleAngleIronContact)

    const skateGringObstacleRailContact = new ContactMaterial(
      this.materials.skateboard.grind,
      this.materials.obstacle.rail,
      {friction: 0.1, restitution: 0.0}
    )
    this.world.addContactMaterial(skateGringObstacleRailContact)

    const skateSlideObstacleRailContact = new ContactMaterial(
      this.materials.skateboard.slide,
      this.materials.obstacle.rail,
      {friction: 0.1, restitution: 0.0}
    )
    this.world.addContactMaterial(skateSlideObstacleRailContact)

    const skateSlideObstacleAngleIronContact = new ContactMaterial(
      this.materials.skateboard.slide,
      this.materials.obstacle.rail,
      {friction: 0.1, restitution: 0.0}
    )
    this.world.addContactMaterial(skateSlideObstacleAngleIronContact)

    this.debugger = CannonDebugger(this.scene, this.world)

    this.renderer.render(this.scene, this.camera)

    if (this.controls instanceof Follower) {
      this.controls.setTarget(skateboard.object)
    }

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

    // if (player.actions.paused) return

    const delta = this.clock.getDelta()

    this.world.step(this.env.timeStep)

    this.skateboard.update(delta)

    this.debugger.update()

    this.controls.update(delta)

    this.renderer.render(this.scene, this.camera)
  }
}
