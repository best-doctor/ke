export function byKey<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map((v) => v[key])
}
