// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useMemo, FC, Key } from 'react'

import { GroupControl } from '@cdk/Controls'
import { Field } from '@components/Forms'
import { PropsWithDefaultLayout } from '@cdk/layouts'

import { ListVertical } from '../../Layouts'

import type { FiltersValue, Filter } from './types'

export function Filters<K extends string>({
  filters,
  value,
  onChange,
  layout = ListVertical,
  layoutProxy,
}: FiltersProps<K, any>): ReactElement<FiltersProps<K, any>> {
  const layoutChildren = useMemo(
    () =>
      filters.map(({ control, name, ...other }) => ({
        key: name,
        content: <Field name={name} as={control} {...other} />,
      })),
    [filters]
  )

  const handleChange = (v: Record<K, unknown>): void => {
    onChange({ ...v, page: undefined })
  }

  const Layout = layout as FC
  return (
    <GroupControl value={value} onChange={handleChange}>
      <Layout>{layoutProxy ? layoutProxy(layoutChildren) : layoutChildren}</Layout>
    </GroupControl>
  )
}

interface BaseFiltersProps<K extends string, LayoutChildren> {
  filters: readonly Filter<K>[]
  value: FiltersValue<K>
  onChange: (v: FiltersValue<K>) => void
  layoutProxy?: (elements: { key: Key; content: ReactElement }[]) => LayoutChildren
}
export type FiltersProps<K extends string, LayoutChildren> = PropsWithDefaultLayout<
  BaseFiltersProps<K, LayoutChildren>,
  LayoutChildren
>
