import {PerspectiveCamera} from 'three'
import {inner} from '../utils/inner'

export class Camera extends PerspectiveCamera {
  constructor() {
    super(45, inner.ratio, 0.1, 10000)
  }
}
