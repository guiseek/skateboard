import {Provider, Ref} from './types'
import {is} from '../is'
import {Token} from './token'

const container = new Map()
const relations = new Map()

function use<T extends Ref<unknown>>(ref: T): T extends Token<infer U> ? U : T {
  const value = container.get(ref)

  if (!value) throw `${ref.name} not found`

  return value
}

const provide = async <T>({ref, use}: Provider<T>) => {
  const type = (use ?? ref) as T

  if (is.fn<T>(type)) {
    const deps = relations.get(ref) ?? []

    if (is.type<T>(type)) {
      return new type(...deps)
    }

    if (is.asyncFn<T>(type)) {
      return await type(...deps)
    }

    return type(...deps)
  }

  return type
}

const add = async <T>(provider: Provider<T>) => {
  if (provider.dep && provider.dep.length > 0) {
    relations.set(provider.ref, provider.dep.map(use))
  }
  container.set(provider.ref, await provide(provider))
  return use(provider.ref)
}

async function* set<T>(
  ...providers: Provider<T | any>[]
): AsyncGenerator<T, void, unknown> {
  for (const p of providers) {
    yield await add(p)
  }
}

// const container = new Map()
// const relations = new Map()

// function use<T>(type: Key<T>): T {
//   const concrete = container.get(type)
//   if (!concrete) {
//     throw `Unknown provider: ${type.name}`
//   }
//   return concrete
// }

// const provide = <T>({for: key, use}: For<T>) => {
//   const concrete = use ?? key

//   if (is.fn(concrete)) {
//     const deps = relations.get(key)

//     if (is.typeOf(concrete)) {
//       return new concrete(...deps)
//     }

//     return concrete(...deps)
//   }

//   return concrete
// }

// function add<T>(provider: Type<T>): void
// function add<T>(provider: For<T>): void
// function add<T>(provider: Type<T> | For<T>) {
//   provider = 'for' in provider ? provider : {for: provider}
//   relations.set(provider.for, (provider.add ?? []).map(use))
//   const provided = provide(provider)
//   container.set(provider.for, provided)
// }

// function set(...providers: For[]): void
// function set(...providers: Type<unknown>[]): void
// function set(...providers: []) {
//   providers.map(add)
// }

export {add, set, use}
