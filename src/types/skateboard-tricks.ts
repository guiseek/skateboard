import {SkateboardAction, SkateboardTrick} from '../skateboard'
import {SwipeDirection} from './swipe-direction'
import {Direction} from './direction'
import {Side} from './side'

export type SkateboardTricks = Omit<
  Record<SkateboardAction, SkateboardTrick>,
  Direction | 'space'
>

export type SkateboardSwipe = Record<
  Side,
  Record<SwipeDirection, SkateboardTrick>
>
