/**
 * Создаёт новый словарь из исходного, пропустив все ключи через callback
 *
 * @example
 * ```
 * const result = mapKey({a: 1, b: 2, c: 3}, (k) => v.toUpperCase())
 * // result = { A: '1', B: '2', C: '3' }
 * ```
 *
 * @param dict - исходный словарь
 * @param callback - функция для обработки ключей
 */
export function mapKey<T, R extends string | number | symbol>(
  dict: T,
  callback: (key: keyof T, value: T[keyof T]) => R
): Record<R, T[keyof T]> {
  const pairs = Object.entries(dict) as [keyof T, T[keyof T]][]

  return Object.fromEntries(pairs.map(([key, value]) => [callback(key, value), value])) as Record<R, T[keyof T]>
}
