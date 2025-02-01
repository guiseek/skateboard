import {loadGround, loadObstacle, Obstacle} from './obstacles'
import {loadSkateboard} from './skateboard'
import {AudioListener} from 'three'

export const load = async () => {
  const ground = await loadGround('ground.glb')

  const quarters: Obstacle[] = []

  for (let x = -111; x <= 111; x += 48.4) {
    const quarter = await loadObstacle('quarter.glb')
    quarter.setPosition(x, 0, 350)
    quarters.push(quarter)
  }

  const banks = await loadObstacle('banks.glb')
  banks.setPosition(-93.5, 0, -196.5)

  const banksGap = await loadObstacle('banks-gap.glb')
  banksGap.setPosition(87.8, 0, -261.2)

  const funbox = await loadObstacle('funbox.glb')
  funbox.setPosition(-110, 0, 120)

  const funboxBig = await loadObstacle('funbox-big.glb')
  funboxBig.setPosition(60, 0, 80)

  const listener = new AudioListener()

  const skateboard = await loadSkateboard(listener)

  return {ground, quarters, banks, banksGap, funbox, funboxBig, skateboard}
}
