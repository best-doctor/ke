/**
 * Проходит по массиву словарей и возвращает массив значений по переданному ключу
 *
 * @example
 * ```
 * const result = byKey([{
 *  a: 1,
 *  b: false,
 * }, {
 *   a: 2,
 *   b: true,
 * }], 'a')
 *
 * // result === [1, 2]
 * ```
 *
 * @param arr - исходный массив однотипных словарей
 * @param key - ключ, по которому из словарей будут извлечены данные
 */
export function byKey<T, K extends keyof T>(arr: readonly T[], key: K): T[K][] {
  return arr.map((v) => v[key])
}
