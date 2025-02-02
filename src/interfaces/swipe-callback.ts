import {Side, SwipeDirection} from '../types'
import {Callback} from './callback'

export interface SwipeEvent {
  side: Side
  direction: SwipeDirection
  angle: number
  distance: number
  velocity: number
}

export interface SwipeCallback extends Callback<SwipeEvent> {}
