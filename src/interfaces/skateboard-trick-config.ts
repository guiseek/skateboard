import {SkateboardMovement} from './skateboard-movement'
import {SkateboardAction} from '../skateboard'

export interface SkateboardTrickConfig extends SkateboardMovement {
  name: string
  action: SkateboardAction
}
