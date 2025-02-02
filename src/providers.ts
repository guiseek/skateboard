import {loadGrass, loadGround} from './scenario'
import {loadObstacle, Obstacle} from './obstacles'
import {Materials} from './interfaces'
import {Skateboard} from './skateboard'

export const obstaclesFactory = async (
  skateboard: Skateboard,
  materials: Materials
) => {
  const ground = await loadGround('ground.glb')

  const {y} = ground.object.position

  const grass = await loadGrass('grass.webp', y)

  const quarters: Obstacle[] = []

  for (let x = -111; x <= 111; x += 48.4) {
    const quarter = await loadObstacle(
      'quarter.glb',
      skateboard,
      materials.obstacle
    )
    quarter.setPosition(x, 0, 350)
    quarters.push(quarter)
  }

  const banks = await loadObstacle('banks.glb', skateboard, materials.obstacle)
  banks.setPosition(-93.5, 0, -196.5)

  const halfpipe = await loadObstacle(
    'halfpipe.glb',
    skateboard,
    materials.obstacle
  )
  halfpipe.setPosition(-220, 0, -246.5)

  const banksGap = await loadObstacle(
    'banks-gap.glb',
    skateboard,
    materials.obstacle
  )
  banksGap.setPosition(87.8, 0, -261.2)

  const funbox = await loadObstacle(
    'funbox.glb',
    skateboard,
    materials.obstacle
  )
  funbox.setPosition(-110, 0, 120)

  const funboxBig = await loadObstacle(
    'funbox-big.glb',
    skateboard,
    materials.obstacle
  )
  funboxBig.setPosition(60, 0, 80)

  return {
    ground,
    grass,
    quarters,
    banks,
    halfpipe,
    banksGap,
    funbox,
    funboxBig,
  }
}
