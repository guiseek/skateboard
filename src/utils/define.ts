export type Tag = `${string}-${string}`

interface CustomElement extends HTMLElement {
  shadow: ShadowRoot
  connectedCallback(): void
  disconnectedCallback(): void
}

class CustomElement extends HTMLElement {}

interface CustomConstructor<T extends HTMLElement>
  extends CustomElementConstructor {
  prototype: T
}

function define<K extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  is: K
): (target: CustomConstructor<HTMLElementTagNameMap[K]>) => void

function define(
  tag: Tag,
  mode?: ShadowRootMode
): (target: CustomElementConstructor) => void

function define(tag: Tag, mode?: ShadowRootMode) {
  return (target: CustomElementConstructor) => {
    const modes = ['open', 'closed']

    if (mode && modes.includes(mode)) {
      const connectedCallback = target.prototype.connectedCallback

      target.prototype.connectedCallback = function (this) {
        this.shadow = this.attachShadow({mode})
        if (connectedCallback) {
          connectedCallback.call(this)
        }
      }

      customElements.define(tag, target)
    } else if (mode && !modes.includes(mode)) {
      customElements.define(tag, target, {extends: mode})
    } else {
      customElements.define(tag, target)
    }
  }
}

export {define, CustomElement}
