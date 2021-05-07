import React, { ReactElement, useMemo } from 'react'

import { GroupControl } from '@cdk/Controls'
import { FormField } from '@cdk/Forms'
import { PropsWithDefaultLayout } from '@cdk/Layouts'

import { ListVertical } from '../../Layouts'

import type { FiltersValue, Filter } from './types'

export function Filters<K extends string>({
  filters,
  value,
  onChange,
  layout: Layout = ListVertical,
  layoutProxy,
}: FiltersProps<K, any>): ReactElement<FiltersProps<K, any>> {
  const layoutChildren = useMemo(
    () =>
      filters.map(
        ({ control, name, ...other }) =>
          [name, <FormField name={name} as={control} {...other} />] as [key: K, field: ReactElement]
      ),
    [filters]
  )
  return (
    <GroupControl value={value} onChange={onChange}>
      <Layout>{layoutProxy ? layoutProxy(layoutChildren) : layoutChildren}</Layout>
    </GroupControl>
  )
}

interface BaseFiltersProps<K extends string, LayoutChildren> {
  filters: readonly Filter<K>[]
  value: FiltersValue<K>
  onChange: (v: FiltersValue<K>) => void
  layoutProxy?: (elements: [string, ReactElement][]) => LayoutChildren
}
export type FiltersProps<K extends string, LayoutChildren> = PropsWithDefaultLayout<
  BaseFiltersProps<K, LayoutChildren>,
  LayoutChildren
>
