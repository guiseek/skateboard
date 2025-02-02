import {Abstract, Fn} from '../../types'
import {Type} from '../../interfaces'
import {Token} from './token'

export type Ref<T> = Abstract<T> | Type<T> | Token

export type Use<T> = T | Type<T> | Fn<T> | Fn<Promise<T>>

export interface Provider<T> {
  ref: Ref<T>
  use?: Use<T>
  dep?: Ref<any>[]
}
