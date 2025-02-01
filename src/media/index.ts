import {MediaPlayer} from './media-player'

const media = new MediaPlayer([
  ['musics/Jurassic 5 - Thin Line.ogg', 'Jurassic 5 - Thin Line'],
  [
    'musics/A Tribe Called Quest - Can I Kick It.ogg',
    'A Tribe Called Quest - Can I Kick It',
  ],
  ['musics/Bad Religion - 21st Century.ogg', 'Bad Religion - 21st Century'],
  ['musics/Wu-Tang Clan - C.R.E.A.M..ogg', 'Wu-Tang Clan - C.R.E.A.M.'],
  [
    'musics/Jurassic 5 - Concrete Schoolyard.ogg',
    'Jurassic 5 - Concrete Schoolyard',
  ],
  ['musics/The Offspring - All I Want.ogg', 'The Offspring - All I Want'],
])

document.body.insertBefore(media, app)

export {MediaPlayer, media}
