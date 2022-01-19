import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'

import { FiltersIntegrator } from './FiltersIntegrator'

test('Все целевые компоненты рендерятся', () => {
  const filters = [1, 2, 'test']

  const { getByText } = render(
    <FiltersIntegrator filters={filters} onChange={() => undefined}>
      <FiltersIntegrator.Filters as={TestFilters} />
      <FiltersIntegrator.Predefined as={TestPredefined} />
    </FiltersIntegrator>
  )

  expect(getByText(JSON.stringify(filters))).toBeInTheDocument()
  expect(getByText(`Predefined - ${JSON.stringify(filters)}`)).toBeInTheDocument()
})

function TestFilters<Filters>({ filters }: { filters: Filters; onChange: (changed: Filters) => void }): ReactElement {
  return <div>{JSON.stringify(filters)}</div>
}

function TestPredefined<Filters>({ value }: { value: Filters; onChange: (changed: Filters) => void }): ReactElement {
  return <div>Predefined - {JSON.stringify(value)}</div>
}
