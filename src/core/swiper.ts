import {SwipeCallback, SwipeEvent} from '../interfaces'
import {SwipeDirection} from '../types'
import {Observer} from '../utils'
import {Vector2} from 'three'

export class Swiper {
  #start = new Vector2(0, 0)
  #time = 0

  #thresholdDistance = 30
  #screenWidth: number
  #maxTime = 500

  #observer: Observer<SwipeEvent>

  constructor() {
    this.#observer = new Observer()

    this.#screenWidth = innerWidth

    this.#attach()
  }

  subscribe(callback: SwipeCallback) {
    return this.#observer.subscribe(callback)
  }

  #attach() {
    addEventListener('touchstart', this.#onTouchStart, {passive: true})
    addEventListener('touchend', this.#onTouchEnd, {passive: true})
  }

  #onTouchStart = (event: TouchEvent) => {
    const [touch] = event.touches
    this.#start.set(touch.clientX, touch.clientY)
    this.#time = performance.now()
  }

  #onTouchEnd = (event: TouchEvent) => {
    console.log(event)

    const [touch] = event.changedTouches

    const endX = touch.clientX
    const endY = touch.clientY
    const delta = performance.now() - this.#time

    const dx = endX - this.#start.x
    const dy = endY - this.#start.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < this.#thresholdDistance || delta > this.#maxTime) return

    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    const velocity = distance / delta
    const side = this.#start.x < this.#screenWidth / 2 ? 'left' : 'right'
    const direction = this.#getSwipeDirection(angle)

    this.#observer.emit({side, direction, angle, distance, velocity})
  }

  #getSwipeDirection(angle: number): SwipeDirection {
    if (angle >= -22.5 && angle <= 22.5) return 'right'
    if (angle >= 22.5 && angle <= 67.5) return 'diagonal-down-right'
    if (angle >= 67.5 && angle <= 112.5) return 'down'
    if (angle >= 112.5 && angle <= 157.5) return 'diagonal-down-left'
    if (angle >= 157.5 || angle <= -157.5) return 'left'
    if (angle >= -157.5 && angle <= -112.5) return 'diagonal-up-left'
    if (angle >= -112.5 && angle <= -67.5) return 'up'
    if (angle >= -67.5 && angle <= -22.5) return 'diagonal-up-right'
    return 'right'
  }
}
