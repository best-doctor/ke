export interface CRUDProvider<T> {
  create: (val: T) => Promise<void>
  read: (...args: unknown[]) => Promise<readonly T[]>
  update: (val: T) => Promise<void>
  delete: (val: T) => Promise<void>
}
