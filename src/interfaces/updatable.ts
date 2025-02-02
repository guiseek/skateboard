import {Entity} from './entity'

export interface Updatable extends Entity {
  update(delta: number): void
}
