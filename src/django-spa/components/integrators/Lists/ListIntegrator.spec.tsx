import React from 'react'
import { render } from '@testing-library/react'

import { ListIntegrator } from './ListIntegrator'
import {
  TestData,
  testDataContent,
  TestFilters,
  testFiltersContent,
  TestPagination,
  testPaginationContent,
} from './fixtures'

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
      <ListIntegrator.Data as={TestData} />
      <ListIntegrator.Pagination as={TestPagination} />
    </ListIntegrator>
  )

  expect(getByText(testFiltersContent({ filters: params.filters, isLoading: status.isLoading }))).toBeInTheDocument()
  expect(getByText(testDataContent({ items: data.items, isLoading: status.isLoading }))).toBeInTheDocument()
  expect(
    getByText(
      testPaginationContent({
        currentPage: params.pagination.currentPage,
        totalPages: data.total / params.pagination.itemsPerPage,
      })
    )
  ).toBeInTheDocument()
})
