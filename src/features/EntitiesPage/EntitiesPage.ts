import { ReactElement, useRef } from 'react'
import { EntitiesSource, makeModelSource } from '@cdk/State'
import { Store } from 'effector'
import { AsyncReadWriteProvider } from '@cdk/Providers'

export function entitiesPage<Entity, Filters>(
  entitiesListFeature: EntitiesListFeature<Entity, Partial<Filters>>,
  defaultFilters: Partial<Filters>,
  { entitiesSource, filtersProvider }: EntitiesPageProps<Entity, Partial<Filters>>
): { filters: ReactElement; list: ReactElement; pagination: ReactElement } {
  const { store, fetch, update } = makeModelSource(filtersProvider, defaultFilters)
  const filtersSource = useRef({
    fetch,
    update,
    store: store.map((data) => data.data),
  })

  return entitiesListFeature({
    entitiesSource,
    filtersSource: filtersSource.current,
  })
}

export interface EntitiesPageProps<Entity, Filters> {
  entitiesSource: EntitiesSource<Entity, Filters>
  filtersProvider: AsyncReadWriteProvider<Filters>
}

interface EntitiesListFeature<Entity, Filters> {
  (props: { entitiesSource: EntitiesSource<Entity, Filters>; filtersSource: FiltersSource<Filters> }): {
    filters: ReactElement
    list: ReactElement
    pagination: ReactElement
  }
}

interface FiltersSource<Filters> {
  store: Store<Filters>
  update: (changed: Filters) => void
  fetch: () => void
}
