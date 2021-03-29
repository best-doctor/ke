import { useMemo } from 'react'
import { createApi, createStore, Event } from 'effector'
import { Store } from 'effector/compat'

export function useStoreState<T, Api extends API<T>>(initial: T, api: Api): [Store<T>, StoreApi<T, Api>] {
  return useMemo(() => {
    const store = createStore(initial)
    return [store, createApi(store, api)]
  }, [initial, api])
}

type API<T> = {
  [name: string]: (prev: T, e: unknown) => T
}

type StoreApi<T, Api extends API<T>> = {
  [K in keyof Api]: Api[K] extends (store: T, e: void) => T
    ? Event<void>
    : Api[K] extends (store: T, e: infer E) => T
    ? Event<E extends void ? Exclude<E, undefined> | void : E>
    : unknown
}
