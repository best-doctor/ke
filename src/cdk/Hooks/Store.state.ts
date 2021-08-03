import { useEffect, useState } from 'react'
import { createEvent } from 'effector'
import { Store } from 'effector/compat'
import { useStore } from 'effector-react'

export function useStoreApiState<T, Api extends ApiConfig<T>>(store$: Store<T>, apiConfig: Api): [T, StoreApi<T, Api>] {
  const [storeApi] = useState(() =>
    Object.fromEntries(Object.entries(apiConfig).map(([key]) => [key, createEvent(key)]))
  )

  useEffect(() => {
    Object.entries(storeApi).forEach(([key, event]) => store$.on(event, apiConfig[key]))
    return () => Object.entries(storeApi).forEach(([, event]) => store$.off(event))
  })

  return [useStore(store$), (storeApi as unknown) as StoreApi<T, Api>]
}

type ApiConfig<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: (prev: T, e: any) => T
}

type StoreApi<T, Api extends ApiConfig<T>> = {
  [K in keyof Api]: Api[K] extends (store: T, e: void) => T
    ? () => void
    : Api[K] extends (store: T, e: infer E) => T
    ? (val: E) => void
    : never
}
