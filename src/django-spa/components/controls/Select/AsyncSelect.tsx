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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AsyncSelectProps<OptionType, Additional = any, IsMulti extends boolean = false>
  extends Props<OptionType, Additional, IsMulti> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AsyncSelect<T extends Option, Additional = any, IsMulti extends boolean = false>(
  props: AsyncSelectProps<T, Additional, IsMulti>
): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <AsyncPaginate {...(props as any)} />
}
