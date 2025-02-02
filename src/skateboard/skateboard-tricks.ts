import {SkateboardSwipe, SkateboardTricks} from '../types'
import {SkateboardTrick} from './skateboard-trick'

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

export const loadSkateboardSwipe = (): SkateboardSwipe => {
  return {
    left: {
      up: new SkateboardTrick('Ollie', {forces: [{y: 5}]}),
      down: new SkateboardTrick('Nollie', {forces: [{y: 5}]}),
      left: new SkateboardTrick('Kickflip', {rotation: {x: -3}}),
      right: new SkateboardTrick('Frontside 180', {rotation: {y: 3}}),
      'diagonal-up-left': new SkateboardTrick('Hardflip', {
        rotation: {x: -3, z: -2},
      }),
      'diagonal-up-right': new SkateboardTrick('Varial Kickflip', {
        rotation: {x: -3, z: 2},
      }),
      'diagonal-down-left': new SkateboardTrick('Frontside Shove-it', {
        rotation: {z: -3},
      }),
      'diagonal-down-right': new SkateboardTrick('Tre Flip', {
        rotation: {x: -3, z: 3},
      }),
    },
    right: {
      up: new SkateboardTrick('Ollie Late Flip', {
        forces: [{y: 5}],
        rotation: {x: 3},
      }),
      down: new SkateboardTrick('Nollie Flip', {
        forces: [{y: 5}],
        rotation: {x: -3},
      }),
      left: new SkateboardTrick('Backside 180', {rotation: {y: -3}}),
      right: new SkateboardTrick('Heelflip', {rotation: {x: 3}}),
      'diagonal-up-left': new SkateboardTrick('Varial Heelflip', {
        rotation: {x: 3, z: -2},
      }),
      'diagonal-up-right': new SkateboardTrick('Inward Heelflip', {
        rotation: {x: 3, z: 2},
      }),
      'diagonal-down-left': new SkateboardTrick('Bigspin', {
        rotation: {y: -3, z: -2},
      }),
      'diagonal-down-right': new SkateboardTrick('Impossible', {
        rotation: {x: -3, z: 3},
      }),
    },
  }
}
