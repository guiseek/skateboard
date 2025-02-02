import {ACESFilmicToneMapping, WebGLRenderer} from 'three'

export class Renderer extends WebGLRenderer {
  constructor(container: HTMLElement) {
    super({antialias: true})
    this.setClearColor(0x87ceeb)
    this.setPixelRatio(devicePixelRatio)
    this.setSize(innerWidth, innerHeight)
    this.toneMapping = ACESFilmicToneMapping
    this.toneMappingExposure = 0.5
    container.appendChild(this.domElement)
  }
}
