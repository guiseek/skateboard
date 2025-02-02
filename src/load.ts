import {loadAfternoon, loadGrass, loadGround} from './scenario'
import {loadObstacle, Obstacle} from './obstacles'
import {loadSkateboard} from './skateboard'
import {Materials} from './interfaces'
import {AudioListener} from 'three'

export const load = async (materials: Materials) => {
  const ground = await loadGround('ground.glb')

  const {y} = ground.object.position

  const grass = await loadGrass('grass.webp', y)

  const afternoon = await loadAfternoon('sky.webp')

  const quarters: Obstacle[] = []

  for (let x = -111; x <= 111; x += 48.4) {
    const quarter = await loadObstacle('quarter.glb', materials.obstacle)
    quarter.setPosition(x, 0, 350)
    quarters.push(quarter)
  }

  const banks = await loadObstacle('banks.glb', materials.obstacle)
  banks.setPosition(-93.5, 0, -196.5)

  const banksGap = await loadObstacle('banks-gap.glb', materials.obstacle)
  banksGap.setPosition(87.8, 0, -261.2)

  const funbox = await loadObstacle('funbox.glb', materials.obstacle)
  funbox.setPosition(-110, 0, 120)

  const funboxBig = await loadObstacle('funbox-big.glb', materials.obstacle)
  funboxBig.setPosition(60, 0, 80)

  const listener = new AudioListener()

  const skateboard = await loadSkateboard(listener, materials.skateboard)

  return {
    ground,
    grass,
    afternoon,
    quarters,
    banks,
    banksGap,
    funbox,
    funboxBig,
    skateboard,
  }
}
