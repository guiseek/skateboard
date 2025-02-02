export const env: Env = {
  production: false,
  timeStep: 1 / 60,
  gravity: -9.81,
  contact: {
    friction: 0.6,
    restitution: 0.1,
    equation: {
      friction: {
        stiffness: 1e7,
        relaxation: 4,
      },
      contact: {
        stiffness: 1e8,
        relaxation: 3,
      },
    },
  },
}
