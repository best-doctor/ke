import * as React from 'react'

import { GroupControl } from '@cdk/Controls'
import { FormField } from '@cdk/Forms'

import type { FiltersValue, Filter } from './types'

export function Filters<K extends string>({ filters, value, onChange }: FiltersProps<K>): JSX.Element {
  return (
    <GroupControl value={value} onChange={onChange}>
      <ul>
        {filters.map(({ control, name, ...other }) => {
          return (
            <li>
              <FormField name={name} as={control} {...other} />
            </li>
          )
        })}
      </ul>
    </GroupControl>
  )
}

export interface FiltersProps<K extends string> {
  filters: Filter<K>[]
  value: FiltersValue<K>
  onChange: (val: FiltersValue<K>) => void
}
