import type { Effect, Store } from 'effector'
import { combine, createEffect, createStore } from 'effector'

import type { Provider } from '../admin/providers'

export function makeEntitiesSource<Entity>(provider: Pick<Provider, 'getPage'>, url: string): EntitiesSource<Entity> {
  const fetch = createEffect(
    async (filters?: Filters): Promise<Entity[]> => {
      const filterPairs = filters ? Object.entries(filters) : []
      const cleanPairs = filterPairs.filter((pair) => Boolean(pair[1])) as [string, string][]
      const page = await provider.getPage(
        url,
        cleanPairs.map(([filterName, value]: [string, string]) => ({ filterName, value }))
      )

      return (page[0] as unknown) as Entity[]
    }
  )

  const store$ = createStore<Entity[]>([]).on(fetch.doneData, (_, entities) => entities)

  return {
    store: combine({
      data: store$,
      pending: fetch.pending,
    }),
    fetch,
  }
}

export interface EntitiesSource<Entity> {
  store: EntitiesStore<Entity>
  fetch: Effect<Readonly<Filters> | void, Entity[]>
}

export type EntitiesStore<Entity> = Store<{
  data: Entity[]
  pending: boolean
}>

type FilterValue = string | undefined
type Filters = Record<string, FilterValue>
