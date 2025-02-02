import {SkateboardTrick} from './skateboard-trick'
import {SkateboardTricks} from '../types'

export const loadSkateboardTricks = (): SkateboardTricks => {
  return {
    s: new SkateboardTrick('ollie', {
      forces: [{y: 80}],
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
    z: new SkateboardTrick('hardflip', {
      forces: [{y: 0}],
      rotation: {x: 2.5, z: -3.8},
    }),
    c: new SkateboardTrick('hard heelflip', {
      forces: [{y: 0}],
      rotation: {x: 2.5, z: 3.8},
    }),
    x: new SkateboardTrick('360 flip', {
      forces: [{y: 0}],
      rotation: {z: 3.2, y: -2.4},
    }),
    // f: new SkateboardTrick('laser flip', {
    //   forces: [{y: 0}],
    //   rotation: { z: 3.5, y: 4.8 },
    // }),
    f: new SkateboardTrick('impossible', {
      forces: [{y: 0}],
      rotation: {x: 2.4},
    }),
  }
}
