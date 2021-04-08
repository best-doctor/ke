import type { Effect, Store } from 'effector'
import { combine, createEffect, createEvent, createStore, forward } from 'effector'
import { AsyncReadWriteProvider } from '@cdk/Providers'

export function makeModelSource<Model>(
  provider: AsyncReadWriteProvider<Model>,
  defaultValue: Model
): ModelSource<Model> {
  const fetch = createEffect((): Promise<Model> => provider.read())

  const store$ = createStore<Model>(defaultValue).on(fetch.doneData, (_, model) => model)

  const updateFx = createEffect((model: Model) => provider.write(model))
  const update = createEvent<Model>('update')
  store$.on(update, (_, changed) => changed)

  forward({
    from: update,
    to: updateFx,
  })

  return {
    store: combine({
      data: store$,
      pending: fetch.pending,
    }),
    fetch,
    update,
  }
}

export interface ModelSource<Model> {
  store: ModelStore<Model>
  fetch: Effect<void, Model>
  update: (val: Model) => void
}

export type ModelStore<Model> = Store<{
  data: Model
  pending: boolean
}>
