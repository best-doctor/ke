import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'

import { SelectListIntegrator } from './SelectList'

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
  const selected = ['b']

  const { getByText } = render(
    <SelectListIntegrator
      data={data}
      status={status}
      params={[params, () => undefined]}
      selected={[selected, () => undefined]}
    >
      <SelectListIntegrator.Filters as={TestFilters} />
      <SelectListIntegrator.Data as={TestData} add={2} />
      <SelectListIntegrator.Selected as={TestSelected} />
      <SelectListIntegrator.Pagination as={TestPagination} />
    </SelectListIntegrator>
  )

  expect(getByText(JSON.stringify(params.filters))).toBeInTheDocument()
  expect(getByText(JSON.stringify(data.items.concat(selected)))).toBeInTheDocument()
  expect(getByText(params.pagination.currentPage)).toBeInTheDocument()
})

function TestFilters<Filters>({ filters }: { filters: Filters; onChange: (changed: Filters) => void }): ReactElement {
  return <div>{JSON.stringify(filters)}</div>
}

function TestData({
  items,
  selected,
}: {
  items: string[]
  selected: string[]
  isLoading: boolean
  add: number
}): ReactElement {
  return <div>{JSON.stringify(items.concat(selected))}</div>
}

function TestPagination({ currentPage }: { currentPage: number; totalPages: number }): ReactElement {
  return <div>{currentPage}</div>
}

function TestSelected({ selected }: { selected: string[]; isLoading: boolean }): ReactElement {
  return <div>{JSON.stringify(selected)}</div>
}
