import React, { FC, ReactElement, useMemo } from 'react'

import { GroupControl } from '@cdk/Controls'
import { FormField } from '@cdk/Forms'
import { LayoutProps, PropsWithDefaultLayout } from '@cdk/Layouts'

import { ListVertical } from '../../Layouts'

import type { FiltersValue, Filter } from './types'

export function Filters<K extends string, LayoutChildren>({
  filters,
  value,
  onChange,
  layout: Layout = ListVertical as FC<LayoutProps<LayoutChildren>>,
  children: makeLayoutChildren = (items) => (items as unknown) as LayoutChildren,
}: FiltersProps<K, LayoutChildren>): ReactElement<FiltersProps<K, LayoutChildren>> {
  const layoutChildren = useMemo(() => {
    const filterItems = filters.map(
      ({ control, name, ...other }) =>
        [name, <FormField name={name} as={control} {...other} />] as [key: K, field: ReactElement]
    )

    return makeLayoutChildren(filterItems)
  }, [filters, makeLayoutChildren])

  return (
    <GroupControl value={value} onChange={onChange}>
      <Layout>{layoutChildren}</Layout>
    </GroupControl>
  )
}

interface BaseFiltersProps<K extends string> {
  filters: readonly Filter<K>[]
  value: FiltersValue<K>
  onChange: (v: FiltersValue<K>) => void
}

export type FiltersProps<K extends string, LayoutChildren> = PropsWithDefaultLayout<
  BaseFiltersProps<K>,
  [K, ReactElement][],
  LayoutChildren
>
