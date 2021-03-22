export interface KeyValueProvider<K, V> {
  get: (key: K) => Promise<V | null>
  set: (key: K, value: V) => Promise<void>
  remove: (key: K) => Promise<void>
}
