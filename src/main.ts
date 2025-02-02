import {enterFullscreen, entries, use} from './utils'
import {
  STAGE,
  SWIPER,
  providers,
  OBSTACLES,
  SKATEBOARD,
  SKATEBOARD_TRICKS,
  SKATEBOARD_SWIPES,
} from './setup'
import './style.scss'

providers().then(() => {
  const obstacle = use(OBSTACLES)
  const skateboard = use(SKATEBOARD)
  const swiper = use(SWIPER)
  const tricks = use(SKATEBOARD_TRICKS)
  const swipes = use(SKATEBOARD_SWIPES)

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

  const fullScreenFn = () => {
    enterFullscreen(document.documentElement)
    removeEventListener('click', fullScreenFn)
  }

  addEventListener('click', fullScreenFn)

  swiper.subscribe((event) => {
    const trick = swipes[event.side][event.direction]

    if (trick)
      trick.execute(skateboard, {
        shift: event.velocity > 0.5,
        ctrl: event.distance > 50,
        meta: false,
        alt: false,
        repeat: false,
      })
  })

  stage.animate()
})
