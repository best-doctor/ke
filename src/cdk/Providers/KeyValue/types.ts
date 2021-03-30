export interface AsyncKeyValueProvider<K, V> {
  get: (key: K) => Promise<V | null>
  set: (key: K, value: V) => Promise<void>
  remove: (key: K) => Promise<void>
}

export interface SyncKeyValueProvider<K, V> {
  get: (key: K) => V | null
  set: (key: K, value: V) => void
  remove: (key: K) => void
}
