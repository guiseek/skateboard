import {SkateboardAction, SkateboardTrick} from '../skateboard'
import {Direction} from './direction'

export type SkateboardTricks = Omit<
  Record<SkateboardAction, SkateboardTrick>,
  Direction | 'space'
>
