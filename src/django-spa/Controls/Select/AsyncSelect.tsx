import React from 'react'
import {
  useAsyncPaginate,
  UseAsyncPaginateParams,
  useComponents,
  ComponentProps,
  AsyncPaginate,
} from 'react-select-async-paginate'
import { Props as SelectProps } from 'react-select'

import type { Option } from './types'

export type Props<OptionType, Additional, IsMulti extends boolean> = SelectProps<OptionType, IsMulti> &
  UseAsyncPaginateParams<OptionType, Additional> &
  ComponentProps & {
    useComponents?: typeof useComponents
    useAsyncPaginate?: typeof useAsyncPaginate
  }

export type StatefullProps<OptionType, Additional, IsMulti extends boolean> = SelectProps<OptionType, IsMulti> &
  Omit<UseAsyncPaginateParams<OptionType, Additional>, 'loadOptions'> &
  ComponentProps & {
    useComponents?: typeof useComponents
    useAsyncPaginate?: typeof useAsyncPaginate
  }

export interface AsyncSelectProps<OptionType, Additional = any, IsMulti extends boolean = false>
  extends Props<OptionType, Additional, IsMulti> {}

export function AsyncSelect<T extends Option, Additional = any, IsMulti extends boolean = false>(
  props: AsyncSelectProps<T, Additional, IsMulti>
): React.ReactElement {
  return <AsyncPaginate {...(props as any)} />
}
