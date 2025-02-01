import {define} from '../utils'

export type MediaButtonKind = 'prev' | 'next'
export type MediaButtonType = 'submit' | 'reset' | 'button'

@define('media-button', 'button')
export class MediaButton extends HTMLButtonElement {
  #prefix = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960" fill="none">`
  #suffix = `</svg>`

  #path = {
    prev: `<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" fill="currentColor" />`,
    next: `<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" fill="currentColor" />`,
  }

  constructor(kind: MediaButtonKind, public type: MediaButtonType = 'button') {
    super()

    this.innerHTML = this.#prefix + this.#path[kind] + this.#suffix
  }
}
