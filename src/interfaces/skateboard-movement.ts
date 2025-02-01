import {Axis} from '../types'

export interface SkateboardMovement {
  readonly forces?: Axis[]
  readonly rotation?: Axis
}
