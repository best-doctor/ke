import React from 'react'
import { OptionTypeBase, Props as SelectProps } from 'react-select'

import {
  AsyncPaginate,
  UseAsyncPaginateParams,
  ComponentProps,
  useComponents,
  useAsyncPaginate,
} from 'react-select-async-paginate'
import { components as defaultComponents, modifyStyles } from './ReactSelectCustomization'

type Props<OptionType, Additional, IsMulti extends boolean> = SelectProps<OptionType, IsMulti> &
  UseAsyncPaginateParams<OptionType, Additional> &
  ComponentProps & {
    useComponents?: typeof useComponents
    useAsyncPaginate?: typeof useAsyncPaginate
  }

export interface CustomProps<OptionType extends OptionTypeBase, Additional, IsMulti extends boolean>
  extends Props<OptionType, Additional, IsMulti> {
  /** Позволяет переопределять рендер выбранного значения, когда isMulti=false */
  getSingleValueLabel?: (option: OptionType) => React.ReactElement
}

export const AsyncPaginatedSelect = <OptionType extends OptionTypeBase, Additional, IsMulti extends boolean>({
  styles,
  components,
  ...props
}: CustomProps<OptionType, Additional, IsMulti>): React.ReactElement => {
  const mergedComponents = { ...defaultComponents, ...components }
  return <AsyncPaginate styles={modifyStyles(styles)} components={mergedComponents as any} {...(props as any)} />
}
