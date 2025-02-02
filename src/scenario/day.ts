import {Sky} from 'three/examples/jsm/Addons.js'
import {MathUtils, Vector3} from 'three'

export class Day {
  object = new Sky()

  sun = new Vector3()

  effect

  constructor(toneMappingExposure: number) {
    this.object.scale.setScalar(450000)

    this.effect = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: 180,
      exposure: toneMappingExposure,
    }

    const uniforms = this.object.material.uniforms
    uniforms['turbidity'].value = this.effect.turbidity
    uniforms['rayleigh'].value = this.effect.rayleigh
    uniforms['mieCoefficient'].value = this.effect.mieCoefficient
    uniforms['mieDirectionalG'].value = this.effect.mieDirectionalG

    const phi = MathUtils.degToRad(90 - this.effect.elevation)
    const theta = MathUtils.degToRad(this.effect.azimuth)

    this.sun.setFromSphericalCoords(1, phi, theta)

    uniforms['sunPosition'].value.copy(this.sun)
  }
}
