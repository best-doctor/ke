import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ListViewParams, ListViewData } from './Contexts'
import { ListView } from './ListView'
import { ListFilters } from './ListFilters'
import { ListData } from './ListData'
import { ListPagination } from './ListPagination'

test('Correct render all components', () => {
  const data = { items: ['foo', 'bar', 'jar'], total: 100 }
  const params = {
    filters: { b: 'not test' },
    pagination: {
      page: 10,
      perPage: 20,
    },
  }

  const { getByText } = render(
    <SampleListView data={data} isLoading={false} onParamsChange={jest.fn()} params={params} />
  )

  expect(getByText(`Filters: ${JSON.stringify(params.filters)}`)).toBeInTheDocument()
  expect(getByText('Update filters')).toBeInTheDocument()
  expect(getByText(JSON.stringify(data.items))).toBeInTheDocument()
  expect(getByText(`Page: ${params.pagination.page}`)).toBeInTheDocument()
  expect(getByText('Next page')).toBeInTheDocument()
})

test('Correct call onParamsChange callback for filters', () => {
  const handleParamsChangeSpy = jest.fn()
  const params = {
    filters: { b: 'not test' },
    pagination: {
      page: 10,
      perPage: 20,
    },
  }
  const { getByText } = render(
    <SampleListView
      data={{ items: [], total: 100 }}
      isLoading={false}
      onParamsChange={handleParamsChangeSpy}
      params={params}
    />
  )
  const filtersButton = getByText('Update filters')

  userEvent.click(filtersButton)

  expect(handleParamsChangeSpy).toHaveBeenCalledTimes(1)
  expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, filters: { a: 'test' } })
})

test('Correct call onParamsChange callback for pagination', () => {
  const handleParamsChangeSpy = jest.fn()
  const params = {
    filters: { b: 'not test' },
    pagination: {
      page: 10,
      perPage: 20,
    },
  }
  const { getByText } = render(
    <SampleListView
      data={{ items: [], total: 100 }}
      isLoading={false}
      onParamsChange={handleParamsChangeSpy}
      params={params}
    />
  )
  const paginationButton = getByText('Next page')

  userEvent.click(paginationButton)

  expect(handleParamsChangeSpy).toHaveBeenCalledTimes(1)
  expect(handleParamsChangeSpy).toHaveBeenCalledWith({
    ...params,
    pagination: { page: params.pagination.page + 1, perPage: 20 },
  })
})

function SamplePagination({ value, onChange }: { value: number; onChange: (v: number) => void }): JSX.Element {
  return (
    <div>
      <span>Page: {value}</span>
      <button type="button" onClick={() => onChange(value + 1)}>
        Next page
      </button>
    </div>
  )
}

function SampleFilters({
  value,
  onChange,
}: {
  value: Record<string, unknown>
  onChange: (v: Record<string, unknown>) => void
}): JSX.Element {
  return (
    <div>
      <span>Filters: {JSON.stringify(value)}</span>
      <button type="button" onClick={() => onChange({ a: 'test' })}>
        Update filters
      </button>
    </div>
  )
}

function SampleList({ data }: { data: unknown[] }): JSX.Element {
  return <>{JSON.stringify(data)}</>
}

function SampleListView({
  data,
  isLoading,
  params,
  onParamsChange,
}: {
  data: ListViewData
  isLoading: boolean
  params: ListViewParams
  onParamsChange: (p: ListViewParams) => void
}): JSX.Element {
  return (
    <ListView data={data} isLoading={isLoading} onParamsChange={onParamsChange} params={params}>
      <article>
        <header>
          <ListFilters as={SampleFilters} />
        </header>
        <ListData as={SampleList} />
        <footer>
          <ListPagination as={SamplePagination} />
        </footer>
      </article>
    </ListView>
  )
}
