import type { Effect, Store } from 'effector'
import { combine, createEffect, createStore } from 'effector'

import type { Provider } from '../admin/providers'

export function makeEntitiesSource<T>(provider: Pick<Provider, 'getPage'>, url: string): Source<T[]> {
  const fetch = createEffect(
    async (filters?: Filters): Promise<T[]> => {
      const page = await provider.getPage(
        url,
        filters ? Object.entries(filters).map(([filterName, value]) => ({ filterName, value })) : []
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

interface SourceData<T> {
  data: T
  pending: boolean
}

type FilterValue = string
type Filters = Record<string, FilterValue>
