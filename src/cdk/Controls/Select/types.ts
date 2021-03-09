interface BaseProps<T> {
  isClearable: boolean
  getOptionLabel: (val: T) => string
  getOptionValue: (val: T) => string
}

interface BaseSingleProps<T> extends BaseProps<T> {
  isMulti: false
  value?: T
  onChange: (val: T | null | undefined) => void
}

interface BaseMultiProps<T> extends BaseProps<T> {
  isMulti: true
  value?: T[]
  onChange: (val: T[] | null | undefined) => void
}

export type BaseSelectProps<T> = BaseSingleProps<T> | BaseMultiProps<T>
