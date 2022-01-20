import { makeIntegrator } from '@cdk/integrators'
import { makeCommonProvider, makeConsumerFactory } from '@cdk/multiple-contexts'

import { filtersContext } from './contexts'
import { FiltersContext } from './types'
import { Filters } from './Filters'
import { Predefined } from './Predefined'

const filtersContexts = {
  filters: filtersContext,
}

const Root = makeCommonProvider(filtersContexts, ({ filters, onChange }: RootProps) => ({
  filters: [filters, onChange] as FiltersContext,
}))

export const FiltersIntegrator = makeIntegrator(Root, {
  Filters,
  Predefined,
})

export const makeFiltersConsumer = makeConsumerFactory(filtersContexts)

interface RootProps {
  filters: unknown
  onChange: (filters: unknown) => void
}
