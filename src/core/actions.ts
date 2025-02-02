import {ActionCallback} from '../interfaces'

export abstract class Actions<T extends string> {
  protected abstract state: Record<T, boolean>

  get action() {
    return Object.freeze({...this.state})
  }

  #listeners = new Map<T, Set<ActionCallback>>()

  #onKeyDown
  #onKeyUp

  constructor() {
    this.#onKeyDown = this.#onKey(true)
    this.#onKeyUp = this.#onKey(false)

    addEventListener('keydown', this.#onKeyDown)
    addEventListener('keyup', this.#onKeyUp)
  }

  on(action: T, callback: ActionCallback) {
    const listeners = this.#getListeners(action)
    this.#listeners.set(action, listeners.add(callback))

    return () => {
      const listeners = this.#getListeners(action)
      listeners.delete(callback)
      this.#listeners.set(action, listeners)
    }
  }

  dispose() {
    removeEventListener('keydown', this.#onKeyDown)
    removeEventListener('keyup', this.#onKeyUp)
  }

  #onKey = (state: boolean) => {
    return (event: KeyboardEvent) => {
      event.preventDefault()
      
      const action = this.#normalizeAction(event.code)
      if (this.#isAction(action)) {
        const meta = this.#getMeta(event)
        const listeners = this.#getListeners(action)
        for (const cb of listeners) cb(state, meta)
        this.state[action] = state
      }
    }
  }

  #normalizeAction = (code: string) => {
    return code.replace(/Arrow|Key|Digit/gi, '').toLowerCase()
  }

  #getMeta(event: KeyboardEvent) {
    return {
      shift: event.shiftKey,
      repeat: event.repeat,
      ctrl: event.ctrlKey,
      meta: event.metaKey,
      alt: event.altKey,
    }
  }

  #getListeners(action: T): Set<ActionCallback> {
    return this.#listeners.get(action) ?? new Set()
  }

  #isAction = (code: string): code is T => {
    return Object.keys(this.state).includes(code as T)
  }
}
