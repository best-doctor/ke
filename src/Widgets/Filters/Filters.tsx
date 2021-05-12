import React, { Key, ReactElement, ReactNode, useMemo, FC } from 'react'

import { GroupControl } from '@cdk/Controls'
import { Field } from '@django-spa/Forms'
import { PropsWithDefaultLayout } from '@cdk/Layouts'

import { ListVertical } from '../../Layouts'

import type { FiltersValue, Filter } from './types'

export function Filters<K extends string>({
  filters,
  value,
  onChange,
  layout = ListVertical,
}: FiltersProps<K>): ReactElement<FiltersProps<K>> {
  const layoutChildren = useMemo(
    () =>
      filters.map(
        ({ control, name, ...other }) =>
          [name, <Field name={name} as={control} {...other} />] as [key: K, field: ReactElement]
      ),
    [filters]
  )
  // TODO: Rewrite this component to use makeWithLayout
  const Layout = layout as FC
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

export type FiltersProps<K extends string> = PropsWithDefaultLayout<BaseFiltersProps<K>, (readonly [Key, ReactNode])[]>
