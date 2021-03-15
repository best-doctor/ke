import React, { ComponentType, ReactNode } from 'react'

import { GroupControl } from '@cdk/Controls'
import { FormField } from '@cdk/Forms'

import type { FiltersValue, Filter } from './types'

export function Filters<K extends string>({ filters, value, onChange, layout: Layout }: FiltersProps<K>): JSX.Element {
  return (
    <GroupControl value={value} onChange={onChange}>
      <Layout
        items={filters.map(({ control, name, ...other }) => {
          return [name, <FormField name={name} as={control} key={name} {...other} />]
        })}
      />
    </GroupControl>
  )
}

export interface FiltersProps<K extends string> {
  filters: Filter<K>[]
  value: FiltersValue<K>
  onChange: (val: FiltersValue<K>) => void
  layout: ComponentType<{ items: [string, ReactNode][] }>
}
