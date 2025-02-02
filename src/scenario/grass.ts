import {Loader} from '../core'
import {
  Mesh,
  Texture,
  PlaneGeometry,
  RepeatWrapping,
  MeshStandardMaterial,
} from 'three'

export class Grass {
  object: Mesh

  constructor(texture: Texture, y: number, width = 1000, height = 1000) {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(60, 60)

    const material = new MeshStandardMaterial({map: texture})
    material.polygonOffset = true
    material.polygonOffsetFactor = 1
    material.polygonOffsetUnits = 1

    const geometry = new PlaneGeometry(width, height)
    this.object = new Mesh(geometry, material)
    this.object.rotation.x = -Math.PI / 2
    this.object.position.set(0, y - 0.04, 0)
    this.object.receiveShadow = true
  }
}

export const loadGrass = async (
  name: string,
  y: number,
  width = 1000,
  height = 1000
) => {
  const loader = Loader.getInstance()

  const texture = await loader.texture.loadAsync(name)

  return new Grass(texture, y, width, height)
}
