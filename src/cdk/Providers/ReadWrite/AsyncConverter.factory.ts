import { AsyncReadWriteProvider } from './types'

export function makeAsyncConverter<S, T>(
  base: AsyncReadWriteProvider<S>,
  converters: AsyncReadWriteConverters<S, T>
): AsyncReadWriteProvider<T> {
  return {
    read: async () => converters.from(await base.read()),
    write: async (val) => base.write(await converters.to(val)),
  }
}

interface AsyncReadWriteConverters<S, T> {
  to: (v: T) => Promise<S>
  from: (v: S) => Promise<T>
}
