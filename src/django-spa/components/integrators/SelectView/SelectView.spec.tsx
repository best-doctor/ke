import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SelectParams, SelectResult } from './Contexts'
import { SelectView } from './SelectView'
import { SelectWhere } from './SelectWhere'
import { SelectData } from './SelectData'
import { SelectPages } from './SelectPages'

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
    <SampleSelectView result={data} isLoading={false} onParamsChange={jest.fn()} params={params} />
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
    <SampleSelectView
      result={{ items: [], total: 100 }}
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
    <SampleSelectView
      result={{ items: [], total: 100 }}
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

function SampleSelectView({
  result,
  isLoading,
  params,
  onParamsChange,
}: {
  result: SelectResult
  isLoading: boolean
  params: SelectParams
  onParamsChange: (p: SelectParams) => void
}): JSX.Element {
  return (
    <SelectView result={result} isLoading={isLoading} onParamsChange={onParamsChange} params={params}>
      <article>
        <header>
          <SelectWhere as={SampleFilters} />
        </header>
        <SelectData as={SampleList} />
        <footer>
          <SelectPages as={SamplePagination} />
        </footer>
      </article>
    </SelectView>
  )
}
