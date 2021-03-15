import React from 'react'
import { HorizontalList, makeWithLayout } from '@cdk/Layouts'

import { Filters, Filter, FiltersValue } from '../Filters'

export const ItemsList = makeWithLayout(
  <F extends string>({ filters, filtersValue, filtersOnChange }: ItemsListProps<F>) => {
    return {
      Filters: (
        <Filters filters={filters} value={filtersValue} onChange={filtersOnChange} layout={HorizontalList}>
          {(items) => ({
            items: items.map(([key, node]) => [key, node, {}] as const),
          })}
        </Filters>
      ),
      Actions: 'Actions',
      Content: 'Content',
      BatchActions: 'Batch actions',
      Pagination: 'Pagination',
    }
  }
)

type ItemsListProps<F extends string> = {
  filters: Filter<F>[]
  filtersValue: FiltersValue<F>
  filtersOnChange: (f: FiltersValue<F>) => void
}
