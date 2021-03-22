export interface ReadWriteProvider<T> {
  read: () => Promise<T>
  write: (value: T) => Promise<void>
}
