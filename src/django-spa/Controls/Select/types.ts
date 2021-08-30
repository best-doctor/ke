import { ControlProps } from '../types'

export type Option = Record<string, unknown>

export interface BaseProps<T extends Option> {
  /**
   * Is select clearable
   */
  isClearable: boolean
  /**
   * Function to get label for option
   */
  getOptionLabel: (val: T) => string
  /**
   * Function to get value for option
   */
  getOptionValue: (val: T) => string
}

export type BaseSingleProps<T extends Option> = BaseProps<T> &
  ControlProps<T> & {
  /**
   * Support for multiple values is select
   */
    isMulti: false
  }

export type BaseMultiProps<T extends Option> = BaseProps<T> &
  ControlProps<T[]> & {
  /**
   * Support for multiple values is select
   */
    isMulti: true
  }

export type BaseSelectProps<T extends Option> = BaseSingleProps<T> | BaseMultiProps<T>
