import {SkateboardSwipe, SkateboardTricks} from './types'
import {loadMediaPlayer, MediaPlayer} from './media'
import {createToken, load, set} from './utils'
import {obstaclesFactory} from './providers'
import {Grass, Ground} from './scenario'
import {Obstacle} from './obstacles'
import {AudioListener} from 'three'
import {Material} from 'cannon-es'
import {Player} from './player'
import {env} from './envs/env'
import {Stage} from './stage'
import {
  Skateboard,
  loadSkateboard,
  loadSkateboardSwipe,
  loadSkateboardTricks,
} from './skateboard'
import {Swiper} from './core'

export const MATERIALS = createToken('materials.token')

export const AUDIO_LISTENER = createToken('audio-listener.token')

export const MEDIA_ITEMS = createToken('media-list.token')

export const MEDIA_PLAYER = createToken<MediaPlayer>('media-player.token')

export const SKATEBOARD_TRICKS = createToken<SkateboardTricks>(
  'skateboard-tricks.token'
)

export const SKATEBOARD_SWIPES = createToken<SkateboardSwipe>(
  'skateboard-swipes.token'
)

export const ENV = createToken<Env>('env.token')

export const ROOT_ELEMENT = createToken('root-element.token')

export const SKATEBOARD = createToken<Skateboard>('skateboard.token')

export const OBSTACLES = createToken<{
  ground: Ground
  grass: Grass
  quarters: Obstacle[]
  banks: Obstacle
  banksGap: Obstacle
  funbox: Obstacle
  funboxBig: Obstacle
}>('obstacles.token')

export const PLAYER = createToken<Player>('player.token')

export const SWIPER = createToken<Swiper>('swiper.token')

export const STAGE = createToken<Stage>('stage.token')

export const providers = async () => {
  await load(
    set(
      {
        ref: ENV,
        use: env,
      },
      {
        ref: ROOT_ELEMENT,
        use: root,
      },
      {
        ref: MATERIALS,
        use: {
          obstacle: {
            angleIron: new Material({friction: 0.02, restitution: 0.01}),
            rail: new Material({friction: 0.01, restitution: 0.02}),
          },
          skateboard: {
            slide: new Material({friction: 0.01, restitution: 0.0}),
            grind: new Material({friction: 0.02, restitution: 0.0}),
          },
        },
      },
      {
        ref: MEDIA_ITEMS,
        use: [
          ['musics/Jurassic 5 - Thin Line.ogg', 'Jurassic 5 - Thin Line'],
          ["musics/The Pharcyde - Runnin'.ogg", "The Pharcyde - Runnin'"],
          [
            'musics/A Tribe Called Quest - Can I Kick It.ogg',
            'A Tribe Called Quest - Can I Kick It',
          ],
          [
            'musics/Bad Religion - 21st Century.ogg',
            'Bad Religion - 21st Century',
          ],
          ['musics/Wu-Tang Clan - C.R.E.A.M..ogg', 'Wu-Tang Clan - C.R.E.A.M.'],
          [
            'musics/Jurassic 5 - Concrete Schoolyard.ogg',
            'Jurassic 5 - Concrete Schoolyard',
          ],
          [
            'musics/The Offspring - All I Want.ogg',
            'The Offspring - All I Want',
          ],
        ],
      },
      {
        ref: SKATEBOARD_TRICKS,
        use: loadSkateboardTricks,
      },
      {
        ref: SKATEBOARD_SWIPES,
        use: loadSkateboardSwipe,
      },
      {
        ref: MEDIA_PLAYER,
        use: loadMediaPlayer,
        dep: [MEDIA_ITEMS, ROOT_ELEMENT],
      },
      {
        ref: AUDIO_LISTENER,
        use: AudioListener,
      },
      {
        ref: SWIPER,
        use: Swiper,
      },
      {
        ref: OBSTACLES,
        use: obstaclesFactory,
        dep: [MATERIALS],
      },
      {
        ref: SKATEBOARD,
        use: loadSkateboard,
        dep: [AUDIO_LISTENER, MATERIALS],
      },
      {
        ref: PLAYER,
        use: Player,
        dep: [SKATEBOARD, MEDIA_PLAYER],
      },
      {
        ref: STAGE,
        use: Stage,
        dep: [ROOT_ELEMENT, ENV, SKATEBOARD, PLAYER],
      }
    )
  )
}
