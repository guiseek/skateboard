import {Object3D} from 'three'
import {Space} from '../enums'

export function getMatrix(object: Object3D, space: Space) {
  switch (space) {
    case Space.Local:
      return object.matrix
    case Space.Global:
      return object.matrixWorld
  }
}
