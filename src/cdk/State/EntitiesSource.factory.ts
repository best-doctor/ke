import { Effect, Store, Event, combine, createEffect, createStore, restore } from 'effector'

import type { Provider } from '../../admin/providers'
import { FetchMeta, SourceData } from './types'

export function makeEntitiesSource<Entity, Filters>(
  provider: Pick<Provider, 'getPage'>,
  url: string
): EntitiesSource<Entity, Filters> {
  const fetch = createEffect(
    async (filters?: Filters): Promise<[models: Entity[], totalCount: number | null]> => {
      const filterPairs = filters ? Object.entries(filters) : []
      const cleanPairs = filterPairs.filter((pair) => Boolean(pair[1])) as [string, string][]
      const page = await provider.getPage(
        url,
        cleanPairs.map(([filterName, value]: [string, string]) => ({ filterName, value }))
      )

      return [(page[0] as unknown) as Entity[], page[2].count || null]
    }
  )

  const $store = createStore<[models: Entity[], totalCount: number | null]>([[], null]).on(
    fetch.doneData,
    (_, entities) => entities
  )

  const $fetchMeta = restore<FetchMeta<Filters> | null>(
    fetch.finally.map(({ params }) => ({ madeAt: new Date(), params })) as Event<FetchMeta<Filters> | null>,
    null
  )

  return {
    store: combine({
      data: $store.map(([models]) => models),
      totalCount: $store.map(([, totalCount]) => totalCount),
      pending: fetch.pending,
      lastFetch: $fetchMeta,
    }),
    fetch,
  }
}

export interface EntitiesSource<Entity, FetchParams> {
  store: Store<EntitiesData<Entity, FetchParams>>
  fetch: Effect<FetchParams | void, [models: Entity[], totalCount: number | null]>
}

export interface EntitiesData<Entity, FetchParams> extends SourceData<Entity[], FetchParams> {
  totalCount: number | null
}
