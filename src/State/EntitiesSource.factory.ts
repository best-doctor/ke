import type { Effect, Store } from 'effector'
import { combine, createEffect, createStore } from 'effector'

import type { Provider } from '../admin/providers'

export function makeEntitiesSource<T>(provider: Pick<Provider, 'getPage'>, url: string): Source<T[]> {
  const fetch = createEffect(
    async (filters?: Filters): Promise<T[]> => {
      const filterPairs = filters ? Object.entries(filters) : []
      const cleanPairs = filterPairs.filter((pair) => Boolean(pair[1])) as [string, string][]
      const page = await provider.getPage(
        url,
        cleanPairs.map(([filterName, value]: [string, string]) => ({ filterName, value }))
      )

      return (page[0] as unknown) as T[]
    }
  )

  const store$ = createStore<T[]>([]).on(fetch.doneData, (_, entities) => entities)

  return {
    store: combine({
      data: store$,
      pending: fetch.pending,
    }),
    fetch,
  }
}

export interface Source<T> {
  store: Store<SourceData<T>>
  fetch: Effect<Readonly<Filters> | void, T>
}

export interface SourceData<T> {
  data: T
  pending: boolean
}

type FilterValue = string | undefined
type Filters = Record<string, FilterValue>
