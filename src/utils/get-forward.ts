import {Object3D, Vector3} from 'three'
import {getMatrix} from './get-matrix'
import {Space} from '../enums'

export function getForward(object: Object3D, space = Space.Global) {
  const matrix = getMatrix(object, space)
  return new Vector3(
    matrix.elements[8],
    matrix.elements[9],
    matrix.elements[10]
  )
}
