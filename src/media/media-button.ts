import {define} from '../utils'

export type MediaButtonKind = 'prev' | 'next' | 'shuffle'
export type MediaButtonType = 'submit' | 'reset' | 'button'

@define('media-button', 'button')
export class MediaButton extends HTMLButtonElement {
  #prefix = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">`
  #suffix = `</svg>`

  #path = {
    prev: `<path d="M5.5 18V6H7.5V18H5.5ZM18.5 18L9.5 12L18.5 6V18Z" fill="currentColor" />`,
    next: `<path d="M16.5 18V6H18.5V18H16.5ZM5.5 18V6L14.5 12L5.5 18Z" fill="currentColor" />`,
    shuffle: `<path d="M14 20V18H16.6L13.425 14.825L14.85 13.4L18 16.55V14H20V20H14ZM5.4 20L4 18.6L16.6 6H14V4H20V10H18V7.4L5.4 20ZM9.175 10.575L4 5.4L5.4 4L10.575 9.175L9.175 10.575Z" fill="currentColor" />`,
  }

  #title = {
    prev: `Anterior`,
    next: `Próxima`,
    shuffle: `Aleatória`,
  }

  constructor(kind: MediaButtonKind, public type: MediaButtonType = 'button') {
    super()

    this.innerHTML = this.#prefix + this.#path[kind] + this.#suffix

    this.dataset.tooltip = this.#title[kind]
  }
}
