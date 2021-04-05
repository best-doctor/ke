export interface AsyncReadWriteProvider<T> {
  read: () => Promise<T>
  write: (value: T) => Promise<void>
}

export interface SyncReadWriteProvider<T> {
  read: () => T
  write: (value: T) => void
}
