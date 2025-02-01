import {
  Vector3,
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  Vector3Like,
  QuaternionLike,
  Quaternion,
} from 'three'

const toVector3 = (v: Vector3Like) => {
  return new Vector3(v.x, v.y, v.z)
}

const toQuaternion = (q: QuaternionLike) => {
  return new Quaternion(q.x, q.y, q.z, q.w)
}

const toBoxGeometry = (geometry: BufferGeometry) => {
  geometry.computeBoundingBox()

  if (!geometry.boundingBox) {
    throw `A geometria não possui vértices válidos para calcular o bounding box.`
  }

  const size = new Vector3()
  geometry.boundingBox.getSize(size)

  const center = new Vector3()
  geometry.boundingBox.getCenter(center)

  const boxGeometry = new BoxGeometry(size.x, size.y, size.z)

  boxGeometry.translate(center.x, center.y, center.z)

  return boxGeometry
}

const toCylinderGeometry = (geometry: BufferGeometry) => {
  geometry.computeBoundingBox()

  if (!geometry.boundingBox) {
    throw `A geometria não possui vértices válidos para calcular o bounding box.`
  }

  const size = new Vector3()
  geometry.boundingBox.getSize(size)

  const radius = Math.max(size.x, size.z) / 2

  const height = size.y

  const cylinderGeometry = new CylinderGeometry(radius, radius, height, 32)

  const center = new Vector3()
  geometry.boundingBox.getCenter(center)

  cylinderGeometry.translate(center.x, center.y, center.z)

  return cylinderGeometry
}

export const mapper = {
  toVector3,
  toQuaternion,
  toBoxGeometry,
  toCylinderGeometry,
}
