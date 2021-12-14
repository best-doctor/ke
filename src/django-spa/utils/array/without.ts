/**
 * Создаёт новый массив, удалив из исходного все остальные переданные параметры
 *
 * @example
 * ```
 * const result = without([1, 2, 0, 2, 3, 4, 0], 0, 2)
 *
 * // result === [1, 3, 4]
 * ```
 *
 * @param arr - исходный массив
 * @param exclude - значения для исключения
 */
export function without<T>(arr: T[], ...exclude: T[]): T[] {
  return arr.filter((v) => !exclude.includes(v))
}
