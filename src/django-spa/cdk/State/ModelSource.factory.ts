import type { Effect, Store } from 'effector'
import { combine, createEffect, createEvent, createStore, Event, forward, restore } from 'effector'
import { AsyncReadWriteProvider } from '../Providers'
import { FetchMeta, SourceData } from './types'

export function makeModelSource<Model>(
  provider: AsyncReadWriteProvider<Model>,
  defaultValue: Model
): ModelSource<Model> {
  const fetch = createEffect((): Promise<Model> => provider.read())

  const $store = createStore<Model>(defaultValue).on(fetch.doneData, (_, model) => model)

  const updateFx = createEffect((model: Model) => provider.write(model))
  const update = createEvent<Model>('update')
  $store.on(update, (_, changed) => changed)

  forward({
    from: update,
    to: updateFx,
  })

  const $fetchMeta = restore<FetchMeta | null>(
    fetch.finally.map(({ params }) => ({ madeAt: new Date(), params })) as unknown as Event<FetchMeta | null>,
    null
  )

  return {
    store: combine({
      data: $store,
      pending: fetch.pending,
      lastFetch: $fetchMeta,
    }),
    fetch,
    update,
  }
}

export interface ModelSource<Model> {
  store: Store<SourceData<Model>>
  fetch: Effect<void, Model>
  update: (val: Model) => void
}
