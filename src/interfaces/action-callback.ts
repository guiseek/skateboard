export interface ActionMeta {
  repeat: boolean
  shift: boolean
  ctrl: boolean
  meta: boolean
  alt: boolean
}

export interface ActionCallback {
  (state: boolean, meta: ActionMeta): void
}
