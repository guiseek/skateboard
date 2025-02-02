import {entries, use} from './utils'
import {
  STAGE,
  providers,
  OBSTACLES,
  SKATEBOARD,
  SKATEBOARD_TRICKS,
} from './setup'
import './style.scss'

providers().then(() => {
  const obstacle = use(OBSTACLES)
  const skateboard = use(SKATEBOARD)
  const tricks = use(SKATEBOARD_TRICKS)

  const stage = use(STAGE)

  stage.add(obstacle.ground)

  stage.add(obstacle.grass)

  stage.add(obstacle.grass)

  stage.add(obstacle.banks)

  stage.add(obstacle.banksGap)

  stage.add(obstacle.funbox)

  stage.add(obstacle.funboxBig)

  obstacle.quarters.forEach(stage.add)

  stage.add(skateboard)
  skateboard.wheels.forEach(stage.add)

  entries(tricks).forEach(([action, trick]) => {
    skateboard.addTrick(action, trick)
  })

  stage.animate()
})
