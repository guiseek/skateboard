import {Loader} from '../core'
import {
  Mesh,
  Texture,
  BackSide,
  RepeatWrapping,
  SphereGeometry,
  MeshBasicMaterial,
  EquirectangularReflectionMapping,
} from 'three'

export class Afternoon {
  object: Mesh

  constructor(texture: Texture) {
    texture.repeat.set(8, 8)
    texture.flipY = false
    texture.premultiplyAlpha = true
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.mapping = EquirectangularReflectionMapping

    const side = BackSide
    const geometry = new SphereGeometry(100000, 600, 600)
    const material = new MeshBasicMaterial({map: texture, side})
    this.object = new Mesh(geometry, material)
  }
}

export const loadAfternoon = async (name: string) => {
  const loader = Loader.getInstance()

  const texture = await loader.texture.loadAsync(name)

  return new Afternoon(texture)
}
