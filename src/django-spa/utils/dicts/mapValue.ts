/**
 * Создаёт новый словарь из исходного, пропустив все значения через callback
 *
 * @example
 * ```
 * const result = omit({a: 1, b: 2, c: 3}, (v) => v.toString())
 * // result = { a: '1', b: '2', c: '3' }
 * ```
 *
 * @param dict - исходный словарь
 * @param callback - функция для обработки значений
 */
export function mapValue<T extends {}, K extends keyof T, R>(dict: T, callback: (v: T[K], k: K) => R): Record<K, R> {
  const pairs = Object.entries(dict) as [K, T[K]][]
  const mapped = pairs.map(([key, value]) => [key, callback(value, key)])

  return Object.fromEntries(mapped)
}
