export const load = async <T>(generator: AsyncGenerator<T>) => {
  // prettier-ignore
  for await (const _ of generator) {}
}
