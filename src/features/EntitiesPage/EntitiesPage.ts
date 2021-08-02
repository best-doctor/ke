import { ReactElement, useMemo } from 'react'
import { EntitiesSource, makeModelSource, SourceData } from '@cdk/State'
import { Store } from 'effector'
import { AsyncReadWriteProvider } from '@cdk/Providers'

export function entitiesPage<Entity, Filters>(
  entitiesListFeature: EntitiesListFeature<Entity, Partial<Filters>>,
  defaultFilters: Partial<Filters>,
  { entitiesSource, filtersProvider, perPage = 20 }: EntitiesPageProps<Entity, Partial<Filters>>
): { filters: ReactElement; list: ReactElement; pagination: ReactElement } {
  const filtersSource = useMemo(
    () => makeModelSource(filtersProvider, defaultFilters),
    [filtersProvider, defaultFilters]
  )

  return entitiesListFeature({
    entitiesSource,
    filtersSource,
    perPage,
  })
}

export interface EntitiesPageProps<Entity, Filters> {
  entitiesSource: EntitiesSource<Entity, Filters>
  filtersProvider: AsyncReadWriteProvider<Filters>
  perPage?: number
}

interface EntitiesListFeature<Entity, Filters> {
  (props: {
    entitiesSource: EntitiesSource<Entity, Filters>
    filtersSource: FiltersSource<Filters>
    perPage: number
  }): {
    filters: ReactElement
    list: ReactElement
    pagination: ReactElement
  }
}

interface FiltersSource<Filters> {
  store: Store<SourceData<Filters>>
  update: (changed: Filters) => void
  fetch: () => void
}
