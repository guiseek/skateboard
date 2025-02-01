import {MediaItem, MediaPlaylist} from './media-playlist'
import {css, CustomElement, define} from '../utils'
import {MediaButton} from './media-button'

@define('media-player', 'open')
export class MediaPlayer extends CustomElement {
  audio = new Audio()

  playlist: MediaPlaylist

  prev: MediaButton

  next: MediaButton

  constructor(public items: MediaItem[]) {
    super()

    this.playlist = new MediaPlaylist(items)

    this.prev = new MediaButton('prev')
    this.next = new MediaButton('next')

    this.audio.controls = true
  }

  connectedCallback(): void {
    const style = css`
      :host {
        gap: 1em;
        display: flex;
        align-items: center;
        background-color: #f1f3f4;
        position: fixed;
        padding: 0 1em;
        opacity: 0.2;
        transition: opacity 0.25s ease-in-out;
        color: #111;
        width: 100vw;
        z-index: 99999;
        bottom: 0;
      }

      :host(:active),
      :host(:focus),
      :host(:hover) {
        opacity: 1;
      }

      :host button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
      }
    `

    this.shadow.append(style, this.prev, this.audio, this.next, this.playlist)

    this.prev.onclick = () => {
      this.playlist.prev()
    }

    this.next.onclick = () => {
      this.playlist.next()
    }

    this.audio.onended = () => {
      this.playlist.next()
    }

    this.playlist.onchange = () => {
      const item = this.playlist.current

      if (item) {
        this.audio.src = item.value
        this.audio.play()
      }
    }

    this.audio.src = this.playlist.current.value
  }
}
