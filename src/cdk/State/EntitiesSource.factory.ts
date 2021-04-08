import { Effect, Store, combine, createEffect, createStore } from 'effector'

import type { Provider } from '../../admin/providers'

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

  const store$ = createStore<[models: Entity[], totalCount: number | null]>([[], null]).on(
    fetch.doneData,
    (_, entities) => entities
  )

  return {
    store: combine({
      data: store$.map(([models]) => models),
      totalCount: store$.map(([, totalCount]) => totalCount),
      pending: fetch.pending,
    }),
    fetch,
  }
}

export interface EntitiesSource<Entity, Filters> {
  store: EntitiesStore<Entity>
  fetch: Effect<Filters | void, [models: Entity[], totalCount: number | null]>
}

export type EntitiesStore<Entity> = Store<{
  data: Entity[]
  pending: boolean
  totalCount: number | null
}>
