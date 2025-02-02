export interface Type<T> extends NewableFunction {
  new (...params: unknown[]): T
}
