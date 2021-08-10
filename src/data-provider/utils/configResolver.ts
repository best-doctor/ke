export function configResolver<T extends { key: string }>(config: T | string): T {
  if (typeof config === 'string') {
    return { key: config } as T
  }
  return config
}
