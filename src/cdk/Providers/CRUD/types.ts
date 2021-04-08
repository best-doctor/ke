export interface CRUDProvider<T> {
  create: (val: T) => Promise<void>
  read: (...args: unknown[]) => Promise<ReadQuery<T>>
  update: (val: T) => Promise<void>
  delete: (val: T) => Promise<void>
}

export interface ReadQuery<T> {
  entities: readonly T[]
  totalCount?: number
}
