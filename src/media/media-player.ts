import {MediaItem, MediaPlaylist} from './media-playlist'
import {css, CustomElement, define} from '../utils'
import {MediaButton} from './media-button'

@define('media-player', 'open')
export class MediaPlayer extends CustomElement {
  audio = new Audio()

  playlist: MediaPlaylist

  prev: MediaButton

  next: MediaButton

  shuffle: MediaButton

  constructor(public items: MediaItem[]) {
    super()

    this.playlist = new MediaPlaylist(items)

    this.prev = new MediaButton('prev')
    this.next = new MediaButton('next')
    this.shuffle = new MediaButton('shuffle')
    this.shuffle.classList.add('off')

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
      :host(:focus-within),
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
      :host button.off {
        opacity: 0.6;
      }

      :host [data-tooltip] {
        position: relative;
      }
      :host [data-tooltip]:hover:before {
        content: attr(data-tooltip);
        font-size: 14px;
        text-align: center;
        position: absolute;
        display: block;
        left: 50%;
        min-width: 100px;
        max-width: 200px;
        bottom: calc(100% + 10px);
        transform: translate(-50%);
        animation: fade-in 0.3s ease;
        background: #272727;
        border-radius: 4px;
        padding: 10px;
        color: #fff;
        z-index: 1;
      }
      :host [data-tooltip]:hover:after {
        content: '';
        position: absolute;
        display: block;
        left: 50%;
        width: 0;
        height: 0;
        bottom: calc(100% + 6px);
        margin-left: -3px;
        border: 1px solid black;
        border-color: rgb(39, 39, 39) transparent transparent transparent;
        border-width: 4px 6px 0;
        animation: fade-in 0.3s ease;
        z-index: 1;
      }
      :host [data-tooltip][tooltip-position='bottom']:hover:before {
        bottom: auto;
        top: calc(100% + 10px);
      }
      :host [data-tooltip][tooltip-position='bottom']:hover:after {
        bottom: auto;
        top: calc(100% + 6px);
        border-color: transparent transparent rgb(39, 39, 39);
        border-width: 0 6px 4px;
      }

      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `

    this.shadow.append(
      style,
      this.audio,
      this.prev,
      this.next,
      this.shuffle,
      this.playlist
    )

    this.prev.onclick = () => {
      this.playlist.prev()
    }

    this.next.onclick = () => {
      this.playlist.next()
    }

    this.shuffle.onclick = () => {
      this.playlist.shuffle()
      this.shuffle.classList.toggle('off')
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

export const loadMediaPlayer = (items: MediaItem[], root: HTMLElement) => {
  const media = new MediaPlayer(items)

  if (!document.body.contains(media)) {
    document.body.insertBefore(media, root)
  }

  return media
}
