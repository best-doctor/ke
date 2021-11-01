import { SyncReadWriteProvider, AsyncReadWriteProvider } from './types'

export function makeAsync<T>(base: SyncReadWriteProvider<T>): AsyncReadWriteProvider<T> {
  return {
    read: () => Promise.resolve(base.read()),
    write: (v) => Promise.resolve(base.write(v)),
  }
}
