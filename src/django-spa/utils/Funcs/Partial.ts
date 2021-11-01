export function partial<T extends Arr, U extends Arr, R>(f: (...args: [...T, ...U]) => R, ...headArgs: T) {
  return (...tailArgs: U): R => f(...headArgs, ...tailArgs)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Arr = readonly any[]
