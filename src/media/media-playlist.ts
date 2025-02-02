import {define} from '../utils'

export type MediaItem = [path: string, text: string]

@define('media-playlist', 'select')
export class MediaPlaylist extends HTMLSelectElement {
  #shuffle = false

  shuffle() {
    this.#shuffle = !this.#shuffle
  }

  constructor(public items: MediaItem[], public name = 'playlist') {
    super()

    items.forEach(([path, text]) => {
      this.add(new Option(text, path))
    })
  }

  get current() {
    return this.options[this.selectedIndex]
  }

  next() {
    if (this.#shuffle) {
      this.selectedIndex = Math.floor(Math.random() * this.options.length)
    } else {
      this.selectedIndex = (this.selectedIndex + 1) % this.options.length
    }

    this.dispatchEvent(new InputEvent('change'))
  }

  prev() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.options.length) % this.options.length

    this.dispatchEvent(new InputEvent('change'))
  }
}
