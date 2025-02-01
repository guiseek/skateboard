import {BufferGeometry} from 'three'

const getBoundingSphere = (geometry: BufferGeometry) => {
  geometry.computeBoundingSphere()

  if (!geometry.boundingSphere) {
    throw `Bounding sphere is ${typeof geometry.boundingSphere}`
  }

  return geometry.boundingSphere
}

const getBoundingBox = (geometry: BufferGeometry) => {
  geometry.computeBoundingBox()

  if (!geometry.boundingBox) {
    throw `Bounding sphere is ${typeof geometry.boundingBox}`
  }

  return geometry.boundingBox
}

export const utils = {getBoundingBox, getBoundingSphere}
