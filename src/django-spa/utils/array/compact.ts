export function compact<T>(arr: readonly T[]): Exclude<T, undefined | null | false>[] {
  return arr.filter((v) => !!v) as Exclude<T, undefined | null | false>[]
}
