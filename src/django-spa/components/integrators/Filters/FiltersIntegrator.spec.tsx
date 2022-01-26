import React from 'react'
import { render } from '@testing-library/react'
import { makeFakeComponent } from '@test-utils/fake-components'

import { FiltersIntegrator } from './FiltersIntegrator'

const [TestFilters, makeFiltersContent] = makeFakeComponent('TestFilters')
const [TestPredefined, makePredefinedContent] = makeFakeComponent('TestPredefined')

test('Все целевые компоненты рендерятся', () => {
  const filters = [1, 2, 'test']

  const { getByText } = render(
    <FiltersIntegrator filters={filters} onChange={() => undefined}>
      <FiltersIntegrator.Filters as={TestFilters} />
      <FiltersIntegrator.Predefined as={TestPredefined} />
    </FiltersIntegrator>
  )

  expect(getByText(makeFiltersContent({ filters }))).toBeInTheDocument()
  expect(getByText(makePredefinedContent({ value: filters }))).toBeInTheDocument()
})
