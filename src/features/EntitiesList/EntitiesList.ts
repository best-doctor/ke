import { ComponentType, createElement, ReactElement, useEffect, useMemo } from 'react'
import { useStore } from 'effector-react'
import type { Store } from 'effector'
import { useChangeEffect, useStoreApiState } from '@cdk/Hooks'

export function entitiesList<Entity, ExtFilters extends { page?: number; ordering?: string }>(
  filtersComponent: FiltersComponent<Omit<ExtFilters, 'page' | 'ordering'>>,
  listComponent: ListComponent<Entity>,
  paginationComponent: PaginationComponent,
  { entitiesSource, filtersSource }: EntitiesListProps<Entity, ExtFilters>
): { filters: ReactElement; list: ReactElement; pagination: ReactElement } {
  const { store: $filters, fetch: fetchFilters, update } = filtersSource

  useEffect(() => {
    fetchFilters()
  }, [fetchFilters])

  const [{ data: filters, lastFetch }, { onPageChange, onFiltersChange, onOrderChange }] = useStoreApiState($filters, {
    onPageChange: (filtersData, page: number) => ({ ...filtersData, data: { ...filtersData.data, page } }),
    onFiltersChange: (filtersData, changed: Omit<ExtFilters, 'page' | 'ordering'>) => ({
      ...filtersData,
      data: { ...filtersData.data, ...changed },
    }),
    onOrderChange: (filtersData, ordering: Ordering) => ({
      ...filtersData,
      data: {
        ...filtersData.data,
        ordering: orderingToStr(ordering),
      },
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
    const { page, ordering, ...other } = filters
    return other
  }, [filters])

  const ordering = useMemo(() => (filters.ordering ? strToOrdering(filters.ordering) : undefined), [filters.ordering])

  return {
    filters: createElement(filtersComponent, {
      value: filtersWithoutPage,
      onChange: onFiltersChange,
    }),
    list: createElement(listComponent, { data: entities, onOrderChange, ordering }),
    pagination: createElement(paginationComponent, {
      value: filters.page || 1,
      onChange: onPageChange,
      totalCount: Math.ceil((totalCount || 1) / 20),
    }),
  }
}

function orderingToStr(ordering: Ordering): string {
  return Object.entries(ordering)
    .filter(([, direction]) => Boolean(direction))
    .map(([key, direction]) => (direction === 'asc' ? key : `-${key}`))
    .join(',')
}

function strToOrdering(str: string): Ordering {
  return Object.fromEntries(
    str.split(',').map((order) => {
      if (order.startsWith('-')) {
        return [order.slice(1), 'desc']
      }
      return [order, 'asc']
    })
  )
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
  onOrderChange: (ordering: Ordering) => void
  ordering?: Ordering
}>

type PaginationComponent = ComponentType<{
  value: number
  onChange: (page: number) => void
  totalCount: number
}>

type Ordering = Record<number | string, 'asc' | 'desc' | null>
