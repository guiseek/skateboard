import {SkateboardTrick} from './skateboard-trick'

export const skateboardTricks = {
  s: new SkateboardTrick('ollie', {
    forces: [{y: 70}],
    rotation: {y: 0},
  }),
  d: new SkateboardTrick('shove-it', {
    forces: [{y: 0}],
    rotation: {y: -2.4},
  }),
  a: new SkateboardTrick('pop shove-it', {
    forces: [{y: 0}],
    rotation: {y: 2.4},
  }),
  q: new SkateboardTrick('flip', {
    forces: [{y: 0}],
    rotation: {z: -4.5},
  }),
  e: new SkateboardTrick('heelflip', {
    forces: [{y: 0}],
    rotation: {z: 4.5},
  }),
  x: new SkateboardTrick('kickflip', {
    forces: [{y: 0}],
    rotation: {z: 3.2, y: -3.2},
  }),
}
