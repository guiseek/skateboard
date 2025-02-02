/// <reference types="vite/client" />

declare const root: HTMLDivElement

interface EnvEquationConfig {
  stiffness: number
  relaxation: number
}

interface EnvContactConfig {
  friction: number
  restitution: number
  equation: {
    friction: EnvEquationConfig
    contact: EnvEquationConfig
  }
}

interface Env {
  production: boolean
  timeStep: number
  gravity: number
  contact: EnvContactConfig
}
