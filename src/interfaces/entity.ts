import {Body, RaycastVehicle} from 'cannon-es'
import {Object3D} from 'three'

export interface Entity {
  object: Object3D
  body?: Body
  raycast?: RaycastVehicle
}
