import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { WherePanel } from './WherePanel'
import { WhereFilters } from './WhereFilters'
import { WherePredefined } from './WherePredefined'

test('Correct render all components', () => {
  const filters = { foo: 'test' }

  const { getByText } = render(<SampleWherePanel filters={filters} onFiltersChange={jest.fn()} />)

  expect(getByText(JSON.stringify(filters))).toBeInTheDocument()
  expect(getByText('First')).toBeInTheDocument()
})

test('Correct call onFiltersChange for filters', () => {
  const filters = { foo: 'test' }
  const handleFiltersSpy = jest.fn()
  const { getByText } = render(<SampleWherePanel filters={filters} onFiltersChange={handleFiltersSpy} />)
  const filtersButton = getByText('Filters change')

  userEvent.click(filtersButton)

  expect(handleFiltersSpy).toHaveBeenCalledTimes(1)
  expect(handleFiltersSpy).toHaveBeenCalledWith({ foo: 'changed' })
})

test('Correct call onFiltersChange for predefined', () => {
  const filters = { foo: 'test' }
  const handleFiltersSpy = jest.fn()
  const { getByText } = render(<SampleWherePanel filters={filters} onFiltersChange={handleFiltersSpy} />)

  userEvent.click(getByText('First'))

  expect(handleFiltersSpy).toHaveBeenCalledTimes(1)
  expect(handleFiltersSpy).toHaveBeenCalledWith({ foo: 'first' })

  userEvent.click(getByText('Second'))

  expect(handleFiltersSpy).toHaveBeenCalledTimes(2)
  expect(handleFiltersSpy).toHaveBeenCalledWith({ foo: 'second' })
})

function Filters({
  value,
  onChange,
}: {
  value: { foo?: string }
  onChange: (v: { foo?: string }) => void
}): JSX.Element {
  return (
    <>
      {JSON.stringify(value)}
      <button type="button" onClick={() => onChange({ foo: 'changed' })}>
        Filters change
      </button>
    </>
  )
}

function Predefined({ onChange }: { onChange: (v: { foo: string }) => void }): JSX.Element {
  return (
    <>
      <button type="button" onClick={() => onChange({ foo: 'first' })}>
        First
      </button>
      <button type="button" onClick={() => onChange({ foo: 'second' })}>
        Second
      </button>
    </>
  )
}

function SampleWherePanel({
  filters,
  onFiltersChange,
}: {
  filters: { foo: string }
  onFiltersChange: (v: { foo?: string }) => void
}): JSX.Element {
  return (
    <WherePanel filters={filters} onFiltersChange={onFiltersChange}>
      <div className="filters">
        <WhereFilters as={Filters} />
      </div>
      <div className="predefined">
        <WherePredefined as={Predefined} />
      </div>
    </WherePanel>
  )
}
