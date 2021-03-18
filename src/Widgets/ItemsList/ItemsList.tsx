import React from 'react'
import { makeWithLayout } from '@cdk/Layouts'

import { Filters, Filter, FiltersValue } from '../Filters'
import { ListHorizontal } from '../../Layouts'

export const ItemsList = makeWithLayout(({ filters, filtersValue, filtersOnChange }: ItemsListProps<string>) => ({
  Filters: (
    <Filters filters={filters} value={filtersValue} onChange={filtersOnChange} layout={ListHorizontal}>
      {(items) => items}
    </Filters>
  ),
  Actions: 'Actions',
  Content: 'Content',
  BatchActions: 'Batch actions',
  Pagination: 'Pagination',
}))

type ItemsListProps<F extends string> = {
  filters: Filter<F>[]
  filtersValue: FiltersValue<F>
  filtersOnChange: (f: FiltersValue<F>) => void
}
