import { SyncReadWriteProvider } from './types'

export function makeSyncConverter<S, T>(
  base: SyncReadWriteProvider<S>,
  converters: SyncReadWriteConverters<S, T>
): SyncReadWriteProvider<T> {
  return {
    read: () => converters.from(base.read()),
    write: (val) => base.write(converters.to(val)),
  }
}

interface SyncReadWriteConverters<S, T> {
  to: (v: T) => S
  from: (v: S) => T
}
