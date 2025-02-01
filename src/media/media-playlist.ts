import {define} from '../utils'

export type MediaItem = [path: string, text: string]

@define('media-playlist', 'select')
export class MediaPlaylist extends HTMLSelectElement {
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
    if (this.selectedIndex < this.options.length - 1) {
      this.selectedIndex++
    } else {
      this.selectedIndex = 0
    }

    this.dispatchEvent(new InputEvent('change'))
  }

  prev() {
    if (this.selectedIndex >= 1) {
      this.selectedIndex--
    } else {
      this.selectedIndex = this.options.length - 1
    }

    this.dispatchEvent(new InputEvent('change'))
  }
}
