export class Token<T = any> {
  constructor(public name: string, public value?: T) {}
}

export function createToken<T>(name: string) {
  return new Token<T>(name)
}
// import {Type} from '../../interfaces'

// export class Token<T = unknown> {
//   constructor(public name: string | T) {}
// }

// export type Key<T> = Type<T> | Token<T>
// export type Use<T> = T | Type<T>

// export type For<T = unknown> = {
//   for: Key<T>
//   use?: Use<T>
//   add?: Key<T>[]
// }
