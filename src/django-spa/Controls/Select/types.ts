import { ControlProps } from '../types'

export type Option = Record<string, unknown>

interface BaseProps<T extends Option> {
  isClearable: boolean
  getOptionLabel: (val: T) => string
  getOptionValue: (val: T) => string
}

type BaseSingleProps<T extends Option> = BaseProps<T> &
  ControlProps<T> & {
    isMulti: false
  }

type BaseMultiProps<T extends Option> = BaseProps<T> &
  ControlProps<T[]> & {
    isMulti: true
  }

export type BaseSelectProps<T extends Option> = BaseSingleProps<T> | BaseMultiProps<T>
