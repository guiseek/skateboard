import {Clock, DirectionalLight, HemisphereLight, Scene} from 'three'
import {Skateboard, skateboardTricks} from './skateboard'
import {Camera, Follower, Renderer} from './core'
import CannonDebugger from 'cannon-es-debugger'
import {World} from 'cannon-es'
import {entries, inner} from './utils'
import {Player} from './player'
import {media} from './media'
import {load} from './load'
import './style.scss'

const timeStep = 1 / 60

const scene = new Scene()

const world = new World()
world.gravity.set(0, -9.81, 0)

let debug: ReturnType<typeof CannonDebugger>

if (import.meta.env.DEV) {
  debug = CannonDebugger(scene, world)
}

const clock = new Clock()

const camera = new Camera()
camera.position.set(-120, 60, 60)

const renderer = new Renderer(app)
const controls = new Follower(camera)
// const controls = new Controls(camera, renderer)
// controls.update(0)

const hemiLight = new HemisphereLight()
const dirLight = new DirectionalLight()
scene.add(hemiLight, dirLight)

let skateboard: Skateboard
let player: Player

load().then((model) => {
  world.addBody(model.ground.body)
  scene.add(model.ground.object)

  model.quarters.forEach((quarter) => {
    world.addBody(quarter.body)
    scene.add(quarter.object)
  })

  world.addBody(model.banks.body)
  scene.add(model.banks.object)

  world.addBody(model.banksGap.body)
  scene.add(model.banksGap.object)

  world.addBody(model.funbox.body)
  scene.add(model.funbox.object)

  world.addBody(model.funboxBig.body)
  scene.add(model.funboxBig.object)

  skateboard = model.skateboard
  skateboard.wheels.forEach((wheel) => {
    scene.add(wheel.object)
  })

  entries(skateboardTricks).forEach(([action, trick]) => {
    skateboard.addTrick(action, trick)
  })

  if (controls instanceof Follower) {
    controls.setTarget(skateboard.object)
  }

  player = new Player(skateboard, media)

  skateboard.raycast.addToWorld(world)
  scene.add(skateboard.object)

  animate()
})

const animate = () => {
  requestAnimationFrame(animate)

  if (player.actions.paused) return

  const delta = clock.getDelta()

  world.step(timeStep)

  skateboard.update(delta)

  controls.update(delta)

  if (debug) debug.update()

  renderer.render(scene, camera)
}

onresize = () => {
  camera.aspect = inner.ratio
  camera.updateProjectionMatrix()
  renderer.setSize(inner.width, inner.height)
}
