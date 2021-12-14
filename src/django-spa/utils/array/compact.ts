/**
 * Создаёт новый массив, вычищая из исходного все falsy значения
 *
 * @example
 * ```
 * const result = compact([1, 0, '', 'a', false, null, undefined, true, []])
 *
 * // result === [1, 'a', true, []]
 * ```
 *
 * @param arr - исходный массив
 */
export function compact<T>(arr: readonly T[]): Exclude<T, undefined | null | false>[] {
  return arr.filter((v) => !!v) as Exclude<T, undefined | null | false>[]
}
