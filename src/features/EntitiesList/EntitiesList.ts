import { ComponentType, createElement, ReactElement, useEffect, useMemo } from 'react'
import { useStore } from 'effector-react'
import type { Store } from 'effector'
import { useChangeEffect, useStoreApiState } from '@cdk/Hooks'

export function entitiesList<Entity, FiltersWithPage extends { page?: number }>(
  filtersComponent: FiltersComponent<Omit<FiltersWithPage, 'page'>>,
  listComponent: ListComponent<Entity>,
  paginationComponent: PaginationComponent,
  { entitiesSource, filtersSource }: EntitiesListProps<Entity, FiltersWithPage>
): { filters: ReactElement; list: ReactElement; pagination: ReactElement } {
  const { store: $filters, fetch: fetchFilters, update } = filtersSource

  useEffect(() => {
    fetchFilters()
  }, [fetchFilters])

  const [{ data: filters, lastFetch }, { onPageChange, onFiltersChange }] = useStoreApiState($filters, {
    onPageChange: (filtersData, page: number) => ({ ...filtersData, data: { ...filtersData.data, page } }),
    onFiltersChange: (filtersData, changed: Omit<FiltersWithPage, 'page'>) => ({
      ...filtersData,
      data: { ...filtersData.data, ...changed },
    }),
  })

  const { store: $entities, fetch: entitiesFetch } = entitiesSource
  const { data: entities, totalCount } = useStore($entities)

  useEffect(() => {
    if (lastFetch) {
      entitiesFetch(filters)
    }
  }, [filters, entitiesFetch, lastFetch])

  useChangeEffect(() => {
    update(filters)
  }, [update, filters])

  const filtersWithoutPage = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { page, ...other } = filters
    return other
  }, [filters])
  return {
    filters: createElement(filtersComponent, {
      value: filtersWithoutPage,
      onChange: onFiltersChange,
    }),
    list: createElement(listComponent, { data: entities }),
    pagination: createElement(paginationComponent, {
      value: filters.page || 1,
      onChange: onPageChange,
      totalCount: Math.ceil((totalCount || 1) / 30),
    }),
  }
}

export interface EntitiesListProps<Entity, Filters extends { page?: number }> {
  entitiesSource: EntitiesSource<Entity, Filters>
  filtersSource: FiltersSource<Filters>
}

interface EntitiesSource<Entity, Filters> {
  store: Store<{
    data: Entity[]
    totalCount: number | null
  }>
  fetch: (filters: Filters) => void
}

interface FiltersSource<Filters> {
  store: Store<FiltersData<Filters>>
  update: (changed: Filters) => void
  fetch: () => void
}

interface FiltersData<Filters> {
  data: Filters
  lastFetch: {} | null
}

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
  totalCount: number
}>
