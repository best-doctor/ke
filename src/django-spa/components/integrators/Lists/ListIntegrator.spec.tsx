import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'

import { ListIntegrator } from './ListIntegrator'

test('Все целевые компоненты рендерятся', () => {
  const data = {
    items: ['a', 'b', 'c'],
    total: 1000,
  }
  const status = {
    isLoading: true,
    isNotLoaded: false,
  }
  const params = {
    filters: [true, 100],
    order: {},
    pagination: {
      currentPage: 2,
      itemsPerPage: 10,
    },
  }

  const { getByText } = render(
    <ListIntegrator data={data} status={status} params={[params, () => undefined]}>
      <ListIntegrator.Filters as={TestFilters} />
      <ListIntegrator.Data as={TestData} add={2} />
      <ListIntegrator.Pagination as={TestPagination} />
    </ListIntegrator>
  )

  expect(getByText(JSON.stringify(params.filters))).toBeInTheDocument()
  expect(getByText(JSON.stringify(data.items))).toBeInTheDocument()
  expect(getByText(params.pagination.currentPage)).toBeInTheDocument()
})

function TestFilters<Filters>({ filters }: { filters: Filters; onChange: (changed: Filters) => void }): ReactElement {
  return <div>{JSON.stringify(filters)}</div>
}

function TestData({ items }: { items: string[]; isLoading: boolean; add: number }): ReactElement {
  return <div>{JSON.stringify(items)}</div>
}

function TestPagination({ currentPage }: { currentPage: number; totalPages: number }): ReactElement {
  return <div>{currentPage}</div>
}
