import { ComponentType, createElement, ReactElement, useEffect } from 'react'
import type { Store } from 'effector'
import { useStore } from 'effector-react'
import { useStoreState, useFactoryPropState } from '@cdk/Hooks'

const filtersApi = {
  onPageChange: <F>(filters: F, page: number) => ({ ...filters, page }),
  onFiltersChange: <F>(filters: F, changed: Partial<F>): F => ({ ...filters, ...changed }),
}

export function entitiesList<Entity, FiltersWithPage extends { page: number }>(
  filtersComponent: FiltersComponent<Omit<FiltersWithPage, 'page'>>,
  listComponent: ListComponent<Entity>,
  paginationComponent: PaginationComponent,
  { source, defaultFilters }: EntitiesListProps<Entity, FiltersWithPage>
): { filters: ReactElement; list: ReactElement; pagination: ReactElement } {
  const [filtersValueWithPage$, { onPageChange, onFiltersChange }] = useStoreState(defaultFilters, filtersApi)
  const filtersValueWithPage = useStore(filtersValueWithPage$)
  const [[filtersValue, pageNumber]] = useFactoryPropState(() => {
    const { page, ...f } = filtersValueWithPage
    return [f, page] as const
  }, [filtersValueWithPage])

  const { store, fetch } = source
  const { data } = useStore(store)

  useEffect(() => {
    const subs = filtersValueWithPage$.watch((changedFilters) => fetch(changedFilters))

    return () => subs.unsubscribe()
  }, [filtersValueWithPage$, fetch])

  return {
    filters: createElement(filtersComponent, {
      value: filtersValue,
      onChange: onFiltersChange,
    }),
    list: createElement(listComponent, { data }),
    pagination: createElement(paginationComponent, {
      value: pageNumber,
      onChange: onPageChange,
    }),
  }
}

export interface EntitiesListProps<Entity, Filters extends { page?: number }> {
  source: EntitiesSource<Entity, Filters>
  defaultFilters: Filters
}

interface EntitiesSource<Entity, Filters> {
  store: EntitiesStore<Entity>
  fetch: (filters: Filters) => void
}

type EntitiesStore<Entity> = Store<{
  data: Entity[]
  pending: boolean
}>

type FiltersComponent<Filters> = ComponentType<{
  value: Filters
  onChange: (val: Filters) => void
}>

type ListComponent<Entity> = ComponentType<{
  data: readonly Entity[]
}>

type PaginationComponent = ComponentType<{
  value: number
  onChange: (page: number) => void
}>
