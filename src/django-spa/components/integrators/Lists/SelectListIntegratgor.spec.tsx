import React from 'react'
import { render } from '@testing-library/react'

import {
  TestFilters,
  testFiltersContent,
  TestPagination,
  testPaginationContent,
  TestSelectData,
  testSelectDataContent,
  TestSelected,
  testSelectedContent,
} from './fixtures'
import { SelectListIntegrator } from './SelectListIntegrator'

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
      <SelectListIntegrator.Data as={TestSelectData} />
      <SelectListIntegrator.Selected as={TestSelected} />
      <SelectListIntegrator.Pagination as={TestPagination} />
    </SelectListIntegrator>
  )

  expect(getByText(testFiltersContent({ filters: params.filters, isLoading: status.isLoading }))).toBeInTheDocument()
  expect(
    getByText(testSelectDataContent({ items: data.items, selected, isLoading: status.isLoading }))
  ).toBeInTheDocument()
  expect(getByText(testSelectedContent({ selected }))).toBeInTheDocument()
  expect(
    getByText(
      testPaginationContent({
        currentPage: params.pagination.currentPage,
        totalPages: data.total / params.pagination.itemsPerPage,
      })
    )
  )
})
