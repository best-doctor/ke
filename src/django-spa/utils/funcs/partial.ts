/**
 * Создаёт функцию, вызывающую func c аргументами headArgs, перед переданным.
 *
 * @see {@link https://ru.wikipedia.org/wiki/Частичное_применение}
 *
 * @param func - исходная функция
 * @param headArgs - аргументы, с которыми будет вызываться func в в дополнение к переданным
 */
export function partial<T extends Arr, U extends Arr, R>(func: (...args: [...T, ...U]) => R, ...headArgs: T) {
  return (...tailArgs: U): R => func(...headArgs, ...tailArgs)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Arr = readonly any[]
