/**
 * Создаёт новый словарь из исходного, скопировав все ключи кроме переданных вторым параметром
 *
 * @example
 * ```
 * const result = omit({a: 1, b: 2, c: 3}, ['a', 'b'])
 * // result = { c: 3 }
 * ```
 *
 * @param dict - исходный словарь
 * @param keys - ключи для исключения из нового словарь
 */
export function omit<T, K extends keyof T>(dict: T, keys: K[]): Omit<T, K> {
  return Object.fromEntries(Object.entries(dict).filter(([key]) => !keys.includes(key as K))) as Omit<T, K>
}
