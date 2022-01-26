/**
 * Создаёт новый словарь из исходного, скопировав указанное подмножество ключей
 *
 * @example
 * ```
 * const result = pick({a: 1, b: 2, c: 3}, ['a', 'b'])
 * // result = {a: 1, b: 2}
 * ```
 *
 * @param dict - исходный словарь
 * @param keys - ключи для переноса в новый словарь
 */
export function pick<T, K extends keyof T>(dict: T, keys: readonly K[]): Pick<T, K> {
  return Object.fromEntries(keys.map((key) => [key, dict[key]])) as Pick<T, K>
}
