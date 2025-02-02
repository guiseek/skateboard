import Stats from 'three/examples/jsm/libs/stats.module.js'
import CannonDebugger from 'cannon-es-debugger'
import {World} from 'cannon-es'
import {Scene} from 'three'
import {noop} from './noop'

export const debug = (scene: Scene, world: World) => {
  let cannonDebugger: ReturnType<typeof CannonDebugger>
  let stats: Stats

  let begin = noop
  let middle = noop
  let end = noop

  if (import.meta.env.DEV) {
    stats = new Stats()
    document.body.append(stats.dom)
    cannonDebugger = CannonDebugger(scene, world)

    begin = () => {
      stats.begin()
    }

    middle = () => {
      cannonDebugger.update()
    }

    end = () => {
      stats.end()
    }
  }

  return {begin, middle, end}
}
