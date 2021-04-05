import { useEffect, useState } from 'react'
import { createApi, createStore } from 'effector'
import { Store } from 'effector/compat'

export function useStoreState<T, Api extends API<T>>(initial: T, api: Api): readonly [Store<T>, StoreApi<T, Api>] {
  const [storeApiPair, setStoreApiPair] = useState(() => makeStoreApi(initial, api))

  useEffect(() => {
    setStoreApiPair(makeStoreApi(initial, api))
  }, [initial, api])

  return storeApiPair
}

function makeStoreApi<T, Api extends API<T>>(initial: T, api: Api): [Store<T>, StoreApi<T, Api>] {
  const store = createStore(initial)
  return [store, createApi(store, api) as StoreApi<T, Api>]
}

type API<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: (prev: T, e: any) => T
}

type StoreApi<T, Api extends API<T>> = {
  [K in keyof Api]: Api[K] extends (store: T, e: void) => T
    ? () => void
    : Api[K] extends (store: T, e: infer E) => T
    ? (val: E) => void
    : never
}
