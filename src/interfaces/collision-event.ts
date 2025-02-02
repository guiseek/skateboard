import {Body, ContactEquation} from 'cannon-es'

export interface CollisionEvent {
  type: 'collide'
  body: Body
  contact: ContactEquation
  target: Body
}
