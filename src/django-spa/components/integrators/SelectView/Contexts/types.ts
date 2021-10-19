export interface SelectResult<T = unknown> {
  items: T[]
  total?: number
}

export interface SelectStatus {
  isLoading: boolean
}

export type FiltersValue = Record<string, unknown>

export type Order = Record<string, 'asc' | 'desc' | null>

export interface Pagination {
  page: number | null
  perPage: number
}

export interface SelectParams {
  filters?: FiltersValue
  orderBy?: Order
  pagination?: Pagination
}

export type Defined<T> = Exclude<T, undefined>

export type Updatable<T> = [data: T, updater: (v: T) => void]
