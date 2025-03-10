import {DRACOLoader, GLTFLoader, RGBELoader} from 'three/examples/jsm/Addons.js'
import {AudioLoader, TextureLoader} from 'three'

export class Loader {
  private static instance: Loader

  gltf: GLTFLoader

  rgbe: RGBELoader
  
  texture: TextureLoader

  audio: AudioLoader

  static getInstance() {
    if (!this.instance) {
      this.instance = new Loader()
    }

    return this.instance
  }

  private constructor() {
    this.rgbe = new RGBELoader()
    this.rgbe.setPath('envs/')

    this.texture = new TextureLoader()
    this.texture.setPath('textures/')

    this.audio = new AudioLoader()
    this.audio.setPath('sounds/')

    this.gltf = new GLTFLoader()
    this.gltf.setPath('models/')

    const draco = new DRACOLoader()
    draco.setDecoderPath('js/')

    this.gltf.setDRACOLoader(draco)
  }
}
