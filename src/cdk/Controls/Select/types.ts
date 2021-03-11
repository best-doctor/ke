export type Option = Record<string, unknown>

interface BaseProps<T extends Option> {
  isClearable: boolean
  getOptionLabel: (val: T) => string
  getOptionValue: (val: T) => string
}

interface BaseSingleProps<T extends Option> extends BaseProps<T> {
  isMulti: false
  value?: T
  onChange: (val: T | null | undefined) => void
}

interface BaseMultiProps<T extends Option> extends BaseProps<T> {
  isMulti: true
  value?: T[]
  onChange: (val: T[] | null | undefined) => void
}

export type BaseSelectProps<T extends Option> = BaseSingleProps<T> | BaseMultiProps<T>
